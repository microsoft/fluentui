import { IPieStyleProps, IPieStyles } from './Pie.types';
import { tokens } from '@fluentui/react-theme';
import { HighContrastSelectorBlack } from '@fluentui/react/lib/Styling';

export const getStyles = (props: IPieStyleProps): IPieStyles => {
  const { theme } = props;
  return {
    root: {},
    insideDonutString: {
      fontSize: tokens.fontSizeBase600,
      fontWeight: tokens.fontWeightSemibold,
      fill: theme.semanticColors.bodyText,
      selectors: {
        [HighContrastSelectorBlack]: {
          fill: 'rgb(179, 179, 179)',
        },
      },
    },
  };
};
