import { IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles } from './ShimmeredDetailsList.types';

export const getStyles = (props: IShimmeredDetailsListStyleProps): IShimmeredDetailsListStyles => {
  const { theme, className, enableShimmer } = props;
  const { semanticColors, palette } = theme;

  return {
    root: [
      enableShimmer && {
        // set `position: relative` to stop the fading overlay cover the DetailsList header.
        position: 'relative',
        selectors: {
          ':after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: `linear-gradient(
              to bottom,
              transparent 30%,
              ${palette.whiteTranslucent40} 65%,
              ${semanticColors.listBackground} 100%
              )`
          }
        }
      },
      className
    ]
  };
};
