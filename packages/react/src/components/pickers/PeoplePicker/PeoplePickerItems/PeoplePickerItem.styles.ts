import {
  getGlobalClassNames,
  getFocusStyle,
  HighContrastSelector,
  getHighContrastNoAdjustStyle,
} from '../../../../Styling';
import { ButtonGlobalClassNames } from '../../../Button/BaseButton.classNames';
import type { IStyle } from '../../../../Styling';
import type { IPeoplePickerItemSelectedStyleProps, IPeoplePickerItemSelectedStyles } from './PeoplePickerItem.types';

const GlobalClassNames = {
  root: 'ms-PickerPersona-container',
  itemContent: 'ms-PickerItem-content',
  removeButton: 'ms-PickerItem-removeButton',
  isSelected: 'is-selected',
  isInvalid: 'is-invalid',
};

const REMOVE_BUTTON_SIZE = 24;

export function getStyles(props: IPeoplePickerItemSelectedStyleProps): IPeoplePickerItemSelectedStyles {
  const { className, theme, selected, invalid, disabled } = props;

  const { palette, semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const personaPrimaryTextStyles: IStyle = [
    selected &&
      !invalid &&
      !disabled && {
        color: palette.white,
        selectors: {
          ':hover': {
            color: palette.white,
          },
          [HighContrastSelector]: {
            color: 'HighlightText',
          },
        },
      },
    ((invalid && !selected) || (invalid && selected && disabled)) && {
      color: palette.redDark,
      borderBottom: `2px dotted ${palette.redDark}`,
      selectors: {
        [`.${classNames.root}:hover &`]: {
          // override Persona root:hover selector
          color: palette.redDark,
        },
      },
    },
    invalid &&
      selected &&
      !disabled && {
        color: palette.white,
        borderBottom: `2px dotted ${palette.white}`,
      },
    disabled && {
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
        },
      },
    },
  ];

  const personaSecondaryTextStyles: IStyle = [
    selected &&
      !invalid &&
      !disabled && {
        color: palette.white,
        selectors: {
          ':hover': {
            color: palette.white,
          },
          [HighContrastSelector]: {
            color: 'HighlightText',
          },
        },
      },
  ];

  const personaCoinInitialsStyles: IStyle = [
    invalid && {
      fontSize: fonts.xLarge.fontSize,
    },
  ];

  return {
    root: [
      classNames.root,
      getFocusStyle(theme, { inset: -2 }),
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
        minWidth: 0,
        selectors: {
          ':hover': {
            background: !selected && !disabled ? palette.neutralLight : '',
          },
          [HighContrastSelector]: [{ border: '1px solid WindowText' }, disabled && { borderColor: 'GrayText' }],
        },
      },
      selected &&
        !disabled && [
          classNames.isSelected,
          {
            background: palette.themePrimary,
            selectors: {
              [HighContrastSelector]: {
                borderColor: 'HighLight',
                background: 'Highlight',
                ...getHighContrastNoAdjustStyle(),
              },
            },
          },
        ],
      invalid && [classNames.isInvalid],
      invalid &&
        selected &&
        !disabled && {
          background: palette.redDark,
        },
      className,
    ],
    itemContent: [
      classNames.itemContent,
      {
        flex: '0 1 auto',
        minWidth: 0,
        // CSS below is needed for IE 11 to properly truncate long persona names in the picker
        // and to clip the presence indicator (in all browsers)
        maxWidth: '100%',
        overflow: 'hidden',
      },
    ],
    removeButton: [
      classNames.removeButton,
      {
        borderRadius: 15,
        color: palette.neutralPrimary,
        flex: '0 0 auto',
        width: REMOVE_BUTTON_SIZE,
        height: REMOVE_BUTTON_SIZE,
        selectors: {
          ':hover': {
            background: palette.neutralTertiaryAlt,
            color: palette.neutralDark,
          },
        },
      },
      selected && [
        {
          color: palette.white,
          selectors: {
            ':hover': {
              color: palette.white,
              background: palette.themeDark,
            },
            ':active': {
              color: palette.white,
              background: palette.themeDarker,
            },
            [HighContrastSelector]: {
              color: 'HighlightText',
            },
          },
        },
        invalid && {
          selectors: {
            ':hover': {
              background: palette.red,
            },
            ':active': {
              background: palette.redDark,
            },
          },
        },
      ],
      disabled && {
        selectors: {
          [`.${ButtonGlobalClassNames.msButtonIcon}`]: {
            color: semanticColors.buttonText,
          },
        },
      },
    ],
    subComponentStyles: {
      persona: {
        primaryText: personaPrimaryTextStyles,
        secondaryText: personaSecondaryTextStyles,
      },
      personaCoin: {
        initials: personaCoinInitialsStyles,
      },
    },
  };
}
