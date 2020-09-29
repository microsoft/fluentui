import { IPivotStyleProps, IPivotStyles } from '@fluentui/react/lib/Pivot';
import { AnimationVariables } from '@fluentui/react/lib/Styling';

export const PivotStyles = (props: IPivotStyleProps): Partial<IPivotStyles> => {
  const { theme, rootIsTabs } = props;
  const { palette } = theme;

  return {
    link: [
      !rootIsTabs && {
        height: 40,
        lineHeight: 40,
        selectors: {
          ':hover': {
            backgroundColor: 'transparent',
            color: palette.neutralDark,
          },
          ':active': {
            backgroundColor: 'transparent',
          },
        },
      },
    ],
    linkIsSelected: [
      !rootIsTabs && {
        height: 40,
        lineHeight: 40,
        selectors: {
          ':hover': {
            backgroundColor: 'transparent',
          },
          ':active': {
            backgroundColor: 'transparent',
          },
          ':before': {
            transition: `left ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2},
                        right ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2}`,
          },
          ':hover::before': {
            left: 8,
            right: 8,
          },
        },
      },
    ],
  };
};
