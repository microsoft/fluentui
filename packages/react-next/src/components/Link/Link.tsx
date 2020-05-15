import { compose } from '@fluentui/react-compose';
import { LinkBase } from './LinkBase';
import * as classes from './Link.scss';
import { LinkProps } from './Link.types';

export const Link = compose<'a', {}, {}, LinkProps, LinkProps>(LinkBase, {
  classes,
  slots: {},
  displayName: 'Link',
});
