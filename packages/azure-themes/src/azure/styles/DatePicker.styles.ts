import { IDatePickerStyles, IDatePickerStyleProps } from '@fluentui/react/lib/DatePicker';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import * as StyleConstants from '../Constants';

export const DatePickerStyles = (props: IDatePickerStyleProps): Partial<IDatePickerStyles> => {
  const { disabled, theme } = props;
  if (!theme) {
    return {};
  }

  const semanticColors = theme.semanticColors as IExtendedSemanticColors;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    icon: [
      {
        color: extendedSemanticColors.calendarTextOutside,
        bottom: '0px',
        top: '0px',
        height: '19px',
        padding: '3px 5px 0 0',
      },
      disabled && {
        color: extendedSemanticColors.calendarTextDisabled,
      },
    ],
    root: [
      {
        fontSize: theme.fonts.medium.fontSize,
        selectors: {
          '.ms-TextField-field': {
            lineHeight: StyleConstants.calendarHeightInner,
            height: StyleConstants.calendarHeightInner,
          },
        },
      },
      disabled && {
        border: 'none',
        color: semanticColors.disabledBodyText,
        selectors: {
          '.ms-TextField-fieldGroup': {
            borderColor: semanticColors.datePickerDisabledBorder,
            borderRadius: StyleConstants.borderRadius,
          },
          '.ms-TextField-field': {
            lineHeight: 22,
          },
        },
      },
    ],
    callout: [
      {
        selectors: {
          '.ms-CalendarDay-daySelected::before': {
            display: 'none !important',
            border: 0,
          },
        },
      },
    ],
  };
};
