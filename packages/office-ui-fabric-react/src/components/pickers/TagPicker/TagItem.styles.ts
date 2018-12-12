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
  const { className, theme, selected } = props;

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
        background: !selected ? palette.neutralLighter : palette.neutralQuaternary,
        selectors: {
          ':hover': {
            background: !selected ? palette.neutralLight : palette.neutralQuaternaryAlt
          },
          [HighContrastSelector]: {
            border: `1px solid ${!selected ? 'WindowText' : 'WindowFrame'}`
          }
        }
      },
      selected && [classNames.isSelected],
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
        cursor: 'pointer',
        color: palette.neutralSecondary,
        fontSize: FontSizes.small,
        display: 'inline-block',
        textAlign: 'center',
        verticalAlign: 'top',
        width: 30,
        height: '100%',
        flexShrink: 0
      }
    ]
  };
}
