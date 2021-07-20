import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { DropdownListState } from './DropdownList.types';

const useStyles = makeStyles({
  root: theme => ({
    //
  }),
  option: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
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
  active: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1Selected,
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

    ':focus': {
      backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },
  }),
});

/** Applies style classnames to slots */
export const useDropdownListStyles = (state: DropdownListState) => {
  const styles = useStyles();
  state.className = mergeClasses(
    styles.root,
    state['aria-disabled'] && styles.disabled,
    // state.activeItem && styles.active,
    state.className,
  );
  state.option.className = mergeClasses(styles.option, state.option.className);
};
