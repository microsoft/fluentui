import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';
import { IDatePickerStyles, IDatePickerStyleProps } from 'office-ui-fabric-react/lib/DatePicker';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  const { disabled, theme } = props;
  if (!theme) {
    return {};
  }
  const { semanticColors } = theme;
  const TextHoverStyle = () => {
    return {
      color: semanticColors.buttonTextHovered,
      backgroundColor: semanticColors.buttonBackgroundHovered
    };
  };
  const TodayAndSelectedDayStyle = () => {
    return {
      '.ms-DatePicker-day-button.ms-DatePicker-day--today': {
        backgroundColor: semanticColors.bodyBackground,
        color: semanticColors.bodyText,
        fontWeight: '400'
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:hover': {
        backgroundColor: semanticColors.bodyBackground,
        color: semanticColors.buttonTextHovered
      },
      '.ms-DatePicker-day--highlighted': {
        backgroundColor: semanticColors.buttonBackgroundChecked,
        color: semanticColors.buttonTextChecked,
        border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextChecked}`
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day--today': {
        color: semanticColors.buttonTextChecked
      }
    };
  };
  const HoverStyles = () => {
    return {
      '.ms-DatePicker-day--infocus:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-currentDecade:hover': { color: semanticColors.bodyText },
      '.ms-DatePicker-day--outfocus:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-monthAndYear:hover': { color: semanticColors.bodyText },
      '.ms-DatePicker-weekday:hover': { color: semanticColors.bodyText },
      '.ms-DatePicker-monthOption:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-header > .ms-DatePicker-currentYear:hover': { color: semanticColors.bodyText },
      '.ms-DatePicker-prevMonth:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-nextMonth:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-prevYear:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-nextYear:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-goToday:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-yearOption:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-prevDecade:hover': {
        ...TextHoverStyle()
      },
      '.ms-DatePicker-nextDecade:hover': {
        ...TextHoverStyle()
      }
    };
  };
  const CalloutStyle = (focus: string, fade: string) => {
    return {
      '.ms-DatePicker-day.ms-DatePicker-dayBackground': { borderCollapse: 'separate' },
      '.ms-DatePicker-day--infocus': { color: focus },
      '.ms-DatePicker-currentDecade': { color: focus },
      '.ms-DatePicker-day--outfocus': { color: fade },
      '.ms-DatePicker-monthAndYear': { color: focus },
      '.ms-DatePicker-weekday': { color: focus },
      '.ms-DatePicker-monthOption': { color: focus },
      '.ms-DatePicker-currentYear': { color: focus },
      '.ms-DatePicker-prevMonth': { color: focus },
      '.ms-DatePicker-nextMonth': { color: focus },
      '.ms-DatePicker-prevYear': { color: focus },
      '.ms-DatePicker-nextYear': { color: focus },
      '.ms-DatePicker-prevDecade': { color: focus },
      '.ms-DatePicker-nextDecade': { color: focus },
      '.ms-DatePicker-goToday': { color: focus },
      '.ms-DatePicker-goToday[disabled]': { color: fade },
      '.ms-DatePicker-yearOption': { color: focus },
      '.ms-DatePicker-yearOption--disabled': { color: fade },
      '.ms-DatePicker-monthOption--disabled': { color: fade },
      '.ms-DatePicker-day--disabled': { color: fade },
      '.ms-DatePicker-nextDecade--disabled': { color: fade },
      '.ms-DatePicker-prevDecade--disabled': { color: fade },
      '.ms-DatePicker-prevYear--disabled': { color: fade },
      '.ms-DatePicker-nextYear--disabled': { color: fade },
      '.ms-DatePicker-prevMonth--disabled': { color: fade },
      '.ms-DatePicker-nextMonth--disabled': { color: fade },
      ...TodayAndSelectedDayStyle(),
      ...HoverStyles()
    };
  };
  return {
    callout: {
      fontSize: FontSizes.size12,
      backgroundColor: semanticColors.bodyBackground,
      color: semanticColors.bodyText,
      selectors: {
        '.ms-Callout-main': {
          backgroundColor: semanticColors.bodyBackground
        },
        ...CalloutStyle(semanticColors.bodyText, semanticColors.disabledBodyText)
      }
    },
    icon: [
      {
        color: semanticColors.bodyText,
        top: '2px'
      },
      disabled && {
        color: semanticColors.disabledBodyText
      }
    ],
    root: [
      { fontSize: FontSizes.size12 },
      disabled && {
        border: `${StyleConstants.borderWidth} solid ${semanticColors.disabledBodyText}`,
        color: semanticColors.disabledBodyText
      }
    ],
    textField: {}
  };
};
