import { Depths } from '../IbizaDepths';
import { borderRadius } from './styleConstants';
import { IModalStyles } from 'office-ui-fabric-react/lib/Modal';

export const ModalStyles: Partial<IModalStyles> = {
  main: {
    boxShadow: Depths.depth64,
    borderRadius: borderRadius
  }
};
