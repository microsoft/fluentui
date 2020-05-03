import { StatusBase } from './Status.base';
import { extractFromSass } from '../utils/compose';
import { compose } from '@fluentui/react-compose';
import * as classes from './Status.scss';
import { StatusProps } from '@uifabric/react-avatar/lib/components/Status/Status.types';

export const Status = compose<'span', {}, {}, StatusProps, StatusProps>(StatusBase, {
  ...extractFromSass(classes),
  slots: {
    icon: 'div',
  },
  displayName: 'Status',
});

// TODO: should we merge this? :\
// @ts-ignore
Status.shorthandConfig = {
  mappedProp: 'state',
};
