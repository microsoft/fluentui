import * as StyleConstants from '../Constants';
import { IDatePickerStyles, IDatePickerStyleProps } from '@fluentui/react/lib/DatePicker';
import { BaseColors } from '../AzureColors';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  const { disabled, theme } = props;
  if (!theme) {
    return {};
  }

  const semanticColors = theme.semanticColors as IExtendedSemanticColors;
  const TextHoverStyle = () => {
    return {
      color: BaseColors.BLACK,
      backgroundColor: BaseColors.GRAY_F3F2F1,
    };
  };
  const TodayAndSelectedDayStyle = () => {
    return {
      '.ms-DatePicker-day-button.ms-DatePicker-day--today': {
        backgroundColor: semanticColors.datePickerSelectionBackground,
        color: semanticColors.datePickerSelectionText,
        borderRadius: 2,
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:active': {
        backgroundColor: StyleConstants.transparent,
        color: semanticColors.bodyText,
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:hover': {
        color: BaseColors.WHITE,
        borderRadius: 0,
      },
      '.ms-DatePicker-day--highlighted': {
        backgroundColor: BaseColors.GRAY_EDEBE9,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button': {
        color: BaseColors.BLACK,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day--today': {
        color: semanticColors.datePickerSelectionText,
        backgroundColor: semanticColors.datePickerSelectionBackground, //BaseColors.BLUE_0078D4,
        border: '0px',
      },
    };
  };
  const HoverStyles = () => {
    return {
      '.ms-DatePicker-day--highlighted:hover': {
        backgroundColor: semanticColors.listItemBackgroundChecked,
        color: semanticColors.bodyText,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button:hover': {
        color: BaseColors.BLACK,
      },
      '.ms-DatePicker-day--infocus:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-currentDecade:hover': { color: semanticColors.bodyText },
      '.ms-DatePicker-day--outfocus:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-monthAndYear:hover': { color: semanticColors.bodyText },
      '.ms-DatePicker-weekday:hover': { color: semanticColors.bodyText },
      '.ms-DatePicker-monthOption:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-header > .ms-DatePicker-currentYear:hover': { color: semanticColors.bodyText },
      '.ms-DatePicker-prevMonth:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextMonth:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-prevYear:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextYear:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-goToday:hover': {},
      '.ms-DatePicker-yearOption:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-prevDecade:hover': {
        ...TextHoverStyle(),
      },
      '.ms-DatePicker-nextDecade:hover': {
        ...TextHoverStyle(),
      },
    };
  };
  return {
    //placeholder : inputPlaceholderText
    callout: {
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.bodyText,
      selectors: {
        '.ms-Callout-main': {
          backgroundColor: semanticColors.bodyBackground,
        },
        '.ms-DatePicker-table > thead > tr': {
          borderBottom: `${StyleConstants.borderWidth} solid ${semanticColors.bodyText}`,
        },
        '.ms-DatePicker-day': {
          border: 'none',
          selectors: {
            '.ms-DatePicker-day-button': {},
          },
        },
        '.ms-DatePicker-day--infocus': { color: semanticColors.bodyText },
        '.ms-DatePicker-currentDecade': { color: semanticColors.bodyText },
        '.ms-DatePicker-day--outfocus': { color: semanticColors.bodyText },
        '.ms-DatePicker-monthAndYear': { color: semanticColors.bodyText },
        '.ms-DatePicker-weekday': { color: semanticColors.bodyText },
        '.ms-DatePicker-monthOption': { color: semanticColors.bodyText },
        '.ms-DatePicker-currentYear': { color: semanticColors.bodyText },
        '.ms-DatePicker-prevMonth': { color: semanticColors.bodyText },
        '.ms-DatePicker-nextMonth': { color: semanticColors.bodyText },
        '.ms-DatePicker-prevYear': { color: semanticColors.bodyText },
        '.ms-DatePicker-nextYear': { color: semanticColors.bodyText },
        '.ms-DatePicker-prevDecade': { color: semanticColors.bodyText },
        '.ms-DatePicker-nextDecade': { color: semanticColors.bodyText },
        '.ms-DatePicker-goToday': { color: semanticColors.bodyText, right: '10px' },
        '.ms-DatePicker-goToday[disabled]': { display: 'none' },
        '.ms-DatePicker-yearOption': { color: semanticColors.bodyText },
        '.ms-DatePicker-yearOption--disabled': { color: semanticColors.disabledBodyText },
        '.ms-DatePicker-monthOption--disabled': { color: semanticColors.disabledBodyText },
        '.ms-DatePicker-day--disabled': { color: semanticColors.disabledBodyText },
        '.ms-DatePicker-nextDecade--disabled': { color: semanticColors.disabledBodyText },
        '.ms-DatePicker-prevDecade--disabled': { color: semanticColors.disabledBodyText },
        '.ms-DatePicker-prevYear--disabled': { color: semanticColors.disabledBodyText },
        '.ms-DatePicker-nextYear--disabled': { color: semanticColors.disabledBodyText },
        '.ms-DatePicker-prevMonth--disabled': { color: semanticColors.disabledBodyText },
        '.ms-DatePicker-nextMonth--disabled': { color: semanticColors.disabledBodyText },
        ...TodayAndSelectedDayStyle(),
        ...HoverStyles(),
      },
    },
    icon: [
      {
        color: semanticColors.bodyText,
        bottom: '0px',
        top: '0px',
        height: '19px',
        padding: '2px 2px 0 0',
      },
      disabled && {
        color: semanticColors.disabledBodyText,
      },
    ],
    root: [
      {
        fontSize: theme.fonts.medium.fontSize,
        selectors: {
          '.ms-TextField-field': {
            lineHeight: 22,
            selectors: {
              '::placeholder': {
                color: semanticColors.inputPlaceholderText,
              },
            },
          },
        },
      },
      disabled && {
        border: 'none',
        color: semanticColors.disabledBodyText,
        selectors: {
          '.ms-TextField-fieldGroup': {
            borderColor: semanticColors.datePickerDisabledBorder,
            borderRadius: 2,
          },
          '.ms-TextField-field': {
            lineHeight: 22,
            selectors: {
              '::placeholder': {
                color: semanticColors.disabledBodyText,
              },
            },
          },
        },
      },
    ],
  };
};
