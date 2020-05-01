import * as React from 'react';
import * as _ from 'lodash';
import Scrollbars from 'react-custom-scrollbars';
import { Text, Menu, List, Button, Popup, Dialog, Dropdown } from '@fluentui/react-northstar';
import { PrototypeSection, ComponentPrototype } from '../Prototypes';

const ScrollbarMenuPrototype = () => {
  const items = [
    {
      key: 'with-scrollbar',
      content: 'Submenu with scrollbar',
      menu: {
        as: Scrollbars,
        items: _.times(50, (i: number) => `Menu Item No. ${i}`),
        style: { height: '20rem' },
      },
    },
    {
      key: 'without-scrollbar',
      content: 'Submenu without scrollbar',
      menu: _.times(5, (i: number) => `Menu Item No. ${i}`),
    },
  ];

  return <Menu items={items} />;
};

const ScrollbarPopupPrototype = () => {
  const lines = _.times(50, i => <p key={i}>Long long text line {i}</p>);

  return (
    <Popup
      trigger={<Button content="Open popup" />}
      content={{
        // NOTE: because scrollbars uses an abs positioned container to fake scroll
        //       the consumer must specify a width/height value to show the scrollable area
        styles: { width: '20rem' },
        content: <Scrollbars style={{ height: '20rem' }}>{lines}</Scrollbars>,
      }}
    />
  );
};

const ScrollbarDialogPrototype = () => {
  const lines = _.times(50, i => <p key={i}>Long long text line {i}</p>);

  return (
    <Dialog
      trigger={<Button content="Open dialog" />}
      header="Dialog with scrollbar"
      cancelButton="Close"
      content={{
        styles: { width: '100%' },
        content: <Scrollbars style={{ height: '20rem' }}>{lines}</Scrollbars>,
      }}
    />
  );
};

const ScrollbarListPrototype = () => {
  const items = _.times(50, (i: number) => ({
    header: `Header ${i}`,
    content: `Content ${i}`,
    key: `item-${i}`,
  }));

  return (
    <Scrollbars style={{ height: '20rem' }}>
      <List selectable items={items} />
    </Scrollbars>
  );
};

const ScrollbarDropdownPrototype = () => {
  const items = _.range(50).map((i: number) => ({
    header: `Header ${i}`,
    content: `Content ${i}`,
    key: `item-${i}`,
  }));

  return (
    <div>
      <Dropdown
        items={items}
        list={{ wrap: children => <Scrollbars style={{ height: '20rem' }}>{children}</Scrollbars> }}
      />
      <Dropdown
        search
        items={items}
        list={{ wrap: children => <Scrollbars style={{ height: '20rem' }}>{children}</Scrollbars> }}
      />
    </div>
  );
};

const CustomScrollbarPrototypes: React.FC = () => {
  return (
    <PrototypeSection title="Custom Scrollbar">
      <Text>
        Note: Fluent UI does not provide custom scrollbars. It is possible to integrate Fluent UI components with any
        custom scrollbars framework.
      </Text>
      <ComponentPrototype title="Menu" description="Scrollbar can be integrated in Menu">
        <ScrollbarMenuPrototype />
      </ComponentPrototype>
      <ComponentPrototype title="Popup" description="Scrollbar can be integrated in Popup content">
        <ScrollbarPopupPrototype />
      </ComponentPrototype>
      <ComponentPrototype title="Dialog" description="Scrollbar can be integrated in Dialog content">
        <ScrollbarDialogPrototype />
      </ComponentPrototype>
      <ComponentPrototype title="List" description="Scrollbar can be integrated in selectable List">
        <ScrollbarListPrototype />
      </ComponentPrototype>
      <ComponentPrototype title="Dropdown" description="Scrollbar can be integrated in Dropdown">
        <ScrollbarDropdownPrototype />
      </ComponentPrototype>
    </PrototypeSection>
  );
};

export default CustomScrollbarPrototypes;
