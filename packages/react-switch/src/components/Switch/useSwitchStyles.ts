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
      background: theme.alias.color.neutral.neutralForeground2,
    },

    ':hover .ms-Switch-track': {
      borderColor: theme.alias.color.neutral.neutralForeground2,
    },
  }),

  checked: theme => ({
    ':hover .ms-Switch-track': {
      background: theme.alias.color.neutral.brandBackgroundHover,
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
    pointerEvents: 'none',
  }),

  unchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralStrokeAccessible}`,
    background: 'none',
  }),

  checked: theme => ({
    background: theme.alias.color.neutral.brandBackground,
    border: 'none',
  }),

  disabledUnchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralStrokeDisabled}`,
  }),

  disabledChecked: theme => ({
    background: theme.alias.color.neutral.neutralForegroundDisabled,
    border: 'none',
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
    transition: 'transform .2s cubic-bezier(0.33, 0.0, 0.67, 1), background .2s cubic-bezier(0.33, 0.0, 0.67, 1)',
    pointerEvents: 'none',
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
    pointerEvents: 'none',
  }),

  unchecked: theme => ({
    background: theme.alias.color.neutral.neutralStrokeAccessible,
  }),

  checked: theme => ({
    background: theme.alias.color.neutral.neutralForegroundOnBrand,
  }),

  disabledUnchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralForegroundDisabled}`,
    background: theme.alias.color.neutral.neutralBackground1,
  }),

  disabledChecked: theme => ({
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
  }),
});

/**
 * Styles for the hidden input slot
 */
const useInputStyle = makeStyles({
  input: {
    opacity: 0,
    width: '100%',
    height: '100%',
    margin: 0,
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

  state.input.className = mergeClasses(
    inputStyles.input,
    disabled ? inputStyles.disabled : inputStyles.enabled,
    state.input.className,
  );

  return state;
};
