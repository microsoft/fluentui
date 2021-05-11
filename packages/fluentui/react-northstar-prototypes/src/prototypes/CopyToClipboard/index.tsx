import * as React from 'react';
import { Flex, Provider, Text, Button, Menu, Ref } from '@fluentui/react-northstar';
import CopyToClipboard from './CopyToClipboard';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';
import themeOverrides from './themeOverrides';
import { NotificationProvider } from './NotificationProvider';
import { ClipboardCopiedToIcon } from '@fluentui/react-icons-northstar';

type CopyToClipboardPrototypeProps = {
  value: string;
  target?: HTMLElement;
  attached?: boolean;
};

const CopyToClipboardPrototype: React.FC<CopyToClipboardPrototypeProps> = props => {
  return (
    <Flex gap="gap.medium" vAlign="center" padding="padding.medium">
      <Text content="Commit: " />
      <Text content={props.value} color="brand" />

      <CopyToClipboard
        attached={props.attached}
        target={props.target}
        value={props.value}
        trigger={<Button iconOnly icon={<ClipboardCopiedToIcon />} />}
      />
    </Flex>
  );
};

const CopyToClipboardInMenu: React.FC = props => {
  const item = {
    key: 'edit',
    content: 'Edit',
    menu: [
      'Open File...',
      'Save File...',
      {
        content: 'Copy text',
        children: (Component, props) => {
          return <CopyToClipboard value="Julius Caesar" trigger={<Component {...props} />} />;
        },
      },
    ],
  };

  return <Menu items={[item]} />;
};

const CopyToClipboardAttached: React.FC = props => {
  const [target, setTarget] = React.useState<HTMLElement>(null);

  const items = [
    {
      key: 'edit',
      content: 'Edit',
      children: (Component, props) => (
        <Ref innerRef={setTarget}>
          <Component {...props} />
        </Ref>
      ),
      menu: [
        'Open File...',
        'Save File...',
        {
          content: 'Copy text',
          children: (Component, props) => (
            <CopyToClipboard target={target} value="Julius Caesar" trigger={<Component {...props} />} />
          ),
        },
      ],
    },
  ];

  return <Menu items={items} />;
};

const CopyToClipboardPrototypes: React.FC = () => {
  const commitID = '3422f7d';
  return (
    <PrototypeSection title="Copy to Clipboard">
      <Text>
        Note: For screen reader users, make sure to use <code>react-aria-live</code> or similar library to announce the
        notification.
      </Text>
      <Provider theme={themeOverrides}>
        <NotificationProvider>
          <ComponentPrototype title="Attached" description="Attached version of Copy to Clipboard prototype">
            <CopyToClipboardPrototype attached={true} value={commitID} />
          </ComponentPrototype>
          <ComponentPrototype title="Not Attached" description="Not attached version of Copy to Clipboard prototype">
            <CopyToClipboardPrototype value={commitID} />
          </ComponentPrototype>
          <ComponentPrototype title="In menu" description="Copy to Clipboard can reside within a menu">
            <CopyToClipboardInMenu />
          </ComponentPrototype>
          <ComponentPrototype
            title="In Menu Attached"
            description="Copy to Clipboard can be attached to a different element"
          >
            <CopyToClipboardAttached />
          </ComponentPrototype>
        </NotificationProvider>
      </Provider>
    </PrototypeSection>
  );
};

export default CopyToClipboardPrototypes;
