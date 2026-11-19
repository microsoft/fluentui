import * as React from 'react';
import { FluentProvider, Persona, webLightTheme } from '@fluentui/react-components';

import { PersonaVrScene } from './PersonaVrScene';

const Rtl = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <FluentProvider theme={webLightTheme} dir="rtl">
    {children}
  </FluentProvider>
);

export const PersonaGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
    <PersonaVrScene Persona={Persona} Rtl={Rtl} />
  </FluentProvider>
);
