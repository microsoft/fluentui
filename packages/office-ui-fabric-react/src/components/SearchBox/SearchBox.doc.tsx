import * as React from 'react';
import { SearchBoxFullSizeExample } from './examples/SearchBox.FullSize.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { SearchBoxUnderlinedExample } from './examples/SearchBox.Underlined.Example';
import { SearchBoxDisabledExample } from './examples/SearchBox.Disabled.Example';
import { SearchBoxCustomIconExample } from './examples/SearchBox.CustomIcon.Example';
import { SearchBoxSmallExample } from './examples/SearchBox.Small.Example';
import { SearchBoxStatus } from './SearchBox.checklist';

const SearchBoxFullSizeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.FullSize.Example.tsx') as string;
const SearchBoxFullSizeExampleCodepen = require('!raw-loader!office-ui-fabric-react/lib/codepen/components/SearchBox/SearchBox.FullSize.Example.Codepen.txt') as string;
const SearchBoxUnderlinedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Underlined.Example.tsx') as string;
const SearchBoxDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Disabled.Example.tsx') as string;
const SearchBoxCustomIconExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.CustomIcon.Example.tsx') as string;
const SearchBoxSmallExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/SearchBox/examples/SearchBox.Small.Example.tsx') as string;

export const SearchBoxPageProps: IDocPageProps = {
  title: 'SearchBox',
  componentName: 'SearchBox',
  componentUrl:
    'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/SearchBox',
  componentStatus: SearchBoxStatus,
  examples: [
    {
      title: 'Default SearchBox',
      code: SearchBoxFullSizeExampleCode,
      view: <SearchBoxFullSizeExample />,
      codepenJS: SearchBoxFullSizeExampleCodepen
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
      title: 'SearchBox with fixed width and custom event handling',
      code: SearchBoxSmallExampleCode,
      view: <SearchBoxSmallExample />
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/SearchBox.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxBestPractices.md'),
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/SearchBox/docs/SearchBoxDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
