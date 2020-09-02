import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@fluentui/react-northstar';
import { CodeSnippet } from '@fluentui/docs-components';

import ComponentPropsTable from '../components/ComponentDoc/ComponentPropsTable';
import DocPage from '../components/DocPage';
import { code, link } from '../utils/helpers';

export default () => (
  <DocPage title="Focus Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', '#overview')}</li>
      <li>
        {link('Usage', '#usage')}
        <ul>
          <li>{link('Mode', '#mode')}</li>
          <li>{link('Props', '#props')}</li>
        </ul>
      </li>
      <li>{link('Override FocusZone settings', '#override-focuszone-settings')}</li>
    </ul>
    <Header as="h2">Overview</Header>
    <p>
      {code('FocusZone')} provides arrow key navigation between component's child items, in such components as
      {code('Menu')}, {code('List')}, {code('Toolbar')} and {code('Grid')}. At the same time it is possible to navigate
      between these components by using {code('TAB')} key.
    </p>
    <p>
      Tabbable elements (buttons, anchors, etc., elements with {code('tabindex="0"')} or
      {code('data-is-focusable="true"')} attributes) are considered when pressing directional arrow keys and focus is
      moved appropriately. Tabbing to a zone sets focus only to the current "active" element, making it simple to use
      the {code('TAB')} key to transition from one zone to the next (from e.g., {code('TAB')} from Menu to List), rather
      than through every focusable element.
    </p>
    <p>{code('FocusZone')} operates based on DOM structure to:</p>
    <ul>
      <li>Focus the next or previous element after pressing a navigation key</li>
      <li>
        The last focused element within the zone is identified by using{' '}
        {link('Roving tabindex', 'https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex')}
      </li>
    </ul>
    <p>
      Fluent UI leverages {code('FocusZone')} component which is based on the{' '}
      {link(
        'Focus Zone from Fluent UI React.',
        'https://developer.microsoft.com/en-us/fluentui#/controls/web/focuszone',
      )}{' '}
      The Focus Zone can wrap any component / element and adds arrow key navigation functionality.
    </p>
    <Header as="h2">Usage</Header>
    <div>
      In Fluent UI, Focus Zone is assigned to components through accessibility behaviors
      <CodeSnippet
        label="menuBehavior.ts"
        value={`
        const menuBehavior: Accessibility = (props: any) => ({
          //...
          focusZone: {
            mode: FocusZoneMode.Embed,
            props: {
              //...
            },
          },
        })
        `}
      />
      and then accessibility behavior is set for component
      <CodeSnippet
        label="NavigableMenu.jsx"
        value={`
        const NavigableMenu = () => (
          <Menu accessibility={menuBehavior} />
        )`}
      />
      Read more about <Link to="accessibility-behaviors">Accessibility Behaviors</Link>.
    </div>
    <p>
      The accessibility behavior can control the focus zone operation by specifying Focus zone's properties -{' '}
      <b>mode</b> and <b>props</b>.
    </p>
    <Header as="h3">Mode</Header>
    <p>Type: {code('FocusZoneMode')}, with 2 main options:</p>
    <ul>
      <li>
        <b>Embed</b> - Focus Zone is embeded into component's container, thus all {code('FocusZone')}'s
        attributes/events listeners are applied to component's container.
        <CodeSnippet
          label="html"
          value={`
          <ul role="menu" class="ui-menu">---> FocusZone's attributes/events listeners applied here
            <li class="ui-menu__item ..." role="presentation">
            </li>
            <li class="ui-menu__item ..." role="presentation">
            </li>
          </ul>
          `}
        />
      </li>
      <li>
        <b>Wrap</b> - Focus Zone wraps component to it's own container and all attributes/events listeners applied
        there.
        <CodeSnippet
          label="html"
          value={`
            <div>---> FocusZone's attributes/events listeners applied here
              <ul role="menu" class="ui-menu">
                <li class="ui-menu__item ..." role="presentation">
                </li>
                <li class="ui-menu__item ..." role="presentation">
                </li>
              </ul>
            </div>
          `}
        />
      </li>
    </ul>
    <Header as="h3">Props</Header>
    <p>
      The following props can be applied (
      {link(
        'lookup for API on GitHub',
        'https://github.com/microsoft/fluentui/blob/master/packages/fluentui/react-bindings/src/FocusZone/FocusZone.types.ts',
      )}
      ):
    </p>
    <ComponentPropsTable componentName="FocusZone" />
    <Header as="h2">Override {code('FocusZone')} settings</Header>
    <p>
      To be able to add/override Focus Zone settings already set for a component, it is needed to override or create a
      new accessibility behavior.
    </p>
    <p>For example, we want to specify default tabbable element for Menu to be the last one, not first.</p>
    <CodeSnippet
      value={`
      const overridenMenuBehavior: Accessibility = (props: any) => {
        const behavior = menuBehavior(props)

        behavior.focusZone.props.defaultTabbableElement = (root: HTMLElement): HTMLElement => {
          return root.querySelector(".ui-menu__item__wrapper:last-child")
        }

        return behavior
      }
      `}
    />
    And then use this new behavior by Menu component:
    <CodeSnippet
      label="NavigableMenu.jsx"
      value={`
        const NavigableMenu = () => (
          <Menu accessibility={overridenMenuBehavior} />
        )`}
    />
    <p>Read more about:</p>
    <ul>
      <li>
        <Link to="accessibility-behaviors">Accessibility Behaviors</Link>
      </li>
      <li>
        <Link to="focus-trap-zone">FocusTrapZone</Link>
      </li>
      <li>
        <Link to="auto-focus-zone">AutoFocusZone</Link>
      </li>
    </ul>
    <p>
      {code('FocusZone')} code on{' '}
      {link(
        'GitHub.',
        'https://github.com/microsoft/fluentui/blob/master/packages/fluentui/react-bindings/src/FocusZone/FocusZone.tsx',
      )}
    </p>
  </DocPage>
);
