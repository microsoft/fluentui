import { FontSizes, FontWeights, getFocusStyle } from '../../Styling';
import {
  getDateCurrentStyle,
  getDateDisabledStyle,
  getDateSelectedStyle,
  getDateStyle,
  getHeaderLabelStyle,
  getHeaderStyle,
  getHeightStyle,
  getNavigatorComponentsStyle,
  getNavigatorStyle,
  MS_LARGESCREEN_ACTIVE,
  NavigatorDirection
} from './Calendar.styles';
import { ICalendarMonthStyleProps, ICalendarMonthStyles } from './CalendarMonth.types';

export const getStyles = (props: ICalendarMonthStyleProps): ICalendarMonthStyles => {

  const {
    theme,
    className,
    calendarsInline,
    isPrevYearDisabled,
    isNextYearDisabled,
    isHeaderSelectable } = props;

  const { fonts, palette } = theme;

  return {
    root: [
      'ms-DatePicker-monthPicker',
      className,
      calendarsInline && {
        display: 'none',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            marginLeft: '13px'
          }
        }
      },
      {
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            display: 'block',
            minHeight: '214px'
          }
        }
      }
    ],

    navigators: [
      'ms-DatePicker-yearComponents',
      getNavigatorComponentsStyle()
    ],

    prevNavigator: [
      'ms-DatePicker-prevYear',
      'js-prevYear',
      getNavigatorStyle(theme, NavigatorDirection.Previous),
      isPrevYearDisabled && [
        'ms-DatePicker-prevYear--disabled',
        {
          visibility: 'hidden'
        }
      ]
    ],

    nextNavigator: [
      'ms-DatePicker-nextYear',
      'js-nextYear',
      getNavigatorStyle(theme, NavigatorDirection.Next),
      isNextYearDisabled && [
        'ms-DatePicker-nextYear--disabled',
        {
          visibility: 'hidden'
        }
      ]
    ],

    header: [
      'ms-DatePicker-header',
      getHeaderStyle()
    ],

    headerLabel: [
      'ms-DatePicker-currentYear',
      'js-showYearPicker',
      getHeaderLabelStyle(theme, isHeaderSelectable)
    ],

    monthsGrid: [
      'ms-DatePicker-optionGrid',
      {
        height: '210px',
        margin: '12px 0 0 0',
        position: 'relative',
        width: '280px',
        selectors: {
          [MS_LARGESCREEN_ACTIVE]: {
            height: '150px',
            width: '212px'
          }
        }
      }
    ],

    month: [
      'ms-DatePicker-monthOption',
      fonts.smallPlus,
      getFocusStyle(theme, 0, 'relative', palette.neutralSecondary, 'transparent'),
      getHeightStyle('60px', '40px'),
      {
        color: palette.neutralPrimary,
        float: 'left',
        margin: '0 10px 10px 0',
        textAlign: 'center',
        width: '60px',
        selectors: {
          ':hover': {
            backgroundColor: palette.neutralTertiaryAlt,
            cursor: 'pointer'
          },
          [MS_LARGESCREEN_ACTIVE]: {
            fontSize: FontSizes.small,
            margin: '0 11px 11px 0',
            width: '40px',
            selectors: {
              ':nth-child(4n+4)': {
                margin: '0 0px 11px 0'
              }
            }
          },
          ':active': {
            backgroundColor: palette.themeLight
          }
        }
      },
    ],

    monthCurrent: [
      'ms-DatePicker-monthOption--today',
      getDateCurrentStyle(theme)
    ],

    monthSelected: [
      'ms-DatePicker-monthOption--highlighted',
      getDateSelectedStyle(theme)
    ],

    monthDisabled: [
      'ms-DatePicker-monthOption--disabled',
      getDateDisabledStyle(theme),
      {
        backgroundColor: palette.neutralLighter
      }
    ]
  };
};