import { ISparklineStyleProps, ISparklineStyles } from './Sparkline.types';

export const getStyles = (props: ISparklineStyleProps): ISparklineStyles => {
  return {
    inlineBlock: {
      display: 'inline',
    },
    valueText: {
      ...props.theme!.fonts.smallPlus,
      fill: props.theme!.semanticColors.messageText,
    },
  };
};
