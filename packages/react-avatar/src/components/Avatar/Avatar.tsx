import { AvatarBase } from './Avatar.base';
import { compose } from './compose';
import { stylesheet, classes } from './Avatar.scss.ts';

export const Avatar = compose(AvatarBase, {
  stylesheet,
  classes,
});
