import * as React from 'react';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';

import { DropdownBasicExample } from './Dropdown.Basic.Example';
import { DropdownControlledExample } from './Dropdown.Controlled.Example';
import { DropdownControlledMultiExample } from './Dropdown.ControlledMulti.Example';
import { DropdownCustomExample } from './Dropdown.Custom.Example';
import { DropdownErrorExample } from './Dropdown.Error.Example';
import { DropdownRequiredExample } from './Dropdown.Required.Example';

const DropdownBasicExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dropdown/Dropdown.Basic.Example.tsx') as string;
const DropdownControlledExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dropdown/Dropdown.Controlled.Example.tsx') as string;
const DropdownControlledMultiExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dropdown/Dropdown.ControlledMulti.Example.tsx') as string;
const DropdownCustomExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dropdown/Dropdown.Custom.Example.tsx') as string;
const DropdownErrorExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dropdown/Dropdown.Error.Example.tsx') as string;
const DropdownRequiredExampleCode = require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dropdown/Dropdown.Required.Example.tsx') as string;

export const DropdownPageProps: IDocPageProps = {
  title: 'Dropdown',
  componentName: 'Dropdown',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Dropdown',
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
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dropdown/docs/DropdownOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Dropdown/docs/DropdownBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
