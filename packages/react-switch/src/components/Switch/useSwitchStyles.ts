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
    '--switch-track-width': '40px',
    '--switch-track-height': '20px',
    '--switch-thumb-size': '14px',

    position: 'relative',
    display: 'inline-block',
    userSelect: 'none',
    touchAction: 'none',
    verticalAlign: 'bottom',
  }),

  unchecked: theme => ({
    ':hover .ms-Switch-thumb': {
      background: '#424242',
    },

    ':hover .ms-Switch-track': {
      borderColor: '#424242',
    },
  }),

  checked: theme => ({
    ':hover .ms-Switch-track': {
      background: '#004578',
    },
  }),

  focusIndictor: createFocusIndicatorStyleRule(
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

const useSwitchWrapper = makeStyles({
  switchWrapper: {
    position: 'relative',
    width: 'var(--switch-track-width)',
    height: 'var(--switch-track-height)',
  },
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
    transition: 'background .2s cubic-bezier(0.33, 0.0, 0.67, 1)',
  }),

  unchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralStrokeAccessible}`,
    background: 'none',
  }),

  checked: theme => ({
    background: '#0078d4',
    // TODO: background: theme.alias.color.neutral.brandBackgroundInteractive,
    border: 'none',
  }),

  disabledUnchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralStrokeDisabled}`,
  }),

  disabledChecked: theme => ({
    background: theme.alias.color.neutral.neutralBackgroundDisabled,
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
  }),

  unchecked: theme => ({
    background: theme.alias.color.neutral.neutralStrokeAccessible,
  }),

  checked: theme => ({
    background: 'white',
  }),

  disabledUnchecked: theme => ({
    border: `1px solid ${theme.alias.color.neutral.neutralForegroundDisabled}`,
    background: theme.alias.color.neutral.neutralBackground1,
  }),

  disabledChecked: theme => ({
    background: theme.alias.color.neutral.neutralForegroundDisabled,
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
    cursor: 'default',
  },
});

/**
 * Apply styling to the Switch slots based on the state
 */
export const useSwitchStyles = (state: SwitchState): SwitchState => {
  const rootStyles = useRootStyles();
  const switchWrapperStyles = useSwitchWrapper();
  const trackStyles = useTrackStyles();
  const thumbWrapperStyles = useThumbWrapperStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyle();

  state.className = mergeClasses(
    rootClassName + (state.input.checked ? ' checked' : ''),
    rootStyles.root,
    rootStyles.focusIndictor,
    !state.disabled && (state.input.checked ? rootStyles.checked : rootStyles.unchecked),
    state.className,
  );

  state.switchWrapper.className = mergeClasses(switchWrapperStyles.switchWrapper, state.switchWrapper.className);

  state.track.className = mergeClasses(
    trackClassName,
    trackStyles.track,
    !state.disabled && (state.input.checked ? trackStyles.checked : trackStyles.unchecked),
    state.disabled && (state.input.checked ? trackStyles.disabledChecked : trackStyles.disabledUnchecked),
    state.track.className,
  );

  state.thumbWrapper.className = mergeClasses(thumbWrapperStyles.thumbWrapper, state.thumbWrapper.className);

  state.thumb.className = mergeClasses(
    thumbClassName,
    thumbStyles.thumb,
    !state.disabled && (state.input.checked ? thumbStyles.checked : thumbStyles.unchecked),
    state.disabled && (state.input.checked ? thumbStyles.disabledChecked : thumbStyles.disabledUnchecked),
    state.thumb.className,
  );

  state.input.className = mergeClasses(
    inputStyles.input,
    state.disabled ? inputStyles.disabled : inputStyles.enabled,
    state.input.className,
  );

  return state;
};
