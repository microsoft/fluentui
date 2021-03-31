import { makeStyles, ax } from '@fluentui/react-make-styles';
import { AccordionHeaderState } from './AccordionHeader.types';

const useRootStyles = makeStyles({
  base: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    borderRadius: '2px',
  }),
  inline: {
    display: 'inline-block',
  },
});

const useButtonStyles = makeStyles({
  base: {
    paddingRight: '10px',
    paddingLeft: '10px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  small: {
    height: '32px',
  },
  inline: {
    display: 'inline-flex',
  },
});

const useExpandIconStyles = makeStyles({
  base: {
    lineHeight: '0',
  },
  start: {
    paddingRight: '8px',
  },
  end: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: '8px',
  },
});

const useIconStyles = makeStyles({
  base: {
    marginRight: '8px',
    marginLeft: '8px',
  },
  expandIconEnd: {
    marginLeft: '10px',
  },
});

const useChildrenStyles = makeStyles({
  base: theme => ({
    fontSize: theme.global.type.fontSizes.base[300],
    fontFamily: theme.global.type.fontFamilies.base,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
  small: theme => ({
    fontSize: theme.global.type.fontSizes.base[200],
  }),
  large: theme => ({
    fontSize: theme.global.type.fontSizes.base[400],
  }),
  extraLarge: theme => ({
    fontSize: theme.global.type.fontSizes.base[500],
  }),
});

/** Applies style classnames to slots */
export const useAccordionHeaderStyles = (state: AccordionHeaderState) => {
  const rootStyles = useRootStyles();
  state.className = ax(rootStyles.base, state.inline && rootStyles.inline, state.className);

  const buttonStyles = useButtonStyles();
  state.button.className = ax(
    buttonStyles.base,
    state.inline && buttonStyles.inline,
    state.size === 'small' && buttonStyles.small,
    state.button.className,
  );

  const expandIconStyles = useExpandIconStyles();
  if (state.expandIcon) {
    state.expandIcon.className = ax(
      expandIconStyles.base,
      state.expandIconPosition === 'start' && expandIconStyles.start,
      state.expandIconPosition === 'end' && expandIconStyles.end,
      state.expandIcon.className,
    );
  }
  const childrenStyles = useChildrenStyles();
  if (state.children) {
    state.children.className = ax(
      childrenStyles.base,
      state.size === 'small' && childrenStyles.small,
      state.size === 'large' && childrenStyles.large,
      state.size === 'extra-large' && childrenStyles.extraLarge,
      state.children.className,
    );
  }

  const iconStyles = useIconStyles();
  if (state.icon) {
    state.icon.className = ax(
      iconStyles.base,
      state.expandIconPosition === 'end' && iconStyles.expandIconEnd,
      state.icon.className,
    );
  }
  return state;
};
