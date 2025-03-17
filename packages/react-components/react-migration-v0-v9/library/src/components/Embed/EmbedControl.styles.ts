import { createCustomFocusIndicatorStyle, makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useEmbedControlStyles = makeStyles({
  root: {
    width: '48px',
    maxWidth: '48px',
    height: '48px',
    color: tokens.colorNeutralForegroundStaticInverted,
    padding: '4px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    opacity: 1,
    pointerEvents: 'none',
    ...shorthands.transition('opacity', '.22s', 'ease-in-out'),

    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  active: {
    opacity: 0,
  },
  focusIndicator: createCustomFocusIndicatorStyle({
    ...shorthands.borderColor(tokens.colorStrokeFocus2),
    boxShadow: `${tokens.shadow2}, 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset,  0 0 0 ${tokens.strokeWidthThick} ${tokens.colorNeutralForegroundOnBrand} inset`,
    borderRadius: '50%',
    ':hover': {
      boxShadow: `${tokens.shadow2}, 0 0 0 ${tokens.strokeWidthThin} ${tokens.colorStrokeFocus2} inset`,
      ...shorthands.borderColor(tokens.colorStrokeFocus2),
    }}),
});
