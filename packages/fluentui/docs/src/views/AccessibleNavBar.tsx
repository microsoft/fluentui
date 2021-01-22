import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';

const narrate = (message, priority = 'polite') => {
  const element = document.createElement('div');
  element.setAttribute('style', 'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;');
  element.setAttribute('aria-live', priority);
  document.body.appendChild(element);

  setTimeout(() => {
element.innerText = message;
}, 2000); // End setTimeout 1

  setTimeout(() => {
  document.body.removeChild(element);
}, 2300); // End setTimeout 1
  }; // End narrate

export const AccessibleNavBar: React.FunctionComponent = () => {
  const [navBarItems, setNavBarItems] = React.useState<HTMLElement[]>(null);
  const [focusedItemIndex, setFocusedItemIndex] = React.useState(0);
  
          const handleDocumentFocus = React.useCallback(event => {
          // Reset the NavBar items if an element other than the current NavBar items is focused
                        if (navBarItems && !Array.from(navBarItems).includes(event.target) && !event.target.dontResetNavBarItems) { // Begin if 1
                        setNavBarItems(null);
                        } // End if 1
                                event.target.dontResetNavBarItems = false;
          }, [navBarItems]); // End handleDocumentFocus
  
    React.useEffect(() => {
    document.addEventListener('focusin', handleDocumentFocus);
    return () => {
        document.removeEventListener('focusin', handleDocumentFocus);
        };
    }); // End useEffect
  
     const handleKeyDown = React.useCallback(event => {
    if (navBarItems === null) { // Begin if 1
    return;
    } // End if 1
    switch(event.code) { // Begin switch 1
    case 'ArrowRight':
    case 'ArrowDown':
    case 'ArrowLeft':
    case 'ArrowUp':
    
    // Set tabindex="-1" on the previously focused navBar item
    navBarItems[focusedItemIndex].setAttribute('tabindex', '-1');

// Compute and set the new focused item index
              setFocusedItemIndex((prevIndex) => {
              const tempIndex = prevIndex + (['ArrowRight', 'ArrowDown'].includes(event.code) ? 1 : -1);
              const newIndex = tempIndex >= navBarItems.length ? 0 : (tempIndex < 0 ? navBarItems.length - 1 : tempIndex);
              
                  // Set tabindex="0" on the newly focused navBar item and focus it
    navBarItems[newIndex].setAttribute('tabindex', '0');
        navBarItems[newIndex].focus();
        return newIndex;
        });
    break;
    default:
    break;
    } // End switch 1
        }, [navBarItems, focusedItemIndex]); // End handleKeyDown
        
        const handleFocus = React.useCallback(event => {
        // If the NavBar items have been reset or the focus has moved from one NavBar items to another, narrate the usage hint
        if (!navBarItems || !Array.from(navBarItems).includes(event.target)) { // Begin if 1
        narrate('To navigate use the arrow keys');
        } // End if 1
        event.target.dontResetNavBarItems = true;

        // Determine and save the focused navBar items
    const items = event.currentTarget.querySelectorAll('.item');
    setNavBarItems(items);
    
// Find the navBar item with tabindex="0" and set the focused menunavBar item index accordingly
    Array.from(items).forEach((item: HTMLElement, index) => { // Begin forEach 1
    const tabindex = item.getAttribute('tabindex');
    if (tabindex === '0') { // Begin if 1
      setFocusedItemIndex(index);
    } // End if 1
    }); // End forEach 1
    }, [navBarItems]); // End handleFocus
    
  return (
    <>
<h1>Accessible App bar prototype</h1>
<h3>General notes</h3>
<ul>
<li>The number of new items is not present on the buttons. It should be a part of the window title instead.</li>
<li>The usage hint is narrated using aN aria-live element. The drawback of this solution is that the narration is queued, so if user tabs out and in to the navigation bar several times, the hint will be spoken repeatedly several times as well.</li>
<li>ARIA landmarks, including the &lt;nav&gt; and role="navigation", are not used, because it only adds unnecessary narration. The goal is to be the least verbose as possible. Instead, the F6 key should work for navigating to the navigation bar and other parts of the app.</li>
</ul>

                    <EventListener type="keydown" listener={handleKeyDown} target={document} />

<h2>role="toolbar"</h2>
<div role="toolbar" aria-label="Navigation bar" onFocus={handleFocus}>
<button className="item" tabIndex={0}>Activities</button>
<button className="item" tabIndex={-1}>Chats</button>
<button className="item" tabIndex={-1}>Teams</button>
<button className="item" tabIndex={-1}>Calendar</button>
</div>
<h3>Notes</h3>
<ul>
<li>When entering the toolbar content, JAWS, NVDA and VoiceOver all  read "toolbar" as the firs narration.</li>
</ul>

<h2>role="tablist"</h2>
<div role="tablist" onFocus={handleFocus}>
<button role="tab" className="item" tabIndex={0}>Activities</button>
<button role="tab" className="item" tabIndex={-1}>Chats</button>
<button role="tab" className="item" tabIndex={-1}>Teams</button>
<button role="tab" className="item" tabIndex={-1}>Calendar</button>
</div>
<h3>Notes</h3>
<ul>
<li>The tablist role is not appropriate because, when VPC cursor is disabled, JAWS reads "To switch pages press Control+PageDown" as the usage when a tab is selected.</li>
</ul>

<h2>role="menu"</h2>
<div role="menu" onFocus={handleFocus}>
<button role="menuitem" className="item" tabIndex={0}>Activities</button>
<button role="menuitem" className="item" tabIndex={-1}>Chats</button>
<button role="menuitem" className="item" tabIndex={-1}>Teams</button>
<button role="menuitem" className="item" tabIndex={-1}>Calendar</button>
</div>
<h3>Notes</h3>
<ul>
<li>Neither the "menu", nor the "menubar" role is appropriate because VoiceOver reads "To close the menu, press Escape" as the usage hint.</li>
<li>When entering the navigation bar content, JAWS reads "menu" as the firs narration.</li>
<li>When leaving the navigation bar  content, JAWS reads "leaving menus".</li>
<li>When entering the navigation bar  content, JAWS reads "To move through items press up or down arrow" as the last narration.</li>
</ul>

<h2>aria-label only</h2>
<div aria-label="Navigation bar" onFocus={handleFocus}>
<button className="item" tabIndex={0}>Activities</button>
<button className="item" tabIndex={-1}>Chats</button>
<button className="item" tabIndex={-1}>Teams</button>
<button className="item" tabIndex={-1}>Calendar</button>
</div>

<h3>Notes</h3>
<ul>
<li>NVDA sometimes (could not reproduce when) does not narrate the aria-label.</li>
<li>This variant is considered the best option, because it is the least verbose one.</li>
</ul>

<h2>role="group" and aria-label</h2>
<div role="group" aria-label="Navigation bar" onFocus={handleFocus}>
<button className="item" tabIndex={0}>Activities</button>
<button className="item" tabIndex={-1}>Chats</button>
<button className="item" tabIndex={-1}>Teams</button>
<button className="item" tabIndex={-1}>Calendar</button>
</div>

<h3>Notes</h3>
<ul>
<li>NVDA sometimes (could not reproduce when) does not narrate the aria-label.</li>
<li>When entering the navigation bar content, JAWS announces "group" after narrating the label but before narrating the navigation bar item.</li>
</ul>

<h2>&lt;li&gt; items</h2>
<ul onFocus={handleFocus}>
<li><button className="item" tabIndex={0}>Activities</button></li>
<li><button className="item" tabIndex={-1}>Chats</button></li>
<li><button className="item" tabIndex={-1}>Teams</button></li>
<li><button className="item" tabIndex={-1}>Calendar</button></li>
</ul>

<h3>Notes</h3>
<ul>
<li>When entering the navagation bar content, the position and size is announced, which is not desired, especially because with JAWS and NVDA it's narrated before the navigation bar item. So to make the narration less verbose, this variant is rejected.</li>
</ul>

    </>
  );
}; // End AccessibleNavBar
