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
        event.target.dontResetNavBarItems = true;
        if ((navBarItems === null) || !Array.from(navBarItems).includes(event.target)) { // Begin if 1
        narrate('To navigate use the arrow keys');
        } // End if 1
        
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
    
          const handleBlur = React.useCallback(event => {
          //setNavBarItems(null);
    }, []); // End handleBlur
    
  return (
    <>
<h1>Accessible App bar prototype</h1>
<h3>General notes</h3>
<ul>
<li>The number of new items is not present on the buttons. It should be a part of the window title instead.</li>
<li>The usage hint is narrated using aN aria-live element. The drawback of this solution is that the narration is queued, so if user tabs out and in to the navigation bar several times, the hint is spoken repeatedly several times as well.</li>
</ul>

                    <EventListener type="keydown" listener={handleKeyDown} target={document} />

<h2>Tablist</h2>
<button>Focus catch</button>
<div role="tablist" onFocus={handleFocus} onBlur={handleBlur}>
<button role="tab" className="item" tabIndex={0}>Activities</button>
<button role="tab" className="item" tabIndex={-1}>Chats</button>
<button role="tab" className="item" tabIndex={-1}>Teams</button>
<button role="tab" className="item" tabIndex={-1}>Calendar</button>
</div>

<h3>Menu</h3>
<div role="menu" onFocus={handleFocus} onBlur={handleBlur}>
<button role="menuitem" className="item" tabIndex={0}>Activities</button>
<button role="menuitem" className="item" tabIndex={-1}>Chats</button>
<button role="menuitem" className="item" tabIndex={-1}>Teams</button>
<button role="menuitem" className="item" tabIndex={-1}>Calendar</button>
</div>

<h3>Notes</h3>
<ul>
<li>Neither the "menu", nor the "menubar" role is appropriate because VoiceOver reads "To close the menu, press Escape" as the hint.</li>
</ul>

    </>
  );
}; // End AccessibleNavBar
