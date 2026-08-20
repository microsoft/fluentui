import type {
  DashboardGridBatchOptions,
  DashboardGridColumnLayout,
  DashboardGridEngine,
  DashboardGridEngineChangeSet,
  DashboardGridEngineDiagnostic,
  DashboardGridEngineOptions,
  DashboardGridEngineSaveOptions,
  DashboardGridEngineSerializedState,
  DashboardGridEngineSnapshot,
  DashboardGridFitResult,
  DashboardGridInteractionContext,
  DashboardGridLayoutItemInput,
  DashboardGridLayoutItemPatch,
  DashboardGridLoadOptions,
  DashboardGridMoveProposal,
  DashboardGridMoveResult,
  DashboardGridMutationRejectionReason,
  DashboardGridMutationResult,
  DashboardGridRect,
  DashboardGridResolvedItem,
} from './DashboardGridEngine.types';
import {
  allCollisions,
  repairCollisions,
  selectPointerCollision,
} from './collision';
import {
  createDiagnostic,
  type DiagnosticReporter,
  reportDiagnostic,
} from './diagnostics';
import {
  intersects,
  nestingCoverage,
  sameInternalRect,
  toInternalRect,
  toPixelRect,
  toPublicRect,
} from './geometry';
import type {
  BatchRecord,
  EngineState,
  InteractionRecord,
  InternalNode,
  OpaqueNodeKey,
} from './internalTypes';
import { asOpaqueNodeKey } from './internalTypes';
import { applyLoad } from './load';
import {
  DashboardGridNormalizationError,
  normalizeColumns,
  normalizeInternalBounds,
  normalizeItem,
  normalizeMaxRows,
  normalizeMoveProposal,
  normalizePatchedNode,
} from './normalize';
import { compactNodes, packNodes } from './packing';
import { findFirstEmptyPosition } from './placement';
import {
  applyColumnChange,
  cacheAuthoredLayout,
  cacheCurrentLayout,
  clearResponsiveLayouts,
  removeNodeFromAllLayouts,
  synchronizeResponsiveCaches,
} from './responsiveLayouts';
import { deserializeEngineState, serializeEngineState } from './serialization';
import {
  cloneEngineState,
  createEmptyState,
  createRectMap,
  createSnapshot,
  findNodeById,
  findNodeByKey,
  getInternalRow,
  hasOverlaps,
  nodeToResolvedItem,
  samePublicState,
} from './state';
import { createChangeSet, emptyChangeSet } from './transactions';

const rejectionReasonForDiagnostic = (
  diagnostic: DashboardGridEngineDiagnostic,
): DashboardGridMutationRejectionReason => {
  switch (diagnostic.code) {
    case 'bounds':
      return 'bounds';
    case 'collision-cycle':
      return 'collision-cycle';
    case 'constraint':
      return 'constraint';
    case 'duplicate-id':
      return 'duplicate-id';
    case 'max-rows':
      return 'max-rows';
    case 'missing-item':
      return 'missing-item';
    case 'contradictory-constraints':
    case 'rotation-not-allowed':
      return 'constraint';
    default:
      return 'invalid-input';
  }
};

const frozenMutationResult = (
  result: DashboardGridMutationResult,
): DashboardGridMutationResult => Object.freeze(result);

const frozenMoveResult = (
  result: DashboardGridMoveResult,
): DashboardGridMoveResult => Object.freeze(result);

export class DefaultDashboardGridEngine implements DashboardGridEngine {
  private state: EngineState;
  private visibleState: EngineState;
  private revision = 0;
  private snapshot: DashboardGridEngineSnapshot;
  private readonly listeners = new Set<() => void>();
  private readonly reporter: DiagnosticReporter;
  private batch: BatchRecord | undefined;
  private interaction: InteractionRecord | undefined;

