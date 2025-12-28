import * as React from 'react';
import { VerticalPersona } from './Vertical/VerticalPersona';
import { Persona as HorizontalPersona } from '@fluentui/react';
import type { IHorizontalPersonaProps } from './Persona.types';
import type { IVerticalPersonaProps } from './Vertical/VerticalPersona.types';
import type { JSXElement } from '@fluentui/utilities';

export const Persona = (props: IVerticalPersonaProps | IHorizontalPersonaProps): JSXElement => {
  return props.vertical === true ? <VerticalPersona {...props} /> : <HorizontalPersona {...props} />;
};
