import * as React from 'react';
import { PersonaInitialsExample } from './examples/Persona.Initials.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { PersonaBasicExample } from './examples/Persona.Basic.Example';
import { PersonaAlternateExample } from './examples/Persona.Alternate.Example';
import { PersonaColorsExample } from './examples/Persona.Colors.Example';
import { PersonaCustomRenderExample } from './examples/Persona.CustomRender.Example';
import { PersonaCustomCoinRenderExample } from './examples/Persona.CustomCoinRender.Example';
import { UnknownPersonaExample } from './examples/Persona.UnknownPersona.Example';
import { PersonaPresenceExample } from './examples/Persona.Presence.Example';

const PersonaInitialsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Initials.Example.tsx') as string;
const PersonaInitialsExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Initials.Example.tsx') as string;
const PersonaBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Basic.Example.tsx') as string;
const PersonaBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Basic.Example.tsx') as string;
const PersonaAlternateExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Alternate.Example.tsx') as string;
const PersonaAlternateExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Alternate.Example.tsx') as string;
const PersonaColorsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Colors.Example.tsx') as string;
const PersonaColorsExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Colors.Example.tsx') as string;
const PersonaCustomRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomRender.Example.tsx') as string;
const PersonaCustomRenderExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomRender.Example.tsx') as string;
const PersonaCustomCoinRenderExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomCoinRender.Example.tsx') as string;
const PersonaCustomCoinRenderExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.CustomCoinRender.Example.tsx') as string;
const UnknownPersonaExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.UnknownPersona.Example.tsx') as string;
const UnknownPersonaExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.UnknownPersona.Example.tsx') as string;
const PersonaPresenceExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Presence.Example.tsx') as string;
const PersonaPresenceExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Persona/examples/Persona.Presence.Example.tsx') as string;

export const PersonaPageProps: IDocPageProps = {
  title: 'Persona',
  componentName: 'Persona',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Persona',
  examples: [
    {
      title: 'Persona in various sizes',
      code: PersonaBasicExampleCode,
      codepenJS: PersonaBasicExampleCodepen,
      view: <PersonaBasicExample />
    },
    {
      title: 'Alternative small personas',
      code: PersonaAlternateExampleCode,
      codepenJS: PersonaAlternateExampleCodepen,
      view: <PersonaAlternateExample />
    },
    {
      title: 'Persona with initials',
      code: PersonaInitialsExampleCode,
      codepenJS: PersonaInitialsExampleCodepen,
      view: <PersonaInitialsExample />
    },
    {
      title: 'PersonaCoin colors',
      code: PersonaColorsExampleCode,
      codepenJS: PersonaColorsExampleCodepen,
      view: <PersonaColorsExample />
    },
    {
      title: 'Rendering custom persona text',
      code: PersonaCustomRenderExampleCode,
      codepenJS: PersonaCustomRenderExampleCodepen,
      view: <PersonaCustomRenderExample />
    },
    {
      title: 'Rendering custom coin',
      code: PersonaCustomCoinRenderExampleCode,
      codepenJS: PersonaCustomCoinRenderExampleCodepen,
      view: <PersonaCustomCoinRenderExample />
    },
    {
      title: 'Rendering unknown persona coin',
      code: UnknownPersonaExampleCode,
      codepenJS: UnknownPersonaExampleCodepen,
      view: <UnknownPersonaExample />
    },
    {
      title: 'Persona Presence',
      code: PersonaPresenceExampleCode,
      codepenJS: PersonaPresenceExampleCodepen,
      view: <PersonaPresenceExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Persona/docs/PersonaDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
