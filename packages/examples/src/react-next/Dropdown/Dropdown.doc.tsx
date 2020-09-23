import * as React from 'react';
import { IDocPageProps } from '@fluentui/react-next/lib/common/DocPage.types';

import { DropdownBasicExample } from './Dropdown.Basic.Example';
import { DropdownControlledExample } from './Dropdown.Controlled.Example';
import { DropdownControlledMultiExample } from './Dropdown.ControlledMulti.Example';
import { DropdownCustomExample } from './Dropdown.Custom.Example';
import { DropdownErrorExample } from './Dropdown.Error.Example';
import { DropdownRequiredExample } from './Dropdown.Required.Example';

const DropdownBasicExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Dropdown/Dropdown.Basic.Example.tsx') as string;
const DropdownControlledExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Dropdown/Dropdown.Controlled.Example.tsx') as string;
const DropdownControlledMultiExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Dropdown/Dropdown.ControlledMulti.Example.tsx') as string;
const DropdownCustomExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Dropdown/Dropdown.Custom.Example.tsx') as string;
const DropdownErrorExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Dropdown/Dropdown.Error.Example.tsx') as string;
const DropdownRequiredExampleCode = require('!raw-loader!@fluentui/examples/src/react-next/Dropdown/Dropdown.Required.Example.tsx') as string;

export const DropdownPageProps: IDocPageProps = {
  title: 'Dropdown',
  componentName: 'Dropdown',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react-next/src/components/Dropdown',
  examples: [
    {
      title: 'Basic Dropdowns',
      code: DropdownBasicExampleCode,
      view: <DropdownBasicExample />,
    },
    {
      title: 'Controlled single-select Dropdown',
      code: DropdownControlledExampleCode,
      view: <DropdownControlledExample />,
    },
    {
      title: 'Controlled multi-select Dropdown',
      code: DropdownControlledMultiExampleCode,
      view: <DropdownControlledMultiExample />,
    },
    {
      title: 'Customized Dropdown',
      code: DropdownCustomExampleCode,
      view: <DropdownCustomExample />,
    },
    {
      title: 'Dropdown with error message',
      code: DropdownErrorExampleCode,
      view: <DropdownErrorExample />,
    },
    {
      title: 'Required Dropdown',
      code: DropdownRequiredExampleCode,
      view: (
        <>
          <p>This example also demonstrates how to programmatically set focus on and open a Dropdown.</p>
          <DropdownRequiredExample />
        </>
      ),
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/examples/src/react-next/Dropdown/docs/DropdownOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/react-next/Dropdown/docs/DropdownBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
