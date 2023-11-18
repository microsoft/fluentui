import * as React from 'react';

import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { KeytipsBasicExample } from './Keytips.Basic.Example';
import { KeytipsButtonExample } from './Keytips.Button.Example';
import { KeytipsCommandBarExample } from './Keytips.CommandBar.Example';
import { KeytipsOverflowExample } from './Keytips.Overflow.Example';
import { KeytipsDynamicExample } from './Keytips.Dynamic.Example';

const KeytipsBasicCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/Keytips.Basic.Example.tsx') as string;
const KeytipsButtonCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/Keytips.Button.Example.tsx') as string;
const KeytipsCommandBarCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/Keytips.CommandBar.Example.tsx') as string;
const KeytipsOverflowCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/Keytips.Overflow.Example.tsx') as string;
const KeytipsDynamicCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/Keytips.Dynamic.Example.tsx') as string;

export const KeytipsPageProps: IDocPageProps = {
  title: 'Keytips',
  componentName: 'Keytips',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Keytips',
  examples: [
    {
      title: 'Keytips on Buttons',
      code: KeytipsButtonCode,
      view: <KeytipsButtonExample />,
    },
    {
      title: 'Keytips in a CommandBar',
      code: KeytipsCommandBarCode,
      view: <KeytipsCommandBarExample />,
    },
    {
      title: 'Keytips in an OverflowWell',
      code: KeytipsOverflowCode,
      view: <KeytipsOverflowExample />,
    },
    {
      title: 'Keytips in Pivots',
      code: KeytipsBasicCode,
      view: <KeytipsBasicExample />,
    },
    {
      title: 'Dynamically updating keytips',
      code: KeytipsDynamicCode,
      view: <KeytipsDynamicExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/docs/KeytipOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/docs/KeytipBestPractices.md'),
  dos: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/docs/KeytipDos.md'),
  donts: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Keytip/docs/KeytipDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
