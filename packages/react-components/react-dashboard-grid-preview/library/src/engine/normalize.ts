import type {
  DashboardGridEngineDiagnostic,
  DashboardGridLayoutItemInput,
  DashboardGridLayoutItemPatch,
  DashboardGridMoveProposal,
} from './DashboardGridEngine.types';
import { createDiagnostic } from './diagnostics';
import type {
  CachedLayoutNode,
  InternalNode,
  InternalRect,
  NormalizedItem,
  OpaqueNodeKey,
} from './internalTypes';

export class DashboardGridNormalizationError extends Error {
  public constructor(
    public readonly reason: 'invalid-id' | 'invalid-columns',
    message: string,
  ) {
    super(message);
    this.name = 'DashboardGridNormalizationError';
  }
}

const hasOwn = (value: object, property: string): boolean =>
  Object.prototype.hasOwnProperty.call(value, property);

const finiteNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
};

const integer = (value: unknown): number | undefined => {
  const parsed = finiteNumber(value);
  return parsed === undefined ? undefined : Math.trunc(parsed);
};

const positiveConstraint = (value: unknown): number | undefined => {
  const parsed = integer(value);
  return parsed !== undefined && parsed > 0 ? parsed : undefined;
};

const span = (value: unknown): number => {
  const parsed = integer(value);
  return parsed !== undefined && parsed > 0 ? parsed : 1;
};

export const normalizeColumns = (value: unknown): number => {
  const parsed = integer(value);
  if (parsed === undefined || parsed < 1) {
    throw new DashboardGridNormalizationError(
      'invalid-columns',
      'Dashboard grid columns must be a positive finite integer.',
    );
  }

  return parsed;
};

export const normalizeMaxRows = (value: unknown): number | undefined => {
  const parsed = integer(value);
  return parsed !== undefined && parsed > 0 ? parsed : undefined;
};

const constrainSpan = (
  initial: number,
  min: number | undefined,
  max: number | undefined,
): number => {
  let result = initial;
  if (max !== undefined) {
    result = Math.min(result, max);
  }
  if (min !== undefined) {
    result = Math.max(result, min);
  }
  return result;
};

const contradictoryDiagnostic = (
  id: string,
  axis: 'column' | 'row',
  min: number | undefined,
  max: number | undefined,
): DashboardGridEngineDiagnostic | undefined => {
  if (min === undefined || max === undefined || min <= max) {
    return undefined;
  }

  return createDiagnostic(
    'contradictory-constraints',
    `${axis === 'column' ? 'Column' : 'Row'} minimum span exceeds its maximum; the minimum wins.`,
    {
      itemId: id,
      details: { min, max, axis },
    },
  );
};

export const normalizeInternalBounds = (
  rect: InternalRect,
  options: {
    columns: number;
    maxRows?: number;
    resizing: boolean;
  },
): InternalRect => {
  const result = { ...rect };
  result.w = Math.max(1, Math.min(options.columns, result.w));
  result.h = Math.max(
    1,
    options.maxRows === undefined
      ? result.h
      : Math.min(options.maxRows, result.h),
  );
  result.x = Math.max(0, result.x);
  result.y = Math.max(0, result.y);

  if (result.x >= options.columns) {
    result.x = options.columns - 1;
  }
  if (result.x + result.w > options.columns) {
    if (options.resizing) {
      result.w = Math.max(1, options.columns - result.x);
    } else {
      result.x = options.columns - result.w;
    }
  }

  if (options.maxRows !== undefined) {
    if (result.y >= options.maxRows) {
      result.y = options.maxRows - 1;
    }
    if (result.y + result.h > options.maxRows) {
      if (options.resizing) {
        result.h = Math.max(1, options.maxRows - result.y);
      } else {
        result.y = options.maxRows - result.h;
      }
    }
  }

  return result;
};

export const estimateSourceColumns = (
  input: DashboardGridLayoutItemInput,
  fallback = 12,
): number => {
  const record = input as Readonly<Record<string, unknown>>;
  const rawX = integer(record.column);
  const rawW = span(record.columnSpan);
  return Math.max(fallback, rawW, (rawX ?? 0) + rawW);
};

