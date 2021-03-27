import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';

const navBarInstruction = 'To navigate use the arrow keys';
let timeout;

const narrate = (message, priority = 'polite') => {
  const element = document.createElement('div');
  element.setAttribute(
    'style',
    'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
  );
  element.setAttribute('aria-live', priority);
  document.body.appendChild(element);

  timeout = setTimeout(() => {
    element.innerText = message;
  }, 1000); // End setTimeout 1

  setTimeout(() => {
    document.body.removeChild(element);
  }, 1300); // End setTimeout 1
}; // End narrate

const AccessibleNavBar: React.FunctionComponent = () => {
  const [navBarItems, setNavBarItems] = React.useState<HTMLElement[]>(null);
  const [focusedItemIndex, setFocusedItemIndex] = React.useState(0);

  const handleKeyDown = React.useCallback(
    event => {
      if (navBarItems === null) {
        // Begin if 1
        return;
      } // End if 1
      switch (
        event.code // Begin switch 1
      ) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowUp':
          // Set tabindex="-1" on the previously focused navBar item
          navBarItems[focusedItemIndex].setAttribute('tabindex', '-1');

          // Compute and set the new focused item index
          setFocusedItemIndex(prevIndex => {
            const tempIndex = prevIndex + (['ArrowRight', 'ArrowDown'].includes(event.code) ? 1 : -1);
            const newIndex = tempIndex >= navBarItems.length ? 0 : tempIndex < 0 ? navBarItems.length - 1 : tempIndex;

            // Set tabindex="0" on the newly focused navBar item and focus it
            navBarItems[newIndex].setAttribute('tabindex', '0');
            navBarItems[newIndex].focus();
            return newIndex;
          });
          break;
        default:
          break;
      } // End switch 1
    },
    [navBarItems, focusedItemIndex],
  ); // End handleKeyDown

  const handleNavBarFocus = React.useCallback(
    event => {
      // If focus moves into the navigation bar from the outside...
      if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget)) {
        // Begin if 1
        // Narrate the instruction message
        const instruction = event.currentTarget.getAttribute('data-instruction');
        narrate(instruction);

        // Determine and save the current navBar items
        const items = event.currentTarget.querySelectorAll('.item');
        setNavBarItems(items);

        // Find the navBar item with tabindex="0" and set the focused navBar item index accordingly
        Array.from(items).forEach((item: HTMLElement, index) => {
          // Begin forEach 1
          const tabindex = item.getAttribute('tabindex');
          if (tabindex === '0') {
            // Begin if 2
            setFocusedItemIndex(index);
          } // End if 2
        }); // End forEach 1
      } // End if 1
    },
    [navBarItems],
  ); // End handleNavBarFocus

  const handleNavBarBlur = React.useCallback(
    event => {
      // If focus moves into the outside of the navigation bar , clear the timeout
      if (!event.currentTarget.contains(event.relatedTarget)) {
        // Begin if 1
        clearTimeout(timeout);
      } // End if 1
    },
    [navBarItems],
  ); // End handleNavBarBlur

  return (
    <>
      <h1>Teams Navigation bar prototypes</h1>
      <ul>
        <li>
          This page demonstrates and compares different variants of the Navigation bar component of Microsoft Teams from
          the accessibility point of view. Previously, this component was known as App Bar, but this new version
          suggests renaming it to "Navigation bar".
        </li>
        <li>
          For the new Navigation bar requirements, additional notes, comparison with the previous version of the
          Navigation bar and conclusions, please check{' '}
          <a href="https://office.visualstudio.com/OC/_git/office-start?path=%2Fdocs%2FSpecs%2FApp-Bar%2FApp-Bar-Accessibility.md&version=GBapp-bar-accessibility&_a=preview">
            this documentation site
          </a>
          .
        </li>
        <li>
          Only the last variant on this page demonstrates the use of the new items count message (e.g. "7 conversations
          with new messages").
        </li>
        <li>The recommended variant of the Navigation bar is the last one on this page.</li>
      </ul>

      <EventListener type="keydown" listener={handleKeyDown} target={document} />

      <h2>role="toolbar"</h2>
      <div
        role="toolbar"
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <button className="item" tabIndex={0} aria-pressed="false">
          Activities
        </button>
        <button className="item" tabIndex={-1} aria-pressed="true">
          Chats
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Teams
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Calendar
        </button>
      </div>
      <h3>Notes</h3>
      <ul>
        <li>
          The toolbar variant is not recommended because the toolbar role does not fit the Navigation bar purpose. The
          toolbar role is more appropriate for a set of tools rather than the main navigation of the app.
        </li>
        <li>When entering the toolbar content, JAWS, NVDA and VoiceOver all read "toolbar" as the firs narration.</li>
      </ul>

      <h2>role="tablist"</h2>
      <div
        role="tablist"
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <button role="tab" className="item" tabIndex={0} aria-selected="false">
          Activities
        </button>
        <button role="tab" className="item" tabIndex={-1} aria-selected="true">
          Chats
        </button>
        <button role="tab" className="item" tabIndex={-1} aria-selected="false">
          Teams
        </button>
        <button role="tab" className="item" tabIndex={-1} aria-selected="false">
          Calendar
        </button>
      </div>
      <h3>Notes</h3>
      <ul>
        <li>
          The tablist variant is not appropriate because it does not fit the Navigation bar purpose. The tablist role is
          more appropriate for use in structured text content, forms or settings panels rather than the main navigation
          of the app.
        </li>
        <li>
          The tablist role is not appropriate because, when VPC cursor is disabled, JAWS reads "To switch pages press
          Control+PageDown" as the instruction message when a tab is focused.
        </li>
      </ul>

      <h2>role="menu"</h2>
      <div
        role="menu"
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <button role="menuitem" className="item" tabIndex={0}>
          Activities
        </button>
        <button role="menuitem" className="item" tabIndex={-1}>
          Chats
        </button>
        <button role="menuitem" className="item" tabIndex={-1}>
          Teams
        </button>
        <button role="menuitem" className="item" tabIndex={-1}>
          Calendar
        </button>
      </div>
      <h3>Notes</h3>
      <ul>
        <li>
          The menuitem role does not allow the use of the aria-pressed or aria-selected attribute so this variant is not
          recommended.
        </li>
        <li>When entering the Navigation bar content, JAWS reads "menu" as the firs narration.</li>
        <li>When leaving the Navigation bar content, JAWS reads "leaving menus".</li>
        <li>
          When entering the Navigation bar content, JAWS reads "To move through items press up or down arrow" as the
          last narration.
        </li>
        <li>
          Neither the "menu", nor the "menubar" role is appropriate because VoiceOver reads "To close the menu, press
          Escape" as the instruction message.
        </li>
      </ul>

      <h2>&lt;li&gt; items</h2>
      <ul
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <li>
          <button className="item" tabIndex={0} aria-pressed="false">
            Activities
          </button>
        </li>
        <li>
          <button className="item" tabIndex={-1} aria-pressed="true">
            Chats
          </button>
        </li>
        <li>
          <button className="item" tabIndex={-1} aria-pressed="false">
            Teams
          </button>
        </li>
        <li>
          <button className="item" tabIndex={-1} aria-pressed="false">
            Calendar
          </button>
        </li>
      </ul>
      <h3>Notes</h3>
      <ul>
        <li>
          When entering the Navigation bar content, the position and size is announced, which is not desired, especially
          because with JAWS and NVDA it's narrated before the Navigation bar item. So to make the narration less
          verbose, this variant is not recommended.
        </li>
      </ul>

      <h2>&lt;nav&gt; element</h2>
      <nav
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <button className="item" tabIndex={0} aria-pressed="false">
          Activities
        </button>
        <button className="item" tabIndex={-1} aria-pressed="true">
          Chats
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Teams
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Calendar
        </button>
      </nav>

      <h3>Notes</h3>
      <ul>
        <li>
          When entering the Navigation bar content, JAWS announces "navigation region" and NVDA announces "navigation
          landmark" after narrating the aria-label but before narrating the focused Navigation bar item. Since the
          aria-label we want is "Navigation bar", the word "navigation" would be spoken twice, so this variant is not
          recommended.
        </li>
        <li>
          However, if the &lt;nav&gt; element is the only &lt;nav&gt; element in the app, and the aria-label is not
          provided, this variant might also be a good solution and is therefore the secondary recommended variant.
        </li>
      </ul>

      <h2>role="navigation"</h2>
      <div
        role="navigation"
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <button className="item" tabIndex={0} aria-pressed="false">
          Activities
        </button>
        <button className="item" tabIndex={-1} aria-pressed="true">
          Chats
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Teams
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Calendar
        </button>
      </div>

      <h3>Notes</h3>
      <ul>
        <li>
          This variant behaves the same way as the &lt;nav&gt; element variant above, so the conclusions are the same as
          above.
        </li>
      </ul>

      <h2>role="region"</h2>
      <div
        role="region"
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <button className="item" tabIndex={0} aria-pressed="false">
          Activities
        </button>
        <button className="item" tabIndex={-1} aria-pressed="true">
          Chats
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Teams
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Calendar
        </button>
      </div>

      <h3>Notes</h3>
      <ul>
        <li>
          When entering the Navigation bar content, both JAWS and NVDA announce "region after narrating the aria-label
          but before narrating the focused Mavigation bar item.
        </li>
        <li>
          JAWS in the VPC cursor mode behaves as if the "region" role and aria-label were not present on the Navigation
          bar elemente, which is probably a bug, but it is enough for this variant not to be recommended (at least until
          the bug is resolved).
        </li>
      </ul>

      <h2>No role</h2>
      <div
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <button className="item" tabIndex={0} aria-pressed="false">
          Activities
        </button>
        <button className="item" tabIndex={-1} aria-pressed="true">
          Chats
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Teams
        </button>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Calendar
        </button>
      </div>

      <h3>Notes</h3>
      <ul>
        <li>
          NVDA does not narrate the aria-label when entering the Navigation bar content so this variant is not
          recommended.
        </li>
        <li>
          JAWS in the VPC cursor mode behaves as if the aria-label was not present on the Navigation bar elemente, which
          is probably a bug, but it is another reason for this variant not to be recommended (at least until the bug is
          resolved).
        </li>
      </ul>

      <h2>role="group" (recommended variant)</h2>
      <div
        role="group"
        aria-label="Navigation bar"
        onFocus={handleNavBarFocus}
        onBlur={handleNavBarBlur}
        data-instruction={navBarInstruction}
      >
        <button className="item" tabIndex={0} aria-pressed="false">
          Activities
        </button>
        <div>
          <button className="item" tabIndex={-1} aria-pressed="true" aria-describedby="chats-desc">
            Chats
          </button>
          <div
            id="chats-desc"
            style={{
              position: 'absolute',
              left: '-10000px',
              top: 'auto',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
            }}
          >
            7 conversations with new messages
          </div>
        </div>
        <div>
          <button className="item" tabIndex={-1} aria-pressed="false" aria-describedby="teams-desc">
            Teams
          </button>
          <div
            id="teams-desc"
            style={{
              position: 'absolute',
              left: '-10000px',
              top: 'auto',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
            }}
          >
            4 teams with new messages
          </div>
        </div>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Calendar
        </button>
      </div>

      <h3>Notes</h3>
      <ul>
        <li>
          NVDA sometimes (could not reproduce when) does not narrate the aria-label when entering the Navigation bar
          content. However, it does narrate it when in the forms mode.
        </li>
        <li>
          When entering the Navigation bar content, JAWS announces "group" and NVDA announces "grouping" after narrating
          the aria-label but before narrating the Navigation bar item.
        </li>
      </ul>
    </>
  );
}; // End AccessibleNavBar

export default AccessibleNavBar;
