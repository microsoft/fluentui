import * as React from 'react';
import { Link } from 'react-router-dom';
import ComponentExample from '../../../../components/ComponentDoc/ComponentExample';
import ExampleSection from '../../../../components/ComponentDoc/ExampleSection';

const Usage = () => (
  <ExampleSection title="Usage">
    <ComponentExample
      title="With tooltips"
      description={
        <>
          {'The items inside the Toolbar, as actionable elements, should be rendered with '}
          <Link to="/components/tooltip">tooltip</Link>
        </>
      }
      examplePath="components/Toolbar/Usage/ToolbarExampleWithTooltip"
    />
    <ComponentExample
      title="Popup in Menu"
      description="Menus can contain items that show a Popup"
      examplePath="components/Toolbar/Usage/ToolbarExamplePopupInMenu"
    />
    <ComponentExample
      title="Popup with an action, in Menu"
      description="Popup action can lead to closing of the menu"
      examplePath="components/Toolbar/Usage/ToolbarExampleActionPopupInMenu"
    />
  </ExampleSection>
);

export default Usage;
