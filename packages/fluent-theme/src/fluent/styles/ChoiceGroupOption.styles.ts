import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';

export const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): Partial<IChoiceGroupOptionStyles> => {
  const { checked, disabled, theme, hasIcon, hasImage } = props;
  const { semanticColors, palette } = theme;
  const labelWrapperLineHeight = 15;

  return {
    field: [
      {
        selectors: {
          // The circle
          ':before': [
            {
              borderColor: palette.neutralPrimary
            },
            disabled && {
              backgroundColor: semanticColors.bodyBackground, // using semanticColor to override unnecessary ternary check at source styles
              borderColor: palette.neutralTertiaryAlt
            },
            checked &&
              !disabled && {
                borderColor: semanticColors.inputBackgroundChecked // re-assign the semanticColor after changing it above
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
                  borderColor: checked ? palette.themeDark : palette.neutralPrimary
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
                      backgroundColor: palette.neutralSecondary
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
      (hasIcon || hasImage) && {
        paddingTop: 23
      },
      (hasIcon || hasImage) &&
        !disabled && {
          selectors: {
            ':hover': {
              borderColor: checked ? palette.themeDark : palette.neutralPrimary
            }
          }
        },
      (hasIcon || hasImage) && {
        borderWidth: 1
      },
      disabled && {
        selectors: {
          '.ms-ChoiceFieldLabel': {
            color: palette.neutralTertiary
          }
        }
      },
      checked &&
        disabled && {
          borderColor: palette.neutralLighter
        }
    ],
    innerField: [
      (hasIcon || hasImage) && {
        paddingLeft: 31,
        paddingRight: 31
      }
    ],
    labelWrapper: [
      (hasIcon || hasImage) && {
        height: labelWrapperLineHeight * 2 + 1
      }
    ],
    choiceFieldWrapper: {
      selectors: {
        '&.is-inFocus': {
          selectors: {
            ':after': {
              borderColor: palette.neutralSecondary
            }
          }
        }
      }
    }
  };
};
