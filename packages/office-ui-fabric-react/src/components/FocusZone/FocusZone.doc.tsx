import * as React from 'react';
import { FocusZonePhotosExample } from './examples/FocusZone.Photos.Example';

import { IDocPageProps } from '../../common/DocPage.types';
import { FocusZoneListExample } from './examples/FocusZone.List.Example';
import { FocusZoneDisabledExample } from './examples/FocusZone.Disabled.Example';
import { FocusZoneTabbableExample } from './examples/FocusZone.Tabbable.Example';
import { FocusZoneHorizontalMenuExample } from './examples/FocusZone.HorizontalMenu.Example';

const FocusZonePhotosExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.Photos.Example.tsx') as string;
const FocusZoneListExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.List.Example.tsx') as string;
const FocusZoneDisabledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.Disabled.Example.tsx') as string;
const FocusZoneTabbableCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.Tabbable.Example.tsx') as string;

const FocusZoneHorizontalMenuExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/FocusZone/examples/FocusZone.HorizontalMenu.Example.tsx') as string;

export const FocusZonePageProps: IDocPageProps = {
  title: 'FocusZone',
  componentName: 'FocusZone',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/FocusZone',
  examples: [
    {
      title: 'Non-uniform photos within bidirectional FocusZone',
      code: FocusZonePhotosExampleCode,
      view: <FocusZonePhotosExample />
    },
    {
      title: 'Nesting FocusZones in list rows',
      code: FocusZoneListExampleCode,
      view: <FocusZoneListExample />
    },
    {
      title: 'Disabled FocusZone',
      code: FocusZoneDisabledExampleCode,
      view: <FocusZoneDisabledExample />
    },
    {
      title: 'Tabbable FocusZone',
      code: FocusZoneTabbableCode,
      view: <FocusZoneTabbableExample />
    },
    {
      title: 'Horizontal menu in FocusZone with all arrows key navigation',
      code: FocusZoneHorizontalMenuExampleCode,
      view: <FocusZoneHorizontalMenuExample />
    }
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/FocusZone/docs/FocusZoneOverview.md'),
  bestPractices: '',
  dos: '',
  donts: '',
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
