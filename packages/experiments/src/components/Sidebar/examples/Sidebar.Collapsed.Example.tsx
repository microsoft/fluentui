/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { getTheme } from 'office-ui-fabric-react';
import * as React from 'react';
import { Sidebar } from '@uifabric/experiments/lib/Sidebar';
import './Sidebar.Examples.scss';

export class SidebarCollapsibleExample extends React.Component {
  public render(): JSX.Element {
    this.state = {
      active: true
    };

    /*
     * Basic collapsible sidebar example, with position override so that the example fits into the example page.
     * Here is the wrapper class. By default the sidebar takes all of the left height and is positioned on the left.
     *
     *   .sidebar-position-override {
     *       top: auto !important;
     *       bottom: auto !important;
     *       left: auto !important;
     *   }
     */
    return (
      <Sidebar
        collapsible={true}
        theme={getTheme()}
        collapseButtonAriaLabel={'sitemap'}
        footerItems={[
          {
            key: 'basic-collapsible-footer-item',
            name: 'Sidebar Footer',
            iconProps: { iconName: 'ProFootball' },
            items: [
              {
                key: 'collapsible-example-footer-item-link1',
                name: 'Footer Item 1',
                iconProps: { iconName: 'CollegeFootball' },
                active: false
              },
              {
                key: 'collapsible-example-footer-item-link2',
                name: 'Footer Item 2',
                iconProps: { iconName: 'Soccer' },
                active: false
              }
            ]
          }
        ]}
        items={[
          {
            key: 'collapsible-example-item1',
            name: 'Item 1',
            iconProps: { iconName: 'BuildQueue' },
            active: false
          },
          {
            key: 'collapsible-example-item2',
            name: 'Item 2',
            iconProps: { iconName: 'Bullseye' },
            active: true
          },
          {
            key: 'collapsible-example-item3',
            name: 'Item 3',
            subMenuIconProps: { iconName: 'ArrowUpRight' },
            active: false
          },
          {
            key: 'collapsible-example-accordion1',
            name: 'More Stuff Here',
            iconProps: { iconName: 'Code' },
            items: [
              {
                key: 'collapsible-example-accordion1-link1',
                name: 'Inner Link 1',
                iconProps: { iconName: 'Mail' },
                active: false
              },
              {
                key: 'collapsible-example-accordion1-link2',
                name: 'Inner Link 2',
                iconProps: { iconName: 'AlarmClock' },
                active: true
              }
            ]
          },
          {
            key: 'collapsible-example-accordion2',
            name: 'More Stuff Here Not Active',
            iconProps: { iconName: 'Crown' },
            items: [
              {
                key: 'collapsible-example-accordion2-link1',
                name: 'Inner Link 1',
                iconProps: { iconName: 'DiamondSolid' },
                active: false
              },
              {
                key: 'collapsible-example-accordion2-link2',
                name: 'Inner Link 2',
                iconProps: { iconName: 'DeliveryTruck' },
                active: false
              }
            ]
          }
        ]}
      />
    );
  }
}
