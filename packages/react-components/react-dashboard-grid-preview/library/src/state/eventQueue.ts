import type {
  DashboardGridInteractionEventQueue,
  DashboardGridInteractionIntent,
} from '../interaction/types';

export type DashboardGridLayoutChangeIntent = {
  type: 'layout-change';
  sourceGridId?: string;
  targetGridId?: string;
  changes: unknown;
  nativeEvent?: Event;
};

export type DashboardGridQueuedIntent = DashboardGridInteractionIntent | DashboardGridLayoutChangeIntent;

export type DashboardGridEventQueue = DashboardGridInteractionEventQueue & {
  enqueue(intent: DashboardGridQueuedIntent): void;
  flush(): void;
  dispose(): void;
};

const getPriority = (intent: DashboardGridQueuedIntent): number => {
  switch (intent.type) {
    case 'start':
      return 0;
    case 'update':
    case 'rotate':
    case 'target':
      return 1;
    case 'stop':
    case 'cancel':
    case 'rejected':
      return 2;
    case 'layout-change':
      return 3;
  }
};

const getCoalesceKey = (intent: DashboardGridQueuedIntent): string | undefined => {
  if (intent.type !== 'update' && intent.type !== 'target') {
    return undefined;
  }

  return [
    intent.type,
    intent.operation,
    intent.sourceGridId,
    intent.targetGridId,
    intent.itemId,
    'sourceId' in intent ? intent.sourceId : undefined,
  ].join(':');
};

export const createDashboardGridEventQueue = (
  dispatch: (intent: DashboardGridQueuedIntent) => void,
): DashboardGridEventQueue => {
  let queue: DashboardGridQueuedIntent[] = [];
  let scheduled = false;
  let disposed = false;

  const flush = () => {
    if (disposed || queue.length === 0) {
      scheduled = false;
      return;
    }

    const current = queue;
    queue = [];
    scheduled = false;

    current
      .map((intent, index) => ({ intent, index }))
      .sort((left, right) => getPriority(left.intent) - getPriority(right.intent) || left.index - right.index)
      .forEach(({ intent }) => dispatch(intent));
  };

  return {
    enqueue(intent) {
      if (disposed) {
        return;
      }

      if (intent.type === 'start') {
        flush();
        dispatch(intent);
        return;
      }

      const coalesceKey = getCoalesceKey(intent);
      if (coalesceKey) {
        const previousIndex = queue.findIndex(candidate => getCoalesceKey(candidate) === coalesceKey);
        if (previousIndex !== -1) {
          queue[previousIndex] = intent;
        } else {
          queue.push(intent);
        }
      } else {
        queue.push(intent);
      }

      if (!scheduled) {
        scheduled = true;
        Promise.resolve().then(flush);
      }
    },

    flush,

    dispose() {
      disposed = true;
      queue = [];
      scheduled = false;
    },
  };
};