export const normalizeItem = (
  input: DashboardGridLayoutItemInput,
  options: {
    columns: number;
    maxRows?: number;
    key: OpaqueNodeKey;
    sequence: number;
    resizing?: boolean;
    sourceColumns?: number;
  },
): NormalizedItem => {
  const record = { ...input } as Readonly<Record<string, unknown>>;
  const id = record.id;
  if (typeof id !== 'string' || id.trim() === '') {
    throw new DashboardGridNormalizationError(
      'invalid-id',
      'Dashboard grid items require a non-empty string ID.',
    );
  }

  const suppliedX = integer(record.column);
  const suppliedY = integer(record.row);
  const auto =
    record.autoPosition === true ||
    suppliedX === undefined ||
    suppliedY === undefined;

  const minW = positiveConstraint(record.minColumnSpan);
  const maxW = positiveConstraint(record.maxColumnSpan);
  const minH = positiveConstraint(record.minRowSpan);
  const maxH = positiveConstraint(record.maxRowSpan);
  const diagnostics: DashboardGridEngineDiagnostic[] = [];
  const columnDiagnostic = contradictoryDiagnostic(id, 'column', minW, maxW);
  const rowDiagnostic = contradictoryDiagnostic(id, 'row', minH, maxH);
  if (columnDiagnostic !== undefined) {
    diagnostics.push(columnDiagnostic);
  }
  if (rowDiagnostic !== undefined) {
    diagnostics.push(rowDiagnostic);
  }

  const authoredW = constrainSpan(span(record.columnSpan), minW, maxW);
  const authoredH = constrainSpan(span(record.rowSpan), minH, maxH);
  const authoredX = Math.max(0, suppliedX ?? 0);
  const authoredY = Math.max(0, suppliedY ?? 0);
  const sourceColumns = Math.max(
    options.sourceColumns ?? 12,
    authoredW,
    authoredX + authoredW,
  );
  const authoredLayout: CachedLayoutNode = auto
    ? { w: Math.min(sourceColumns, authoredW), auto: true }
    : {
        x: Math.min(sourceColumns - 1, authoredX),
        y: authoredY,
        w: Math.min(sourceColumns, authoredW),
      };

  const bounded = normalizeInternalBounds(
    {
      x: auto ? 0 : authoredX,
      y: auto ? 0 : authoredY,
      w: authoredW,
      h: authoredH,
    },
    {
      columns: options.columns,
      ...(options.maxRows === undefined ? {} : { maxRows: options.maxRows }),
      resizing: options.resizing ?? false,
    },
  );

  const node: InternalNode = {
    ...bounded,
    key: options.key,
    sequence: options.sequence,
    id,
    ...(minW === undefined ? {} : { minW }),
    ...(maxW === undefined ? {} : { maxW }),
    ...(minH === undefined ? {} : { minH }),
    ...(maxH === undefined ? {} : { maxH }),
    movable: record.movable !== false,
    resizable: record.resizable !== false,
    locked: record.locked === true,
    ...(auto ? { auto: true as const } : {}),
  };

  return {
    node,
    authoredLayout,
    sourceColumns,
    diagnostics,
  };
};

const patchValue = <T>(
  patch: DashboardGridLayoutItemPatch,
  property: keyof DashboardGridLayoutItemPatch,
  fallback: T,
): unknown =>
  hasOwn(patch, property) && patch[property] !== undefined
    ? patch[property]
    : fallback;

export const normalizePatchedNode = (
  existing: InternalNode,
  patch: DashboardGridLayoutItemPatch,
  options: {
    columns: number;
    maxRows?: number;
  },
): NormalizedItem => {
  const autoPosition = hasOwn(patch, 'autoPosition')
    ? patch.autoPosition === true
    : false;
  const input: DashboardGridLayoutItemInput = {
    id: existing.id,
    column: patchValue(patch, 'column', existing.x) as number,
    row: patchValue(patch, 'row', existing.y) as number,
    columnSpan: patchValue(patch, 'columnSpan', existing.w) as number,
    rowSpan: patchValue(patch, 'rowSpan', existing.h) as number,
    minColumnSpan: patchValue(
      patch,
      'minColumnSpan',
      existing.minW,
    ) as number,
    maxColumnSpan: patchValue(
      patch,
      'maxColumnSpan',
      existing.maxW,
    ) as number,
    minRowSpan: patchValue(patch, 'minRowSpan', existing.minH) as number,
    maxRowSpan: patchValue(patch, 'maxRowSpan', existing.maxH) as number,
    autoPosition,
    movable: patchValue(patch, 'movable', existing.movable) as boolean,
    resizable: patchValue(
      patch,
      'resizable',
      existing.resizable,
    ) as boolean,
    locked: patchValue(patch, 'locked', existing.locked) as boolean,
  };

  return normalizeItem(input, {
    ...options,
    key: existing.key,
    sequence: existing.sequence,
    resizing:
      hasOwn(patch, 'columnSpan') || hasOwn(patch, 'rowSpan'),
    sourceColumns: Math.max(12, options.columns),
  });
};

export const normalizeMoveProposal = (
  node: InternalNode,
  proposal: DashboardGridMoveProposal,
  options: {
    columns: number;
    maxRows?: number;
  },
): InternalRect => {
  const proposalRecord = proposal as Readonly<Record<string, unknown>>;
  const requestedW = hasOwn(proposal, 'columnSpan')
    ? span(proposalRecord.columnSpan)
    : node.w;
  const requestedH = hasOwn(proposal, 'rowSpan')
    ? span(proposalRecord.rowSpan)
    : node.h;
  const requestedX = hasOwn(proposal, 'column')
    ? integer(proposalRecord.column) ?? 0
    : node.x;
  const requestedY = hasOwn(proposal, 'row')
    ? integer(proposalRecord.row) ?? 0
    : node.y;
  const constrainedW = constrainSpan(requestedW, node.minW, node.maxW);
  const constrainedH = constrainSpan(requestedH, node.minH, node.maxH);
  const resizing =
    proposal.resizing === true ||
    constrainedW !== node.w ||
    constrainedH !== node.h;

  return normalizeInternalBounds(
    {
      x: requestedX,
      y: requestedY,
      w: constrainedW,
      h: constrainedH,
    },
    {
      columns: options.columns,
      ...(options.maxRows === undefined ? {} : { maxRows: options.maxRows }),
      resizing,
    },
  );
};
