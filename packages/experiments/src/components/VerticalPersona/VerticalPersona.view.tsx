import * as React from 'react';
import { PersonaCoin } from '../PersonaCoin';
// tslint:disable-next-line
import { initialsColorPropToColorCode } from '../../../../../packages/office-ui-fabric-react/src/components/Persona/PersonaInitialsColor';

import { IVerticalPersonaComponent } from './VerticalPersona.types';

export const VerticalPersonaView: IVerticalPersonaComponent['view'] = props => {
  const { root, text, secondaryText } = props.classNames;

  return (
    <div className={root}>
      <PersonaCoin
        size={props.size}
        initials={props.initials}
        imageUrl={props.imageUrl}
        color={initialsColorPropToColorCode({ text: props.text })}
      />
      <div className={text}>{props.text}</div>
      <div className={secondaryText}>{props.secondaryText}</div>
    </div>
  );
};
