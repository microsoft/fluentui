import * as React from 'react';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { PeoplePickerNormalExample } from './PeoplePicker.Normal.Example';
import { PeoplePickerCompactExample } from './PeoplePicker.Compact.Example';
import { PeoplePickerListExample } from './PeoplePicker.List.Example';
import { PeoplePickerPreselectedItemsExample } from './PeoplePicker.PreselectedItems.Example';
import { PeoplePickerLimitedSearchExample } from './PeoplePicker.LimitedSearch.Example';
import { PeoplePickerProcessSelectionExample } from './PeoplePicker.ProcessSelection.Example';
import { PeoplePickerControlledExample } from './PeoplePicker.Controlled.Example';

const PeoplePickerNormalExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/PeoplePicker.Normal.Example.tsx') as string;
const PeoplePickerCompactExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/PeoplePicker.Compact.Example.tsx') as string;
const PeoplePickerListExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/PeoplePicker.List.Example.tsx') as string;
const PeoplePickerPreselectedItemsExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/PeoplePicker.PreselectedItems.Example.tsx') as string;
const PeoplePickerLimitedSearchExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/PeoplePicker.LimitedSearch.Example.tsx') as string;
const PeoplePickerProcessSelectionExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/PeoplePicker.ProcessSelection.Example.tsx') as string;
const PeoplePickerControlledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/PeoplePicker.Controlled.Example.tsx') as string;

export const PeoplePickerPageProps: IDocPageProps = {
  title: 'PeoplePicker',
  componentName: 'PeoplePicker',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/PeoplePicker',
  examples: [
    {
      title: 'Normal People Picker',
      code: PeoplePickerNormalExampleCode,
      view: <PeoplePickerNormalExample />,
    },
    {
      title: 'Compact People Picker',
      code: PeoplePickerCompactExampleCode,
      view: <PeoplePickerCompactExample />,
    },
    {
      title: 'List People Picker with Wrapped Item text',
      code: PeoplePickerListExampleCode,
      view: <PeoplePickerListExample />,
    },
    {
      title: 'People Picker with Preselected Items',
      code: PeoplePickerPreselectedItemsExampleCode,
      view: <PeoplePickerPreselectedItemsExample />,
    },
    {
      title: 'People Picker with Limited Search',
      code: PeoplePickerLimitedSearchExampleCode,
      view: <PeoplePickerLimitedSearchExample />,
    },
    {
      title: 'People Picker with Processed Selection',
      code: PeoplePickerProcessSelectionExampleCode,
      view: <PeoplePickerProcessSelectionExample />,
    },
    {
      title: 'Controlled People Picker',
      code: PeoplePickerControlledExampleCode,
      view: <PeoplePickerControlledExample />,
    },
  ],
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/docs/PeoplePickerOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/PeoplePicker/docs/PeoplePickerBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
};
