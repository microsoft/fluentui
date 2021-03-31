import { makeStyles, ax } from '@fluentui/react-make-styles';
import { AccordionHeaderState } from './AccordionHeader.types';

const useStyles = makeStyles({
  root: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    borderRadius: '2px',
  }),
  rootInline: {
    display: 'inline-block',
  },
  button: {
    paddingRight: '10px',
    paddingLeft: '10px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  buttonSmall: {
    height: '32px',
  },
  buttonInline: {
    display: 'inline-flex',
  },
  expandIcon: {
    lineHeight: '0',
  },
  expandIconStart: {
    paddingRight: '8px',
  },
  expandIconEnd: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '8px',
  },
  icon: {
    marginRight: '8px',
    marginLeft: '8px',
  },
  iconExpandIconEnd: {
    marginLeft: '10px',
  },
  children: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
    fontFamily: theme.global.type.fontFamilies.base,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
  childrenSmall: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
  }),
  childrenLarge: theme => ({
    fontSize: theme.global.type.fontSizes.base[400],
  }),
  childrenExtraLarge: theme => ({
    fontSize: theme.global.type.fontSizes.base[500],
  }),
});

/** Applies style classnames to slots */
export const useAccordionHeaderStyles = (state: AccordionHeaderState) => {
  const styles = useStyles();
  state.className = ax(styles.root, state.inline && styles.rootInline, state.className);

  state.button.className = ax(
    styles.button,
    state.inline && styles.buttonInline,
    state.size === 'small' && styles.buttonSmall,
    state.button.className,
  );

  if (state.expandIcon) {
    state.expandIcon.className = ax(
      styles.expandIcon,
      state.expandIconPosition === 'start' && styles.expandIconStart,
      state.expandIconPosition === 'end' && styles.expandIconEnd,
      state.expandIcon.className,
    );
  }
  if (state.children) {
    state.children.className = ax(
      styles.children,
      state.size === 'small' && styles.childrenSmall,
      state.size === 'large' && styles.childrenLarge,
      state.size === 'extra-large' && styles.childrenExtraLarge,
      state.children.className,
    );
  }

  if (state.icon) {
    state.icon.className = ax(
      styles.icon,
      state.expandIconPosition === 'end' && styles.iconExpandIconEnd,
      state.icon.className,
    );
  }
  return state;
};
