/** @jsxRuntime classic */
/** @jsx withSlots */
import { withSlots, getSlots } from '@fluentui/foundation-legacy';
import { PersonaPresence } from '../../utilities/factoryComponents';
import { PersonaCoinImage } from './PersonaCoinImage/PersonaCoinImage';
import { DEFAULT_PERSONA_COIN_SIZE } from './PersonaCoin.styles';
import { hideInitialsWhenImageIsLoaded } from './propHelpers';
import PersonaCoinSize10 from './PersonaCoinSize10/PersonaCoinSize10';
import { PersonaCoinInitials } from './PersonaCoinInitials/PersonaCoinInitials';
import type { IPersonaCoinComponent, IPersonaCoinProps, IPersonaCoinSlots } from './PersonaCoin.types';
import { PersonaSize } from '@fluentui/react';

export const PersonaCoinView: IPersonaCoinComponent['view'] = props => {
  const coinSize = props.size || DEFAULT_PERSONA_COIN_SIZE;

  const Slots = getSlots<IPersonaCoinProps, IPersonaCoinSlots>(props, {
    root: 'div',
    image: PersonaCoinImage,
    initials: PersonaCoinInitials,
    presence: PersonaPresence,
    personaCoinSize10: PersonaCoinSize10,
  });

  if (coinSize === 10) {
    if (props.presence) {
      // TODO: why do we need to pass size twice?
      return <Slots.presence coinSize={coinSize} size={coinSize} />;
    }
    return <Slots.personaCoinSize10 />;
  }

  const initials = hideInitialsWhenImageIsLoaded(props) ? null : (
    <Slots.initials initials={props.initials} text={props.text} allowPhoneInitials={props.allowPhoneInitials} />
  );

  return (
    <Slots.root>
      {initials}
      <Slots.image
        src={props.imageUrl}
        dimension={coinSize}
        onPhotoLoadingStateChange={props.onPhotoLoadingStateChange}
        imageShouldFadeIn={props.imageShouldFadeIn}
        imageShouldStartVisible={props.imageShouldStartVisible}
        imageAlt={props.imageAlt}
      />
      <Slots.presence coinSize={coinSize} size={coinSize as PersonaSize} />
    </Slots.root>
  );
};
