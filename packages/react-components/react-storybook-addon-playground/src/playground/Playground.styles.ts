import { makeStyles, tokens } from '@fluentui/react-components';

/** Below this width the editor and the preview are stacked instead of side by side. */
export const NARROW_LAYOUT_QUERY = '(max-width: 800px)';
/** Below this width the toolbar buttons show icons only. */
export const COMPACT_TOOLBAR_QUERY = '(max-width: 1100px)';

const NARROW_LAYOUT = `@media ${NARROW_LAYOUT_QUERY}`;

/**
 * Shell chrome uses Fluent tokens so light/dark (and high contrast) follow `FluentProvider`.
 * Syntax highlighting in Monaco stays on a curated palette — see `editorTheme.ts`.
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
    backgroundColor: tokens.colorNeutralBackground3,
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
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
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
    color: tokens.colorNeutralForeground3,
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
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
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
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '12px',
    lineHeight: '16px',
  },
  paneTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    minWidth: 0,
    flex: 1,
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    '& svg': {
      fontSize: '14px',
      color: tokens.colorNeutralForeground3,
      flexShrink: 0,
    },
  },
  fileName: {
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontWeight: 500,
  },
  fileTabs: {
    display: 'flex',
    minWidth: 0,
    height: '100%',
    overflowX: 'auto',
  },
  fileTab: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '100%',
    margin: 0,
    padding: '0 10px',
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 500,
    color: tokens.colorNeutralForeground3,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    ':hover': {
      color: tokens.colorNeutralForeground1,
    },
    ':focus-visible': {
      outline: `2px solid ${tokens.colorStrokeFocus2}`,
      outlineOffset: '-2px',
    },
  },
  fileTabActive: {
    color: tokens.colorNeutralForeground1,
    fontWeight: 600,
    borderBottomColor: tokens.colorBrandStroke1,
  },
  paneMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginLeft: 'auto',
    color: tokens.colorNeutralForeground3,
  },

  status: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    whiteSpace: 'nowrap',
    color: tokens.colorNeutralForeground3,
  },
  statusDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  statusSuccess: { color: tokens.colorStatusSuccessForeground1 },
  statusDanger: { color: tokens.colorStatusDangerForeground1 },
  statusWarning: { color: tokens.colorStatusWarningForeground1 },
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
    color: tokens.colorNeutralForeground3,
    fontSize: '12px',
    lineHeight: '16px',
  },
  placeholderIcon: {
    fontSize: '20px',
    marginBottom: '4px',
    color: tokens.colorNeutralForeground3,
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
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '12px',
    lineHeight: '16px',
  },
  errorDot: {
    width: '6px',
    height: '6px',
    marginTop: '5px',
    borderRadius: '50%',
    backgroundColor: tokens.colorStatusDangerForeground1,
  },
  errorTitle: {
    margin: 0,
    fontWeight: 600,
    color: tokens.colorStatusDangerForeground1,
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
    color: tokens.colorNeutralForeground3,
  },
});
