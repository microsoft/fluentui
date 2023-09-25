/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import * as Enzyme from 'enzyme';
import { getTheme } from '@fluentui/react';
import { CommandBarButton } from '@fluentui/react/lib/Button';
import * as React from 'react';
import { Sidebar, SidebarButton } from './index';
import type { ISidebar, ISidebarProps } from './index';

describe('Sidebar', () => {
  let sidebarButtonExampleProps: ISidebarProps;
  let sidebarAccordionExampleProps: ISidebarProps;
  const TestButton = CommandBarButton;

  beforeEach(() => {
    sidebarButtonExampleProps = {
      collapsible: false,
      id: '1',
      theme: getTheme(),
      items: [
        {
          key: 'basic-example-item1',
          name: 'Item 1',
          iconProps: { iconName: 'BuildQueue' },
          active: false,
        },
        {
          key: 'basic-example-item2',
          name: 'Item 2',
          iconProps: { iconName: 'Bullseye' },
          active: true,
        },
      ],
    };

    sidebarAccordionExampleProps = {
      collapsible: false,
      id: '2',
      theme: getTheme(),
      items: [
        {
          key: 'basic-example-accordion1',
          name: 'More Stuff Here',
          iconProps: { iconName: 'Code' },
          items: [
            {
              key: 'basic-example-accordion1-link1',
              name: 'Inner Link 1',
              iconProps: { iconName: 'Mail' },
              active: false,
            },
          ],
        },
        {
          key: 'basic-example-accordion2',
          name: 'More Stuff Here Not Active',
          iconProps: { iconName: 'Crown' },
          items: [
            {
              key: 'basic-example-accordion2-link1',
              name: 'Inner Link 1',
              iconProps: { iconName: 'DiamondSolid' },
              active: false,
            },
            {
              key: 'basic-example-accordion2-link2',
              name: 'Inner Link 2',
              iconProps: { iconName: 'DeliveryTruck' },
              active: false,
            },
          ],
        },
      ],
    };
  });

  it('should render the component', () => {
    const wrapper = Enzyme.shallow(<Sidebar collapsible={false} id={'1'} theme={getTheme()} items={[]} />);
    expect(wrapper.find('.ba-Sidebar').length).toBe(1);
  });

  it('should render the component with buttons', () => {
    const wrapper = Enzyme.shallow(<Sidebar {...sidebarButtonExampleProps} />);
    expect(wrapper.find(SidebarButton).length).toBe(2);
  });

  it('should render the component with accordion', () => {
    const wrapper = Enzyme.shallow(<Sidebar {...sidebarAccordionExampleProps} />);
    expect(wrapper.find('.ba-SidebarAccordion').length).toBe(2);
  });

  it('should render the component with context menu when collapsed', () => {
    const sidebar = React.createRef<ISidebar>();

    const wrapper = Enzyme.shallow(<Sidebar componentRef={sidebar} {...sidebarAccordionExampleProps} />);

    sidebar.current && sidebar.current.setCollapsed(true);
    wrapper.update();

    expect(wrapper.find('.ba-SidebarContextualMenuButton').length).toBe(2);
  });

  it('should render the component using default button', () => {
    const wrapper = Enzyme.shallow(
      <Sidebar
        collapsible={false}
        id={'1'}
        theme={getTheme()}
        defaultButton={TestButton}
        items={[
          {
            key: 'basic-example-item1',
            name: 'Item 1',
            iconProps: { iconName: 'BuildQueue' },
            active: false,
          },
          {
            key: 'basic-example-item2',
            name: 'Item 2',
            iconProps: { iconName: 'Bullseye' },
            active: true,
          },
        ]}
      />,
    );
    expect(wrapper.find(TestButton).length).toBe(2);
  });

  it('should render the component item with custom buttons', () => {
    const wrapper = Enzyme.shallow(
      <Sidebar
        collapsible={false}
        id={'1'}
        theme={getTheme()}
        items={[
          {
            key: 'basic-example-item1',
            name: 'Item 1',
            iconProps: { iconName: 'BuildQueue' },
            active: false,
            buttonAs: TestButton,
          },
          {
            key: 'basic-example-item2',
            name: 'Item 2',
            iconProps: { iconName: 'Bullseye' },
            active: true,
          },
        ]}
      />,
    );
    expect(wrapper.find(TestButton).length).toBe(1);
    expect(wrapper.find(SidebarButton).length).toBe(1);
  });

  it('should render the component item with custom buttons', () => {
    const wrapper = Enzyme.shallow(
      <Sidebar
        collapsible={false}
        id={'1'}
        theme={getTheme()}
        items={[
          {
            key: 'basic-example-item1',
            name: 'Item 1',
            iconProps: { iconName: 'BuildQueue' },
            active: false,
            onRender: item => {
              return (
                <div key={item.key}>
                  <TestButton text={item.name} iconProps={item.iconProps} checked={item.active} />
                </div>
              );
            },
          },
          {
            key: 'basic-example-item2',
            name: 'Item 2',
            iconProps: { iconName: 'Bullseye' },
            active: true,
          },
        ]}
      />,
    );
    expect(wrapper.find(TestButton).length).toBe(1);
    expect(wrapper.find(SidebarButton).length).toBe(1);
  });
});
