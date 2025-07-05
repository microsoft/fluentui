/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import * as React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getTheme } from '@fluentui/react';
import { CommandBarButton } from '@fluentui/react/lib/Button';
import { Sidebar } from './index';
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
    const { container } = render(<Sidebar collapsible={false} id={'1'} theme={getTheme()} items={[]} />);
    expect(container.querySelector('.ba-Sidebar')).toBeInTheDocument();
  });

  it('should render the component with buttons', () => {
    const { container } = render(<Sidebar {...sidebarButtonExampleProps} />);
    // SidebarButton components render with class 'ms-Button'
    const buttons = container.querySelectorAll('.ms-Button');
    expect(buttons.length).toBe(2);
  });

  it('should render the component with accordion', () => {
    const { container } = render(<Sidebar {...sidebarAccordionExampleProps} />);
    const accordions = container.querySelectorAll('.ba-SidebarAccordion');
    expect(accordions.length).toBe(2);
  });

  it('should render the component with context menu when collapsed', () => {
    const sidebar = React.createRef<ISidebar>();

    const { container, rerender } = render(<Sidebar componentRef={sidebar} {...sidebarAccordionExampleProps} />);

    // Set collapsed state
    act(() => {
      sidebar.current?.setCollapsed(true);
    });

    // Re-render with updated state
    rerender(<Sidebar componentRef={sidebar} {...sidebarAccordionExampleProps} />);

    const contextMenuButtons = container.querySelectorAll('.ba-SidebarContextualMenuButton');
    expect(contextMenuButtons.length).toBe(2);
  });

  it('should render the component using default button', () => {
    const { container } = render(
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

    // CommandBarButton renders with class 'ms-Button--commandBar'
    const commandBarButtons = container.querySelectorAll('.ms-Button--commandBar');
    expect(commandBarButtons.length).toBe(2);
  });

  it('should render the component item with custom buttons', () => {
    const { container } = render(
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

    // First item should use CommandBarButton
    const commandBarButtons = container.querySelectorAll('.ms-Button--commandBar');
    expect(commandBarButtons.length).toBe(1);

    // Second item should use default SidebarButton
    // Count total buttons and subtract the CommandBarButtons
    const allButtons = container.querySelectorAll('.ms-Button');
    const sidebarButtons = allButtons.length - commandBarButtons.length;
    expect(sidebarButtons).toBe(1);
  });

  it('should render the component item with custom onRender', () => {
    const { container } = render(
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
                <div key={item.key} data-testid="custom-render">
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

    // Check for custom rendered element
    const customRender = container.querySelector('[data-testid="custom-render"]');
    expect(customRender).toBeInTheDocument();

    // CommandBarButton for custom rendered item
    const commandBarButtons = container.querySelectorAll('.ms-Button--commandBar');
    expect(commandBarButtons.length).toBe(1);

    // One regular button for the second item
    const allButtons = container.querySelectorAll('.ms-Button');
    const regularButtons = allButtons.length - commandBarButtons.length;
    expect(regularButtons).toBe(1);
  });
});
