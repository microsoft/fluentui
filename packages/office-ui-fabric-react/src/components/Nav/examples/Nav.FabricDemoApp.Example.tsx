import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

const AppDefinition = {
  appTitle: 'Fabric - React',
  examplePages: [
    {
      links: [
        {
          component: require<any>('../components/ActivityItem/ActivityItemPage').ActivityItemPage,
          key: 'ActivityItem',
          name: 'ActivityItem',
          url: '#/examples/activityitem'
        },
        {
          component: require<any>('../components/Breadcrumb/BreadcrumbPage').BreadcrumbPage,
          key: 'Breadcrumb',
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb'
        },
        {
          component: require<any>('../components/Button/ButtonPage').ButtonPage,
          key: 'Button',
          name: 'Button',
          url: '#/examples/button'
        }
      ],
      name: 'Basic components'
    },
    {
      links: [
        {
          component: require<any>('../components/ColorPicker/ColorPickerPage').ColorPickerPage,
          key: 'ColorPicker',
          name: 'ColorPicker',
          url: '#/examples/colorpicker'
        },
        {
          component: require<any>('../components/ExtendedPicker/PeoplePicker/ExtendedPeoplePickerPage')
            .ExtendedPeoplePickerPage,
          key: 'ExtendedPeoplePicker',
          name: 'ExtendedPeoplePicker',
          url: '#examples/extendedpeoplepicker'
        },
        {
          component: require<any>('../components/GroupedList/GroupedListPage').GroupedListPage,
          key: 'GroupedList',
          name: 'GroupedList',
          url: '#examples/groupedlist'
        }
      ],
      name: 'Extended components'
    },
    {
      links: [
        {
          component: require<any>('../components/FocusTrapZone/FocusTrapZonePage').FocusTrapZonePage,
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          url: '#examples/focustrapzone'
        },
        {
          component: require<any>('../components/FocusZone/FocusZonePage').FocusZonePage,
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#examples/focuszone'
        },
        {
          component: require<any>('../components/MarqueeSelection/MarqueeSelectionPage').MarqueeSelectionPage,
          key: 'MarqueeSelection',
          name: 'MarqueeSelection',
          url: '#examples/marqueeselection'
        }
      ],
      name: 'Utilities'
    }
  ]
};

export class NavFabricDemoAppExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return <Nav groups={AppDefinition.examplePages} onRenderLink={this._onRenderLink} />;
  }

  private _onRenderLink = (link: any): JSX.Element | null => {
    return (
      <span>
        <span key={1} className="Nav-linkText">
          {link.name}
        </span>
      </span>
    );
  };
}
