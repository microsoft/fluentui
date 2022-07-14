import { ISparklineStyleProps, ISparklineStyles } from './Sparkline.types';

export const getStyles = (props: ISparklineStyleProps): ISparklineStyles => {
  return {
    inlineBlock: {
      display: 'inline',
    },
    titleText: {
      marginLeft: '8px',
      textAlign: 'center',
      ...props.theme!.fonts.smallPlus,
    },
  };
};
