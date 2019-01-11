import { getGlobalClassNames, getFocusStyle, HighContrastSelector, FontSizes } from '../../../Styling';
import { ITagItemStyleProps, ITagItemStyles } from './TagPicker.types';

const GlobalClassNames = {
  root: 'ms-TagItem',
  text: 'ms-TagItem-text',
  close: 'ms-TagItem-close',
  isSelected: 'is-selected'
};

const TAG_HEIGHT = 26;

export function getStyles(props: ITagItemStyleProps): ITagItemStyles {
  const { className, theme, selected, disabled } = props;

  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
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
        background: !selected || disabled ? palette.neutralLighter : palette.themePrimary,
        selectors: {
          ':hover': {
            background: disabled ? palette.neutralLighter : !selected ? palette.neutralLight : palette.themePrimary,
            selectors: {
              '.ms-TagItem-close': {
                color: palette.neutralPrimary
              }
            }
          },
          [HighContrastSelector]: {
            border: `1px solid ${!selected ? 'WindowText' : 'WindowFrame'}`
          }
        }
      },
      selected &&
        !disabled && [
          classNames.isSelected,
          {
            color: palette.white
          }
        ],
      className
    ],
    text: [
      classNames.text,
      {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        minWidth: 30,
        margin: '0 8px'
      }
    ],
    close: [
      classNames.close,
      {
        color: palette.neutralSecondary,
        width: 30,
        height: '100%',
        flex: '0 0 auto',
        selectors: {
          ':hover': {
            background: palette.neutralQuaternaryAlt,
            color: palette.neutralPrimary
          }
        }
      },
      selected && {
        color: palette.white,
        selectors: {
          ':hover': {
            color: palette.white,
            background: palette.themeDark
          },
          [HighContrastSelector]: {
            color: 'HighlightText'
          }
        }
      }
    ]
  };
}
