import * as React from 'react';
import { IDocPageProps } from '../../common/DocPage.types';

import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';
import { DropdownControlledExample } from './examples/Dropdown.Controlled.Example';
import { DropdownControlledMultiExample } from './examples/Dropdown.ControlledMulti.Example';
import { DropdownCustomExample } from './examples/Dropdown.Custom.Example';
import { DropdownErrorExample } from './examples/Dropdown.Error.Example';
import { DropdownRequiredExample } from './examples/Dropdown.Required.Example';
import { DropdownStatus } from './Dropdown.checklist';

const DropdownBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Basic.Example.tsx') as string;
const DropdownBasicExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Basic.Example.tsx') as string;
const DropdownControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Controlled.Example.tsx') as string;
const DropdownControlledExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Controlled.Example.tsx') as string;
const DropdownControlledMultiExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.ControlledMulti.Example.tsx') as string;
const DropdownControlledMultiExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.ControlledMulti.Example.tsx') as string;
const DropdownCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Custom.Example.tsx') as string;
const DropdownCustomExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Custom.Example.tsx') as string;
const DropdownErrorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Error.Example.tsx') as string;
const DropdownErrorExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Error.Example.tsx') as string;
const DropdownRequiredExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Required.Example.tsx') as string;
const DropdownRequiredExampleCodepen = require('!@uifabric/codepen-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Required.Example.tsx') as string;

export const DropdownPageProps: IDocPageProps = {
  title: 'Dropdown',
  componentName: 'Dropdown',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Dropdown',
  componentStatus: DropdownStatus,
  examples: [
    {
      title: 'Basic Dropdowns',
      code: DropdownBasicExampleCode,
      view: <DropdownBasicExample />,
      codepenJS: DropdownBasicExampleCodepen
    },
    {
      title: 'Controlled single-select Dropdown',
      code: DropdownControlledExampleCode,
      view: <DropdownControlledExample />,
      codepenJS: DropdownControlledExampleCodepen
    },
    {
      title: 'Controlled multi-select Dropdown',
      code: DropdownControlledMultiExampleCode,
      view: <DropdownControlledMultiExample />,
      codepenJS: DropdownControlledMultiExampleCodepen
    },
    {
      title: 'Customized Dropdown',
      code: DropdownCustomExampleCode,
      codepenJS: DropdownCustomExampleCodepen,
      view: <DropdownCustomExample />
    },
    {
      title: 'Dropdown with error message',
      code: DropdownErrorExampleCode,
      codepenJS: DropdownErrorExampleCodepen,
      view: <DropdownErrorExample />
    },
    {
      title: 'Required Dropdown',
      code: DropdownRequiredExampleCode,
      codepenJS: DropdownRequiredExampleCodepen,
      view: (
        <>
          <p>This example also demonstrates how to programmatically set focus on and open a Dropdown.</p>
          <DropdownRequiredExample />
        </>
      )
    }
  ],
  propertiesTablesSources: [
    require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/Dropdown.types.ts'),
    require<string>('!raw-loader!office-ui-fabric-react/src/utilities/selectableOption/SelectableDroppableText.types.ts')
  ],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownOverview.md'),
  bestPractices: '',
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDonts.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true
};
