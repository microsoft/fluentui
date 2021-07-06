import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PersonaPageProps } from '@fluentui/react-examples/lib/react/Persona/Persona.doc';

export const PersonaPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@fluentui/api-docs/lib/pages/react/Persona.page.json')}
    {...{ ...PersonaPageProps, ...props }}
  />
);