  public constructor(options: DashboardGridEngineOptions = {}) {
    this.reporter = {
      development: options.development !== false,
      onDiagnostic: options.onDiagnostic,
      onError: options.onError,
    };

    let columns = 12;
    try {
      columns = normalizeColumns(options.columns ?? 12);
    } catch (error) {
      this.report(
        createDiagnostic(
          'invalid-columns',
          error instanceof Error ? error.message : 'Invalid dashboard grid columns.',
          { severity: 'error' },
        ),
        error,
      );
    }

    if (options.serializedState !== undefined) {
      try {
        this.state = deserializeEngineState(options.serializedState, {
          resizeDisabled: options.resizeDisabled,
        });
      } catch (error) {
        this.state = createEmptyState({
          columns,
          maxRows: normalizeMaxRows(options.maxRows),
          float: options.float === true,
          resizeDisabled: options.resizeDisabled === true,
        });
        this.report(
          createDiagnostic(
            'invalid-serialized-state',
            error instanceof Error
              ? error.message
              : 'Invalid dashboard grid serialized state.',
            { severity: 'error' },
          ),
          error,
        );
      }
    } else {
      this.state = createEmptyState({
        columns,
        maxRows: normalizeMaxRows(options.maxRows),
        float: options.float === true,
        resizeDisabled: options.resizeDisabled === true,
      });

      if (options.items !== undefined && options.items.length > 0) {
        const work = cloneEngineState(this.state);
        const loaded = applyLoad(work, options.items);
        if (loaded.accepted) {
          this.state = work;
          this.reportAll(loaded.diagnostics);
        } else {
          this.reportAll(loaded.diagnostics);
        }
      }
    }

    cacheCurrentLayout(this.state);
    this.visibleState = cloneEngineState(this.state);
    this.snapshot = createSnapshot(this.state, this.revision);
  }

  public getSnapshot(): DashboardGridEngineSnapshot {
    return this.snapshot;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    let subscribed = true;

    return () => {
      if (subscribed) {
        subscribed = false;
        this.listeners.delete(listener);
      }
    };
  }

  public getItem(id: string): DashboardGridResolvedItem | undefined {
    return this.snapshot.items.find(item => item.id === id);
  }

  public getRow(): number {
    return getInternalRow(this.state.nodes);
  }

  public isAreaEmpty(area: DashboardGridRect): boolean {
    const values = [
      area.column,
      area.row,
      area.columnSpan,
      area.rowSpan,
    ];
    if (
      values.some(value => !Number.isFinite(value)) ||
      area.columnSpan <= 0 ||
      area.rowSpan <= 0
    ) {
      return false;
    }

    const internal = toInternalRect(area);
    return !this.state.nodes.some(node => intersects(node, internal));
  }

  public canPlace(item: DashboardGridLayoutItemInput): DashboardGridFitResult {
    if (findNodeById(this.state.nodes, item.id) !== undefined) {
      return Object.freeze({ fits: false, reason: 'duplicate-id' as const });
    }

    const work = cloneEngineState(this.state);
    let node: InternalNode;
    try {
      node = normalizeItem(item, {
        columns: work.columns,
        ...(work.maxRows === undefined ? {} : { maxRows: work.maxRows }),
        key: asOpaqueNodeKey(work.nextKey),
        sequence: work.nextSequence,
      }).node;
    } catch {
      return Object.freeze({ fits: false, reason: 'constraint' as const });
    }

    let autoPlaced = false;
    if (node.auto) {
      const empty = findFirstEmptyPosition(node, work.nodes, work.columns, {
        ...(work.maxRows === undefined ? {} : { maxRows: work.maxRows }),
      });
      if (empty === undefined) {
        return Object.freeze({ fits: false, reason: 'max-rows' as const });
      }
      node.x = empty.x;
      node.y = empty.y;
      delete node.auto;
      autoPlaced = true;
    }

    work.nodes.push(node);
    if (!autoPlaced) {
      const repair = repairCollisions(work.nodes, node.key, node, {
        columns: work.columns,
        float: work.float,
        loading: false,
        moving: false,
        movingDown: false,
        allowSwap: false,
        rootKey: node.key,
        budget: Math.max(1, work.nodes.length * 2 + 1),
      });
      if (repair.status === 'collision-cycle') {
        return Object.freeze({
          fits: false,
          reason: 'collision-cycle' as const,
        });
      }
    }

    packNodes(work.nodes, { float: work.float });
    if (
      hasOverlaps(work.nodes) ||
      (work.maxRows !== undefined && getInternalRow(work.nodes) > work.maxRows)
    ) {
      return Object.freeze({ fits: false, reason: 'max-rows' as const });
    }

    const resolved = findNodeByKey(work.nodes, node.key);
    return Object.freeze({
      fits: true,
      ...(resolved === undefined
        ? {}
        : { resolvedPosition: toPublicRect(resolved) }),
    });
  }

  public beginBatch(options: DashboardGridBatchOptions = {}): void {
    if (this.batch !== undefined) {
      this.batch.depth++;
      if (options.pack === false) {
        this.batch.pack = false;
      }
      return;
    }

    this.batch = {
      depth: 1,
      snapshot: cloneEngineState(this.state),
      pack: options.pack !== false,
      published: false,
    };
  }

