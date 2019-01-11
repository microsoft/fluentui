import { Depths } from '../FluentDepths';
import { fluentBorderRadius } from './styleConstants';
import { IModalStyles } from 'office-ui-fabric-react/lib/Modal';

export const ModalStyles: Partial<IModalStyles> = {
  main: {
    boxShadow: Depths.depth64,
    borderRadius: fluentBorderRadius
  }
};
