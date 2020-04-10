import { AvatarBase } from './Avatar.base';
import { compose } from '../temp/compose';
import * as classes from './Avatar.scss';
import { Status } from '../Status/index';

export const Avatar = compose(AvatarBase, {
  classes,
  slots: {
    status: Status,
  },
  statics: {
    displayName: 'Avatar',
  },
});
