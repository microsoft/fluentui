import { compose } from '@fluentui/react-theming';
import { LinkBase } from './Link.base';
import styles from './Link.styles';
import tokens from './Link.tokens';

export const Link = compose(LinkBase, {
  name: 'Link',
  styles,
  tokens,
});
