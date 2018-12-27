import { IFacepileStyleProps, IFacepileStyles } from 'office-ui-fabric-react/lib/Facepile';

export const FacepileStyles = (props: IFacepileStyleProps): Partial<IFacepileStyles> => {
  const { theme } = props;
  const { palette } = theme;

  return {
    overflowButton: {
      backgroundColor: palette.neutralLighter
    },
    descriptiveOverflowButton: {
      backgroundColor: palette.neutralLighter
    }
  };
};
