import { CodeSnippet } from '@fluentui/docs-components';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@fluentui/react-northstar';
import DocPage from '../components/DocPage';
import { link, code } from '../utils/helpers';

import ComponentPropsTable from '../components/ComponentDoc/ComponentPropsTable';

export default () => (
  <DocPage title="Focus Trap Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', '#overview')}</li>
      <li>{link('Usage', '#usage')}</li>
      <li>{link('Override FocusTrapZone settings', '#override-focustrapzone-settings')}</li>
    </ul>
    <Header as="h2">Overview</Header>
    <p>
      {code('FocusTrapZone')} grabs the focus and traps it within an HTML element. Currently can be used only in{' '}
      {code('Popup')}
      and {code('Dialog')} components. Pressing {code('TAB')} key will circle focus within the inner focusable elements
      of the {code('FocusTrapZone')}. The main purpose is to block user interaction outside {code('FocusTrapZone')} in
      any way. Therefore, keyboard events are not propagated outside {code('FocusTrapZone')}, hence {code('Popup')} or{' '}
      {code('Dialog')}.
    </p>
    <p>
      Fluent UI leverages Focus Trap Zone component which is based on the{' '}
      {link(
        'Focus Trap Zone from Fluent UI React.',
        'https://developer.microsoft.com/en-us/fluentui#/controls/web/focustrapzone',
      )}
    </p>
    <Header as="h2">Usage</Header>
    <p>
      To apply {code('FocusTrapZone')} to {code('Popup')} set prop {code('trapFocus')} to
      {code('true')} with default settings or set an object with desired values for focus trap zone props.
    </p>
    <CodeSnippet label="PopupExample.jsx" value={`const Example = () => <Popup trapFocus />`} />
    <p>
      {code('Dialog')} component has always set {code('trapFocus')} prop to {code('true')}, but it is also possible to
      override default settings by specifying object of {code('FocusTrapZoneProps')}.
    </p>
    <p>
      {code('FocusTrapZone')}'s props which can be applied to {code('trapFocus')} prop (
      {link(
        'lookup for API on GitHub',
        'https://github.com/microsoft/fluentui/blob/master/packages/fluentui/react-bindings/src/FocusZone/FocusTrapZone.types.tsx',
      )}
      ):
    </p>
    <ComponentPropsTable componentName="FocusTrapZone" />
    <Header as="h2">Override {code('FocusTrapZone')} settings</Header>
    <p>For example, we want to disable first focus on Popup mount, so we can control the initial focus by ourselves:</p>
    <CodeSnippet
      label="PopupExample.jsx"
      value={`
        const Popup = () => (
          <Popup trapFocus={{ disableFirstFocus: true }} />
        )`}
    />
    <p>Same usage applies to {code('Dialog')} component:</p>
    <CodeSnippet
      label="DialogExample.jsx"
      value={`
        const Dialog = () => (
          <Dialog trapFocus={{ focusTriggerOnOutsideClick: true }} />
        )`}
    />
    <p>Read more about:</p>
    <ul>
      <li>
        <Link to="accessibility-behaviors">Accessibility Behaviors</Link>
      </li>
      <li>
        <Link to="focus-zone">FocusZone</Link>
      </li>
      <li>
        <Link to="auto-focus-zone">AutoFocusZone</Link>
      </li>
    </ul>
    <p>
      {code('FocusTrapZone')} code on{' '}
      {link(
        'GitHub.',
        'https://github.com/microsoft/fluentui/blob/master/packages/fluentui/react-bindings/src/FocusZone/FocusTrapZone.tsx',
      )}
    </p>
  </DocPage>
);
