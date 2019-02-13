import * as React from 'react';
import { PersonaInitialsExample } from './examples/Persona.Initials.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { PersonaBasicExample } from './examples/Persona.Basic.Example';
import { PersonaAlternateExample } from './examples/Persona.Alternate.Example';
import { PersonaCustomRenderExample } from './examples/Persona.CustomRender.Example';
import { PersonaCustomCoinRenderExample } from './examples/Persona.CustomCoinRender.Example';
import { UnknownPersonaExample } from './examples/Persona.UnknownPersona.Example';
import { PersonaStatus } from './Persona.checklist';

const PersonaInitialsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Initials.Example.tsx') as string;
const PersonaBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Basic.Example.tsx') as string;
const PersonaAlternateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Alternate.Example.tsx') as string;
const PersonaCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomRender.Example.tsx') as string;
const PersonaCustomCoinRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomCoinRender.Example.tsx') as string;
const UnknownPersonaExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.UnknownPersona.Example.tsx') as string;

export const PersonaPageProps: IDocPageProps = {
  title: 'Persona',
  componentName: 'Persona',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Persona',
  componentStatus: PersonaStatus,
  examples: [
    {
      title: 'Persona in various sizes',
      code: PersonaBasicExampleCode,
      view: <PersonaBasicExample />
    },
    {
      title: 'Alternative small personas',
      code: PersonaAlternateExampleCode,
      view: <PersonaAlternateExample />
    },
    {
      title: 'Persona with initials',
      code: PersonaInitialsExampleCode,
      view: <PersonaInitialsExample />,
      isScrollable: false
    },
    {
      title: 'Rendering custom persona text',
      code: PersonaCustomRenderExampleCode,
      view: <PersonaCustomRenderExample />
    },
    {
      title: 'Rendering custom coin',
      code: PersonaCustomCoinRenderExampleCode,
      view: <PersonaCustomCoinRenderExample />
    },
    {
      title: 'Rendering unknown persona coin',
      code: UnknownPersonaExampleCode,
      view: <UnknownPersonaExample />
    }
  ],
  propertiesTablesSources: [require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/Persona.types.ts')],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
