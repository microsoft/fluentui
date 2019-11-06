import { IPersonaStyleProps, IPersonaStyles, PersonaSize, sizeBoolean, IPersonaCoinStyles } from 'office-ui-fabric-react/lib/Persona';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';

export const PersonaStyles = (props: IPersonaStyleProps): Partial<IPersonaStyles> => {
  const size = sizeBoolean(props.size as PersonaSize);
  const {
    theme: { fonts }
  } = props;

  return {
    primaryText: [
      {
        fontSize: fonts.large.fontSize
      },
      (size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32 || size.isSize40) && {
        fontSize: fonts.medium.fontSize
      },
      size.isSize72 && {
        fontSize: fonts.xLarge.fontSize
      },
      size.isSize100 && {
        fontSize: fonts.xLarge.fontSize,
        fontWeight: FontWeights.semilight
      }
    ],
    tertiaryText: {
      fontSize: fonts.small.fontSize
    },
    optionalText: {
      fontSize: fonts.small.fontSize
    }
  };
};

export const PersonaCoinStyles: Partial<IPersonaCoinStyles> = {
  initials: {
    fontWeight: FontWeights.regular,
    selectors: {
      i: {
        fontWeight: FontWeights.regular
      }
    }
  }
};