  public commitBatch(
    options: DashboardGridBatchOptions = {},
  ): DashboardGridEngineChangeSet {
    const record = this.batch;
    if (record === undefined) {
      const diagnostic = createDiagnostic(
        'nested-transaction',
        'Cannot commit a dashboard grid batch that has not begun.',
      );
      this.report(diagnostic);
      return emptyChangeSet(this.revision, [diagnostic]);
    }

    if (record.depth > 1) {
      record.depth--;
      if (options.pack === false) {
        record.pack = false;
      }
      return emptyChangeSet(this.revision);
    }

    const beforePack = cloneEngineState(this.state);
    const shouldPack = options.pack ?? record.pack;
    if (shouldPack) {
      packNodes(this.state.nodes, {
        float: this.state.float,
        originalRects: createRectMap(record.snapshot.nodes),
      });
      synchronizeResponsiveCaches(beforePack, this.state);
    }

    this.batch = undefined;
    if (!this.fitsMaximumRows(record.snapshot, this.state, false)) {
      const failed = cloneEngineState(this.state);
      this.state = cloneEngineState(record.snapshot);
      const diagnostic = createDiagnostic(
        'max-rows',
        'The dashboard grid batch exceeds the configured maximum row count.',
        { severity: 'error' },
      );
      this.report(diagnostic);
      this.publishCurrent();
      return createChangeSet(failed, this.state, this.revision, [diagnostic]);
    }

    this.publishCurrent();
    return createChangeSet(
      record.snapshot,
      this.state,
      this.revision,
    );
  }

  public rollbackBatch(): DashboardGridEngineChangeSet {
    const record = this.batch;
    if (record === undefined) {
      const diagnostic = createDiagnostic(
        'nested-transaction',
        'Cannot roll back a dashboard grid batch that has not begun.',
      );
      this.report(diagnostic);
      return emptyChangeSet(this.revision, [diagnostic]);
    }

    const current = cloneEngineState(this.state);
    this.state = cloneEngineState(record.snapshot);
    this.batch = undefined;
    this.publishCurrent();
    return createChangeSet(current, this.state, this.revision);
  }

  public beginInteraction(
    id: string,
    context: DashboardGridInteractionContext,
  ): void {
    if (this.interaction !== undefined) {
      this.report(
        createDiagnostic(
          'nested-transaction',
          'A dashboard grid interaction is already active.',
          { itemId: id },
        ),
      );
      return;
    }

    const node = findNodeById(this.state.nodes, id);
    if (node === undefined) {
      this.report(
        createDiagnostic(
          'missing-item',
          `Dashboard grid item "${id}" was not found.`,
          { severity: 'error', itemId: id },
        ),
      );
      return;
    }

    const originPixelRect =
      context.originPixelRect ??
      (context.metrics === undefined
        ? undefined
        : toPixelRect(node, context.metrics));
    const normalizedContext: DashboardGridInteractionContext = Object.freeze({
      ...context,
      ...(originPixelRect === undefined ? {} : { originPixelRect }),
    });
    this.interaction = {
      activeKey: node.key,
      context: normalizedContext,
      snapshot: cloneEngineState(this.state),
      originalRects: createRectMap(this.state.nodes),
      targetRects: this.createTargetRects(normalizedContext),
    };
  }

