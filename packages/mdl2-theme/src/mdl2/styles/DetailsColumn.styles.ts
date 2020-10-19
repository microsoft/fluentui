import { IDetailsColumnStyles, IDetailsColumnStyleProps } from '@fluentui/react/lib/DetailsList';

export const DetailsColumnStyles = (props: IDetailsColumnStyleProps): Partial<IDetailsColumnStyles> => {
  const { theme } = props;
  return {
    root: {
      height: 32,
    },
    cellName: {
      fontWeight: theme.fonts.small.fontWeight,
      fontSize: theme.fonts.small.fontSize,
    },
    filterChevron: {
      fontSize: theme.fonts.small.fontSize,
      paddingLeft: 4,
    },
  };
};
