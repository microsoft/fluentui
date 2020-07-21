import { compose, createClassResolver } from '@fluentui/react-compose';

import { ImageBase } from './ImageBase';
import { ImageProps } from './Image.types';
import * as classes from './Image.scss';

export const Image = compose<'img', ImageProps, ImageProps, {}, {}>(ImageBase, {
  classes: createClassResolver(classes),
  displayName: 'Image',
});
