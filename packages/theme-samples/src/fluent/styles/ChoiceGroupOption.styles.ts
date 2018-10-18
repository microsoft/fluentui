import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { NeutralColors } from '../FluentColors';

export const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): IChoiceGroupOptionStyles => {
  const { checked, disabled, theme, hasIcon, hasImage } = props;
  const { semanticColors, palette } = theme;
  return {
    field: [
      {
        selectors: {
          // The circle
          ':before': [
            {
              borderColor: semanticColors.bodyText
            },
            disabled && {
              backgroundColor: semanticColors.bodyBackground,
              borderColor: semanticColors.disabledBodyText
            },
            checked &&
              !disabled && {
                borderColor: semanticColors.inputBackgroundChecked
              },
            (hasIcon || hasImage) &&
              disabled &&
              checked && {
                opacity: 1
              }
          ],
          // The dot
          ':after': [
            checked &&
              disabled && {
                borderColor: palette.neutralTertiaryAlt
              }
          ],
          ':hover': [
            !disabled && {
              selectors: {
                '.ms-ChoiceFieldLabel': {
                  color: palette.neutralDark
                },
                ':before': {
                  borderColor: checked ? palette.themeDark : semanticColors.bodyText
                },
                ':after': [
                  !hasIcon &&
                    !hasImage &&
                    !checked && {
                      content: '""',
                      transitionProperty: 'background-color',
                      left: 5,
                      top: 5,
                      width: 10,
                      height: 10,
                      backgroundColor: NeutralColors.gray120 // color not in the palette or semanticColors
                    },
                  checked && {
                    borderColor: palette.themeDark
                  }
                ]
              }
            }
          ]
        }
      },
      (hasIcon || hasImage) &&
        !disabled && {
          selectors: {
            ':hover': {
              borderColor: checked ? palette.themeDark : semanticColors.bodyText
            }
          }
        },
      (hasIcon || hasImage) && {
        borderWidth: 1
      },
      disabled && {
        selectors: {
          '.ms-ChoiceFieldLabel': {
            color: semanticColors.disabledText
          }
        }
      },
      checked &&
        disabled && {
          borderColor: semanticColors.disabledBackground
        }
    ],
    choiceFieldWrapper: {
      selectors: {
        '&.is-inFocus': {
          selectors: {
            ':after': {
              borderColor: semanticColors.focusBorder
            }
          }
        }
      }
    }
  };
};
