import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

/** Below this width the editor and the preview are stacked instead of side by side. */
export const NARROW_LAYOUT_QUERY = '(max-width: 800px)';
/** Below this width the toolbar buttons show icons only. */
export const COMPACT_TOOLBAR_QUERY = '(max-width: 1100px)';

const NARROW_LAYOUT = `@media ${NARROW_LAYOUT_QUERY}`;

/** Accent gradient shared by the brand mark, the primary action and the active separator. */
export const ACCENT_GRADIENT = 'linear-gradient(135deg, #2f80ed 0%, #5b5bd6 100%)';

const pulse = {
  '0%': { transform: 'scale(0.85)', opacity: 0.55 },
  '50%': { transform: 'scale(1)', opacity: 1 },
  '100%': { transform: 'scale(0.85)', opacity: 0.55 },
};

const slideUp = {
  from: { opacity: 0, transform: 'translateY(8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
};

export const usePlaygroundStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    backgroundColor: 'var(--pg-canvas-base)',
    backgroundImage: 'var(--pg-canvas)',
    backgroundAttachment: 'fixed',
  },
  // Palette that is not covered by the Fluent theme: canvas, glass and accent colors for each color scheme
  rootLight: {
    '--pg-canvas-base': '#f3f5fa',
    '--pg-canvas':
      'radial-gradient(1100px 560px at 8% -12%, rgba(47, 128, 237, 0.20), transparent 62%), ' +
      'radial-gradient(900px 520px at 100% -4%, rgba(91, 91, 214, 0.16), transparent 58%), ' +
      'radial-gradient(700px 500px at 60% 110%, rgba(16, 185, 129, 0.08), transparent 60%)',
    '--pg-glass': 'rgba(255, 255, 255, 0.72)',
    '--pg-toolbar': 'rgba(255, 255, 255, 0.85)',
    '--pg-surface': '#ffffff',
    '--pg-surface-header': 'rgba(15, 23, 42, 0.025)',
    '--pg-border': 'rgba(15, 23, 42, 0.08)',
    '--pg-border-strong': 'rgba(15, 23, 42, 0.16)',
    '--pg-shadow': '0 1px 2px rgba(15, 23, 42, 0.05), 0 18px 40px -18px rgba(15, 23, 42, 0.25)',
    '--pg-muted': '#5b6472',
    '--pg-dot': 'rgba(15, 23, 42, 0.10)',
    '--pg-grip': 'rgba(15, 23, 42, 0.22)',
    '--pg-success': '#15803d',
    '--pg-danger': '#dc2626',
    '--pg-warning': '#b45309',
    '--pg-info': '#2f6feb',
    '--pg-neutral': '#64748b',
  },
  rootDark: {
    '--pg-canvas-base': '#101114',
    '--pg-canvas':
      'radial-gradient(1100px 560px at 8% -12%, rgba(47, 128, 237, 0.22), transparent 62%), ' +
      'radial-gradient(900px 520px at 100% -4%, rgba(139, 92, 246, 0.20), transparent 58%), ' +
      'radial-gradient(700px 500px at 60% 110%, rgba(16, 185, 129, 0.10), transparent 60%)',
    '--pg-glass': 'rgba(18, 19, 24, 0.68)',
    '--pg-toolbar': 'rgba(255, 255, 255, 0.05)',
    '--pg-surface': tokens.colorNeutralBackground1,
    '--pg-surface-header': 'rgba(255, 255, 255, 0.035)',
    '--pg-border': 'rgba(255, 255, 255, 0.09)',
    '--pg-border-strong': 'rgba(255, 255, 255, 0.18)',
    '--pg-shadow': '0 1px 2px rgba(0, 0, 0, 0.5), 0 24px 48px -20px rgba(0, 0, 0, 0.7)',
    '--pg-muted': '#9aa4b2',
    '--pg-dot': 'rgba(255, 255, 255, 0.09)',
    '--pg-grip': 'rgba(255, 255, 255, 0.28)',
    '--pg-success': '#4ade80',
    '--pg-danger': '#f87171',
    '--pg-warning': '#fbbf24',
    '--pg-info': '#7ab2ff',
    '--pg-neutral': '#94a3b8',
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
    padding: '10px 20px',
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'var(--pg-glass)',
    backdropFilter: 'blur(16px) saturate(1.4)',
    borderBottom: '1px solid var(--pg-border)',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: 0,
  },
  brandMark: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    backgroundImage: ACCENT_GRADIENT,
    color: '#ffffff',
    fontSize: '20px',
    boxShadow: '0 6px 16px -6px rgba(47, 128, 237, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
    '& svg': {
      display: 'block',
    },
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  title: {
    margin: 0,
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: '12px',
    lineHeight: '16px',
    color: 'var(--pg-muted)',
    whiteSpace: 'nowrap',
    [NARROW_LAYOUT]: {
      display: 'none',
    },
  },
  toolbar: {
    flexShrink: 0,
    gap: '2px',
    padding: '3px',
    borderRadius: '12px',
    backgroundColor: 'var(--pg-toolbar)',
    border: '1px solid var(--pg-border)',
    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
  },
  toolbarButton: {
    borderRadius: '9px',
    fontWeight: 500,
    transitionProperty: 'background-color, color, box-shadow, transform',
    transitionDuration: '120ms',
    transitionTimingFunction: 'ease-out',
  },
  runButton: {
    color: '#ffffff',
    backgroundImage: ACCENT_GRADIENT,
    boxShadow: '0 6px 14px -6px rgba(47, 128, 237, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    ':hover': {
      color: '#ffffff',
      backgroundImage: 'linear-gradient(135deg, #3d8bf0 0%, #6b6be0 100%)',
      boxShadow: '0 8px 18px -6px rgba(47, 128, 237, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
    },
    ':hover:active': {
      color: '#ffffff',
      backgroundImage: 'linear-gradient(135deg, #2b74d8 0%, #4f4fc4 100%)',
      transform: 'translateY(1px)',
      boxShadow: '0 3px 8px -4px rgba(47, 128, 237, 0.7)',
    },
    '& svg': {
      color: '#ffffff',
    },
  },
  toolbarDivider: {
    marginTop: '6px',
    marginBottom: '6px',
    '::before': {
      ...shorthands.borderColor('var(--pg-border-strong)'),
    },
    '::after': {
      ...shorthands.borderColor('var(--pg-border-strong)'),
    },
  },
  themePicker: {
    minWidth: '150px',
    borderRadius: '9px',
  },

  main: {
    display: 'grid',
    gridTemplateColumns: 'minmax(240px, var(--playground-split, 50%)) auto minmax(240px, 1fr)',
    minHeight: 0,
    padding: '14px 16px 16px',
    boxSizing: 'border-box',
    [NARROW_LAYOUT]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr)',
      rowGap: '14px',
      padding: '12px',
    },
  },
  pane: {
    display: 'grid',
    gridTemplateRows: 'auto minmax(0, 1fr)',
    minWidth: 0,
    minHeight: 0,
    overflow: 'hidden',
    borderRadius: '14px',
    backgroundColor: 'var(--pg-surface)',
    border: '1px solid var(--pg-border)',
    boxShadow: 'var(--pg-shadow)',
  },
  previewPane: {
    gridTemplateRows: 'auto minmax(0, 1fr) auto',
  },
  paneHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    height: '40px',
    boxSizing: 'border-box',
    padding: '0 12px 0 14px',
    borderBottom: '1px solid var(--pg-border)',
    backgroundColor: 'var(--pg-surface-header)',
    color: 'var(--pg-muted)',
  },
  paneTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    fontSize: '12.5px',
    fontWeight: 600,
    lineHeight: '16px',
    letterSpacing: '0.01em',
    color: tokens.colorNeutralForeground2,
    '& svg': {
      fontSize: '16px',
      color: 'var(--pg-muted)',
    },
  },
  fileTab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    height: '26px',
    padding: '0 10px',
    borderRadius: '8px',
    backgroundColor: 'var(--pg-surface)',
    border: '1px solid var(--pg-border)',
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: '12px',
    fontWeight: 500,
    color: tokens.colorNeutralForeground1,
  },
  fileTabDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundImage: ACCENT_GRADIENT,
    boxShadow: '0 0 0 3px color-mix(in srgb, #2f80ed 18%, transparent)',
  },
  paneMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginLeft: 'auto',
    fontSize: '12px',
  },

  // Status pills
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    height: '24px',
    padding: '0 10px 0 8px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '16px',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
    color: 'var(--pill-color)',
    backgroundColor: 'color-mix(in srgb, var(--pill-color) 12%, transparent)',
    border: '1px solid color-mix(in srgb, var(--pill-color) 28%, transparent)',
    '& svg': {
      fontSize: '14px',
    },
  },
  pillNeutral: { '--pill-color': 'var(--pg-neutral)' },
  pillSuccess: { '--pill-color': 'var(--pg-success)' },
  pillDanger: { '--pill-color': 'var(--pg-danger)' },
  pillWarning: { '--pill-color': 'var(--pg-warning)' },
  pillInfo: { '--pill-color': 'var(--pg-info)' },
  pillDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    boxShadow: '0 0 0 3px color-mix(in srgb, currentColor 22%, transparent)',
  },
  pillDotPulse: {
    animationName: pulse,
    animationDuration: '1.1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  },

  separator: {
    position: 'relative',
    width: '14px',
    cursor: 'col-resize',
    borderRadius: '7px',
    '::before': {
      content: '""',
      position: 'absolute',
      top: '14px',
      bottom: '14px',
      left: '50%',
      width: '2px',
      transform: 'translateX(-50%)',
      borderRadius: '2px',
      backgroundColor: 'transparent',
      transitionProperty: 'background-color',
      transitionDuration: '150ms',
    },
    '::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '5px',
      height: '48px',
      transform: 'translate(-50%, -50%)',
      borderRadius: '999px',
      backgroundColor: 'var(--pg-grip)',
      transitionProperty: 'background-color, background-image, height, box-shadow',
      transitionDuration: '150ms',
    },
    ':hover': {
      '::before': {
        backgroundColor: 'var(--pg-border-strong)',
      },
      '::after': {
        height: '56px',
        backgroundColor: '#2f80ed',
      },
    },
    ':focus-visible': {
      outline: 'none',
      '::after': {
        backgroundImage: ACCENT_GRADIENT,
        boxShadow: '0 0 0 4px color-mix(in srgb, #2f80ed 30%, transparent)',
      },
    },
    [NARROW_LAYOUT]: {
      display: 'none',
    },
  },
  separatorActive: {
    '::before': {
      backgroundColor: 'var(--pg-border-strong)',
    },
    '::after': {
      height: '64px',
      backgroundImage: ACCENT_GRADIENT,
      boxShadow: '0 0 0 4px color-mix(in srgb, #2f80ed 30%, transparent)',
    },
  },

  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    height: '100%',
    boxSizing: 'border-box',
    padding: '32px',
    textAlign: 'center',
    color: 'var(--pg-muted)',
    animationName: slideUp,
    animationDuration: '260ms',
    animationTimingFunction: 'ease-out',
  },
  placeholderIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    marginBottom: '8px',
    borderRadius: '18px',
    fontSize: '28px',
    color: 'var(--pg-danger)',
    backgroundColor: 'color-mix(in srgb, var(--pg-danger) 10%, transparent)',
    boxShadow: '0 0 0 8px color-mix(in srgb, var(--pg-danger) 5%, transparent)',
  },
  placeholderTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
  },
  placeholderText: {
    fontSize: '12.5px',
    maxWidth: '320px',
  },

  errorBar: {
    display: 'grid',
    gridTemplateColumns: 'auto minmax(0, 1fr)',
    columnGap: '10px',
    margin: '12px',
    padding: '12px 14px',
    maxHeight: '40vh',
    overflow: 'auto',
    borderRadius: '12px',
    border: '1px solid color-mix(in srgb, var(--pg-danger) 30%, transparent)',
    borderLeft: '3px solid var(--pg-danger)',
    backgroundColor: 'color-mix(in srgb, var(--pg-danger) 7%, var(--pg-surface))',
    color: tokens.colorNeutralForeground1,
    animationName: slideUp,
    animationDuration: '220ms',
    animationTimingFunction: 'ease-out',
  },
  errorIcon: {
    fontSize: '18px',
    color: 'var(--pg-danger)',
    marginTop: '1px',
  },
  errorTitle: {
    margin: 0,
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '20px',
  },
  errorMessage: {
    margin: '4px 0 0',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: '12px',
    lineHeight: '18px',
    color: tokens.colorNeutralForeground2,
  },
  errorHint: {
    display: 'block',
    marginTop: '8px',
    fontSize: '12px',
    color: 'var(--pg-muted)',
  },
});