  public move(
    id: string,
    proposal: DashboardGridMoveProposal,
  ): DashboardGridMoveResult {
    const current = findNodeById(this.state.nodes, id);
    if (current === undefined) {
      return this.rejectMove(
        'missing-item',
        createDiagnostic(
          'missing-item',
          `Dashboard grid item "${id}" was not found.`,
          { severity: 'error', itemId: id },
        ),
      );
    }

    const candidate = normalizeMoveProposal(current, proposal, {
      columns: this.state.columns,
      ...(this.state.maxRows === undefined
        ? {}
        : { maxRows: this.state.maxRows }),
    });
    const resizing =
      proposal.resizing === true ||
      candidate.w !== current.w ||
      candidate.h !== current.h;
    const moving = candidate.x !== current.x || candidate.y !== current.y;
    if (
      proposal.input !== 'api' &&
      proposal.input !== 'load' &&
      proposal.input !== 'responsive'
    ) {
      if (
        (resizing && (!current.resizable || this.state.resizeDisabled)) ||
        (moving && !resizing && !current.movable)
      ) {
        return this.rejectMove(
          'constraint',
          createDiagnostic(
            'rotation-not-allowed',
            `Dashboard grid item "${id}" does not allow this interaction.`,
            { itemId: id },
          ),
        );
      }
    }

    if (!proposal.forceCollision && sameInternalRect(current, candidate)) {
      return frozenMoveResult({
        status: 'unchanged',
        item: nodeToResolvedItem(current),
      });
    }

    const activeInteraction =
      this.interaction?.activeKey === current.key ? this.interaction : undefined;
    const collisions = allCollisions(
      this.state.nodes,
      current.key,
      candidate,
    );
    let preferredCollisionKey: OpaqueNodeKey | undefined;
    if (collisions.length > 0) {
      if (
        proposal.input === 'pointer' &&
        activeInteraction !== undefined &&
        !proposal.forceCollision &&
        proposal.pixelRect !== undefined &&
        activeInteraction.context.originPixelRect !== undefined
      ) {
        const selected = selectPointerCollision(
          collisions,
          activeInteraction.targetRects,
          activeInteraction.context.originPixelRect,
          proposal.pixelRect,
        );
        if (selected === undefined) {
          return frozenMoveResult({
            status: 'deferred',
            reason: 'coverage-threshold',
          });
        }

        preferredCollisionKey = selected.node.key;
        if (activeInteraction.context.allowNesting) {
          const target = activeInteraction.targetRects.get(selected.node.key);
          if (target !== undefined) {
            const coverage = nestingCoverage(proposal.pixelRect, target);
            if (coverage > 0.8) {
              return frozenMoveResult({
                status: 'nest-requested',
                targetId: selected.node.id,
                coverage,
              });
            }
          }
        }
      } else {
        preferredCollisionKey = collisions[0].key;
      }
    }

    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    const active = findNodeById(work.nodes, id);
    if (active === undefined) {
      return this.rejectMove('missing-item');
    }

    const effectiveFloat = this.batch === undefined ? work.float : true;
    const repair = repairCollisions(work.nodes, active.key, candidate, {
      columns: work.columns,
      float: effectiveFloat,
      loading: proposal.input === 'load',
      moving,
      movingDown: candidate.y > current.y,
      allowSwap:
        proposal.input === 'pointer' &&
        activeInteraction?.context.kind === 'drag' &&
        activeInteraction.context.source === 'internal' &&
        !effectiveFloat &&
        !resizing,
      ...(preferredCollisionKey === undefined
        ? {}
        : { preferredCollisionKey }),
      rootKey: active.key,
      budget: Math.max(1, work.nodes.length * 2 + 1),
    });
    if (repair.status === 'collision-cycle') {
      return this.rejectMove(
        'collision-cycle',
        createDiagnostic(
          'collision-cycle',
          `Moving item "${id}" exceeded the collision repair budget.`,
          { severity: 'error', itemId: id },
        ),
      );
    }

    const shouldPack = proposal.pack ?? this.batch === undefined;
    if (shouldPack) {
      packNodes(work.nodes, {
        float: work.float,
        originalRects:
          activeInteraction?.originalRects ?? createRectMap(before.nodes),
      });
    }

    if (!this.fitsMaximumRows(before, work, false) || hasOverlaps(work.nodes)) {
      return this.rejectMove(
        'max-rows',
        createDiagnostic(
          'max-rows',
          `Moving item "${id}" exceeds the configured maximum rows.`,
          { severity: 'error', itemId: id },
        ),
      );
    }

    synchronizeResponsiveCaches(before, work);
    if (samePublicState(before, work)) {
      this.state = work;
      return frozenMoveResult({
        status: 'unchanged',
        item: nodeToResolvedItem(findNodeById(work.nodes, id) ?? current),
      });
    }

    this.state = work;
    this.publishAfterMutation();
    this.refreshInteractionTargetRects();
    const changeSet = createChangeSet(before, work, this.revision);
    return frozenMoveResult({
      status: 'accepted',
      item: nodeToResolvedItem(findNodeById(work.nodes, id) ?? active),
      affected: changeSet.changed,
    });
  }

