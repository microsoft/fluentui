import { makeStyles, tokens } from '@fluentui/react-components';

/** Below this width the editor and the preview are stacked instead of side by side. */
export const NARROW_LAYOUT_QUERY = '(max-width: 800px)';
/** Below this width the toolbar buttons show icons only. */
export const COMPACT_TOOLBAR_QUERY = '(max-width: 1100px)';

const NARROW_LAYOUT = `@media ${NARROW_LAYOUT_QUERY}`;

/**
 * Shell design system: one neutral canvas, bordered surfaces with a single radius, one accent (the Fluent brand
 * color used by the primary button), a 13px / 12px type scale and status colors for exactly two states.
 */
export const usePlaygroundStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: '13px',
    lineHeight: '20px',
    backgroundColor: 'var(--pg-canvas)',
  },
  rootLight: {
    '--pg-canvas': '#f4f5f7',
    '--pg-surface': tokens.colorNeutralBackground1,
    '--pg-border': '#e3e5e9',
    '--pg-muted': '#6b7280',
    '--pg-success': '#1a7f37',
    '--pg-danger': '#cf222e',
    '--pg-warning': '#9a6700',
  },
  rootDark: {
    '--pg-canvas': '#1b1b1c',
    '--pg-surface': tokens.colorNeutralBackground1,
    '--pg-border': 'rgba(255, 255, 255, 0.1)',
    '--pg-muted': '#9ca3af',
    '--pg-success': '#3fb950',
    '--pg-danger': '#f85149',
    '--pg-warning': '#d29922',
  },
  rootDragging: {
    userSelect: 'none',
    cursor: 'col-resize',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    height: '48px',
    boxSizing: 'border-box',
    padding: '0 16px',
    borderBottom: '1px solid var(--pg-border)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    minWidth: 0,
  },
  brandIcon: {
    display: 'inline-flex',
    fontSize: '18px',
    color: tokens.colorBrandForeground1,
    '& svg': {
      display: 'block',
    },
  },
  title: {
    margin: 0,
    fontSize: '13px',
    lineHeight: '20px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: '12px',
    color: 'var(--pg-muted)',
    whiteSpace: 'nowrap',
    [NARROW_LAYOUT]: {
      display: 'none',
    },
  },
  toolbar: {
    flexShrink: 0,
    gap: '4px',
    padding: 0,
  },
  themePicker: {
    minWidth: '140px',
  },

  main: {
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, var(--playground-split, 50%)) auto minmax(240px, 1fr)',
    minHeight: 0,
    padding: '12px',
    boxSizing: 'border-box',
    [NARROW_LAYOUT]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
      rowGap: '12px',
    },
  },
  pane: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    minWidth: 0,
    minHeight: 0,
    overflow: 'hidden',
    borderRadius: '8px',
    backgroundColor: 'var(--pg-surface)',
    border: '1px solid var(--pg-border)',
  },
  previewPane: {
    gridTemplateRows: 'auto minmax(0, 1fr) auto',
  },
  paneHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '36px',
    boxSizing: 'border-box',
    padding: '0 12px',
    borderBottom: '1px solid var(--pg-border)',
    fontSize: '12px',
    lineHeight: '16px',
  },
  paneTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    '& svg': {
      fontSize: '14px',
      color: 'var(--pg-muted)',
    },
  },
  fileName: {
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontWeight: 500,
  },
  paneMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginLeft: 'auto',
    color: 'var(--pg-muted)',
  },

  status: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
    color: 'var(--pg-muted)',
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  statusSuccess: { color: 'var(--pg-success)' },
  statusDanger: { color: 'var(--pg-danger)' },
  statusWarning: { color: 'var(--pg-warning)' },
  statusLabel: {
    color: tokens.colorNeutralForeground2,
  },

  separator: {
    position: 'relative',
    width: '12px',
    cursor: 'col-resize',
    '::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      width: '2px',
      transform: 'translateX(-50%)',
      borderRadius: '1px',
      backgroundColor: 'transparent',
      transitionProperty: 'background-color',
      transitionDuration: '100ms',
    },
    ':hover': {
      '::after': {
        backgroundColor: tokens.colorBrandStroke1,
      },
    },
    ':focus-visible': {
      outline: 'none',
      '::after': {
        backgroundColor: tokens.colorBrandStroke1,
      },
    },
    [NARROW_LAYOUT]: {
      display: 'none',
    },
  },
  separatorActive: {
    '::after': {
      backgroundColor: tokens.colorBrandStroke1,
    },
  },

  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    height: '100%',
    boxSizing: 'border-box',
    padding: '32px',
    textAlign: 'center',
    color: 'var(--pg-muted)',
    fontSize: '12px',
    lineHeight: '16px',
  },
  placeholderIcon: {
    fontSize: '20px',
    marginBottom: '4px',
    color: 'var(--pg-muted)',
  },
  placeholderTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
  },

  errorBar: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    columnGap: '8px',
    alignItems: 'start',
    padding: '12px 16px',
    maxHeight: '40vh',
    overflow: 'auto',
    borderTop: '1px solid var(--pg-border)',
    fontSize: '12px',
    lineHeight: '16px',
  },
  errorDot: {
    width: '6px',
    height: '6px',
    marginTop: '5px',
    borderRadius: '50%',
    backgroundColor: 'var(--pg-danger)',
  },
  errorTitle: {
    margin: 0,
    fontWeight: 600,
    color: 'var(--pg-danger)',
  },
  errorMessage: {
    margin: '4px 0 0',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: '12px',
    lineHeight: '18px',
    color: tokens.colorNeutralForeground1,
  },
  errorHint: {
    display: 'block',
    marginTop: '6px',
    color: 'var(--pg-muted)',
  },
});
