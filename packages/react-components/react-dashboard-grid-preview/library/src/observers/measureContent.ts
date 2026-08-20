export type DashboardGridContentMeasurement =
  | {
      status: 'measured';
      blockSize: number;
    }
  | {
      status: 'empty';
      blockSize: 0;
    }
  | {
      status: 'text-only';
      blockSize: 0;
    };

export const measureDashboardGridContent = (element: HTMLElement): DashboardGridContentMeasurement => {
  if (element.childElementCount === 0) {
    return element.textContent?.trim()
      ? { status: 'text-only', blockSize: 0 }
      : { status: 'empty', blockSize: 0 };
  }

  const rect = element.getBoundingClientRect();
  const blockSize = Math.max(element.scrollHeight, rect.height);

  return Number.isFinite(blockSize) && blockSize > 0
    ? { status: 'measured', blockSize }
    : { status: 'empty', blockSize: 0 };
};

export const getDashboardGridContentRowSpan = (
  blockSize: number,
  rowHeight: number,
  maximum?: number,
): number => {
  const safeRowHeight = Number.isFinite(rowHeight) && rowHeight > 0 ? rowHeight : 1;
  const rowSpan = Math.max(1, Math.ceil(blockSize / safeRowHeight));
  return maximum === undefined ? rowSpan : Math.min(rowSpan, Math.max(1, maximum));
};
