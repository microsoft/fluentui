import { StatusBase } from './Status.base';
import { compose } from '../temp/compose';
import * as classes from './Status.scss';
import { IStatusProps } from './Status.types';

export const Status = compose<IStatusProps>(
  StatusBase,
  {
    classes: classes.locals,
  },
  {
    displayName: 'Status',
    stylesheet: classes.toString(),
  },
);
