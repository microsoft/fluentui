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
      <img src="data:image/png;base64,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" />
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
      There are cases, when you need to add names of other elements in the accessible name of an element. In the example
      below, the button has accessible name composed of its own name (delete) and header name (Active members). Solution
      is to refer to the element itself by its {code('id')} in the {code('aria-labelledby')} attribute. Screen reader
      computes the accessible name in the order which is provided in {code('aria-labelledby')}. The strategy was taken
      from the
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
      'https://github.com/stardust-ui/accessibility/blob/master/CONTRIBUTING.md',
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
