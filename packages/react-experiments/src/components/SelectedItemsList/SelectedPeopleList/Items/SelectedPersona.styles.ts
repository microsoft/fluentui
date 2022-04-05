import { FontSizes } from '@fluentui/react/lib/Styling';
import { HighContrastSelector } from '@fluentui/react/lib/Styling';
import type { ISelectedPersonaStyleProps, ISelectedPersonaStyles } from './SelectedPersona.types';

export const getStyles = (props: ISelectedPersonaStyleProps): ISelectedPersonaStyles => {
  const { theme: maybeTheme, isSelected, isValid, buttonSize } = props;
  // theme is actually non-nullable (supplied by styles)
  const theme = maybeTheme!;
  const { palette } = theme;

  return {
    personaContainer: [
      {
        borderRadius: 15,
        display: 'inline-flex',
        alignItems: 'center',
        background: palette.themeLighterAlt,
        margin: 4,
        cursor: 'default',
        userSelect: 'none',
        verticalAlign: 'middle',
        position: 'relative',

        // hover + selected hover state
        ':hover': {
          background: isSelected ? palette.themePrimary : palette.themeLighter,

          // high contrast hover state
          [HighContrastSelector]: {
            border: '1px solid ButtonText',
            color: 'HighlightText',
            background: 'Highlight',

            // persona text
            ['.ms-PickerItem-content']: {
              color: 'HighlightText',
            },

            // remove/expand buttons
            ['.ms-PickerItem-removeButton']: {
              color: 'HighlightText',
            },
          },
        },

        // high contrast normal state
        [HighContrastSelector]: {
          border: '1px solid ButtonText',
          color: !isValid ? palette.red : 'ButtonText',
          background: 'ButtonFace',
          '-ms-high-contrast-adjust': 'none',

          // remove/expand buttons
          ['.ms-PickerItem-removeButton']: {
            color: 'ButtonText',
          },
        },
      },
      isSelected && {
        background: palette.themePrimary,

        // high contrast selected state
        [HighContrastSelector]: {
          color: 'HighlightText',
          background: 'Highlight',

          // remove/expand buttons
          ['.ms-PickerItem-removeButton']: {
            color: 'HighlightText',
          },
        },
      },
    ],
    personaWrapper: {
      position: 'relative',
      display: 'inherit',
    },
    expandButton: {
      borderRadius: '15px 0px 0px 15px',
      height: 32,
      width: 44,
      paddingRight: 16,
      position: 'inherit',
      display: 'flex',
      marginRight: -17,
    },
    removeButton: {
      borderRadius: 15,
      flex: '0 0 auto',
      width: buttonSize,
      height: buttonSize,
    },
    itemContentWrapper: {
      flex: '0 1 auto',
      minWidth: 0,
      /** Needed for IE 11 to properly truncate long persona names in the picker **/
      maxWidth: '100%',
    },
    subComponentStyles: {
      personaStyles: {
        root: {
          // use color logic from personaContainer
          color: 'inherit',
        },
        // primary text in personas
        primaryText: [
          {
            color: !isValid ? palette.red : palette.themeDark,
            fontSize: FontSizes.medium,

            ':hover': {
              color: !isValid ? palette.red : palette.themeDark,

              // high contrast: use color logic from personaContainer
              [HighContrastSelector]: {
                color: 'inherit',
              },
            },

            // high contrast: use color logic from personaContainer
            [HighContrastSelector]: {
              color: 'inherit',
            },
          },
          isSelected && {
            color: palette.white,

            ':hover': {
              color: palette.white,
            },
          },
        ],
        details: {
          padding: '0 8px',
        },
      },
      personaCoinStyles: {
        initials: isValid
          ? {}
          : {
              fontSize: 20,
            },
      },
      actionButtonStyles: {
        // root element for remove/expand button
        root: [
          {
            color: palette.themeDark,

            [HighContrastSelector]: {
              // high contrast: use color logic from personaContainer
              color: 'inherit',
              backgroundColor: 'inherit',
            },
          },
          isSelected && {
            color: palette.white,
          },
        ],
        rootHovered: [
          {
            color: palette.themeDark,
            backgroundColor: palette.themeLight,

            [HighContrastSelector]: {
              // high contrast: use color logic from personaContainer
              color: 'inherit',
              background: 'inherit',
            },
          },
          isSelected && {
            color: palette.white,
            backgroundColor: palette.themeDarkAlt,
          },
        ],
        rootPressed: {
          color: palette.white,
          backgroundColor: palette.themeDarkAlt,

          [HighContrastSelector]: {
            // high contrast: use color logic from personaContainer
            color: 'inherit',
            background: 'inherit',
          },
        },
      },
    },
  };
};
