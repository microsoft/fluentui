import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

export const NavFabricDemoAppExample: React.FunctionComponent = () => {
  return (
    <Nav
      styles={{ root: { width: 300 } }}
      expandButtonAriaLabel="Expand or collapse"
      ariaLabel="Nav example similiar to one found in this demo page"
      groups={[
        {
          name: 'Basic components',
          links: [
            {
              key: 'ActivityItem',
              name: 'ActivityItem',
              url: '#/examples/activityitem'
            },
            {
              key: 'Breadcrumb',
              name: 'Breadcrumb',
              url: '#/examples/breadcrumb'
            },
            {
              key: 'Button',
              name: 'Button',
              url: '#/examples/button'
            }
          ]
        },
        {
          name: 'Extended components',
          links: [
            {
              key: 'ColorPicker',
              name: 'ColorPicker',
              url: '#/examples/colorpicker'
            },
            {
              key: 'ExtendedPeoplePicker',
              name: 'ExtendedPeoplePicker',
              url: '#/examples/extendedpeoplepicker'
            },
            {
              key: 'GroupedList',
              name: 'GroupedList',
              url: '#/examples/groupedlist'
            }
          ]
        },
        {
          name: 'Utilities',
          links: [
            {
              key: 'FocusTrapZone',
              name: 'FocusTrapZone',
              url: '#/examples/focustrapzone'
            },
            {
              key: 'FocusZone',
              name: 'FocusZone',
              url: '#/examples/focuszone'
            },
            {
              key: 'MarqueeSelection',
              name: 'MarqueeSelection',
              url: '#/examples/marqueeselection'
            }
          ]
        }
      ]}
    />
  );
};
