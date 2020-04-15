import { StatusBase } from './Status.base';
import { compose, extractFromSass } from '../utils/compose';
import * as classes from './Status.scss';

export const Status = compose(StatusBase, {
  ...extractFromSass(classes),
  slots: {
    icon: 'div',
  },
  statics: {
    displayName: 'Status',
  },
});
