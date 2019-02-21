/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { getTheme } from 'office-ui-fabric-react';
import * as React from 'react';
import { Sidebar, SidebarButton } from '@uifabric/experiments/lib/Sidebar';
import './Sidebar.Examples.scss';

export class SidebarBasicExample extends React.Component {
  public render(): JSX.Element {
    this.state = {
      active: true
    };

    /*
     * Basic sidebar example, with position override so that the example fits into the example page.
     * Here is the wrapper class. By default the sidebar takes all of the left height and is positioned on the left.
     *
     *   .sidebar-position-override {
     *       top: auto;
     *       bottom: auto;
     *       left: auto;
     *   }
     */
    return (
      <Sidebar
        footerItems={[
          {
            key: 'basic-example-footer-item',
            name: 'Sidebar Footer',
            iconProps: { iconName: 'ProFootball' },
            items: [
              {
                key: 'basic-example-footer-item-link1',
                name: 'Footer Item 1',
                iconProps: { iconName: 'CollegeFootball' },
                active: false
              },
              {
                key: 'basic-example-footer-item-link2',
                name: 'Footer Item 2',
                iconProps: { iconName: 'Soccer' },
                active: false
              }
            ]
          }
        ]}
        theme={getTheme()}
        items={[
          {
            key: 'basic-example-item1',
            name: 'Item 1',
            iconProps: { iconName: 'Home' },
            active: false
          },
          {
            key: 'basic-example-item2',
            name: 'Item 2',
            iconProps: { iconName: 'Bullseye' },
            active: true
          },
          {
            key: 'basic-example-item3',
            name: 'Item Styled Example',
            subMenuIconProps: { iconName: 'ArrowUpRight' },
            active: false,
            styles: {
              root: {
                backgroundColor: 'red'
              }
            }
          },
          {
            key: 'basic-example-accordion1',
            name: 'More Stuff Here',
            iconProps: { iconName: 'Code' },
            items: [
              {
                key: 'basic-example-accordion1-link1',
                name: 'Inner Link 1',
                iconProps: { iconName: 'Mail' },
                active: false
              },
              {
                key: 'basic-example-accordion1-link2',
                name: 'Inner Link 2',
                iconProps: { iconName: 'AlarmClock' },
                active: true
              }
            ]
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
                active: false
              },
              {
                key: 'basic-example-accordion2-link2',
                name: 'Inner Link 2',
                iconProps: { iconName: 'DeliveryTruck' },
                active: false
              }
            ]
          },
          {
            key: 'basic-example-render1',
            name: 'onRender Example',
            iconProps: { iconName: 'AirTickets' },
            onRender: item => {
              return <SidebarButton key={item.key} text={item.name} iconProps={item.iconProps} role="menuitem" theme={getTheme()} />;
            }
          }
        ]}
      />
    );
  }
}
