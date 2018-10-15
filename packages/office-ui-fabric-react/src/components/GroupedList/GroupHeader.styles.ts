import { IGroupHeaderStyleProps, IGroupHeaderStyles } from './GroupHeader.types';
import { getGlobalClassNames, getFocusStyle, FontSizes, IStyle, AnimationVariables, FontWeights, IconFontSizes } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-GroupHeader',
  check: 'ms-GroupHeader-check',
  dropIcon: 'ms-GroupHeader-dropIcon',
  expand: 'ms-GroupHeader-expand',
  isCollapsed: 'is-collapsed',
  title: 'ms-GroupHeader-title',
  isSelected: 'is-selected',
  iconTag: 'ms-Icon--Tag',
  group: 'ms-GroupedList-group',
  isDropping: 'is-dropping'
};

const rowHeight = 40;

const beziers = {
  easeOutCirc: 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  easeOutSine: 'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
  easeInBack: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
};

export const getStyles = (props: IGroupHeaderStyleProps): IGroupHeaderStyles => {
  const { theme, className, selected, isCollapsed } = props;
  const { semanticColors, palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme!);

  const checkExpandResetStyles: IStyle = [
    getFocusStyle(theme),
    {
      cursor: 'default',
      background: 'none',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: IconFontSizes.large
    }
  ];

  return {
    root: [
      classNames.root,
      getFocusStyle(theme),
      theme.fonts.medium,
      {
        cursor: 'default',
        userSelect: 'none',
        selectors: {
          ':hover': {
            background: semanticColors.listItemBackgroundHovered
          },
          ':hover $check': {
            opacity: 1
          },
          [`:global(.${classNames.group}.${classNames.isDropping})`]: {
            selectors: {
              '> $root $dropIcon': {
                transition: `transform ${AnimationVariables.durationValue4} ${beziers.easeOutCirc} opacity ${
                  AnimationVariables.durationValue1
                } ${beziers.easeOutSine}`,
                transitionDelay: AnimationVariables.durationValue3,
                opacity: 1,
                transform: `rotate(0.2deg) scale(1);` // rotation prevents jittery motion in IE
              },

              $check: {
                opacity: 0
              }
            }
          }
        }
      },
      selected && [
        classNames.isSelected,
        {
          background: semanticColors.listItemBackgroundChecked,
          selectors: {
            ':hover': {
              background: semanticColors.listItemBackgroundCheckedHovered
            },
            $check: {
              opacity: 1
            }
          }
        }
      ],
      className
    ],
    groupHeaderContainer: [
      {
        display: 'flex',
        alignItems: 'center',
        height: rowHeight
      }
    ],
    headerCount: [
      {
        padding: '0px 4px'
      }
    ],
    check: [
      classNames.check,
      checkExpandResetStyles,
      {
        opacity: 0,
        selectors: {
          ':focus': {
            opacity: 1
          }
        },
        width: '40px'
      }
    ],
    expand: [
      classNames.expand,
      checkExpandResetStyles,
      {
        width: 36,
        height: rowHeight,
        color: palette.neutralSecondary,
        paddingTop: 4
      }
    ],
    expandIsCollapsed: [
      isCollapsed
        ? [
            classNames.isCollapsed,
            {
              transform: 'rotate(0deg)',
              transformOrigin: '50% 50%',
              transition: 'transform .1s linear'
            }
          ]
        : {
            transform: 'rotate(-180deg)',
            transformOrigin: '50% 50%',
            transition: 'transform .1s linear'
          }
    ],
    title: [
      classNames.title,
      {
        paddingLeft: '12px',
        fontSize: FontSizes.xLarge,
        fontWeight: FontWeights.light,
        cursor: 'pointer',
        outline: 0,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    ],
    dropIcon: [
      classNames.dropIcon,
      {
        position: 'absolute',
        left: -26,
        fontSize: IconFontSizes.large,
        color: palette.neutralSecondary,
        transition: `transform ${AnimationVariables.durationValue2} ${beziers.easeInBack}, opacity ${AnimationVariables.durationValue4} ${
          beziers.easeOutSine
        }`,
        opacity: 0,
        transform: 'rotate(0.2deg) scale(0.65)', // rotation prevents jittery motion in IE
        transformOrigin: '10px 10px',
        selectors: {
          [`:global(.${classNames.iconTag})`]: {
            position: 'absolute'
          }
        }
      }
    ]
  };
};
