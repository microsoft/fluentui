import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';

const AppDefinition = {
  appTitle: 'Fabric - React',
  examplePages: [
    {
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
      ],
      name: 'Basic components'
    },
    {
      links: [
        {
          key: 'ColorPicker',
          name: 'ColorPicker',
          url: '#/examples/colorpicker'
        },
        {
          key: 'ExtendedPeoplePicker',
          name: 'ExtendedPeoplePicker',
          url: '#examples/extendedpeoplepicker'
        },
        {
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
          key: 'FocusTrapZone',
          name: 'FocusTrapZone',
          url: '#examples/focustrapzone'
        },
        {
          key: 'FocusZone',
          name: 'FocusZone',
          url: '#examples/focuszone'
        },
        {
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
    return <Nav groups={AppDefinition.examplePages} onRenderLink={this._onRenderLink} expandButtonAriaLabel={'Expand or collapse'} />;
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
