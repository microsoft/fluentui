import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Accordion,
  Button,
  Checkbox,
  Divider,
  Label,
  Flex,
  RadioGroup,
  Tree,
  AccordionProps,
  RadioGroupProps,
  TreeProps,
} from '@fluentui/react-northstar';
import { SandboxApp } from '@fluentui/code-sandbox';

let _rootDiv: HTMLElement;

const panels: AccordionProps['panels'] = [
  {
    title: 'One',
    content: '2 3 4',
  },
  {
    title: 'Five',
    content: '6 7 8 9',
  },
  {
    title: "What's next?",
    content: '10',
  },
];
const radioGroupItems: RadioGroupProps['items'] = [
  { label: 'This radio comes pre-checked', value: '1' },
  { label: 'This radio is not pre-checked', value: '2' },
];
const treeItems: TreeProps['items'] = [
  {
    id: 'tree-item-1',
    title: 'House Lannister',
    items: [
      {
        id: 'tree-item-11',
        title: 'Tywin',
        items: [
          {
            id: 'tree-item-111',
            title: 'Jaime',
          },
          {
            id: 'tree-item-112',
            title: 'Cersei',
          },
          {
            id: 'tree-item-113',
            title: 'Tyrion',
          },
        ],
      },
      {
        id: 'tree-item-12',
        title: 'Kevan',
        items: [
          {
            id: 'tree-item-121',
            title: 'Lancel',
          },
          {
            id: 'tree-item-122',
            title: 'Willem',
          },
          {
            id: 'tree-item-123',
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-item-2',
    title: 'House Targaryen',
    items: [
      {
        id: 'tree-item-21',
        title: 'Aerys',
        items: [
          {
            id: 'tree-item-211',
            title: 'Rhaegar',
          },
          {
            id: 'tree-item-212',
            title: 'Viserys',
          },
          {
            id: 'tree-item-213',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
];
function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(
    <SandboxApp>
      <Flex column gap="gap.smaller">
        <Accordion panels={panels} />
        <Button content="Click Here" />
        <Checkbox label="Unchecked checkbox (uncontrolled)" />
        <Divider content="Some Text" />
        <Label content="This is a label" />
        <RadioGroup defaultCheckedValue="1" items={radioGroupItems} />
        <Tree aria-label="default" items={treeItems} />
      </Flex>
    </SandboxApp>,
    _rootDiv,
  );
}

// Start the application.
start();
