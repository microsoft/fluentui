import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from 'office-ui-fabric-react/lib/ChoiceGroup';

export const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): Partial<IChoiceGroupOptionStyles> => {
  const { checked, disabled, theme, hasIcon, hasImage } = props;
  const { palette } = theme;
  return {
    field: [
      (hasIcon || hasImage) &&
        !disabled && {
          selectors: {
            ':hover': {
              borderColor: checked ? palette.themeDark : palette.neutralTertiaryAlt
            }
          }
        },
      (hasIcon || hasImage) && {
        borderWidth: 2
      },
      disabled &&
        !checked && {
          selectors: {
            ':before': {
              backgroundColor: palette.neutralTertiary,
              borderColor: palette.neutralTertiary
            }
          }
        }
    ]
  };
};
