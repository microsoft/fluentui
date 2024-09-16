import { normalize, FontSizes, getFocusStyle, getGlobalClassNames } from '@fluentui/style-utilities';
import { IsFocusVisibleClassName } from '@fluentui/utilities';
import type { IWeeklyDayPickerStyleProps, IWeeklyDayPickerStyles } from './WeeklyDayPicker.types';

const GlobalClassNames = {
  root: 'ms-WeeklyDayPicker-root',
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
        flexDirection: 'row',
      },
      className,
    ],
    dayButton: {
      borderRadius: '100%',
    },
    dayIsToday: {},
    dayCell: {
      borderRadius: '100%!important',
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
        fontFamily: 'inherit',
        selectors: {
          // eslint-disable-next-line @fluentui/max-len
          [`.${classNames.root}:hover &, .${IsFocusVisibleClassName} .${classNames.root}:focus &, :host(.${IsFocusVisibleClassName}) .${classNames.root}:focus &, ` +
          `.${IsFocusVisibleClassName} &:focus, :host(.${IsFocusVisibleClassName}) &:focus`]: {
            height: 53,
            minHeight: 12,
            overflow: 'initial',
          },
          // eslint-disable-next-line @fluentui/max-len
          [`.${IsFocusVisibleClassName} .${classNames.root}:focus-within &, :host(.${IsFocusVisibleClassName}) .${classNames.root}:focus-within &`]:
            {
              // edge does not recognize focus-within, so separate it out
              height: 53,
              minHeight: 12,
              overflow: 'initial',
            },
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: palette.neutralLight,
          },
          '&:active': {
            backgroundColor: palette.neutralTertiary,
          },
        },
      },
    ],
    disabledStyle: {
      selectors: {
        '&, &:disabled, & button': {
          color: palette.neutralTertiaryAlt,
          pointerEvents: 'none',
        },
      },
    },
  };
};