  public rotate(
    id: string,
    options: Readonly<{
      pivot?: Readonly<{ column: number; row: number }>;
      input: 'pointer' | 'keyboard' | 'api';
    }>,
  ): DashboardGridMoveResult {
    const current = findNodeById(this.state.nodes, id);
    if (current === undefined) {
      return this.rejectMove('missing-item');
    }

    const fixedWidth =
      current.minW !== undefined && current.minW === current.maxW;
    const fixedHeight =
      current.minH !== undefined && current.minH === current.maxH;
    if (
      current.w === current.h ||
      current.locked ||
      !current.resizable ||
      this.state.resizeDisabled ||
      fixedWidth ||
      fixedHeight
    ) {
      return this.rejectMove(
        'constraint',
        createDiagnostic(
          'rotation-not-allowed',
          `Dashboard grid item "${id}" cannot be rotated.`,
          { itemId: id },
        ),
      );
    }

    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    const node = findNodeById(work.nodes, id);
    if (node === undefined) {
      return this.rejectMove('missing-item');
    }

    const oldMinW = node.minW;
    const oldMaxW = node.maxW;
    const oldMinH = node.minH;
    const oldMaxH = node.maxH;
    node.minW = oldMinH;
    node.maxW = oldMaxH;
    node.minH = oldMinW;
    node.maxH = oldMaxW;
    this.deleteUndefinedConstraints(node);

    let x = node.x;
    let y = node.y;
    if (options.pivot !== undefined) {
      const pivotX = options.pivot.column - node.x;
      const pivotY = options.pivot.row - node.y;
      x = node.x + pivotX - (node.h - (pivotY + 1));
      y = node.y + pivotY - pivotX;
    }

    const candidate = normalizeInternalBounds(
      { x, y, w: node.h, h: node.w },
      {
        columns: work.columns,
        ...(work.maxRows === undefined ? {} : { maxRows: work.maxRows }),
        resizing: true,
      },
    );
    if (
      (node.minW !== undefined && candidate.w < node.minW) ||
      (node.minH !== undefined && candidate.h < node.minH)
    ) {
      return this.rejectMove('constraint');
    }

    const repair = repairCollisions(work.nodes, node.key, candidate, {
      columns: work.columns,
      float: this.batch === undefined ? work.float : true,
      loading: false,
      moving: false,
      movingDown: false,
      allowSwap: false,
      rootKey: node.key,
      budget: Math.max(1, work.nodes.length * 2 + 1),
    });
    if (repair.status === 'collision-cycle') {
      return this.rejectMove(
        'collision-cycle',
        createDiagnostic(
          'collision-cycle',
          `Rotating item "${id}" exceeded the collision repair budget.`,
          { severity: 'error', itemId: id },
        ),
      );
    }

    if (this.batch === undefined) {
      packNodes(work.nodes, {
        float: work.float,
        originalRects:
          this.interaction?.originalRects ?? createRectMap(before.nodes),
      });
    }
    if (!this.fitsMaximumRows(before, work, false) || hasOverlaps(work.nodes)) {
      return this.rejectMove('max-rows');
    }

    synchronizeResponsiveCaches(before, work);
    if (samePublicState(before, work)) {
      this.state = work;
      return frozenMoveResult({
        status: 'unchanged',
        item: nodeToResolvedItem(findNodeById(work.nodes, id) ?? node),
      });
    }

    this.state = work;
    this.publishAfterMutation();
    this.refreshInteractionTargetRects();
    const changeSet = createChangeSet(before, work, this.revision);
    return frozenMoveResult({
      status: 'accepted',
      item: nodeToResolvedItem(findNodeById(work.nodes, id) ?? node),
      affected: changeSet.changed,
    });
  }

  public commitInteraction(): DashboardGridEngineChangeSet {
    const record = this.interaction;
    if (record === undefined) {
      return emptyChangeSet(this.revision);
    }

    const beforePack = cloneEngineState(this.state);
    if (this.batch === undefined) {
      packNodes(this.state.nodes, {
        float: this.state.float,
        originalRects: record.originalRects,
      });
      synchronizeResponsiveCaches(beforePack, this.state);
    }
    this.interaction = undefined;
    this.publishCurrent();
    return createChangeSet(record.snapshot, this.state, this.revision);
  }

  public cancelInteraction(): DashboardGridEngineChangeSet {
    const record = this.interaction;
    if (record === undefined) {
      return emptyChangeSet(this.revision);
    }

    const current = cloneEngineState(this.state);
    this.state = cloneEngineState(record.snapshot);
    this.interaction = undefined;
    this.publishCurrent();
    return createChangeSet(current, this.state, this.revision);
  }

