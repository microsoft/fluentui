import * as React from 'react';

import ToggleExample from '../../pages/examples/ToggleExample';
import LabelExample from '../../pages/examples/LabelExample';
import TextFieldExample from '../../pages/examples/TextFieldExample';

export interface ILink {
  name: string;
  url: string;
  component?: any;
}

export interface ILinkGroup {
  name: string;
  links: ILink[];
}

export interface IAppState {
  appTitle: string;
  headerLinks: ILink[];
  examplePages: ILinkGroup[];
}

const AppState: IAppState = {
  appTitle: 'Office UI Fabric - React components',

  headerLinks: [
    {
      name: 'Getting started',
      url: '#/'
    },
    {
      name: 'Fabric',
      url: 'http://dev.office.com/fabric'
    },
    {
      name: 'Github',
      url: 'http://www.github.com/officedev'
    }
  ],

  examplePages: [
    {
      name: 'Basic components',
      links: [
        {
          name: 'Breadcrumb',
          url: '#/examples/breadcrumb'
        },
        {
          name: 'Button',
          url: '#/page=button'
        },
        {
          name: 'Callout',
          url: '#/examples/callout'
        },
        {
          name: 'ChoiceField',
          url: '#/examples/choicefield'
        },
        {
          name: 'CommandBar',
          url: '#/examples/commandbar'
        },
        {
          name: 'ContextualMenu',
          url: '#/examples/contextmenu'
        },
        {
          name: 'DatePicker',
          url: '#/examples/datepicker'
        },
        {
          name: 'Dialog',
          url: '#/examples/dialog'
        },
        {
          name: 'Dropdown',
          url: '#/examples/dropdown'
        },
        {
          name: 'Label',
          url: '#/examples/label',
          component: LabelExample
        },
        {
          name: 'Link',
          url: '#/examples/link'
        },
        {
          name: 'List',
          url: '#/examples/list'
        },
        {
          name: 'ListItem',
          url: '#/examples/listitem'
        },
        {
          name: 'NavBar',
          url: '#/examples/navbar'
        },
        {
          name: 'OrgChart',
          url: '#/examples/orgchart'
        },
        {
          name: 'Overlay',
          url: '#/examples/overlay'
        },
        {
          name: 'Panel',
          url: '#/examples/panel'
        },
        {
          name: 'PeoplePicker',
          url: '#/examples/peoplepicker'
        },
        {
          name: 'Persona',
          url: '#/examples/persona'
        },
        {
          name: 'PersonaCard',
          url: '#/examples/personacard'
        },
        {
          name: 'Pivot',
          url: '#/examples/pivot'
        },
        {
          name: 'ProgresIndicator',
          url: '#/examples/progressindicator'
        },
        {
          name: 'SearchBox',
          url: '#/examples/searchbox'
        },
        {
          name: 'Spinner',
          url: '#/examples/spinner'
        },
        {
          name: 'Table',
          url: '#/examples/table'
        },
        {
          name: 'TextField',
          url: '#/examples/textfield',
          component: TextFieldExample
        },
        {
          name: 'Toggle',
          url: '#/examples/toggle',
          component: ToggleExample
        }
      ]
    },
    {
      name: 'Utilities',
      links: [
        {
          name: 'Event groups',
          url: '#examples/eventgroup'
        },
        {
          name: 'Focus zones',
          url: '#examples/focuszone'
        },
        {
          name: 'Selection management',
          url: '#examples/selectionManagement'
        }
      ]
    }
  ]
};

export default AppState;
