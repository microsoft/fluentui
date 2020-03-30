import { CodeSnippet } from '@fluentui/docs-components';
import * as React from 'react';
import { Header } from '@fluentui/react-northstar';
import { Link } from 'react-router-dom';
import DocPage from '../components/DocPage';
import { code, link } from '../utils/helpers';
import ComponentPropsTable from '../components/ComponentDoc/ComponentPropsTable';

export default () => (
  <DocPage title="Auto Focus Zone">
    <Header as="h2">Content</Header>
    <ul>
      <li>{link('Overview', '#overview')}</li>
      <li>{link('Usage', '#usage')}</li>
      <li>{link('Override AutoFocusZone settings', '#override-autofocuszone-settings')}</li>
    </ul>
    <Header as="h2">Overview</Header>
    <p>
      {code('AutoFocusZone')} can be integrated into {code('Popup')} component and is used to grab focus and put it to
      an inner element when the component mounts. This can be achieved by specifying {code('autoFocus')} prop on the{' '}
      {code('Popup')}.
    </p>
    <p>
      If you need both - grabbing the focus and trap the focus in the component - use {code('trapFocus')} prop for{' '}
      {code('Popup')}
      to integrate <Link to="focus-trap-zone">FocusTrapZone</Link>.
    </p>
    <Header as="h2">Usage</Header>
    <p>
      In {code('Popup')}, set {code('autoFocus')} to {code('true')} with default settings or set an object with desired
      values for auto focus zone props.
    </p>
    <p>By default, focus will be set to the first tabbable element in the Popup:</p>
    <CodeSnippet label="PopupExample.jsx" value={`const Example = () => <Popup autoFocus />`} />
    <p>
      {code('AutoFocusZone')}'s props which can be applied to {code('autoFocus')} prop (
      {link(
        'lookup for API on GitHub',
        'https://github.com/microsoft/fluentui/blob/master/packages/fluentui/react-bindings/src/FocusZone/AutoFocusZone.types.tsx',
      )}
      ):
    </p>
    <ComponentPropsTable componentName="AutoFocusZone" />
    <Header as="h2">Override {code('AutoFocusZone')} settings</Header>
    <p>
      For example, we want to specify the focusable selector for Popup with auto focus. On Popup mount, focus will go to
      the element matched to that selector. For that purpose, we can specify {code('firstFocusableSelector')}.
    </p>
    <CodeSnippet
      label="PopupExample.jsx"
      value={`
        const Popup = () => (
          <Popup autoFocus={{ firstFocusableSelector: ".btn-submit" }} />
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
        <Link to="focus-trap-zone">FocusTrapZone</Link>
      </li>
    </ul>
    <p>
      {code('AutoFocusZone')} code on{' '}
      {link(
        'GitHub.',
        'https://github.com/microsoft/fluentui/blob/master/packages/fluentui/react-bindings/src/FocusZone/AutoFocusZone.tsx',
      )}
    </p>
  </DocPage>
);
