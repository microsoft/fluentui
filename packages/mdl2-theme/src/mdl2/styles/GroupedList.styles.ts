import { IGroupHeaderStyleProps, IGroupHeaderStyles } from '@fluentui/react/lib/GroupedList';
import { FontWeights } from '@fluentui/react/lib/Styling';

export const GroupHeaderStyles = (props: IGroupHeaderStyleProps): Partial<IGroupHeaderStyles> => {
  const { compact, theme } = props;
  const { fonts } = theme;
  const finalHeight = compact ? 32 : 42;

  return {
    groupHeaderContainer: {
      height: finalHeight,
    },
    check: {
      height: finalHeight,
    },
    expand: {
      height: finalHeight,
      fontSize: compact ? fonts.medium.fontSize : 18,
    },
    title: {
      fontSize: compact ? fonts.large.fontSize : fonts.xLarge.fontSize,
      fontWeight: FontWeights.semilight,
    },
  };
};
