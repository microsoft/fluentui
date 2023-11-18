import * as React from 'react';
import { SearchBoxFullSizeExample } from './SearchBox.FullSize.Example';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { SearchBoxUnderlinedExample } from './SearchBox.Underlined.Example';
import { SearchBoxDisabledExample } from './SearchBox.Disabled.Example';
import { SearchBoxCustomIconExample } from './SearchBox.CustomIcon.Example';
import { SearchBoxSmallExample } from './SearchBox.Small.Example';

const SearchBoxFullSizeExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SearchBox/SearchBox.FullSize.Example.tsx') as string;
const SearchBoxUnderlinedExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SearchBox/SearchBox.Underlined.Example.tsx') as string;
const SearchBoxDisabledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SearchBox/SearchBox.Disabled.Example.tsx') as string;
const SearchBoxCustomIconExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SearchBox/SearchBox.CustomIcon.Example.tsx') as string;
const SearchBoxSmallExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SearchBox/SearchBox.Small.Example.tsx') as string;

export const SearchBoxPageProps: IDocPageProps = {
  title: 'SearchBox',
  componentName: 'SearchBox',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/SearchBox',
  examples: [
    {
      title: 'Default SearchBox',
      code: SearchBoxFullSizeExampleCode,
      view: <SearchBoxFullSizeExample />,
    },
    {
      title: 'Underlined SearchBox',
      code: SearchBoxUnderlinedExampleCode,
      view: <SearchBoxUnderlinedExample />,
    },
    {
      title: 'Disabled SearchBoxes',
      code: SearchBoxDisabledExampleCode,
      view: <SearchBoxDisabledExample />,
    },
    {
      title: 'SearchBox with custom icon',
      code: SearchBoxCustomIconExampleCode,
      view: <SearchBoxCustomIconExample />,
    },
    {
      title: 'SearchBox with fixed width and custom event handling',
      code: SearchBoxSmallExampleCode,
      view: <SearchBoxSmallExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SearchBox/docs/SearchBoxOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/SearchBox/docs/SearchBoxBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
