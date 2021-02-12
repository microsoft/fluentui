import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';

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
  }, 2000); // End setTimeout 1

  setTimeout(() => {
    document.body.removeChild(element);
  }, 2300); // End setTimeout 1
}; // End narrate

const srOnlyCss: React.CSSProperties = {
  position: 'absolute',
  left: '-10000px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
};

const AccessibleTeams: React.FunctionComponent = () => {
  const [navBarItems, setNavBarItems] = React.useState<HTMLElement[]>(null);
  const [focusedItemIndex, setFocusedItemIndex] = React.useState(0);

  const handleDocumentFocus = React.useCallback(
    event => {
      // Reset the NavBar items if an element other than the current NavBar items is focused
      if (navBarItems && !Array.from(navBarItems).includes(event.target) && !event.target.dontResetNavBarItems) {
        // Begin if 1
        setNavBarItems(null);
      } // End if 1
      event.target.dontResetNavBarItems = false;
    },
    [navBarItems],
  ); // End handleDocumentFocus

  React.useEffect(() => {
    document.addEventListener('focusin', handleDocumentFocus);
    return () => {
      document.removeEventListener('focusin', handleDocumentFocus);
    };
  }); // End useEffect

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

  const handleFocus = React.useCallback(
    event => {
      // If the NavBar items have been reset or the focus has moved from one NavBar items to another, narrate the usage hint
      if (!navBarItems || !Array.from(navBarItems).includes(event.target)) {
        // Begin if 1
        narrate('To navigate use the arrow keys');
      } // End if 1
      event.target.dontResetNavBarItems = true;

      // Determine and save the focused navBar items
      const items = event.currentTarget.querySelectorAll('.item');
      setNavBarItems(items);

      // Find the navBar item with tabindex="0" and set the focused navBar item index accordingly
      Array.from(items).forEach((item: HTMLElement, index) => {
        // Begin forEach 1
        const tabindex = item.getAttribute('tabindex');
        if (tabindex === '0') {
          // Begin if 1
          setFocusedItemIndex(index);
        } // End if 1
      }); // End forEach 1
    },
    [navBarItems],
  ); // End handleFocus

  const handleBlur = React.useCallback(
    event => {
      if (!Array.from(navBarItems).includes(event.relatedTarget)) {
        // Begin if 1
        clearTimeout(timeout);
      } // End if 1
    },
    [navBarItems],
  ); // End handleBlur

  return (
    <>
      <h1>Accessible Teams prototype</h1>
      <EventListener type="keydown" listener={handleKeyDown} target={document} />

      <button>Back</button>

      <input
        type="text"
        role="combobox"
        aria-controls=""
        aria-expanded="false"
        aria-label="Look for messages, files, and more. Or type / for a list of commands."
      />

      <button aria-haspopup="true" aria-describedby="profile-desc">
        Profile, app settings, and more.
      </button>
      <div id="profile-desc" aria-hidden="true">
        Your profile picture with status displayed as Available.
      </div>

      <h2>Navigation bar</h2>
      <div role="group" aria-label="Navigation bar" onFocus={handleFocus} onBlur={handleBlur}>
        <button className="item" tabIndex={0} aria-pressed="false">
          Activities
        </button>
        <div>
          <button className="item" tabIndex={-1} aria-pressed="true" aria-describedby="chats-desc">
            Chats
          </button>
          <div id="chats-desc" style={srOnlyCss}>
            7 conversations with new messages
          </div>
        </div>
        <div>
          <button className="item" tabIndex={-1} aria-pressed="false" aria-describedby="teams-desc">
            Teams
          </button>
          <div id="teams-desc" style={srOnlyCss}>
            4 teams with new messages
          </div>
        </div>
        <button className="item" tabIndex={-1} aria-pressed="false">
          Calendar
        </button>
      </div>

      <button aria-haspopup="menu">Chat</button>

      <button>Filter</button>

      <button>New chat</button>

      <h2>Chats</h2>
      <div role="tree" aria-label="Chat list">
        <div role="treeitem">Tyler Skywalker</div>
        <div role="treeitem" tabIndex={0}>
          Michael Night
        </div>
      </div>

      <div tabIndex={0}>Michael Night</div>

      <div role="tablist">
        <div role="tab" tabIndex={0} aria-selected="true">
          Chats
        </div>
        <div role="tab">Files</div>
      </div>

      <button>Add a tab</button>

      <button>Video call</button>
      <button>Audio call</button>
      <button>Screen sharing</button>

      <button>Add people</button>

      <button>Pop out chat</button>

      <h2>Conversations</h2>
      <div role="region" aria-label="Chat content">
        <h3>November 9, 2020</h3>
        {/* eslint-disable-next-line */}
        <img alt="Profile picture of Michael Night" />
        <div>Available</div>
        <div>Michael Night</div>
        <div>Wednesday 12:47 PM</div>
        <button tabIndex={-1}>Toolbar with two buttons, press enter to enter toolbar</button>
        <div tabIndex={0}>Hello there,this is just an exammple message.</div>
      </div>

      <input type="text" aria-label="Type a new message" />

      <div role="menu">
        <button aria-label="Format. Press enter to expand compose box and format your message. Press right arrow for more options.">
          Format
        </button>
      </div>

      <button>Send</button>
    </>
  );
}; // End AccessibleNavBar

export default AccessibleTeams;
