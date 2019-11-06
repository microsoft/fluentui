import { IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles } from './WeeklyDayPicker.types';
import { normalize, FontSizes, getFocusStyle, getGlobalClassNames } from '@uifabric/styling';
import { IsFocusVisibleClassName } from '@uifabric/utilities';

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
        width: 220,
        padding: 12,
        boxSizing: 'content-box',
        display: 'flex',
        alignItems: 'center',
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
      getFocusStyle(theme, { inset: 0 }),
      {
        width: 12,
        minWidth: 12,
        height: 0,
        overflow: 'hidden',
        padding: 0,
        margin: 0,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: palette.neutralLighter,
        fontSize: FontSizes.small,
        selectors: {
          [`.${classNames.root}:hover &, .${IsFocusVisibleClassName} .${classNames.root}:focus &, .${IsFocusVisibleClassName} &:focus`]: {
            height: 53,
            minHeight: 12,
            overflow: 'initial'
          },
          [`.${IsFocusVisibleClassName} .${classNames.root}:focus-within &`]: {
            // edge does not recognize focus-within, so separate it out
            height: 53,
            minHeight: 12,
            overflow: 'initial'
          },
          '&:hover': {
            cursor: 'pointer',
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
