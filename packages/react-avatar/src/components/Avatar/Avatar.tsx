import { AvatarBase } from './Avatar.base';
import { extractFromSass } from '../utils/compose';
import { compose } from '@fluentui/react-compose';
import { Status } from '../Status/index';
import { Image } from '../Image/index';

import * as classes from './Avatar.scss';

export const Avatar = compose(AvatarBase, {
  ...extractFromSass(classes),
  slots: {
    status: Status,
    image: Image,
  },
  displayName: 'Avatar',
});
