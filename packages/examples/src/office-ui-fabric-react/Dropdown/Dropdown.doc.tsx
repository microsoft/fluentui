import * as React from 'react';
import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';

import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';
import { DropdownControlledExample } from './examples/Dropdown.Controlled.Example';
import { DropdownControlledMultiExample } from './examples/Dropdown.ControlledMulti.Example';
import { DropdownCustomExample } from './examples/Dropdown.Custom.Example';
import { DropdownErrorExample } from './examples/Dropdown.Error.Example';
import { DropdownRequiredExample } from './examples/Dropdown.Required.Example';

const DropdownBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Dropdown/examples/Dropdown.Basic.Example.tsx') as string;
const DropdownControlledExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Dropdown/examples/Dropdown.Controlled.Example.tsx') as string;
const DropdownControlledMultiExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Dropdown/examples/Dropdown.ControlledMulti.Example.tsx') as string;
const DropdownCustomExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Dropdown/examples/Dropdown.Custom.Example.tsx') as string;
const DropdownErrorExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Dropdown/examples/Dropdown.Error.Example.tsx') as string;
const DropdownRequiredExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Dropdown/examples/Dropdown.Required.Example.tsx') as string;

export const DropdownPageProps: IDocPageProps = {
  title: 'Dropdown',
  componentName: 'Dropdown',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Dropdown',
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
  overview: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Dropdown/docs/DropdownOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Dropdown/docs/DropdownBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
