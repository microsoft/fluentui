import { IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles } from './ShimmeredDetailsList.types';

export const getStyles = (props: IShimmeredDetailsListStyleProps): IShimmeredDetailsListStyles => {
  const { theme, className, enableShimmer } = props;
  const { palette } = theme;

  return {
    root: [
      theme.fonts.small,
      enableShimmer && {
        selectors: {
          ':after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: `linear-gradient(to bottom, transparent 30%, ${palette.whiteTranslucent40} 65%,${palette.white} 100%)`
          }
        }
      },
      className
    ]
  };
};
