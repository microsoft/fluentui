import * as React from 'react';
import { PersonaCoin } from '@uifabric/experiments/lib/PersonaCoin';
import { IVerticalPersonaComponent } from './VerticalPersona.types';
import { PersonaText } from './PersonaText';

export const VerticalPersonaView: IVerticalPersonaComponent['view'] = props => {
  const classNames = props.classNames;
  const coinProps = props.coinProps || {};

  return (
    <div className={classNames.root}>
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
      <PersonaText className={classNames.text}>{props.text}</PersonaText>
      <PersonaText className={classNames.secondaryText}>{props.secondaryText}</PersonaText>
    </div>
  );
};
