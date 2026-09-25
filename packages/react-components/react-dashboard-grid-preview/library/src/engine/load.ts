import type {
  DashboardGridEngineDiagnostic,
  DashboardGridLayoutItemInput,
  DashboardGridLoadOptions,
} from './DashboardGridEngine.types';
import { repairCollisions } from './collision';
import { createDiagnostic } from './diagnostics';
import type { EngineState, NormalizedItem } from './internalTypes';
import { asOpaqueNodeKey } from './internalTypes';
import { DashboardGridNormalizationError, estimateSourceColumns, normalizeColumns, normalizeItem } from './normalize';
import { packNodes } from './packing';
import { findFirstEmptyPosition } from './placement';
import { cacheAuthoredLayout, removeNodeFromAllLayouts, synchronizeResponsiveCaches } from './responsiveLayouts';
import { cloneEngineState, getInternalRow, sortNodesStable } from './state';

type PlannedItem = {
  normalized: NormalizedItem;
  inputIndex: number;
  matched: boolean;
};

const invalidInputDiagnostic = (error: unknown): DashboardGridEngineDiagnostic =>
  createDiagnostic(
    error instanceof DashboardGridNormalizationError && error.reason === 'invalid-id'
      ? 'invalid-id'
      : 'invalid-columns',
    error instanceof Error ? error.message : 'Invalid dashboard grid load input.',
    { severity: 'error' },
  );

export const applyLoad = (
  state: EngineState,
  inputs: readonly DashboardGridLayoutItemInput[],
  options: DashboardGridLoadOptions = {},
  internalOptions: {
    deferPack?: boolean;
    floatOverride?: boolean;
  } = {},
): Readonly<{
  accepted: boolean;
  diagnostics: readonly DashboardGridEngineDiagnostic[];
}> => {
  const before = cloneEngineState(state);
  const addMissing = options.addMissing !== false;
  const removeMissing = options.removeMissing !== false;
  const inputCopies = inputs.map(input => ({ ...input }));
  const existingById = new Map(state.nodes.map(node => [node.id, node]));
  const seenIds = new Set<string>();
  let nextKey = state.nextKey;
  let nextSequence = state.nextSequence;
  let sourceColumns: number;

  try {
    sourceColumns =
      options.sourceColumns === undefined
        ? inputCopies.reduce(
            (columns, input) => Math.max(columns, estimateSourceColumns(input, state.columns)),
            state.referenceColumns,
          )
        : normalizeColumns(options.sourceColumns);
  } catch (error) {
    return {
      accepted: false,
      diagnostics: Object.freeze([invalidInputDiagnostic(error)]),
    };
  }

  const planned: PlannedItem[] = [];
  try {
    inputCopies.forEach((input, inputIndex) => {
      if (seenIds.has(input.id)) {
        throw new DashboardGridNormalizationError(
          'invalid-id',
          `Duplicate dashboard grid item ID "${input.id}" in load input.`,
        );
      }
      seenIds.add(input.id);

      const existing = existingById.get(input.id);
      const key = existing?.key ?? asOpaqueNodeKey(nextKey++);
      const sequence = existing?.sequence ?? nextSequence++;
      planned.push({
        normalized: normalizeItem(input, {
          columns: state.columns,
          ...(state.maxRows === undefined ? {} : { maxRows: state.maxRows }),
          key,
          sequence,
          sourceColumns,
        }),
        inputIndex,
        matched: existing !== undefined,
      });
    });
  } catch (error) {
    const diagnostic =
      error instanceof DashboardGridNormalizationError && error.message.startsWith('Duplicate')
        ? createDiagnostic('duplicate-id', error.message, { severity: 'error' })
        : invalidInputDiagnostic(error);
    return {
      accepted: false,
      diagnostics: Object.freeze([diagnostic]),
    };
  }

  planned.sort((a, b) => {
    const aAuto = a.normalized.node.auto === true;
    const bAuto = b.normalized.node.auto === true;
    if (aAuto !== bAuto) {
      return aAuto ? 1 : -1;
    }
    if (aAuto) {
      return a.inputIndex - b.inputIndex;
    }
    return (
      a.normalized.node.y - b.normalized.node.y ||
      a.normalized.node.x - b.normalized.node.x ||
      a.inputIndex - b.inputIndex
    );
  });

  const matchedIds = new Set(planned.filter(item => item.matched).map(item => item.normalized.node.id));
  const inputIds = new Set(planned.map(item => item.normalized.node.id));
  const removedKeys = state.nodes.filter(node => removeMissing && !inputIds.has(node.id)).map(node => node.key);
  state.nodes = state.nodes.filter(node => {
    if (matchedIds.has(node.id)) {
      return false;
    }
    return !removeMissing || inputIds.has(node.id);
  });

  for (const item of planned) {
    if (!item.matched && !addMissing) {
      continue;
    }

    const node = item.normalized.node;
    cacheAuthoredLayout(state, node.key, item.normalized.authoredLayout, item.normalized.sourceColumns);

    let autoPlaced = false;
    if (node.auto) {
      const empty = findFirstEmptyPosition(node, state.nodes, state.columns, {
        ...(state.maxRows === undefined ? {} : { maxRows: state.maxRows }),
      });
      if (empty === undefined) {
        return {
          accepted: false,
          diagnostics: Object.freeze([
            createDiagnostic('max-rows', `Item "${node.id}" cannot be placed within the configured maximum rows.`, {
              severity: 'error',
              itemId: node.id,
            }),
          ]),
        };
      }
      node.x = empty.x;
      node.y = empty.y;
      delete node.auto;
      autoPlaced = true;
    }

    state.nodes.push(node);
    if (!autoPlaced) {
      const repair = repairCollisions(state.nodes, node.key, node, {
        columns: state.columns,
        float: internalOptions.floatOverride ?? state.float,
        loading: true,
        moving: false,
        movingDown: false,
        allowSwap: false,
        rootKey: node.key,
        budget: Math.max(1, state.nodes.length * 2 + 1),
      });
      if (repair.status === 'collision-cycle') {
        return {
          accepted: false,
          diagnostics: Object.freeze([
            createDiagnostic('collision-cycle', `Loading item "${node.id}" exceeded the collision repair budget.`, {
              severity: 'error',
              itemId: node.id,
            }),
          ]),
        };
      }
    }
  }

  state.nextKey = nextKey;
  state.nextSequence = nextSequence;
  removedKeys.forEach(key => removeNodeFromAllLayouts(state, key));
  if (!internalOptions.deferPack) {
    packNodes(state.nodes, { float: state.float });
  }
  state.nodes = sortNodesStable(state.nodes);

  if (state.maxRows !== undefined && getInternalRow(state.nodes) > state.maxRows) {
    return {
      accepted: false,
      diagnostics: Object.freeze([
        createDiagnostic('max-rows', 'The loaded layout exceeds the configured maximum row count.', {
          severity: 'error',
        }),
      ]),
    };
  }

  synchronizeResponsiveCaches(before, state);
  const diagnostics = planned.flatMap(item => item.normalized.diagnostics);
  return {
    accepted: true,
    diagnostics: Object.freeze(diagnostics),
  };
};
