import { StatusBase } from './Status.base';
import { compose, extractStylesFromSass } from '../utils/compose';
import * as classes from './Status.scss';

export const Status = compose(StatusBase, {
  ...extractStylesFromSass(classes),
  slots: {
    icon: 'div',
  },
  statics: {
    displayName: 'Status',
  },
});
