import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { SwitchState } from './Switch.types';

const rootClassName = 'ms-Switch-root';
const trackClassName = 'ms-Switch-track';
const thumbClassName = 'ms-Switch-thumb';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: theme => ({
    '--switch-width': '40px',
    '--switch-height': '20px',
    '--switch-thumb-size': '14px',
    '--switch-checked-opacity': '0',
    '--switch-unchecked-opacity': '0',

    position: 'relative',
    width: 'var(--switch-width)',
    height: 'var(--switch-height)',
    display: 'inline-block',
    userSelect: 'none',
    touchAction: 'none',
    verticalAlign: 'bottom',
  }),

  unchecked: theme => ({
    ':hover .ms-Switch-thumb': {
      ':before': {
        background: theme.colorNeutralStrokeAccessibleHover,
      },
    },

    ':hover .ms-Switch-track': {
      ':before': {
        borderColor: theme.colorNeutralStrokeAccessibleHover,
      },
    },
  }),

  checked: theme => ({
    ':hover .ms-Switch-track': {
      ':after': {
        background: theme.colorBrandBackgroundHover,
      },
    },

    ':active .ms-Switch-track': {
      ':after': {
        background: theme.colorBrandBackgroundPressed,
      },
    },
  }),

  enabled: {
    '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
    cursor: 'pointer',
  },

  disabled: {
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },

  focusIndicator: theme =>
    createFocusOutlineStyle(theme, { selector: 'focus-within', style: { outlineOffset: '8px' } }),
});

/**
 * Styles for the track slot
 */
const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    transition: 'background .1s cubic-bezier(0.33, 0.0, 0.67, 1)',
    touchAction: 'none',
    pointerEvents: 'none',

    ':before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      boxSizing: 'border-box',
      borderRadius: '999px',
      content: "''",
      opacity: 'var(--switch-unchecked-opacity)',
    },

    ':after': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      boxSizing: 'border-box',
      borderRadius: '999px',
      content: "''",
      opacity: 'var(--switch-checked-opacity)',
    },
  }),

  unchecked: theme => ({
    ':before': {
      border: `1px solid ${theme.colorNeutralStrokeAccessible}`,
      background: 'none',
    },
  }),

  checked: theme => ({
    ':after': {
      background: theme.colorBrandBackground,
      border: 'none',
    },
  }),

  disabledUnchecked: theme => ({
    ':before': {
      border: `1px solid ${theme.colorNeutralStrokeDisabled}`,
    },
  }),

  disabledChecked: theme => ({
    ':after': {
      border: `1px solid ${theme.colorTransparentStrokeDisabled}`,
      background: theme.colorNeutralBackgroundDisabled,
    },
  }),
});

/**
 * Styles for the thumb wrapper slot
 */
const useThumbWrapperStyles = makeStyles({
  thumbWrapper: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: 'calc(var(--switch-thumb-size) * .7)',
    right: 'calc(var(--switch-thumb-size) * .7)',
    touchAction: 'none',
    pointerEvents: 'none',
  },
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: theme => ({
    position: 'absolute',
    width: 'var(--switch-thumb-size)',
    height: 'var(--switch-thumb-size)',
    boxSizing: 'border-box',
    borderRadius: theme.borderRadiusCircular,
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'background .1s cubic-bezier(0.33, 0.0, 0.67, 1)',
    touchAction: 'none',
    pointerEvents: 'none',

    ':before': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: theme.borderRadiusCircular,
      content: "''",
      opacity: 'var(--switch-unchecked-opacity)',
    },

    ':after': {
      position: 'absolute',
      top: '0px',
      left: '0px',
      bottom: '0px',
      right: '0px',
      borderRadius: theme.borderRadiusCircular,
      content: "''",
      opacity: 'var(--switch-checked-opacity)',
    },
  }),

  unchecked: theme => ({
    ':before': {
      background: theme.colorNeutralStrokeAccessible,
    },
  }),

  checked: theme => ({
    ':after': {
      background: theme.colorNeutralForegroundOnBrand,
    },
  }),

  disabledUnchecked: theme => ({
    ':before': {
      border: `1px solid ${theme.colorNeutralForegroundDisabled}`,
      background: theme.colorNeutralBackground1,
    },
  }),

  disabledChecked: theme => ({
    ':after': {
      background: theme.colorNeutralForegroundDisabled,
    },
  }),
});

/**
 * Styles for the activeRail slot
 */
const useActiveRailStyles = makeStyles({
  activeRail: {
    position: 'absolute',
    left: 'calc(var(--switch-thumb-size) * .7)',
    right: 'calc(var(--switch-thumb-size) * .7)',
  },
});

/**
 * Styles for the hidden input slot
 */
const useInputStyle = makeStyles({
  input: {
    opacity: 0,
    position: 'absolute',
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    touchAction: 'none',
    pointerEvents: 'none',
  },
});

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles = (state: SwitchState): SwitchState => {
  const { checked, disabled } = state.input;

  const rootStyles = useRootStyles();
  const trackStyles = useTrackStyles();
  const thumbWrapperStyles = useThumbWrapperStyles();
  const thumbStyles = useThumbStyles();
  const activeRailStyles = useActiveRailStyles();
  const inputStyles = useInputStyle();

  state.root.className = mergeClasses(
    rootClassName + (checked ? ' checked' : ''),
    rootStyles.root,
    rootStyles.focusIndicator,
    !disabled && rootStyles.checked,
    !disabled && rootStyles.unchecked,
    disabled ? rootStyles.disabled : rootStyles.enabled,
    state.root.className,
  );

  state.track.className = mergeClasses(
    trackClassName,
    trackStyles.track,
    !disabled && trackStyles.checked,
    !disabled && trackStyles.unchecked,
    disabled && trackStyles.disabledChecked,
    disabled && trackStyles.disabledUnchecked,
    state.track.className,
  );

  state.thumbWrapper.className = mergeClasses(thumbWrapperStyles.thumbWrapper, state.thumbWrapper.className);

  state.thumb.className = mergeClasses(
    thumbClassName,
    thumbStyles.thumb,
    !disabled && thumbStyles.checked,
    !disabled && thumbStyles.unchecked,
    disabled && thumbStyles.disabledChecked,
    disabled && thumbStyles.disabledUnchecked,
    state.thumb.className,
  );

  state.activeRail.className = mergeClasses(activeRailStyles.activeRail, state.activeRail.className);

  state.input.className = mergeClasses(inputStyles.input, state.input.className);

  return state;
};
