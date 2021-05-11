import * as React from 'react';
import { TelemetryPosition } from './useTelemetryState';
import { CellAlign } from './useTelemetryColumns';

type CellColor = { backgroundColor: string; color: string };

const CELL_COLORS_STYLES: CellColor[] = [
  { backgroundColor: '#ffffff', color: '#000000' },
  { backgroundColor: '#ffffcc', color: '#000000' },
  { backgroundColor: '#ffeda0', color: '#000000' },
  { backgroundColor: '#fed976', color: '#000000' },
  { backgroundColor: '#feb24c', color: '#000000' },
  { backgroundColor: '#fd8d3c', color: '#000000' },
  { backgroundColor: '#fc4e2a', color: '#000000' },
  { backgroundColor: '#e31a1c', color: '#ffffff' },
  { backgroundColor: '#bd0026', color: '#ffffff' },
  { backgroundColor: '#800026', color: '#ffffff' },
];

const getCellColorStyles = (p: number): CellColor =>
  CELL_COLORS_STYLES[Math.round((CELL_COLORS_STYLES.length - 1) * p)];

export const controls = (): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  borderBottom: 'none',

  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gridGap: 5,
  padding: 4,
});

export const panel = ({ position }: { position: TelemetryPosition }): React.CSSProperties => ({
  background: 'rgba(245, 245, 245)',
  color: '#565554',

  fontSize: '12px',
  position: 'fixed',

  minWidth: 500,
  zIndex: 1000,

  ...(position === 'bottom-left' && {
    left: 0,
    bottom: 0,
  }),
  ...(position === 'bottom-right' && {
    right: 0,
    bottom: 0,
  }),
  ...(position === 'top-left' && {
    left: 0,
    top: 0,
  }),
  ...(position === 'top-right' && {
    right: 0,
    top: 0,
  }),
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
  align,
  percentageRatio,
}: {
  align?: CellAlign;
  percentageRatio?: number;
}): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  padding: 2,
  textAlign: 'right',

  ...(align && { textAlign: align }),
  ...(percentageRatio && getCellColorStyles(percentageRatio)),
});

export const tableFooterCell = ({ align }: { align?: CellAlign }): React.CSSProperties => ({
  fontWeight: 'bold',
  textAlign: 'right',

  ...(align && { textAlign: align }),
});

export const tableCheckbox = (): React.CSSProperties => ({
  marginLeft: 5,
});

export const tableControls = (): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  borderBottom: 'none',

  alignItems: 'center',
  display: 'grid',
  gridTemplateColumns: 'auto 100px 1fr auto auto',
  gridGap: 5,
  padding: 6,
});

export const tableFilter = (): React.CSSProperties => ({
  marginLeft: 5,
  width: 100,
});

export const tableHeader = ({
  isFirstInSubgroup,
  isLastInSubgroup,
  subgroup,
}: {
  isFirstInSubgroup: boolean;
  isLastInSubgroup: boolean;
  subgroup: 'styles' | 'timers';
}): React.CSSProperties => ({
  border: '1px solid #e5e5e4',
  padding: 4,

  ...(subgroup && {
    background: 'rgba(245, 245, 245, 0.75)',
    borderBottomStyle: 'solid',
    borderBottomWidth: '2px',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    fontWeight: 'normal',

    ...(isFirstInSubgroup && {
      background: 'transparent',
      fontWeight: 'bold',
    }),
    ...(isLastInSubgroup && { borderRightColor: '#e5e5e4' }),
  }),
  ...(subgroup === 'timers' && {
    borderBottomColor: 'cornflowerblue',
  }),
  ...(subgroup === 'styles' && {
    borderBottomColor: 'salmon',
  }),
});

export const tableSort = (): React.CSSProperties => ({ fontSize: 10 });
