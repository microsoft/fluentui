import * as React from 'react';
import { FacepileAddFaceExample } from './Facepile.AddFace.Example';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { FacepileBasicExample } from './Facepile.Basic.Example';
import { FacepileOverflowExample } from './Facepile.Overflow.Example';

const FacepileAddFaceExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Facepile/Facepile.AddFace.Example.tsx') as string;
const FacepileBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Facepile/Facepile.Basic.Example.tsx') as string;
const FacepileOverflowExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Facepile/Facepile.Overflow.Example.tsx') as string;

export const FacepilePageProps: IDocPageProps = {
  title: 'Facepile',
  componentName: 'Facepile',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Facepile',
  examples: [
    {
      title: 'Facepile with size, presence, and fade in options',
      code: FacepileBasicExampleCode,
      view: <FacepileBasicExample />,
    },
    {
      title: 'Facepile with overflow buttons',
      code: FacepileOverflowExampleCode,
      view: <FacepileOverflowExample />,
    },
    {
      title: 'Facepile with face adding functionality',
      code: FacepileAddFaceExampleCode,
      view: <FacepileAddFaceExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Facepile/docs/FacepileOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Facepile/docs/FacepileBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
