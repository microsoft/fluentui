import * as React from 'react';
import { PersonaInitialsExample } from './Persona.Initials.Example';

import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { PersonaBasicExample } from './Persona.Basic.Example';
import { PersonaAlternateExample } from './Persona.Alternate.Example';
import { PersonaColorsExample } from './Persona.Colors.Example';
import { PersonaCustomRenderExample } from './Persona.CustomRender.Example';
import { PersonaCustomCoinRenderExample } from './Persona.CustomCoinRender.Example';
import { UnknownPersonaExample } from './Persona.UnknownPersona.Example';
import { PersonaPresenceExample } from './Persona.Presence.Example';

const PersonaInitialsExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/Persona.Initials.Example.tsx') as string;
const PersonaBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/Persona.Basic.Example.tsx') as string;
const PersonaAlternateExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/Persona.Alternate.Example.tsx') as string;
const PersonaColorsExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/Persona.Colors.Example.tsx') as string;
const PersonaCustomRenderExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/Persona.CustomRender.Example.tsx') as string;
const PersonaCustomCoinRenderExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/Persona.CustomCoinRender.Example.tsx') as string;
const UnknownPersonaExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/Persona.UnknownPersona.Example.tsx') as string;
const PersonaPresenceExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/Persona.Presence.Example.tsx') as string;

export const PersonaPageProps: IDocPageProps = {
  title: 'Persona',
  componentName: 'Persona',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Persona',
  examples: [
    {
      title: 'Persona in various sizes',
      code: PersonaBasicExampleCode,
      view: <PersonaBasicExample />,
    },
    {
      title: 'Alternative small personas',
      code: PersonaAlternateExampleCode,
      view: <PersonaAlternateExample />,
    },
    {
      title: 'Persona with initials',
      code: PersonaInitialsExampleCode,
      view: <PersonaInitialsExample />,
    },
    {
      title: 'PersonaCoin colors',
      code: PersonaColorsExampleCode,
      view: <PersonaColorsExample />,
    },
    {
      title: 'Rendering custom persona text',
      code: PersonaCustomRenderExampleCode,
      view: <PersonaCustomRenderExample />,
    },
    {
      title: 'Rendering custom coin',
      code: PersonaCustomCoinRenderExampleCode,
      view: <PersonaCustomCoinRenderExample />,
    },
    {
      title: 'Rendering unknown persona coin',
      code: UnknownPersonaExampleCode,
      view: <UnknownPersonaExample />,
    },
    {
      title: 'Persona Presence',
      code: PersonaPresenceExampleCode,
      view: <PersonaPresenceExample />,
    },
  ],
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/docs/PersonaOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Persona/docs/PersonaBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
