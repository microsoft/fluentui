import * as React from 'react';
import { mount } from '@cypress/react';
import { makeStyles } from '@griffel/react';
import { ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE } from './constants';
import { useActiveDescendant } from './useActiveDescendant';

describe('onActiveOptionChange', () => {
  it('Should fire change event on active item change', () => {
    const Example = () => {
      const { listboxRef, activeParentRef, controller } = useActiveDescendant<HTMLButtonElement, HTMLDivElement>({
        matchOption: el => el.getAttribute('role') === 'option',
      });

      const containerRef = React.useRef<HTMLDivElement>(null);

      const [lastActive, setLastActive] = React.useState('');

      const onActiveDescendantChange = React.useCallback(
        event => {
          setLastActive(event ? event.detail.id : 'no event');
        },
        [setLastActive],
      );

      React.useEffect(() => {
        const element = containerRef.current;
        element?.addEventListener('activedescendantchange', onActiveDescendantChange);
        return () => {
          element?.removeEventListener('activedescendantchange', onActiveDescendantChange);
        };
      }, [containerRef, onActiveDescendantChange]);

      return (
        <>
          <div data-test-id="last-active">{lastActive}</div>
          <div ref={containerRef}>
            <button
              onKeyDown={e => {
                switch (e.key) {
                  case 'Enter':
                    controller.first();
                    break;
                  case 'ArrowDown':
                    controller.next();
                    break;
                }
              }}
              ref={activeParentRef}
            >
              active parent
            </button>
            <div ref={listboxRef}>
              <div role="option" id="option-1">
                Option 1
              </div>
              <div role="option" id="option-2">
                Option 2
              </div>
            </div>
          </div>
        </>
      );
    };

    const example = mount(<Example />);

    example.get('button').focus().type('{enter}');
    example.get('[data-test-id="last-active"]').should('have.text', 'option-1');

    example.get('button').focus().type('{downArrow}');
    example.get('[data-test-id="last-active"]').should('have.text', 'option-2');
  });
});

describe('useOnKeyboardNavigationChange', () => {
  it('Should add focus visible attribute on active option', () => {
    // Used for browser test test
    // eslint-disable-next-line @griffel/styles-file
    const useStyles = makeStyles({
      active: {
        [`[${ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE}]`]: {
          color: 'red',
        },
      },
    });

    const Example = () => {
      const styles = useStyles();
      const { listboxRef, activeParentRef, controller } = useActiveDescendant<HTMLButtonElement, HTMLDivElement>({
        matchOption: el => el.getAttribute('role') === 'option',
      });

      return (
        <>
          <button
            onKeyDown={e => {
              switch (e.key) {
                case 'Enter':
                  controller.first();
                  break;
                case 'ArrowDown':
                  controller.next();
                  break;
              }
            }}
            ref={activeParentRef}
          >
            active parent
          </button>
          <div ref={listboxRef}>
            <div className={styles.active} role="option" id="option-1">
              Option 1
            </div>
            <div className={styles.active} role="option" id="option-2">
              Option 2
            </div>
            <div className={styles.active} role="option" id="option-3">
              Option 3
            </div>
            <div className={styles.active} role="option" id="option-4">
              Option 4
            </div>
          </div>
        </>
      );
    };

    mount(<Example />)
      .get('button')
      .focus()
      .type('{enter}')
      .get('#option-1')
      .should('have.attr', ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE)
      .get('button')
      .focus()
      .type('{downArrow}')
      .get('#option-2')
      .should('have.attr', ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE)
      .get('#option-1')
      .should('not.have.attr', ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE)
      .get('button')
      .click()
      .get('#option-2')
      .should('not.have.attr', ACTIVEDESCENDANT_FOCUSVISIBLE_ATTRIBUTE);
  });
});
