import { IDatePickerStyleProps, IDatePickerStyles } from './DatePicker.types';
import { IStyle, normalize, getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-DatePicker',
  textField: 'ms-TextField',
  eventWithLabel: 'ms-DatePicker-event--with-label',
  eventWithoutLabel: 'ms-DatePicker-event--without-label'
};

export const styles = (props: IDatePickerStyleProps): IDatePickerStyles => {
  const { className, theme } = props;
  const { palette, fonts } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const DatePickerEvent: IStyle = {
    color: palette.neutralSecondary,
    fontSize: fonts.medium.fontSize,
    lineHeight: '18px',
    pointerEvents: 'none',
    position: 'absolute',
    right: '9px'
  };

  return {
    root: [
      classNames.root,
      normalize,
      {
        // backgroundColor: 'red'
      },
      className
    ],
    textField: [
      classNames.textField,
      {
        position: 'relative',
        // backgroundColor: 'purple',
        selectors: {
          input: {
            selectors: {
              '::-ms-clear': {
                display: 'none'
              },
              '&read-only': {
                backgroundColor: 'yellow',
                cursor: 'pointer'
              }
            }
          }
        }
      },
      className
    ],
    eventWithLabel: [
      classNames.eventWithLabel,
      DatePickerEvent,
      {
        bottom: '5px',
        backgroundColor: 'green'
      },
      className
    ],
    eventWithoutLabel: [
      classNames.eventWithoutLabel,
      DatePickerEvent,
      {
        top: '7px',
        backgroundColor: 'red'
      },
      className
    ]
  };
};
