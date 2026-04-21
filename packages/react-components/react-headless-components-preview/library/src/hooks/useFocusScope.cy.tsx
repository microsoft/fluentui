import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import type { JSXElement } from '@fluentui/react-utilities';
import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme } from '@fluentui/react-theme';
import { useFocusScope } from './useFocusScope';
import type { UseFocusScopeOptions } from './useFocusScope';

const mount = (element: JSXElement) => mountBase(<FluentProvider theme={teamsLightTheme}>{element}</FluentProvider>);

type FocusScopeFixtureProps = UseFocusScopeOptions & { id?: string };

/**
 * Container with three tabbable buttons.
 * `containerRef` wires the scope to the DOM node; `containerProps` spreads tabIndex / onKeyDown.
 */
const FocusScopeFixture: React.FC<FocusScopeFixtureProps> = ({ id = 'scope', ...options }) => {
  const { containerRef, containerProps } = useFocusScope(options);
  return (
    <div ref={containerRef} {...containerProps} id={id}>
      <button type="button" id={`${id}-btn-1`}>
        Button 1
      </button>
      <button type="button" id={`${id}-btn-2`}>
        Button 2
      </button>
      <button type="button" id={`${id}-btn-3`}>
        Button 3
      </button>
    </div>
  );
};

describe('useFocusScope', () => {
  describe('auto-focus on mount', () => {
    it('moves focus to the first tabbable child on mount', () => {
      mount(<FocusScopeFixture />);
      cy.get('#scope-btn-1').should('be.focused');
    });

    it('falls back to the container when there are no tabbable children', () => {
      const EmptyScope = () => {
        const { containerRef, containerProps } = useFocusScope();
        return <div ref={containerRef} {...containerProps} id="empty-scope" />;
      };
      mount(<EmptyScope />);
      cy.get('#empty-scope').should('be.focused');
    });

    it('skips anchor elements and focuses the next tabbable child instead', () => {
      const ScopeWithLink = () => {
        const { containerRef, containerProps } = useFocusScope();
        return (
          <div ref={containerRef} {...containerProps} id="scope-with-link">
            <a href="#" id="link">
              Link
            </a>
            <button type="button" id="btn-after-link">
              Button
            </button>
          </div>
        );
      };
      mount(<ScopeWithLink />);
      cy.get('#btn-after-link').should('be.focused');
    });

    it('suppresses auto-focus when onMountAutoFocus calls preventDefault', () => {
      const CancelMount = () => {
        const [mounted, setMounted] = React.useState(false);
        return (
          <>
            <button type="button" id="mount-btn" onClick={() => setMounted(true)}>
              Mount scope
            </button>
            {mounted && <FocusScopeFixture id="cancel-scope" onMountAutoFocus={e => e.preventDefault()} />}
          </>
        );
      };
      mount(<CancelMount />);
      cy.get('#mount-btn').realClick();
      cy.get('#mount-btn').should('be.focused');
    });
  });

  describe('focus restore on unmount', () => {
    it('returns focus to the previously focused element when scope unmounts', () => {
      const ToggleScope = () => {
        const [mounted, setMounted] = React.useState(false);
        return (
          <>
            <button type="button" id="toggle-btn" onClick={() => setMounted(p => !p)}>
              Toggle
            </button>
            {mounted && <FocusScopeFixture />}
          </>
        );
      };
      mount(<ToggleScope />);
      cy.get('#toggle-btn').realClick(); // mounts scope — previouslyFocused = #toggle-btn
      cy.get('#scope-btn-1').should('be.focused');
      cy.get('#toggle-btn').realClick(); // unmounts scope — should restore to #toggle-btn
      cy.get('#toggle-btn').should('be.focused');
    });

    it('suppresses focus restore when onUnmountAutoFocus calls preventDefault', () => {
      // A non-interactive div is used as the toggle so that clicking it does not itself
      // move focus — this keeps previouslyFocused pointing to #prev-btn throughout.
      const CancelRestore = () => {
        const [mounted, setMounted] = React.useState(false);
        return (
          <>
            <button type="button" id="prev-btn">
              Previously focused
            </button>
            <div id="toggle-div" role="button" onClick={() => setMounted(p => !p)}>
              Toggle
            </div>
            {mounted && <FocusScopeFixture onUnmountAutoFocus={e => e.preventDefault()} />}
          </>
        );
      };
      mount(<CancelRestore />);
      cy.get('#prev-btn').focus();
      cy.get('#toggle-div').click(); // mounts scope — previouslyFocused = #prev-btn
      cy.get('#scope-btn-1').should('be.focused');
      cy.get('#toggle-div').click(); // unmounts scope — restore is cancelled
      cy.get('#prev-btn').should('not.be.focused');
    });
  });

  describe('Tab looping (loop: true)', () => {
    it('wraps Tab forward from the last to the first tabbable element', () => {
      mount(<FocusScopeFixture loop />);
      cy.get('#scope-btn-3').realClick();
      cy.realPress('Tab');
      cy.get('#scope-btn-1').should('be.focused');
    });

    it('wraps Shift+Tab backward from the first to the last tabbable element', () => {
      mount(<FocusScopeFixture loop />);
      cy.get('#scope-btn-1').should('be.focused'); // auto-focused on mount
      cy.realPress(['Shift', 'Tab']);
      cy.get('#scope-btn-3').should('be.focused');
    });
  });

  describe('Tab looping (loop: false)', () => {
    it('does not wrap Tab when at the last tabbable element', () => {
      mount(
        <>
          <FocusScopeFixture loop={false} />
          <button type="button" id="btn-outside-loop">
            After scope
          </button>
        </>,
      );
      cy.get('#scope-btn-3').realClick();
      cy.realPress('Tab');
      cy.get('#btn-outside-loop').should('be.focused');
    });
  });

  describe('focus trapping (trapped: true)', () => {
    it('blocks Tab at the last tabbable element', () => {
      mount(
        <>
          <FocusScopeFixture trapped />
          <button type="button" id="btn-outside-trap">
            After scope
          </button>
        </>,
      );
      cy.get('#scope-btn-3').realClick();
      cy.realPress('Tab');
      cy.get('#scope-btn-3').should('be.focused');
    });

    it('blocks Shift+Tab at the first tabbable element', () => {
      mount(<FocusScopeFixture trapped />);
      cy.get('#scope-btn-1').should('be.focused'); // auto-focused on mount
      cy.realPress(['Shift', 'Tab']);
      cy.get('#scope-btn-1').should('be.focused');
    });

    it('blocks Tab when the container itself is focused and has no tabbable children', () => {
      const EmptyTrappedScope = () => {
        const { containerRef, containerProps } = useFocusScope({ trapped: true });
        return <div ref={containerRef} {...containerProps} id="empty-trapped-scope" />;
      };
      mount(
        <>
          <EmptyTrappedScope />
          <button type="button" id="btn-outside-empty-trap">
            After scope
          </button>
        </>,
      );
      cy.get('#empty-trapped-scope').should('be.focused');
      cy.realPress('Tab');
      cy.get('#empty-trapped-scope').should('be.focused');
    });
  });
});
