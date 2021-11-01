import * as React from 'react';
import { DemoPage } from '../DemoPage';

import { PersonaPageProps } from '@fluentui/react-examples/lib/react/Persona/Persona.doc';

export const PersonaPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Persona.page.json')} {...{ ...PersonaPageProps, ...props }} />
);
