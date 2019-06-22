import { IDetailsColumnStyles, IDetailsColumnStyleProps } from 'office-ui-fabric-react/lib/DetailsList';

export const DetailsColumnStyles = (props: IDetailsColumnStyleProps): Partial<IDetailsColumnStyles> => {
  const { theme } = props;
  return {
    root: {
      height: 32
    },
    cellName: {
      fontWeight: theme.fonts.small.fontWeight,
      fontSize: theme.fonts.small.fontSize
    },
    filterChevron: {
      fontSize: theme.fonts.small.fontSize,
      paddingLeft: 4
    }
  };
};
