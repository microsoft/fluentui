import * as React from 'react';
import { VerticalPersona } from './Vertical/VerticalPersona';
import { Persona as HorizontalPersona } from '@fluentui/react';
import { IHorizontalPersonaProps } from './Persona.types';
import { IVerticalPersonaProps } from './Vertical/VerticalPersona.types';

export const Persona = (props: IVerticalPersonaProps | IHorizontalPersonaProps): JSX.Element => {
  return props.vertical === true ? <VerticalPersona {...props} /> : <HorizontalPersona {...props} />;
};
