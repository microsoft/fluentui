import { StatusBase } from './Status.base';
import { compose } from '../compose';
import * as classes from './Status.scss';
import { createShorthandFactory } from '@fluentui/react-northstar';

export const AvatarStatus = compose(StatusBase, {
  classes: classes.locals,
  stylesheet: classes.toString(),
});

Status.create = createShorthandFactory({
  Component: Status,
  mappedProp: 'state',
});
