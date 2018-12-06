import * as React from 'react';
import { PersonaCoin } from '../PersonaCoin';
import { Text } from '../Text';
import { IVerticalPersonaComponent } from './VerticalPersona.types';

export const VerticalPersonaView: IVerticalPersonaComponent['view'] = props => {
  const { root, text, secondaryText } = props.classNames;
  const coinProps = props.coinProps || {};

  return (
    <div className={root}>
      <PersonaCoin
        text={props.text}
        size={coinProps.size}
        initials={coinProps.initials}
        imageUrl={coinProps.imageUrl}
        coinColor={coinProps.coinColor}
        initialsColor={coinProps.initialsColor}
        presence={coinProps.presence}
        onPhotoLoadingStateChange={coinProps.onPhotoLoadingStateChange}
      />
      <Text wrap className={text}>
        {props.text}
      </Text>
      <Text wrap className={secondaryText}>
        {props.secondaryText}
      </Text>
    </div>
  );
};
