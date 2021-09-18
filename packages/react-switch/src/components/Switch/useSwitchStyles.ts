import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
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
    '--switch-checked-opacity': '100',
    '--switch-unchecked-opacity': '100',

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
      background: theme.alias.color.neutral.neutralForeground3Hover,
      opacity: 'var(--switch-unchecked-opacity)',
    },

    ':hover .ms-Switch-track': {
      borderColor: theme.alias.color.neutral.neutralForeground3Hover,
      opacity: 'var(--switch-unchecked-opacity)',
    },
  }),

  checked: theme => ({
    ':hover .ms-Switch-track': {
      // TODO: theme.alias.color.neutral.brandBackgroundInteractive
      background: theme.global.palette.brand.shade30,
      opacity: 'var(--switch-checked-opacity)',
    },
  }),

  focusIndicator: createFocusIndicatorStyleRule(
    theme => ({
      ':after': {
        content: "''",
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        bottom: '-8px',
        left: '-8px',
        boxSizing: 'border-box',
        border: `1px solid ${theme.alias.color.neutral.neutralForeground1}`,
        borderRadius: theme.global.borderRadius.medium,
      },
    }),
    { selector: 'focus-within' },
  ),
});

/**
 * Styles for the track slot
 */
const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    borderRadius: '999px',
    transition: 'background .2s cubic-bezier(0.33, 0.0, 0.67, 1), borderColor .2s cubic-bezier(0.33, 0.0, 0.67, 1)',
    // pointerEvents: 'none',
  }),

  unchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralStrokeAccessible}`,
    background: 'none',
    opacity: 'var(--switch-unchecked-opacity)',
  }),

  checked: theme => ({
    // TODO: background: theme.alias.color.neutral.brandBackgroundInteractive,
    background: theme.global.palette.brand.primary,
    border: 'none',
    opacity: 'var(--switch-checked-opacity)',
  }),

  disabledUnchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralStrokeDisabled}`,
    opacity: 'var(--switch-unchecked-opacity)',
  }),

  disabledChecked: theme => ({
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
    border: 'none',
    opacity: 'var(--switch-checked-opacity)',
  }),
});

/**
 * Styles for the thumb wrapper slot
 */
const useThumbWrapperStyles = makeStyles({
  thumbWrapper: theme => ({
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: 'calc(var(--switch-thumb-size) * .7)',
    right: 'calc(var(--switch-thumb-size) * .7)',
    // transition: 'transform .2s cubic-bezier(0.33, 0.0, 0.67, 1), background .2s cubic-bezier(0.33, 0.0, 0.67, 1)',
    // pointerEvents: 'none',
  }),
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
    borderRadius: theme.global.borderRadius.circular,
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),

  unchecked: theme => ({
    background: theme.alias.color.neutral.neutralStrokeAccessible,
    opacity: 'var(--switch-unchecked-opacity)',
  }),

  checked: theme => ({
    // Neutral foreground accessible
    background: 'white',
    opacity: 'var(--switch-checked-opacity)',
  }),

  disabledUnchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralForegroundDisabled}`,
    background: theme.alias.color.neutral.neutralBackground1,
    opacity: 'var(--switch-unchecked-opacity)',
  }),

  disabledChecked: theme => ({
    background: theme.alias.color.neutral.neutralForegroundDisabled,
    opacity: 'var(--switch-checked-opacity)',
  }),
});

/**
 * Styles for the activeRail slot
 */
const useActiveRailStyles = makeStyles({
  activeRail: theme => ({
    position: 'absolute',
    left: 'calc(var(--switch-thumb-size) * .7)',
    right: 'calc(var(--switch-thumb-size) * .7)',
  }),
});

/**
 *
/**
 * Styles for the hidden input slot
 */
const useInputStyle = makeStyles({
  input: {
    opacity: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    pointerEvents: 'none',
  },

  enabled: {
    cursor: 'pointer',
  },

  disabled: {
    cursor: 'not-allowed',
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
    !disabled && (checked ? rootStyles.checked : rootStyles.unchecked),
    state.root.className,
  );

  state.track.className = mergeClasses(
    trackClassName,
    trackStyles.track,
    !disabled && (checked ? trackStyles.checked : trackStyles.unchecked),
    disabled && (checked ? trackStyles.disabledChecked : trackStyles.disabledUnchecked),
    state.track.className,
  );

  state.thumbWrapper.className = mergeClasses(thumbWrapperStyles.thumbWrapper, state.thumbWrapper.className);

  state.thumb.className = mergeClasses(
    thumbClassName,
    thumbStyles.thumb,
    !disabled && (checked ? thumbStyles.checked : thumbStyles.unchecked),
    disabled && (checked ? thumbStyles.disabledChecked : thumbStyles.disabledUnchecked),
    state.thumb.className,
  );

  state.activeRail.className = mergeClasses(activeRailStyles.activeRail, state.activeRail.className);

  state.input.className = mergeClasses(
    inputStyles.input,
    disabled ? inputStyles.disabled : inputStyles.enabled,
    state.input.className,
  );

  return state;
};
