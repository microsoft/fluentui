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
const PICKER_PERSONA_RADIUS = 15;

export function getStyles(props: IPeoplePickerItemSelectedStyleProps): IPeoplePickerItemSelectedStyles {
  const { className, theme, selected, invalid, disabled } = props;

  const { palette, semanticColors, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const personaRootStyles: IStyle = {
    color: 'inherit',
  };

  // set text color to inherit to allow focus styles to control persona text colors
  const personaPrimaryTextStyles: IStyle = [
    selected &&
      !invalid &&
      !disabled && {
        color: 'inherit',
        selectors: {
          ':hover': {
            color: 'inherit',
          },
          [HighContrastSelector]: {
            color: 'HighlightText',
          },
        },
      },
    ((invalid && !selected) || (invalid && selected && disabled)) && {
      color: 'inherit',
      borderBottom: `2px dotted currentColor`,
      selectors: {
        [`.${classNames.root}:hover &`]: {
          // override Persona root:hover selector
          color: 'inherit',
        },
      },
    },
    invalid &&
      selected &&
      !disabled && {
        color: 'inherit',
        borderBottom: `2px dotted currentColor`,
        selectors: {
          ':hover': {
            color: 'inherit',
          },
        },
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
        color: 'inherit',
        selectors: {
          ':hover': {
            color: 'inherit',
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
        borderRadius: PICKER_PERSONA_RADIUS,
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
            selectors: {
              ':focus-within': {
                background: palette.themePrimary,
                color: palette.white,
              },
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
          ':focus-within': {
            background: palette.redDark,
            color: palette.white,
          },
        },
      ((invalid && !selected) || (invalid && selected && disabled)) && {
        color: palette.redDark,
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
        borderRadius: PICKER_PERSONA_RADIUS,
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
        getFocusStyle(theme, {
          inset: 2,
          borderColor: 'transparent',
          highContrastStyle: { inset: 2, left: 1, top: 1, bottom: 1, right: 1, outlineColor: 'ButtonText' },
          outlineColor: palette.white,
          borderRadius: PICKER_PERSONA_RADIUS,
        }),
        {
          selectors: {
            ':hover': {
              color: palette.white,
              background: palette.themeDark,
            },
            ':active': {
              color: palette.white,
              background: palette.themeDarker,
            },
            ':focus': {
              color: palette.white,
            },
            [HighContrastSelector]: {
              color: 'HighlightText',
            },
          },
        },
        invalid && {
          selectors: {
            ':hover': {
              color: palette.white,
              background: palette.red,
            },
            ':active': {
              color: palette.white,
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
        root: personaRootStyles,
        primaryText: personaPrimaryTextStyles,
        secondaryText: personaSecondaryTextStyles,
      },
      personaCoin: {
        initials: personaCoinInitialsStyles,
      },
    },
  };
}