  public add(item: DashboardGridLayoutItemInput): DashboardGridMutationResult {
    if (findNodeById(this.state.nodes, item.id) !== undefined) {
      return this.rejectMutation(
        'duplicate-id',
        createDiagnostic(
          'duplicate-id',
          `Dashboard grid item ID "${item.id}" already exists.`,
          { severity: 'error', itemId: item.id },
        ),
      );
    }

    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    let normalized;
    try {
      normalized = normalizeItem(item, {
        columns: work.columns,
        ...(work.maxRows === undefined ? {} : { maxRows: work.maxRows }),
        key: asOpaqueNodeKey(work.nextKey++),
        sequence: work.nextSequence++,
      });
    } catch (error) {
      return this.rejectNormalization(error);
    }

    const node = normalized.node;
    cacheAuthoredLayout(
      work,
      node.key,
      normalized.authoredLayout,
      normalized.sourceColumns,
    );
    let autoPlaced = false;
    if (node.auto) {
      const empty = findFirstEmptyPosition(node, work.nodes, work.columns, {
        ...(work.maxRows === undefined ? {} : { maxRows: work.maxRows }),
      });
      if (empty === undefined) {
        return this.rejectMutation('max-rows');
      }
      node.x = empty.x;
      node.y = empty.y;
      delete node.auto;
      autoPlaced = true;
    }

    work.nodes.push(node);
    if (!autoPlaced) {
      const repair = repairCollisions(work.nodes, node.key, node, {
        columns: work.columns,
        float: this.batch === undefined ? work.float : true,
        loading: false,
        moving: false,
        movingDown: false,
        allowSwap: false,
        rootKey: node.key,
        budget: Math.max(1, work.nodes.length * 2 + 1),
      });
      if (repair.status === 'collision-cycle') {
        return this.rejectMutation(
          'collision-cycle',
          createDiagnostic(
            'collision-cycle',
            `Adding item "${item.id}" exceeded the collision repair budget.`,
            { severity: 'error', itemId: item.id },
          ),
        );
      }
    }

    if (this.batch === undefined) {
      packNodes(work.nodes, { float: work.float });
    }
    if (!this.fitsMaximumRows(before, work, true) || hasOverlaps(work.nodes)) {
      return this.rejectMutation('max-rows');
    }
    synchronizeResponsiveCaches(before, work);
    return this.acceptMutation(
      before,
      work,
      normalized.diagnostics,
      item.id,
    );
  }

  public remove(id: string): DashboardGridMutationResult {
    const existing = findNodeById(this.state.nodes, id);
    if (existing === undefined) {
      return this.rejectMutation('missing-item');
    }

    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    work.nodes = work.nodes.filter(node => node.key !== existing.key);
    removeNodeFromAllLayouts(work, existing.key);
    if (this.batch === undefined) {
      packNodes(work.nodes, { float: work.float });
    }
    synchronizeResponsiveCaches(before, work);
    return this.acceptMutation(before, work);
  }

  public removeAll(): DashboardGridMutationResult {
    if (this.state.nodes.length === 0 && this.state.layouts.size === 0) {
      return frozenMutationResult({
        status: 'unchanged',
        snapshot: this.snapshot,
        changeSet: emptyChangeSet(this.revision),
      });
    }

    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    work.nodes = [];
    clearResponsiveLayouts(work);
    return this.acceptMutation(before, work);
  }

  public update(
    id: string,
    patch: DashboardGridLayoutItemPatch,
  ): DashboardGridMutationResult {
    const existing = findNodeById(this.state.nodes, id);
    if (existing === undefined) {
      return this.rejectMutation('missing-item');
    }

    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    const target = findNodeById(work.nodes, id);
    if (target === undefined) {
      return this.rejectMutation('missing-item');
    }

    let normalized;
    try {
      normalized = normalizePatchedNode(target, patch, {
        columns: work.columns,
        ...(work.maxRows === undefined ? {} : { maxRows: work.maxRows }),
      });
    } catch (error) {
      return this.rejectNormalization(error);
    }

    const index = work.nodes.findIndex(node => node.key === target.key);
    work.nodes[index] = normalized.node;
    const node = work.nodes[index];
    let autoPlaced = false;
    if (node.auto) {
      const otherNodes = work.nodes.filter(other => other.key !== node.key);
      const empty = findFirstEmptyPosition(node, otherNodes, work.columns, {
        ...(work.maxRows === undefined ? {} : { maxRows: work.maxRows }),
      });
      if (empty === undefined) {
        return this.rejectMutation('max-rows');
      }
      node.x = empty.x;
      node.y = empty.y;
      delete node.auto;
      autoPlaced = true;
    }

    if (!autoPlaced) {
      const repair = repairCollisions(work.nodes, node.key, node, {
        columns: work.columns,
        float: this.batch === undefined ? work.float : true,
        loading: false,
        moving: node.x !== target.x || node.y !== target.y,
        movingDown: node.y > target.y,
        allowSwap: false,
        rootKey: node.key,
        budget: Math.max(1, work.nodes.length * 2 + 1),
      });
      if (repair.status === 'collision-cycle') {
        return this.rejectMutation('collision-cycle');
      }
    }

    if (this.batch === undefined) {
      packNodes(work.nodes, { float: work.float });
    }
    if (!this.fitsMaximumRows(before, work, false) || hasOverlaps(work.nodes)) {
      return this.rejectMutation('max-rows');
    }
    synchronizeResponsiveCaches(before, work);
    return this.acceptMutation(before, work, normalized.diagnostics, id);
  }

