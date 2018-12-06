import * as React from 'react';
import { Icon } from 'office-ui-fabric-react';
import { Text } from '../Text';
import { IPersonaCoinComponent, IPersonaCoinProps } from './PersonaCoin.types';
import { PersonaCoinImage } from './PersonaCoinImage/PersonaCoinImage';
import { PersonaPresence } from 'office-ui-fabric-react/lib/PersonaPresence';
import { getInitials, getRTL } from '../../Utilities';

export const PersonaCoinView: IPersonaCoinComponent['view'] = props => {
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
        dimension={props.size}
        onPhotoLoadingStateChange={props.onPhotoLoadingStateChange}
        imageShouldFadeIn={props.imageShouldFadeIn}
        imageShouldStartVisible={props.imageShouldStartVisible}
        imageAlt={props.imageAlt}
      />
      {/* TODO: Re-implement PersonaPresence and it should not render when no presence is passed */}
      {props.presence ? (
        <PersonaPresence presence={props.presence} coinSize={props.size} size={props.size} styles={props.classNames} />
      ) : null}
    </div>
  );
};

const PersonaCoinInitials: IPersonaCoinComponent['view'] = props => {
  const initials = props.initials || getInitials(props.text, getRTL(), props.allowPhoneInitials);

  if (initials) {
    return <Text className={props.classNames.initials}>{initials}</Text>;
  }

  return <Icon iconName="Contact" />;
};
