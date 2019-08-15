import { IModalStyles, IModalProps } from 'office-ui-fabric-react/lib/Modal';

export const ModalStyles = (props: IModalProps): Partial<IModalStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { effects } = theme;

  return {
    main: {
      boxShadow: effects.elevation64,
      borderRadius: effects.roundedCorner2
    }
  };
};
