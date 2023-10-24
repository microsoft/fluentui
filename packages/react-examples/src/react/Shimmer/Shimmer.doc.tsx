import * as React from 'react';
import { ShimmerBasicExample } from './Shimmer.Basic.Example';
import { ShimmerCustomElementsExample } from './Shimmer.CustomElements.Example';
import { ShimmerLoadDataExample } from './Shimmer.LoadData.Example';
import { ShimmerApplicationExample } from './Shimmer.Application.Example';
import { ShimmerStylingExample } from './Shimmer.Styling.Example';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

const ShimmerBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/Shimmer.Basic.Example.tsx') as string;

const ShimmerCustomExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/Shimmer.CustomElements.Example.tsx') as string;

const ShimmerStylingExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/Shimmer.Styling.Example.tsx') as string;

const ShimmerLoadDataExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/Shimmer.LoadData.Example.tsx') as string;

const ShimmerApplicationExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/Shimmer.Application.Example.tsx') as string;

export const ShimmerPageProps: IDocPageProps = {
  title: 'Shimmer',
  componentName: 'ShimmerExample',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Shimmer',
  examples: [
    {
      title: 'Shimmer with basic elements using the ~shimmerElements~ prop',
      code: ShimmerBasicExampleCode,
      view: <ShimmerBasicExample />,
    },
    {
      title: 'Shimmer with custom elements using the ~customElementsGroup~ prop',
      code: ShimmerCustomExampleCode,
      view: <ShimmerCustomElementsExample />,
    },
    {
      title: 'Shimmer swapping with the content it replaces',
      code: ShimmerLoadDataExampleCode,
      view: <ShimmerLoadDataExample />,
    },
    {
      title: 'Shimmered DetailsList simulating loading data asynchronously',
      code: ShimmerApplicationExampleCode,
      view: <ShimmerApplicationExample />,
    },
    {
      title: 'Shimmer styles customizations',
      code: ShimmerStylingExampleCode,
      view: <ShimmerStylingExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/docs/ShimmerOverview.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/docs/ShimmerDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Shimmer/docs/ShimmerDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
