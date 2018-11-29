import { Depths } from '../FluentDepths';
import { fluentBorderRadius } from './styleConstants';
import { IModalStyleProps, IModalStyles } from 'office-ui-fabric-react/lib/Modal';

export const ModalStyles = (props: IModalStyleProps): Partial<IModalStyles> => {
  return {
    main: {
      boxShadow: Depths.depth64,
      borderRadius: fluentBorderRadius
    }
  };
};
