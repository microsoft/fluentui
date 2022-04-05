import { CodeSnippet } from '@fluentui/docs-components';
import * as React from 'react';
import DocPage from '../components/DocPage/DocPage';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';
import { Link } from 'react-router-dom';

import { code, link } from '../utils/helpers';
import { Header } from '@fluentui/react-northstar';

export default () => (
  <DocPage title="Accessibility in Fluent UI">
    <Header as="h2" content="Content" />
    <ul>
      <li>
        {link('Goals of accessibility', '#goals-of-accessibility')}
        <ul>
          <li>{link('Out of scope', '#out-of-scope')}</li>
        </ul>
      </li>
      <li>
        {link('Making an app / page accessible', '#making-an-app-page-accessible')}
        <ul>
          <li>{link('Semantic HTML', '#semantic-html')}</li>
          <li>{link('Design Considerations', '#design-considerations')}</li>
        </ul>
      </li>
      <li>
        {link('Keyboard Navigation', '#keyboard-navigation')}
        <ul>
          <li>{link('Tabbing and arrow key navigation', '#tabbing-and-arrow-key-navigation')}</li>
          <li>{link('Virtual Screen Reader Navigation', '#virtual-screen-reader-navigation')}</li>
          <li>{link('Accessibility Behaviors', '#accessibility-behaviors')}</li>
          <li>{link('Focus Zone', '#focus-zone')}</li>
          <li>{link('Focus Trap Zone', '#focus-trap-zone')}</li>
          <li>{link('Auto Focus Zone', '#auto-focus-zone')}</li>
          <li>{link('Focus Indicator', '#focus-indicator')}</li>
          <li>{link('Right Click Support', '#right-click-support')}</li>
          <li>{link('Elements that appear on hover', '#elements-that-appear-on-hover-over-another-element')}</li>
        </ul>
      </li>
      <li>
        {link('Screen Readers', '#screen-readers')}
        <ul>
          <li>{link('Textual Representation', '#textual-representation')}</li>
          <li>{link('Live Regions', '#live-regions')}</li>
        </ul>
      </li>
      <li>{link('High Contrast', '#high-contrast')}</li>
      <li>{link('Zoom', '#zoom')}</li>
    </ul>

    <Header as="h2" content="Goals of Accessibility" />
    <p>
      Fluent UI components follow{' '}
      {link('WAI-ARIA 1.1 authoring practises', 'https://www.w3.org/TR/wai-aria-practices-1.1/')}. They can be easily
      composed into accesible experiences with correct keyboard navigation, screen reader support, high contrast theme
      and zooming.
    </p>
    <p>
      Fluent UI introduces the concept of accessibility behaviors which are responsible for translating the natural
      Fluent UI API into correct ARIA roles, attributes and keyboard key handlers. Default behaviors can be overriden
      and customized.
    </p>
    <p>
      The consumer of the library should generally be shielded from the intricates of applying the correct ARIA roles,
      testing on multiple screen reader / os combinations. This allows spending more time on the usability aspects of
      accessibility.
    </p>
    <p>
      Following steps help to design an accessible user experience:
      <ol>
        <li>
          decompose UI to parts and <b>identify components, variants and behaviors to use</b>
        </li>
        <li>
          define usage of{' '}
          <b>
            {link('headings and landmarks', 'https://www.w3.org/TR/wai-aria-practices/examples/landmarks/index.html')}
          </b>
        </li>
        <li>
          verify usage of{' '}
          <b>{link('color and contrast', 'https://accessibility.umn.edu/core-skills/color-contrast')}</b> to convey
          information
        </li>
        <li>
          define <b>tab order and arrow key navigation</b>
        </li>
        <li>
          specify <b>labels</b>, especially for components without textual information (icon only buttons) and for
          containers (menus, toolbars and so on)
        </li>
        <li>
          specify texts for <b>state change announcements</b> (number of available items in dropdown, error messages,
          confirmations, ...)
        </li>
        <li>
          identify UI parts that appear on <b>hover or focus</b> and specify keyboard and screen reader interaction with
          them
        </li>
        <li>
          list cases when <b>focus</b> needs to be <b>moved programatically</b> (if parts of the UI are
          appearing/disappearing or other cases){' '}
        </li>
        <li>
          list cases when <b>focus</b> needs to be <b>trapped</b> in sections of the UI (for dialogs and popups or for
          hierarchical navigation)
        </li>
        <li>
          if extending existing functionality, how does it fit into current experience with regards to discoverability,
          interaction, keyboard navigation and screen reader navigation?
        </li>
      </ol>
    </p>

    <Header as="h3" content="Out of Scope" />
    <p>
      Internationalization, globalization, keyboard shortcuts and language detection are deliberately not part of Fluent
      UI and should be handled by the hosting application.
    </p>

    <Header as="h2" content="Making an app / page accessible" />
    <p>
      Besides component level accessibility there are application / page level considerations, mostly regarding the
      logical structure. Follow{' '}
      {link('ARIA Landmarks Example', 'https://www.w3.org/TR/wai-aria-practices/examples/landmarks/index.html')} to
      identify and implement page areas.
    </p>

    <p>
      In some cases, ARIA attributes need to be provided by the consumer of Fluent UI if the required information cannot
      be derived from the components.
    </p>
    <p>
      Focusable elements that do not contain any textual information need to be labelled so that the screen reader can
      present them to the user. In addition to that, information that is relevant to the screen reader user only can be
      added to the label:
    </p>
    <CodeSnippet
      value={`
        <>
          <Button icon='email' />
          <Button icon='email' aria-label='Send message' />
          <Radio aria-label='Include history from the past day. Press TAB to change the number of days.' />
        </>
      `}
    />
    <p>
      Most typical examples are {code('aria-label')}, {code('aria-labelledby')} and {code('title')} attributes. In some
      cases the values need to be dynamically changed based on the state of the component/application.
    </p>

    <Header as="h3" content="Semantic HTML" />
    <p>
      While Fluent UI goes a long way in making the application accessible by default, it does build on having correct
      semantic HTML as the base.
    </p>
    <p>
      One way to look at this is that by looking at the HTML, you should immediately be able to see what the function is
      on every part of the page. For example,
    </p>
    <CodeSnippet
      value={`
        <Button aria-label='Download file'>
          <DownloadIcon />
        </Button>
      `}
    />

    <p>
      This is a simple example, clearly here the intent is to display a button with an icon labelled 'Download'. HTML
      representation is semantically correct and specifies essential
      {code('aria-*')} attributes:
    </p>
    <CodeSnippet
      mode="html"
      value={`
        <button class='ui-button' aria-label='Download file'>
          <i class='ui-icon' aria-hidden='true'></i>
        </button>
      `}
    />

    <p>
      Although we highly recommend using semantically correct HTML elements, it is possible to render, for example,{' '}
      {code('<Button>')}
      component as {code('<div>')} and remain semantic by provided out of the box {code('role')} attribute.
    </p>

    <CodeSnippet
      value={`
        <Button as={"div"} aria-label='Download file'>
          <DownloadIcon />
        </Button>
      `}
    />

    <p>Attribute {code('role="button"')} is added to button container:</p>
    <CodeSnippet
      mode="html"
      value={`
        <div class='ui-button' role="button" aria-label='Download file'>
          <i class='ui-icon' aria-hidden='true'></i>
        </div>
      `}
    />
    <p>Basic rules for semantically correct HTML:</p>
    <ul>
      <li>Preserve DOM order and put elements in their correct position - use css to style appearance, not position</li>
      <li>
        Use appropriate semantic elements (for example {code('<table>')} for a table, {code('ul')} and {code('li')}
        for a list)
      </li>
      <li>Use appropriate roles and {code('aria-*')} attributes</li>
    </ul>

    <Header as="h3" content="Design Considerations" />
    <p>
      Having a clear idea of how users would use the keyboard and screen readers to navigate through your app before
      development starts is critical to both getting the ordering of components right and choosing the correct
      behaviors. For example
    </p>
    <p>
      <img src="data:image/jpeg;base64,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" />
    </p>
    <p>
      How does the user expect to navigate this? It looks a bit similar to a breadcrumb-like control, but the final
      element isn't focusable. So should we follow the ARIA recommendations for breadcrumbs or do something else? Both
      'Fluent UI' and the '...' menu are actionable, so one approach is for focus to first land on 'Fluent UI', and then
      when you press {code('Tab')} to move to '...'. Alternatively, this could be regarded as one control and you would
      navigate within the control using arrow keys / {code('Enter')} / {code('Escape')} and pressing {code('Tab')} would
      move you to the next area. When you land on the control in both cases the screen reader needs to give context and
      announce the team and channel and that there are options available.
    </p>
    <p>Similarly, the controls</p>
    <p>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKsAAAA7CAIAAACL7O0NAAAAAXNSR0IArs4c6QAAAAlwSFlzAAASdAAAEnQB3mYfeAAABEBJREFUeF7tWz1s2lAQDhULjGUNY9OxZoQpLRmTFdRMsDDQAaRmaIZmCEM6gESGUoklTKlgpWNQMrGGlTVEajvQqq1ExvYjT7Vcfmzz/I7YfffkgTjnz3fffXfvhyT06+ePDR4aM/BI49g59CkDrADddcAKYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMPYAXozoDu8XMP0F0Bof/g/wUO3xyOv42tmYxGovXTuvfcHh9Xbm9HwInH44aRSKdfRKNR77C+QlCvgO79sA9y735QEDEajRrvGxBEs9mUwDfFJDQ0Ho9jsRhwAHtx0RsMBtlsJpVKSSA7PmLVcSaT3dlJOz6ixEC9AgqFQr1et6mVyWRSLpflMmQfs0h/8VWxUqlI4/f7/Xa7c3c3mUcAfrVa8yKCmfKIPY6dvDuxBnV21oLOkH6iCpknkGQdYN8qiRqpmX50bOnigDo77c7BweuFCEDGr6APmMm9AgpAeUBbYsynH7Brq34RAokCBDSawcxwnB3kaBVdWlS/l/QDp9frPTMMgKA6l4nAMAyYSbu6rABQ/cDM53PSyHIPEirAVLr5ga6zgT7v6QeD19fTDowPM9VpJRcGMJOje9lT1vRDYRhy+FeXV7iszzreIVSAXAxyTx0dvbVWfy4nWUlY+Tt2ERiIDYKqMVP9wHf0YeGrkezzj+e4TBG4uUOoAOsUoIosLNPcQBEt1928elUbEdH6m7/pJ6ECrLPAqrwss2+1ppOlGJj7sV9XhSxwNjfjgLXHhAHMVL0XYrWmH3tCaeTt59v7L/dx4YMAcXOHRAHSS2X3wYuln/LSSSQM7Pvt3YABzNy7upLlzNHWSs+KlJvpN0Vgf0e9AjAHY9NcLpVr1RpKttv9JK5G4wM2WquGtNBe1cp/HjydTmM7btMG8CsYwExJIH4AUa8AtDWsy3Cgtru3m0wmt7aebGz8xoUj1ZvRjfcNIV36kQ9s1XDgAwUvFAFuQtZoPERHGg8iCPUKMMN4+neIM2D8VCwW0UKHw6GXUJXs+20cEBMzRIAGZuoAH/AjbubyOemtmnipzRS5htlzPnD1p8L22UX6MR3A5lTqm5tSqYzzWusrMOlQrPyRDBz7YN8vNn5Y+mHuR/P3WP2OX5rQfWOyLC/rVgD8wDwaiUTQErx0An5WFQMPoABVrjOOEgYI1wFK/GMQagZYAdQM+x2fFeD3DFH7xwqgZtjv+KwAv2eI2j9WADXDfsdnBfg9Q9T+hb5++Uz9Dsb3IQPm4Wbo+79/ae9DX9klCgbC4bCA5VmAgt4gYfKpcJCyReEr9wAKVoOEyQoIUrYofGUFULAaJExWQJCyReErK4CC1SBhsgKClC0KX1kBFKwGCZMVEKRsUfj6B3lYy//lH+0fAAAAAElFTkSuQmCC" />
    </p>
    <p>
      could be implemented as separate controls, so you would navigate between them with {code('Tab')}. Or they could be
      grouped together to behave as a toolbar. The first approach has advantages that blind users would have awareness
      of all the controls available to them, but at the expense of having to press {code('Tab')} multiple times to move
      around the application.
    </p>
    <p>
      These types of decisions are ultimately what will make the application easy or hard for users to navigate - and
      although Fluent UI make this easier to change than pure html implementations, it is still costly in terms of
      developer time to correctly make these types of changes later.
    </p>
    <p>
      Our strong recommendation here is to have clear accessibility designs and example user flows as early in the
      design process as possible.{' '}
    </p>

    <Header as="h2" content="Keyboard Navigation" />
    <p>
      The ability to navigate and interact with the application without a mouse is something that most now take for
      granted. It's often easier for users to select a particular item in a list using arrow keys, rather than
      attempting to select with the pointing device for example.{' '}
    </p>

    <Header as="h3" content="Tabbing and arrow key navigation" />
    <p>
      The {code('Tab')} key is used to move between focusable elements, and many users are familiar with this behavior
      as they, for example, move between fields in form using {code('Tab')}. This is provided by the browser and for
      simple applications may be sufficient.
    </p>
    <p>
      However, for complex applications, particularly those which display large amounts of actionable data on the screen
      the number of 'focusable' elements can become huge and the process of moving between them with {code('Tab')}{' '}
      becomes unusable. This can be solved by breaking the application up into 'Zones', and the user navigates with the{' '}
      {code('Tab')} key between the zones, and between the actionable elements with navigation keys. Fluent UI uses
      Focus Zones both within it's own library components and as a component that can be added by the user.
    </p>

    <Header as="h3" content="Virtual Screen Reader Navigation" />
    <p>
      Screen readers use different mode of keyboard navigation. They allow the user to navigate using their virtual
      navigation methods and/or list different types of elements (headings, buttons, menus). Every screen reader has its
      own implementation of virtual navigation, but they all operate based on the ARIA roles and attributes. Fluent UI
      will render these attributes based on the Accessibility Behaviors of the component.
    </p>

    <Header as="h3" content="Accessibility Behaviors" />
    <p>
      In Fluent UI, accessibility behaviors encapsulate keyboard navigation and screen reader navigation. They
      essentially add ARIA roles, ARIA attributes and event handlers. The idea is to compose visual components and apply
      a behavior on top of them to achieve desired keyboard or screen reader navigation. Users can override these and
      provide their own roles and attributes by changing the behavior applied.{' '}
      {link('Read more about Accessibility Behaviors.', '/accessibility-behaviors')}
    </p>

    <Header as="h3" content="Focus Zone" />
    <p>
      Focus zones allow the Tab navigation to be broken down into smaller parts, so that user can use the {code('tab')}{' '}
      key to navigate between higher level components (for example tool bars, menus, lists) and use arrow key navigation
      within these higher level components (buttons in a toolbar, items in a list).{' '}
      {link('Read more about FocusZone.', '/focus-zone')}
    </p>

    <Header as="h3" content="Focus Trap Zone" />
    <p>
      FocusTrapZone is used to grab and trap the focus inside an HTML element. Currently can be used only in{' '}
      {code('Popup')} and {code('Dialog')} components. Pressing TAB key will circle focus within the inner focusable
      elements of the FocusTrapZone. For example, when Popup opens, we want the focus to go inside Popup and trap there.{' '}
      {link('Read more about FocusTrapZone.', '/focus-trap-zone')}
    </p>

    <Header as="h3" content="Auto Focus Zone" />
    <p>
      AutoFocusZone is used to focus inner element on mount. Currently can be used in {code('Popup')}. For example, when
      we want to focus inner element in Popup when it mounts, but still without focus trap.{' '}
      {link('Read more about AutoFocusZone.', '/auto-focus-zone')}
    </p>

    <Header as="h3" content="Focus indicator" />
    <p>
      When a user is navigating through the application using the keyboard, it's important to make the element that
      currently has focus clearly visible, so the users can see where they are on the page. This is handled in Fluent UI
      by focus indicator functionality. Focus indicator will be displayed only if the application is in keyboard mode.
      Application switches to keyboard mode when a key relevant to navigation is pressed. It disables keyboard mode on
      mouse click events.
    </p>
    <p>The implementation and requirements on the consuming application/experience are work in progress.</p>

    <Header as="h3" content="Right Click Support" />
    <p>
      Screen reader has to make the user aware about the presence of the secondary action by a short meaningful label or
      description on the trigger element.
    </p>

    <Header as="h3" content="Elements that appear on hover over another element" />
    <p>
      Tooltips, popups and similar elements might appear only when the trigger element is hovered by mouse. Users using
      keyboard or screen readers to navigate are not able to hover the trigger element. Therefore such elements need to
      be visible also when the trigger element is in focused state.
    </p>

    <Header as="h2" content="Screen Readers" />

    <Header as="h3" content="Textual Representation" />
    <p>
      There are multiple ways ({code('aria-label')}, {code('aria-labelledby')}, {code('title')}) to set the text that is
      announced by screen readers. Many times, the correct text will be read by the reader without any additional work.
      However, if you do need to customize behavior, then ARIA attributes can be passed to components as properties.
    </p>
    <p>
      There are cases when passing of the attributes is required. For example an icon-only button needs to have textual
      representation. It depends on the use case which attribute needs to be used:
    </p>
    <ul>
      <li>
        {code('title')} attribute represents the text that is shown as a tooltip on hover, screen readers also read this
        text when the element is focused
      </li>
      <li>
        {code('aria-label')} allows the user to add custom text that the screen reader will read on focus. There might
        be scenarios where the information read by the screen reader needs to be different than the information that
        comes from the visual representation of the component/element
      </li>
      <li>
        {code('aria-labelledby')} is similar to {code('aria-label')}, but is only a reference to a different element
        present in DOM.
      </li>
    </ul>
    <p>
      Fluent UI does not do any assumption and does not try to use the most appropriate option from these three.
      Instead, it is up to the user to decide which option fits best.
    </p>
    <p>Example:</p>
    <CodeSnippet
      value={`
        <Button icon="add" aria-label="Add item to list" primary />
      `}
    />
    <p>Rendered HTML:</p>
    <CodeSnippet
      mode="html"
      value={`
        <button class="ui-button" aria-label="Add item to list">
          <span class="ui-icon" color="white"></span>
        </button>
      `}
    />

    <Header as="h3" content="Useful examples of labelling" />
    <Header as="h4" content="Aria-labelledby refers to itself " />
    <p>
      There are cases, when you need to add names of other elements in the accessible name of an current element. In the
      example below, the button has accessible name composed of its own name (delete) and header name (Active members).
      Solution is to refer to the element itself by its {code('id')} in the {code('aria-labelledby')} attribute. Screen
      reader computes the accessible name in the order which is provided in {code('aria-labelledby')}. The strategy was
      taken from the
      {link(' Accessible Name and Description Computation 1.1', 'https://www.w3.org/TR/accname-1.1/#terminology')} page.
    </p>
    <CodeSnippet
      value={`
      <>
      <Header as="h3" content="Active members" id="table-header" />
      <Button
        icon={<TableDeleteIcon />}
        id="delete-button"
        aria-label="delete"
        aria-labelledby="delete-button table-header"
      />
    </>
    `}
    />

    <Header as="h3" content="Accessibility name computation" />
    <p>
      The way how screen readers compute name and description is described in{' '}
      {link(' Accessible Name and Description Computation 1.1', 'https://www.w3.org/TR/accname-1.1/')} page. As the
      rules are quite complex, follow the page Button name computation to see how these rules apply in concrete
      examples.
      <Link to="button-name-computation"> Button name computation</Link> to see how these rules apply in concrete
      examples.
    </p>

    <Header as="h3" content="Live Regions" />
    <p>
      Out of scope for now. Can be used {link('react-aria-live', 'https://github.com/AlmeroSteyn/react-aria-live')}
      library for that purpose.
    </p>

    <Header as="h2" content="High Contrast" />
    <p>
      There will be a standard high contrast theme. Additionally, the DocSite can be used to test individual components
      work in HC mode and achieve sufficient clarity for partially sighted.
    </p>

    <Header as="h2" content="Zoom" />
    <p>Fluent UI components are tested zoomed up to 200%.</p>

    <Header as="h1" content="Contributing" />
    {link(
      'Accessibility contributing guide',
      'https://github.com/microsoft/fluentui/blob/master/packages/fluentui/CONTRIBUTING.md#accessibility',
    )}

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
      <li>
        <Link to="auto-focus-zone">AutoFocusZone</Link>
      </li>
    </ul>

    <GuidesNavigationFooter previous={{ name: 'FAQ', url: 'faq' }} next={{ name: 'Theming', url: 'theming' }} />
  </DocPage>
);