  public load(
    items: readonly DashboardGridLayoutItemInput[],
    options: DashboardGridLoadOptions = {},
  ): DashboardGridMutationResult {
    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    const loaded = applyLoad(work, items, options, {
      deferPack: this.batch !== undefined,
      floatOverride: this.batch === undefined ? work.float : true,
    });
    if (!loaded.accepted) {
      const diagnostic = loaded.diagnostics[0];
      return this.rejectMutation(
        diagnostic === undefined
          ? 'invalid-input'
          : rejectionReasonForDiagnostic(diagnostic),
        diagnostic,
      );
    }
    if (!this.fitsMaximumRows(before, work, true) || hasOverlaps(work.nodes)) {
      return this.rejectMutation('max-rows');
    }
    return this.acceptMutation(before, work, loaded.diagnostics);
  }

  public compact(
    mode: 'compact' | 'list' = 'compact',
  ): DashboardGridMutationResult {
    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    work.nodes = compactNodes(
      work.nodes,
      work.columns,
      mode,
      work.maxRows,
    );
    if (!this.fitsMaximumRows(before, work, true) || hasOverlaps(work.nodes)) {
      return this.rejectMutation('max-rows');
    }
    synchronizeResponsiveCaches(before, work);
    return this.acceptMutation(before, work);
  }

  public setColumns(
    columns: number,
    layout: DashboardGridColumnLayout = 'moveScale',
  ): DashboardGridMutationResult {
    let normalizedColumns: number;
    try {
      normalizedColumns = normalizeColumns(columns);
    } catch (error) {
      return this.rejectNormalization(error);
    }

    const before = cloneEngineState(this.state);
    const work = cloneEngineState(this.state);
    const changed = applyColumnChange(work, normalizedColumns, layout);
    if (!changed.accepted) {
      const diagnostic = changed.diagnostics[0];
      return this.rejectMutation(
        diagnostic === undefined
          ? 'invalid-input'
          : rejectionReasonForDiagnostic(diagnostic),
        diagnostic,
      );
    }
    return this.acceptMutation(before, work, changed.diagnostics);
  }

  public save(
    options: DashboardGridEngineSaveOptions = {},
  ): DashboardGridEngineSerializedState {
    return serializeEngineState(this.state, options);
  }

  public clone(): DashboardGridEngine {
    const clone = new DefaultDashboardGridEngine({
      development: this.reporter.development,
      onDiagnostic: this.reporter.onDiagnostic,
      onError: this.reporter.onError,
    });
    clone.state = cloneEngineState(this.state);
    clone.visibleState = cloneEngineState(this.state);
    clone.revision = this.revision;
    clone.snapshot = createSnapshot(clone.state, clone.revision);
    return clone;
  }

  private acceptMutation(
    before: EngineState,
    work: EngineState,
    diagnostics: readonly DashboardGridEngineDiagnostic[] = [],
    itemId?: string,
  ): DashboardGridMutationResult {
    this.reportAll(diagnostics);
    const changed = !samePublicState(before, work);
    this.state = work;
    if (changed) {
      this.publishAfterMutation();
    }

    const changeSet = createChangeSet(
      before,
      work,
      this.revision,
      diagnostics,
    );
    const item =
      itemId === undefined
        ? undefined
        : findNodeById(work.nodes, itemId);
    return frozenMutationResult({
      status: changed ? 'accepted' : 'unchanged',
      snapshot: this.snapshot,
      changeSet,
      ...(item === undefined ? {} : { item: nodeToResolvedItem(item) }),
    });
  }

