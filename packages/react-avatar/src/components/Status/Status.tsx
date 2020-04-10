import { StatusBase } from './Status.base';
import { compose } from '../temp/compose';
import { Box } from '../Box/index';
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
