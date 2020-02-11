import { IResolvedTokens } from '@fluentui/react-theming';
import { ILinkTokens } from './Link.tokens';

const styles = (t: IResolvedTokens<ILinkTokens>) => ({
  root: {
    color: t.color,
    cursor: 'pointer',
    outline: 'none',
    textDecoration: t.textDecoration,

    '&:active, &:hover, &:active:hover': {
      color: t.colorHovered,
      textDecoration: t.textDecorationHovered,
    },
    '&:focus': {
      boxShadow: '0 0 0 1px #2b88d8 inset',
    },
  },

  rootDisabled: {
    color: t.colorDisabled,
    cursor: 'default',

    '&:link, &:visited': {
      pointerEvents: 'none',
    },
  },
});

export default styles;
