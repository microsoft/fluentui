import { IPivotStyleProps, IPivotStyles } from 'office-ui-fabric-react/lib/Pivot';
import { AnimationVariables } from 'office-ui-fabric-react/lib/Styling';

export const PivotStyles = (props: IPivotStyleProps): Partial<IPivotStyles> => {
  const { theme, rootIsTabs } = props;
  const { palette } = theme;

  return {
    link: [
      !rootIsTabs && {
        height: 44,
        lineHeight: 44,
        selectors: {
          ':hover': {
            backgroundColor: palette.neutralLighter,
            color: palette.neutralDark
          },
          ':active': {
            backgroundColor: palette.neutralLight
          }
        }
      }
    ],
    linkIsSelected: [
      !rootIsTabs && {
        height: 44,
        lineHeight: 44,
        selectors: {
          ':hover': {
            backgroundColor: palette.neutralLighter
          },
          ':active': {
            backgroundColor: palette.neutralLight
          },
          ':before': {
            transition: `left ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2},
                        right ${AnimationVariables.durationValue2} ${AnimationVariables.easeFunction2}`
          },
          ':hover::before': {
            left: 0,
            right: 0
          }
        }
      }
    ]
  };
};
