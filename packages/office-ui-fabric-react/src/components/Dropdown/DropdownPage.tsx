import * as React from 'react';
import { DropdownBasicExample } from './examples/Dropdown.Basic.Example';
import { DemoPage } from "../../demo/components/DemoPage";
import { IDemoPageProps } from "../../demo/components/DemoPage.types";
import { DropdownCustomExample } from './examples/Dropdown.Custom.Example';
import { DropdownErrorExample } from './examples/Dropdown.Error.Example';
import { DropdownStatus } from './Dropdown.checklist';

const DropdownBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Basic.Example.tsx') as string;
const DropdownCustomExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Custom.Example.tsx') as string;
const DropdownErrorExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Dropdown/examples/Dropdown.Error.Example.tsx') as string;

export const DropdownPageProps: IDemoPageProps = {
  title: 'Dropdown',
  componentName: 'Dropdown',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Dropdown',
  componentStatus: DropdownStatus,
  examples: [{
    "title": "Dropdown",
    "code": DropdownBasicExampleCode,
    "view": <DropdownBasicExample />
}, {
    "title": "Customized Dropdown",
    "code": DropdownCustomExampleCode,
    "view": <DropdownCustomExample />
}, {
    "title": "Dropdown with Error Message",
    "code": DropdownErrorExampleCode,
    "view": <DropdownErrorExample />
}],
  propertiesTablesSources: [
  require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/Dropdown.types.ts'),
  require<string>('!raw-loader!office-ui-fabric-react/src/utilities/selectableOption/SelectableDroppableText.types.ts')
],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownOverview.md'),
  bestPractices: "",
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Dropdown/docs/DropdownDonts.md'),
  isHeaderVisible: true,
  allowNativeProps: true,
};

export const DropdownPage = (props: { isHeaderVisible: boolean }) => (<DemoPage { ...{ ...DropdownPageProps, ...props } } />);