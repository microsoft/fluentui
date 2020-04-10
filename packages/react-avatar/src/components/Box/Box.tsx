import { compose } from '../temp/compose';
import { BoxBase } from './Box.base';
import * as classes from './Box.scss';

export const Box = compose(BoxBase, { classes }, { displayName: 'Box' });
