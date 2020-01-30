import * as React from 'react';
import { FacepileAddFaceExample } from './examples/Facepile.AddFace.Example';
import { IDocPageProps } from '../../common/DocPage.types';
import { FacepileBasicExample } from './examples/Facepile.Basic.Example';
import { FacepileOverflowExample } from './examples/Facepile.Overflow.Example';

const FacepileAddFaceExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.AddFace.Example.tsx') as string;
const FacepileBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.Basic.Example.tsx') as string;
const FacepileOverflowExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Facepile/examples/Facepile.Overflow.Example.tsx') as string;

export const FacepilePageProps: IDocPageProps = {
  title: 'Facepile',
  componentName: 'Facepile',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Facepile',
  examples: [
    {
      title: 'Facepile with size, presence, and fade in options',
      code: FacepileBasicExampleCode,
      view: <FacepileBasicExample />
    },
    {
      title: 'Facepile with overflow buttons',
      code: FacepileOverflowExampleCode,
      view: <FacepileOverflowExample />
    },
    {
      title: 'Facepile with face adding functionality',
      code: FacepileAddFaceExampleCode,
      view: <FacepileAddFaceExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Facepile/docs/FacepileOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Facepile/docs/FacepileDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Facepile/docs/FacepileDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
