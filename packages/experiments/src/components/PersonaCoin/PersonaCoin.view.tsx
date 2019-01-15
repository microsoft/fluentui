/** @jsx withSlots */
import { withSlots, getSlots } from '../../Foundation';
import { PersonaPresence } from '../../utilities/factoryComponents';
import { IPersonaCoinComponent, IPersonaCoinProps, IPersonaCoinSlots } from './PersonaCoin.types';
import { PersonaCoinImage } from './PersonaCoinImage/PersonaCoinImage';
import { DEFAULT_PERSONA_COIN_SIZE } from './PersonaCoin.styles';
import { hideInitialsWhenImageIsLoaded } from './propHelpers';
import CoinAlternativeForSmallestSize from './CoinAlternativeForSmallestSize/CoinAlternativeForSmallestSize';
import { PersonaCoinInitials } from './PersonaCoinInitials/PersonaCoinInitials';

export const PersonaCoinView: IPersonaCoinComponent['view'] = props => {
  const coinSize = props.size || DEFAULT_PERSONA_COIN_SIZE;

  const Slots = getSlots<IPersonaCoinProps, IPersonaCoinSlots>(props, {
    root: 'div',
    image: PersonaCoinImage,
    initials: PersonaCoinInitials,
    presence: PersonaPresence,
    coinAlternativeForSmallestSize: CoinAlternativeForSmallestSize
  });

  if (coinSize === 10) {
    if (props.presence) {
      // TODO: why do we need to pass size twice?
      return <Slots.presence coinSize={coinSize} size={coinSize} />;
    }
    return <Slots.coinAlternativeForSmallestSize />;
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
      <Slots.presence coinSize={coinSize} size={coinSize} />
    </Slots.root>
  );
};
