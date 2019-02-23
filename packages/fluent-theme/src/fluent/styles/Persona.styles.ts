import { IPersonaStyleProps, IPersonaStyles, PersonaSize, sizeBoolean } from 'office-ui-fabric-react/lib/Persona';
import { FontSizes } from '../FluentType';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';

export const PersonaStyles = (props: IPersonaStyleProps): Partial<IPersonaStyles> => {
  const size = sizeBoolean(props.size as PersonaSize);

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
    tertiaryText: {
      fontSize: FontSizes.size14
    }
  };
};
