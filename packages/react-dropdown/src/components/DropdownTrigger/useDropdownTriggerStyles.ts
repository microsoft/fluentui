import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { DropdownTriggerState } from './DropdownTrigger.types';

const useStyles = makeStyles({
  root: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    border: '1px solid black', // TODO: figure out actual trigger style
    paddingRight: '8px',
    paddingLeft: '12px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.global.type.fontSizes.base[300],
    cursor: 'pointer',

    ':hover': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForeground2Hover,
    },

    ':focus': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForeground2Hover,
    },

    userSelect: 'none',
  }),
  content: {
    marginRight: '8px',
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
  disabled: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    ':hover': {
      backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },
  }),
});

/** Applies style classnames to slots */
export const useDropdownTriggerStyles = (state: DropdownTriggerState) => {
  const styles = useStyles();
  state.className = mergeClasses(styles.root, state.disabled && styles.disabled, state.className);
  state.content.className = mergeClasses(styles.content, state.content.className);
};
