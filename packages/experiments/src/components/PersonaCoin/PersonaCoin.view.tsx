import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { Text } from '../../Text';
import { IPersonaCoinComponent } from './PersonaCoin.types';
import { PersonaCoinImage } from './PersonaCoinImage/PersonaCoinImage';
import { PersonaPresence } from 'office-ui-fabric-react/lib/PersonaPresence';
import { getInitials, getRTL } from '../../Utilities';
import { DEFAULT_PERSONA_COIN_SIZE } from './PersonaCoin.styles';

const PersonaCoinInitials: IPersonaCoinComponent['view'] = props => {
  const initials = props.initials || getInitials(props.text, getRTL(), props.allowPhoneInitials);

  if (initials) {
    return <Text className={props.classNames.initials}>{initials}</Text>;
  }

  return <Icon className={props.classNames.initials} iconName="Contact" />;
};

export const PersonaCoinView: IPersonaCoinComponent['view'] = props => {
  const coinSize = props.size || DEFAULT_PERSONA_COIN_SIZE;

  return (
    <div className={props.classNames.root}>
      <PersonaCoinInitials
        coinColor={props.coinColor}
        initials={props.initials}
        text={props.text}
        allowPhoneInitials={props.allowPhoneInitials}
        classNames={props.classNames}
      />
      <PersonaCoinImage
        classNames={props.classNames}
        src={props.imageUrl}
        dimension={coinSize}
        onPhotoLoadingStateChange={props.onPhotoLoadingStateChange}
        imageShouldFadeIn={props.imageShouldFadeIn}
        imageShouldStartVisible={props.imageShouldStartVisible}
        imageAlt={props.imageAlt}
      />
      {props.presence ? <PersonaPresence presence={props.presence} coinSize={coinSize} size={coinSize} styles={props.classNames} /> : null}
    </div>
  );
};
