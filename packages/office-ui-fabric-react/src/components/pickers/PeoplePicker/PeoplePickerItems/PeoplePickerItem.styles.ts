import { getGlobalClassNames, getFocusStyle, HighContrastSelector, IStyle } from '../../../../Styling';
import { IPeoplePickerItemStyleProps, IPeoplePickerItemStyles } from './PeoplePickerItem.types';

const GlobalClassNames = {
  root: 'ms-PickerPersona-container',
  itemContent: 'ms-PickerItem-content',
  removeButton: 'ms-PickerItem-removeButton',
  isSelected: 'is-selected',
  isInvalid: 'is-invalid'
};

export function getStyles(props: IPeoplePickerItemStyleProps): IPeoplePickerItemStyles {
  const { className, theme, selected, invalid } = props;

  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const personaPrimaryTextStyles: IStyle = [
    selected && {
      color: palette.white,
      selectors: {
        [HighContrastSelector]: {
          color: 'HighlightText'
        }
      }
    },
    invalid && [
      {
        color: palette.redDark,
        borderBottom: `2px dotted ${palette.redDark}`
      },
      selected && {
        color: palette.white,
        borderBottomColor: palette.white
      }
    ]
  ];
  const personaInitialsStyles: IStyle = [
    invalid && {
      fontSize: 20 // does not exist on the FontSizes type ramp.
    }
  ];

  return {
    root: [
      classNames.root,
      getFocusStyle(theme, -2),
      {
        borderRadius: 15,
        display: 'inline-flex',
        alignItems: 'center',
        background: palette.neutralLighter,
        margin: '1px 2px',
        cursor: 'default',
        userSelect: 'none',
        maxWidth: 300,
        verticalAlign: 'middle',
        selectors: {
          ':hover': {
            background: palette.neutralLight
          },
          [HighContrastSelector]: {
            border: '1px solid WindowText'
          }
        }
      },
      selected && [
        classNames.isSelected,
        {
          background: palette.themePrimary,
          selectors: {
            [HighContrastSelector]: {
              borderColor: 'HighLight',
              background: 'Highlight'
            }
          }
        }
      ],
      invalid && [classNames.isInvalid],
      invalid &&
        selected && {
          background: palette.redDark
        },
      className
    ],
    itemContent: [
      classNames.itemContent,
      {
        flex: '0 1 auto',
        minWidth: 0,
        // CSS below is needed for IE 11 to properly truncate long persona names in the picker
        // and to clip the presence indicator (in all browsers)
        maxWidth: '100%',
        overflow: 'hidden'
      }
    ],
    removeButton: [
      classNames.removeButton,
      {
        borderRadius: 15,
        flex: '0 0 auto',
        width: 28,
        height: 28,
        flexBasis: 28,
        selectors: {
          ':hover': {
            background: palette.neutralTertiaryAlt,
            color: palette.neutralDark
          }
        }
      },
      selected && [
        {
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
        },
        invalid && {
          selectors: {
            ':hover': {
              background: palette.red
            }
          }
        }
      ]
    ],
    subComponentStyles: {
      persona: {
        primaryText: [personaPrimaryTextStyles]
      },
      personaCoin: {
        initials: [personaInitialsStyles]
      }
    }
  };
}
