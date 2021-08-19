import { makeStyles, mergeClasses } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import { SwitchState } from './Switch.types';

const trackClassName = 'ms-Switch-track';
const thumbClassName = 'ms-Switch-thumb';

/**
 * Styles for the root slot
 */
const useRootStyles = makeStyles({
  root: theme => ({
    '--switch-thumb-size': '14px',
    '--switch-thumb-offset': '.7',
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

const useContainerStyles = makeStyles({
  container: {
    position: 'relative',
    width: '40px',
    height: '20px',
  },
});

/**
 * Styles for the track slot
 */
const useTrackStyles = makeStyles({
  track: theme => ({
    position: 'absolute',
    width: '40px',
    height: '20px',
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
    left: 'calc(var(--switch-thumb-size) * var(--switch-thumb-offset))',
    right: 'calc(var(--switch-thumb-size) * var(--switch-thumb-offset))',
    transition: 'transform .2s cubic-bezier(0.33, 0.0, 0.67, 1), background .2s cubic-bezier(0.33, 0.0, 0.67, 1)',
  }),

  unchecked: theme => ({
    transform: 'translate(0%)',
  }),

  checked: theme => ({
    transform: 'translate(100%)',
  }),
});

/**
 * Styles for the thumb slot
 */
const useThumbStyles = makeStyles({
  thumb: theme => ({
    position: 'absolute',
    boxSizing: 'border-box',
    width: 'var(--switch-thumb-size)',
    height: 'var(--switch-thumb-size)',
    borderRadius: theme.global.borderRadius.circular,
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),

  unchecked: theme => ({
    background: theme.alias.color.neutral.neutralStrokeAccessible,
  }),

  checked: theme => ({
    background: 'white',
    // TODO: background: theme.alias.color.neutral.neutralForegroundAccessible,
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
  const containerStyles = useContainerStyles();
  const trackStyles = useTrackStyles();
  const thumbWrapperStyles = useThumbWrapperStyles();
  const thumbStyles = useThumbStyles();
  const inputStyles = useInputStyle();

  state.className = mergeClasses(
    rootStyles.root,
    rootStyles.focusIndictor,
    !state.disabled && (state.input.checked ? rootStyles.checked : rootStyles.unchecked),
    state.className,
  );

  state.containerClassName = mergeClasses(containerStyles.container);

  state.track.className = mergeClasses(
    trackClassName,
    trackStyles.track,
    !state.disabled && (state.input.checked ? trackStyles.checked : trackStyles.unchecked),
    state.disabled && (state.input.checked ? trackStyles.disabledChecked : trackStyles.disabledUnchecked),
    state.track.className,
  );

  state.thumbWrapper.className = mergeClasses(
    thumbWrapperStyles.thumbWrapper,
    state.input.checked ? thumbWrapperStyles.checked : thumbWrapperStyles.unchecked,
    state.thumbWrapper.className,
  );

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
