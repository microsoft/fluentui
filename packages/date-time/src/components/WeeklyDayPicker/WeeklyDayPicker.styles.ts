import { IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles } from './WeeklyDayPicker.types';
import { normalize, FontSizes, getFocusStyle, getGlobalClassNames } from '@uifabric/styling';

const GlobalClassNames = {
  root: 'ms-WeeklyDayPicker-root'
};

export const styles = (props: IWeeklyDayPickerStyleProps): IWeeklyDayPickerStyles => {
  const { className, theme } = props;
  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      normalize,
      {
        width: 196,
        padding: 12,
        boxSizing: 'content-box',
        display: 'flex',
        flexDirection: 'row'
      },
      className
    ],
    dayButton: {
      borderRadius: '100%'
    },
    dayIsToday: {},
    dayCell: {
      borderRadius: '100%!important'
    },
    daySelected: {},
    navigationIconButton: [
      getFocusStyle(theme, { inset: -2 }),
      {
        width: 12,
        minWidth: 12,
        height: 0,
        overflow: 'hidden',
        alignSelf: 'flex-end',
        padding: 0,
        margin: 0,
        border: 'none',
        backgroundColor: palette.neutralLighter,
        fontSize: FontSizes.small,
        selectors: {
          [`.${classNames.root}:hover &, .${classNames.root}:focus-within &, .${classNames.root}:focus &`]: {
            height: 53,
            minHeight: 12,
            overflow: 'initial'
          },
          '&:hover': {
            backgroundColor: palette.neutralLight
          },
          '&:active': {
            backgroundColor: palette.neutralTertiary
          }
        }
      }
    ],
    disabledStyle: {
      selectors: {
        '&, &:disabled, & button': {
          color: palette.neutralTertiaryAlt,
          pointerEvents: 'none'
        }
      }
    }
  };
};
