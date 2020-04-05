import { AvatarBase } from './Avatar.base';
import { compose } from '../temp/compose';
import * as classes from './Avatar.scss';

export const Avatar = compose(AvatarBase, {
  classes: classes.locals,
  // stylesheet: classes.toString(),
});
