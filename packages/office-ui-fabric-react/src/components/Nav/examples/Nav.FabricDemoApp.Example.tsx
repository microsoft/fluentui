import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export const NavFabricDemoAppExample: React.StatelessComponent = () => {
  return (
    <Nav
      styles={{ root: { width: 300 } }}
      expandButtonAriaLabel="Expand or collapse"
      groups={[
        {
          name: 'Basic components',
          links: [
            {
              key: 'ActivityItem',
              name: 'ActivityItem',
              url: '#/examples/activityitem',
              target: '_blank'
            },
            {
              key: 'Breadcrumb',
              name: 'Breadcrumb',
              url: '#/examples/breadcrumb',
              target: '_blank'
            },
            {
              key: 'Button',
              name: 'Button',
              url: '#/examples/button',
              target: '_blank'
            }
          ]
        },
        {
          name: 'Extended components',
          links: [
            {
              key: 'ColorPicker',
              name: 'ColorPicker',
              url: '#/examples/colorpicker',
              target: '_blank'
            },
            {
              key: 'ExtendedPeoplePicker',
              name: 'ExtendedPeoplePicker',
              url: '#examples/extendedpeoplepicker',
              target: '_blank'
            },
            {
              key: 'GroupedList',
              name: 'GroupedList',
              url: '#examples/groupedlist',
              target: '_blank'
            }
          ]
        },
        {
          name: 'Utilities',
          links: [
            {
              key: 'FocusTrapZone',
              name: 'FocusTrapZone',
              url: '#examples/focustrapzone',
              target: '_blank'
            },
            {
              key: 'FocusZone',
              name: 'FocusZone',
              url: '#examples/focuszone',
              target: '_blank'
            },
            {
              key: 'MarqueeSelection',
              name: 'MarqueeSelection',
              url: '#examples/marqueeselection',
              target: '_blank'
            }
          ]
        }
      ]}
    />
  );
};
