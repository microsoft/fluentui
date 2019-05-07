import * as React from 'react';

import { IDocPageProps } from '../../common/DocPage.types';
import { KeytipsBasicExample } from './examples/Keytips.Basic.Example';
import { KeytipsButtonExample } from './examples/Keytips.Button.Example';
import { KeytipsCommandBarExample } from './examples/Keytips.CommandBar.Example';
import { KeytipsOverflowExample } from './examples/Keytips.Overflow.Example';

const KeytipsBasicCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Basic.Example.tsx') as string;
const KeytipsButtonCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Button.Example.tsx') as string;
const KeytipsCommandBarCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.CommandBar.Example.tsx') as string;
const KeytipsOverflowCode = require('!raw-loader!office-ui-fabric-react/src/components/Keytip/examples/Keytips.Overflow.Example.tsx') as string;
export const KeytipsPageProps: IDocPageProps = {
  title: 'Keytips',
  componentName: 'Keytips',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Keytips',
  examples: [
    {
      title: 'Keytips on Buttons',
      code: KeytipsButtonCode,
      view: <KeytipsButtonExample />
    },
    {
      title: 'Keytips in a CommandBar',
      code: KeytipsCommandBarCode,
      view: <KeytipsCommandBarExample />
    },
    {
      title: 'Keytips in an OverflowWell',
      code: KeytipsOverflowCode,
      view: <KeytipsOverflowExample />
    },
    {
      title: 'Keytips in Pivots',
      code: KeytipsBasicCode,
      view: <KeytipsBasicExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Keytip/docs/KeytipDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true
};
