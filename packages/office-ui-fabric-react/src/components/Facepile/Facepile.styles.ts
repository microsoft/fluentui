import { IFacepileStyleProps, IFacepileStyles } from './Facepile.types';

export const getStyles = (props: IFacepileStyleProps): IFacepileStyles => {
  const { className } = props;

  return {
    root: [
      'ms-Facepile',
      {
        // Insert css properties
      },
      className
    ]

    // Insert className styles
  };
};
