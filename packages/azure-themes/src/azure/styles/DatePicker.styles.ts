import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';
import { IDatePickerStyles, IDatePickerStyleProps } from 'office-ui-fabric-react/lib/DatePicker';
import { BaseColors } from '../AzureColors';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  const { disabled, theme } = props;
  if (!theme) {
    return {};
  }

  const { semanticColors } = theme;
  const TextHoverStyle = () => {
    return {
      color: BaseColors.BLACK,
      backgroundColor: BaseColors.GRAY_F3F2F1,
      // TODO: devops task to add mouse hover state https://dev.azure.com/CloudDesignStudioMSFT/Design%20Engineering/_workitems/edit/3853/
    };
  };
  const TodayAndSelectedDayStyle = () => {
    return {
      '.ms-DatePicker-day-button.ms-DatePicker-day--today': {
        backgroundColor: BaseColors.BLUE_0078D4,
        color: BaseColors.WHITE,
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:active': {
        backgroundColor: StyleConstants.transparent,
        color: semanticColors.bodyText,
      },
      '.ms-DatePicker-day-button.ms-DatePicker-day--today:hover': {
        color: BaseColors.WHITE,
      },
      '.ms-DatePicker-day--highlighted': {
        backgroundColor: BaseColors.GRAY_EDEBE9,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day-button': {
        color: BaseColors.BLACK,
      },
      '.ms-DatePicker-day--highlighted > .ms-DatePicker-day--today': {
        color: BaseColors.WHITE,
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
      '.ms-DatePicker-goToday:hover': {
        color: semanticColors.bodyText,
      },
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
    callout: {
      fontSize: FontSizes.size13,
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
        '.ms-DatePicker-goToday': { color: semanticColors.bodyText },
        '.ms-DatePicker-goToday[disabled]': { display: 'none' },
        '.ms-DatePicker-yearOption': { color: semanticColors.bodyText },
        '.ms-DatePicker-yearOption--disabled': { color: semanticColors.bodyText },
        '.ms-DatePicker-monthOption--disabled': { color: semanticColors.bodyText },
        '.ms-DatePicker-day--disabled': { color: semanticColors.bodyText },
        '.ms-DatePicker-nextDecade--disabled': { color: semanticColors.bodyText },
        '.ms-DatePicker-prevDecade--disabled': { color: semanticColors.bodyText },
        '.ms-DatePicker-prevYear--disabled': { color: semanticColors.bodyText },
        '.ms-DatePicker-nextYear--disabled': { color: semanticColors.bodyText },
        '.ms-DatePicker-prevMonth--disabled': { color: semanticColors.bodyText },
        '.ms-DatePicker-nextMonth--disabled': { color: semanticColors.bodyText },
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
        fontSize: FontSizes.size13,
      },
      disabled && {
        border: `${StyleConstants.borderWidth} solid ${semanticColors.disabledBodyText}`,
        color: semanticColors.disabledBodyText,
      },
    ],
  };
};
