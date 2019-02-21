import { IPersonaStyleProps, IPersonaStyles, PersonaSize, sizeBoolean } from 'office-ui-fabric-react/lib/Persona';
import { FontSizes } from '../FluentType';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';

export const PersonaStyles = (props: IPersonaStyleProps): Partial<IPersonaStyles> => {
  const size = sizeBoolean(props.size as PersonaSize);
  const { theme } = props;
  const { palette } = theme;

  return {
    primaryText: [
      size.isSize100 && {
        fontSize: FontSizes.size20,
        fontWeight: FontWeights.regular
      },
      size.isSize72 && {
        fontSize: FontSizes.size20
      },
      size.isSize48 && {
        fontSize: FontSizes.size16
      }
    ],
    secondaryText: {
      color: palette.neutralSecondary
    },
    tertiaryText: {
      fontSize: FontSizes.size14,
      color: palette.neutralSecondary
    },
    optionalText: {
      color: palette.neutralSecondary
    }
  };
};
