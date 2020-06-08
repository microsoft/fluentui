import * as React from 'react';

const COLORS = ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'];

export const getColor = (p: number): string => COLORS[Math.round((COLORS.length - 1) * p)];

export const panel = (): React.CSSProperties => ({
  background: 'rgba(245, 245, 245)',
  color: '#565554',

  fontSize: '12px',
  position: 'fixed',
  right: 0,
  bottom: 0,

  minWidth: 500,
  zIndex: 1000,
});

export const help = (): React.CSSProperties => ({
  background: '#fff',
  border: '1px solid #e5e5e4',
  borderBottom: 'none',
});

export const performanceFlags = (): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  borderBottom: 'none',
  flex: 1,
  padding: 10,
});

export const performanceFlag = (): React.CSSProperties => ({
  display: 'flex',
});

export const performanceFlagLabel = (): React.CSSProperties => ({
  marginLeft: 5,
});

export const tabs = (): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  display: 'flex',
});

export const tab = ({ active }: { active?: boolean }): React.CSSProperties => ({
  background: 'transparent',
  borderColor: 'transparent',
  borderRadius: 0,
  borderWidth: '0 0 2px 0',
  padding: '4px 8px',
  outline: 0,

  ...(active && { borderColor: '#052ffb' }),
});

export const table = (): React.CSSProperties => ({
  background: '#fff',
  border: '1px solid #e5e5e4',
  borderBottom: 'none',
  borderCollapse: 'collapse',
  width: '100%',
});

export const tableCell = ({
  canSort,
  percentageRatio,
}: {
  canSort?: boolean;
  percentageRatio?: number;
}): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  padding: 2,
  textAlign: 'left',

  ...(canSort && { textAlign: 'right' }),
  ...(percentageRatio && { backgroundColor: getColor(percentageRatio) }),
});

export const tableCheckbox = (): React.CSSProperties => ({
  marginLeft: 5,
});

export const tableControls = (): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  borderBottom: 'none',

  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: 'auto 100px 1fr auto',
  gridGap: 5,
  padding: 6,
});

export const tableFilter = (): React.CSSProperties => ({
  marginLeft: 5,
  width: 100,
});

export const tableHeader = ({
  canFilter,
  isShowStyleDetails,
}: {
  canFilter?: boolean;
  isShowStyleDetails?: boolean;
}): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  padding: 4,

  ...((canFilter || isShowStyleDetails) && {
    border: undefined,

    alignItems: 'center',
    display: 'flex',
  }),
});

export const tableSort = (): React.CSSProperties => ({ fontSize: 10 });
