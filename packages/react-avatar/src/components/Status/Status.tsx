import { StatusBase } from './Status.base';
import { compose } from '../utils/compose';
import * as classes from './Status.scss';

export const Status = compose(StatusBase, {
  classes,
  slots: {
    icon: 'div',
  },
  statics: {
    displayName: 'Status',
  },
});
