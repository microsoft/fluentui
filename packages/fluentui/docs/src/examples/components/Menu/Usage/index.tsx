import * as React from 'react';
import { Link } from 'react-router-dom';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="Menu as a Toolbar"
      description="A menu with Toolbar accessibility behavior."
      examplePath="components/Menu/Usage/MenuExampleToolbar"
    />
    <ComponentExample
      title="Menu as a Tab List"
      description="A menu with TabList accessibility behavior."
      examplePath="components/Menu/Usage/MenuExampleTabList"
    />
    <ComponentExample
      title="Menu with submenus"
      description="A menu can have submenus."
      examplePath="components/Menu/Usage/MenuExampleWithSubmenu"
    />
    <ComponentExample
      title="Menu with submenus opening on hover"
      description="A menu can have submenus that open on hover."
      examplePath="components/Menu/Usage/MenuExampleWithSubmenuHover"
    />
    <ComponentExample
      title="Menu with submenus controlled"
      description="When Submenu in MenuItem is controlled, then its 'menuOpen' prop value could be changed either by parent component, or by user actions (e.g. key press) - thus it is necessary to handle 'onMenuOpenChange' event."
      examplePath="components/Menu/Usage/MenuExampleWithSubmenuControlled"
    />
    <ComponentExample
      title="With tooltips"
      description={
        <>
          {'The items inside the Menu, as actionable elements, should be rendered with '}
          <Link to="/components/tooltip">tooltip</Link>
        </>
      }
      examplePath="components/Menu/Usage/MenuExampleWithTooltip"
    />
  </ExampleSection>
);

export default Usage;
