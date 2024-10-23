import { getGlobalClassNames, getFocusStyle, HighContrastSelector } from '../../../Styling';
import { ButtonGlobalClassNames } from '../../Button/BaseButton.classNames';
import { getRTL } from '../../../Utilities';
import type { ITagItemStyleProps, ITagItemStyles } from './TagPicker.types';

const GlobalClassNames = {
  root: 'ms-TagItem',
  text: 'ms-TagItem-text',
  close: 'ms-TagItem-close',
  isSelected: 'is-selected',
};

const TAG_HEIGHT = 26;

export function getStyles(props: ITagItemStyleProps): ITagItemStyles {
  const { className, theme, selected, disabled } = props;

  const { palette, effects, fonts, semanticColors } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      fonts.medium,
      getFocusStyle(theme),
      {
        boxSizing: 'content-box',
        flexShrink: '1',
        margin: 2,
        height: TAG_HEIGHT,
        lineHeight: TAG_HEIGHT,
        cursor: 'default',
        userSelect: 'none',
        display: 'flex',
        flexWrap: 'nowrap',
        maxWidth: 300,
        minWidth: 0, // needed to prevent long tags from overflowing container
        borderRadius: effects.roundedCorner2,
        color: semanticColors.inputText,
        background: palette.neutralLighter,
        selectors: {
          ':hover': [
            !disabled &&
              !selected && {
                color: palette.neutralDark,
                background: palette.neutralLight,
                selectors: {
                  '.ms-TagItem-close': {
                    color: palette.neutralPrimary,
                  },
                },
              },
            disabled && { background: palette.neutralLighter },
          ],
          [HighContrastSelector]: {
            border: `1px solid ${!selected ? 'WindowText' : 'WindowFrame'}`,
          },
        },
      },
      disabled && {
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'GrayText',
          },
        },
      },
      selected &&
        !disabled && [
          classNames.isSelected,
          {
            ':focus-within': {
              background: palette.themePrimary,
              color: palette.white,
            },
          },
        ],
      className,
    ],
    text: [
      classNames.text,
      {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minWidth: 30,
        margin: '0 8px',
      },
      disabled && {
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText',
          },
        },
      },
    ],
    close: [
      classNames.close,
      getFocusStyle(theme, { borderColor: 'transparent', inset: 1, outlineColor: palette.white }),
      {
        color: palette.neutralSecondary,
        width: 30,
        height: '100%',
        flex: '0 0 auto',
        borderRadius: getRTL(theme)
          ? `${effects.roundedCorner2} 0 0 ${effects.roundedCorner2}`
          : `0 ${effects.roundedCorner2} ${effects.roundedCorner2} 0`,
        selectors: {
          ':hover': {
            background: palette.neutralQuaternaryAlt,
            color: palette.neutralPrimary,
          },
          [`.${classNames.isSelected} &:focus`]: {
            color: palette.white,
            background: palette.themePrimary,
          },
          ':focus:hover': {
            color: palette.white,
            background: palette.themeDark,
          },
          ':active': {
            color: palette.white,
            backgroundColor: palette.themeDark,
          },
        },
      },
      disabled && {
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: palette.neutralSecondary,
          },
        },
      },
    ],
  };
}