  private rejectMutation(
    reason: DashboardGridMutationRejectionReason,
    diagnostic?: DashboardGridEngineDiagnostic,
  ): DashboardGridMutationResult {
    const resolvedDiagnostic =
      diagnostic ?? this.createRejectionDiagnostic(reason);
    this.report(resolvedDiagnostic);
    return frozenMutationResult({
      status: 'rejected',
      reason,
      snapshot: this.snapshot,
      changeSet: emptyChangeSet(
        this.revision,
        [resolvedDiagnostic],
      ),
      diagnostic: resolvedDiagnostic,
    });
  }

  private rejectNormalization(error: unknown): DashboardGridMutationResult {
    const diagnostic =
      error instanceof DashboardGridNormalizationError
        ? createDiagnostic(
            error.reason,
            error.message,
            { severity: 'error' },
          )
        : createDiagnostic(
            'invalid-id',
            error instanceof Error ? error.message : 'Invalid dashboard grid input.',
            { severity: 'error' },
          );
    return this.rejectMutation('invalid-input', diagnostic);
  }

  private rejectMove(
    reason:
      | 'bounds'
      | 'max-rows'
      | 'constraint'
      | 'collision-cycle'
      | 'missing-item',
    diagnostic?: DashboardGridEngineDiagnostic,
  ): DashboardGridMoveResult {
    const resolvedDiagnostic =
      diagnostic ?? this.createMoveRejectionDiagnostic(reason);
    this.report(resolvedDiagnostic);
    return frozenMoveResult({
      status: 'rejected',
      reason,
      diagnostic: resolvedDiagnostic,
    });
  }

  private report(
    diagnostic: DashboardGridEngineDiagnostic,
    cause?: unknown,
  ): void {
    reportDiagnostic(this.reporter, diagnostic, cause);
  }

  private reportAll(
    diagnostics: readonly DashboardGridEngineDiagnostic[],
  ): void {
    diagnostics.forEach(diagnostic => this.report(diagnostic));
  }

  private publishAfterMutation(): void {
    if (this.batch !== undefined && this.interaction === undefined) {
      return;
    }
    this.publishCurrent();
    if (this.batch !== undefined) {
      this.batch.published = true;
    }
  }

  private publishCurrent(): void {
    if (samePublicState(this.visibleState, this.state)) {
      return;
    }

    this.revision++;
    this.snapshot = createSnapshot(this.state, this.revision);
    this.visibleState = cloneEngineState(this.state);
    [...this.listeners].forEach(listener => listener());
  }

  private fitsMaximumRows(
    before: EngineState,
    after: EngineState,
    strict: boolean,
  ): boolean {
    if (after.maxRows === undefined) {
      return true;
    }

    const limit = strict
      ? after.maxRows
      : Math.max(after.maxRows, getInternalRow(before.nodes));
    return getInternalRow(after.nodes) <= limit;
  }

  private createTargetRects(
    context: DashboardGridInteractionContext,
  ): Map<OpaqueNodeKey, ReturnType<typeof toPixelRect>> {
    const result = new Map<OpaqueNodeKey, ReturnType<typeof toPixelRect>>();
    if (context.metrics === undefined) {
      return result;
    }
    this.state.nodes.forEach(node =>
      result.set(node.key, toPixelRect(node, context.metrics!)),
    );
    return result;
  }

  private refreshInteractionTargetRects(): void {
    if (this.interaction !== undefined) {
      this.interaction.targetRects = this.createTargetRects(
        this.interaction.context,
      );
    }
  }

  private deleteUndefinedConstraints(node: InternalNode): void {
    if (node.minW === undefined) {
      delete node.minW;
    }
    if (node.maxW === undefined) {
      delete node.maxW;
    }
    if (node.minH === undefined) {
      delete node.minH;
    }
    if (node.maxH === undefined) {
      delete node.maxH;
    }
  }

  private createRejectionDiagnostic(
    reason: DashboardGridMutationRejectionReason,
  ): DashboardGridEngineDiagnostic {
    const code =
      reason === 'invalid-input'
        ? 'invalid-id'
        : reason;
    return createDiagnostic(
      code,
      `The dashboard grid mutation was rejected because of ${reason}.`,
      { severity: 'error' },
    );
  }

  private createMoveRejectionDiagnostic(
    reason:
      | 'bounds'
      | 'max-rows'
      | 'constraint'
      | 'collision-cycle'
      | 'missing-item',
  ): DashboardGridEngineDiagnostic {
    return createDiagnostic(
      reason,
      `The dashboard grid move was rejected because of ${reason}.`,
      { severity: 'error' },
    );
  }
}

export const createDashboardGridEngine = (
  options: DashboardGridEngineOptions = {},
): DashboardGridEngine => new DefaultDashboardGridEngine(options);
