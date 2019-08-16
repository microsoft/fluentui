import * as React from 'react';
import { SearchBoxBasicExample } from './examples/SearchBox.Basic.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { SearchBoxUnderlinedExample } from './examples/SearchBox.Underlined.Example';
import { SearchBoxDisabledExample } from './examples/SearchBox.Disabled.Example';
import { SearchBoxCustomIconExample } from './examples/SearchBox.CustomIcon.Example';
import { SearchBoxCustomEventsExample } from './examples/SearchBox.CustomEvents.Example';

const SearchBoxBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Basic.Example.tsx') as string;
const SearchBoxBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Basic.Example.tsx') as string;
const SearchBoxUnderlinedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Underlined.Example.tsx') as string;
const SearchBoxDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Disabled.Example.tsx') as string;
const SearchBoxCustomIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.CustomIcon.Example.tsx') as string;
const SearchBoxCustomEventsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.CustomEvents.Example.tsx') as string;
const SearchBoxCustomEventsExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.CustomEvents.Example.tsx') as string;

export const SearchBoxPageProps: IDocPageProps = {
  title: 'SearchBox',
  componentName: 'SearchBox',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SearchBox',
  examples: [
    {
      title: 'Default SearchBox',
      code: SearchBoxBasicExampleCode,
      view: <SearchBoxBasicExample />,
      codepenJS: SearchBoxBasicExampleCodepen
    },
    {
      title: 'Underlined SearchBox',
      code: SearchBoxUnderlinedExampleCode,
      view: <SearchBoxUnderlinedExample />
    },
    {
      title: 'Disabled SearchBoxes',
      code: SearchBoxDisabledExampleCode,
      view: <SearchBoxDisabledExample />
    },
    {
      title: 'SearchBox with custom icon',
      code: SearchBoxCustomIconExampleCode,
      view: <SearchBoxCustomIconExample />
    },
    {
      title: 'SearchBox with custom event handling',
      code: SearchBoxCustomEventsExampleCode,
      codepenJS: SearchBoxCustomEventsExampleCodepen,
      view: <SearchBoxCustomEventsExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxOverview.md'),
  bestPractices: require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxBestPractices.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
