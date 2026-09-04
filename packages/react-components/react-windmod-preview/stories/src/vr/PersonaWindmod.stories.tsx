import * as React from 'react';
import { Persona } from '@fluentui/react-windmod-preview/persona';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';

import { PersonaVrScene } from './PersonaVrScene';

// Griffel picks its rtl atoms from FluentProvider context, so the RTL band needs a real
// provider on each side rather than a bare dir="rtl" element.
const Rtl = ({ children }: { children: React.ReactNode }): React.ReactNode => (
  <FluentProvider dir="rtl">{children}</FluentProvider>
);

export const PersonaWindmod = (): React.ReactNode => (
  <FluentProvider>
    <PersonaVrScene Persona={Persona} Rtl={Rtl} />
  </FluentProvider>
);
