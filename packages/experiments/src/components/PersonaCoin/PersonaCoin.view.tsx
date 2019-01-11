/** @jsx withSlots */
import { Icon } from 'office-ui-fabric-react';
import { withSlots, getSlots } from '../../Foundation';
import { PersonaPresence } from '../../utilities/factoryComponents';
import { Text } from '../../Text';
import { IPersonaCoinComponent, IPersonaCoinProps, IPersonaCoinSlots } from './PersonaCoin.types';
import { PersonaCoinImage } from './PersonaCoinImage/PersonaCoinImage';
import { getInitials, getRTL } from '../../Utilities';
import { DEFAULT_PERSONA_COIN_SIZE } from './PersonaCoin.styles';

const PersonaCoinInitials: IPersonaCoinComponent['view'] = props => {
  const initials = (typeof props.initials === 'string' && props.initials) || getInitials(props.text, getRTL(), props.allowPhoneInitials);

  if (initials) {
    return <Text className={props.className}>{initials}</Text>;
  }

  return <Icon iconName="Contact" className={props.className} />;
};

export const PersonaCoinView: IPersonaCoinComponent['view'] = props => {
  const coinSize = props.size || DEFAULT_PERSONA_COIN_SIZE;

  const Slots = getSlots<IPersonaCoinProps, IPersonaCoinSlots>(props, {
    root: 'div',
    image: PersonaCoinImage,
    initials: PersonaCoinInitials,
    presence: PersonaPresence
  });

  return (
    <Slots.root>
      <Slots.initials initials={props.initials} text={props.text} allowPhoneInitials={props.allowPhoneInitials} />
      <Slots.image
        src={props.imageUrl}
        dimension={coinSize}
        onPhotoLoadingStateChange={props.onPhotoLoadingStateChange}
        imageShouldFadeIn={props.imageShouldFadeIn}
        imageShouldStartVisible={props.imageShouldStartVisible}
        imageAlt={props.imageAlt}
      />
      <Slots.presence coinSize={coinSize} size={coinSize} />
    </Slots.root>
  );
};
