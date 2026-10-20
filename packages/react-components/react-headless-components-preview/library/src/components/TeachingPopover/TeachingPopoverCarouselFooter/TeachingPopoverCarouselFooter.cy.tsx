import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import { slot, useMergedRefs, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { ForwardRefComponent, RefAttributes } from '@fluentui/react-utilities';
import { Button } from '../../Button';
import {
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  useTeachingPopoverCarouselFooter,
  renderTeachingPopoverCarouselFooter,
  useTeachingPopoverCarouselFooterButton,
  renderTeachingPopoverCarouselFooterButton,
} from '../index';
import type { TeachingPopoverCarouselFooterButtonProps } from '../TeachingPopoverCarouselFooterButton';
import type { TeachingPopoverCarouselFooterProps } from './TeachingPopoverCarouselFooter.types';

const PresentationButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> = React.forwardRef(
  (props, ref) => {
    const localRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    useIsomorphicLayoutEffect(() => {
      const button = localRef.current;
      if (button?.hasAttribute('data-blur-on-empty') && !button.hasChildNodes()) {
        button.blur();
      }
    });
    const state = useTeachingPopoverCarouselFooterButton(props, useMergedRefs(ref, localRef));
    state.root = slot.always(state.root, { elementType: Button });
    return renderTeachingPopoverCarouselFooterButton(state);
  },
);

const PresentationFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps> = React.forwardRef((props, ref) => {
  const state = useTeachingPopoverCarouselFooter(props, ref);
  state.previous = slot.optional(state.previous, { elementType: PresentationButton });
  state.next = slot.always(state.next, { elementType: PresentationButton });
  return renderTeachingPopoverCarouselFooter(state);
});

type FooterButtonOverrides = (
  | Partial<Extract<TeachingPopoverCarouselFooterButtonProps, { as?: 'button' }>>
  | (Partial<Extract<TeachingPopoverCarouselFooterButtonProps, { as: 'a' }>> & { as: 'a' })
) &
  RefAttributes<HTMLButtonElement | HTMLAnchorElement>;

type ExampleProps = {
  controlled?: 'accept' | 'reject' | 'delay';
  previous?: FooterButtonOverrides;
  next?: FooterButtonOverrides;
  hidePrevious?: boolean;
  presentation?: boolean;
};

const Example = ({ controlled, previous, next, hidePrevious = true, presentation }: ExampleProps) => {
  const [value, setValue] = React.useState('two');
  const pendingValue = React.useRef('two');
  const Footer = presentation ? PresentationFooter : TeachingPopoverCarouselFooter;
  return (
    <>
      <style>{`.paired-previous:empty { ${hidePrevious ? 'display: none;' : ''} }`}</style>
      <button data-testid="outside">Outside</button>
      <button data-testid="accept" onClick={() => setValue(pendingValue.current)}>
        Accept pending value
      </button>
      <TeachingPopoverCarousel
        defaultValue="two"
        value={controlled ? value : undefined}
        onValueChange={(_, data) => {
          if (data.value === undefined) {
            throw new Error('Expected navigation to a registered carousel card');
          }
          pendingValue.current = data.value;
          if (controlled === 'accept') {
            setValue(data.value);
          }
        }}
      >
        <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        <Footer
          previous={{
            navType: 'prev',
            children: 'Previous',
            altText: null,
            className: 'paired-previous',
            ...{ 'data-testid': 'previous' },
            ...previous,
          }}
          next={{ navType: 'next', children: 'Next', altText: 'Got it', ...{ 'data-testid': 'next' }, ...next }}
        />
      </TeachingPopoverCarousel>
    </>
  );
};

describe('TeachingPopoverCarouselFooter native paired focus', () => {
  ([undefined, 'accept'] as const).forEach(controlled => {
    it(`hands focus from hidden Previous to Next after ${controlled ?? 'uncontrolled'} navigation`, () => {
      mount(<Example controlled={controlled} />);
      cy.get('[data-testid="previous"]').focus().realPress('Enter');
      cy.get('[data-testid="previous"]').should('be.empty').and('not.be.visible');
      cy.get('[data-testid="next"]').should('have.focus').and('have.text', 'Next');
      cy.realPress('Enter');
      cy.get('[data-testid="next"]').should('have.focus').and('have.text', 'Got it');
      cy.get('[data-carousel-active-item="true"]').should('contain.text', 'Two');
    });
  });

  it('does not hand off on a rejected controlled request', () => {
    mount(<Example controlled="reject" />);
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="previous"]').should('have.focus').and('have.text', 'Previous');
    cy.get('[data-testid="next"]').should('have.text', 'Got it');
  });

  it('waits for delayed acceptance while Previous retains focus', () => {
    mount(<Example controlled="delay" />);
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="previous"]').should('have.focus');
    cy.get('[data-testid="accept"]').trigger('click');
    cy.get('[data-testid="next"]').should('have.focus').and('have.text', 'Next');
  });

  (['outside focus', 'explicit blur'] as const).forEach(action => {
    it(`preserves ${action} before delayed acceptance`, () => {
      mount(<Example controlled="delay" />);
      cy.get('[data-testid="previous"]').focus().realPress('Enter');
      if (action === 'outside focus') {
        cy.get('[data-testid="outside"]').focus();
      } else {
        cy.get('[data-testid="previous"]').blur();
      }
      cy.get('[data-testid="accept"]').trigger('click');
      cy.get('[data-testid="previous"]').should('not.be.visible');
      cy.get('[data-testid="next"]').should('not.have.focus');
    });
  });

  it('preserves visible alternative content', () => {
    mount(<Example previous={{ altText: 'Restart' }} />);
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="previous"]').should('have.focus').and('have.text', 'Restart');
  });

  it('does not transfer from an empty but still visible Previous', () => {
    mount(<Example hidePrevious={false} />);
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="previous"]').should('have.focus').and('be.empty');
  });

  it('uses anchor button keyboard semantics and preserves caller handlers and refs', () => {
    const onClick = cy.stub().as('previousClick');
    const onFocus = cy.stub().as('previousFocus');
    const onBlur = cy.stub().as('previousBlur');
    const previousRef = React.createRef<HTMLAnchorElement>();
    const nextRef = cy.stub().as('nextRef');
    mount(
      <Example previous={{ as: 'a', ref: previousRef, onClick, onFocus, onBlur }} next={{ as: 'a', ref: nextRef }} />,
    );
    cy.get('[data-testid="previous"]').should(element => expect(previousRef.current).to.equal(element[0]));
    cy.get('[data-testid="previous"]').focus().realPress('Space');
    cy.get('[data-testid="next"]').should('have.focus').and('have.text', 'Next');
    cy.get('@previousClick').should('have.been.calledOnce');
    cy.get('@previousFocus').should('have.been.calledOnce');
    cy.get('[data-testid="next"]').should(element => expect(nextRef).to.have.been.calledWith(element[0]));
    cy.realPress('Space');
    cy.get('[data-testid="next"]').should('have.focus').and('have.text', 'Got it');
  });

  (
    [{ disabled: true }, { disabledFocusable: true }, { hidden: true }, { style: { display: 'none' } }] as const
  ).forEach(next => {
    it(`does not focus an unavailable Next ${JSON.stringify(next)}`, () => {
      mount(<Example next={next} />);
      cy.get('[data-testid="previous"]').focus().realPress('Enter');
      cy.get('[data-testid="previous"]').should('not.be.visible');
      cy.get('[data-testid="next"]').should('not.have.focus');
    });
  });

  it('does not submit a form when navigating, but preserves explicit submit intent', () => {
    const onSubmit = cy.stub().as('submit');
    mount(
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Example />
      </form>,
    );
    cy.get('[data-testid="previous"]').should('have.attr', 'type', 'button').focus().realPress('Enter');
    cy.get('[data-testid="next"]').should('have.focus');
    cy.get('@submit').should('not.have.been.called');
    mount(
      <form
        onSubmit={event => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Example previous={{ type: 'submit' }} />
      </form>,
    );
    cy.get('[data-testid="previous"]').should('have.attr', 'type', 'submit').focus().realPress('Enter');
    cy.get('@submit').should('have.been.calledOnce');
  });

  it('suppresses disabled anchor activation and consumer clicks', () => {
    const onClick = cy.stub().as('disabledClick');
    mount(<Example previous={{ as: 'a', href: '#disabled', disabled: true, onClick }} />);
    cy.get('[data-testid="previous"]').should('have.attr', 'aria-disabled', 'true').and('not.have.attr', 'href');
    cy.get('[data-testid="previous"]').click({ force: true });
    cy.get('[data-testid="previous"]').should('have.text', 'Previous');
    cy.get('@disabledClick').should('not.have.been.called');
    cy.get('[data-testid="next"]').should('have.text', 'Got it');
  });

  it('retains pairing through presentation adapters and native commit-time body fallback', () => {
    const onBlur = cy.stub().as('previousBlur');
    const onClick = cy.stub().as('previousClick');
    const previousRef = React.createRef<HTMLButtonElement>();
    const nextRef = React.createRef<HTMLButtonElement>();
    const previous = { ref: previousRef, onBlur, onClick, 'data-blur-on-empty': true };
    mount(<Example presentation previous={previous} next={{ ref: nextRef }} />);
    cy.get('[data-testid="previous"]').should(element => expect(previousRef.current).to.equal(element[0]));
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="next"]').should('have.focus').and('have.text', 'Next');
    cy.get('[data-testid="next"]').should(element => expect(nextRef.current).to.equal(element[0]));
    cy.get('@previousBlur').should('have.been.calledOnce');
    cy.get('@previousClick').should('have.been.calledOnce');
    cy.realPress('Enter');
    cy.get('[data-testid="next"]').should('have.focus').and('have.text', 'Got it');
  });

  it('preserves concrete outside focus set by a presentation adapter during the commit', () => {
    const outsideRef = React.createRef<HTMLButtonElement>();
    const previous = { 'data-blur-on-empty': true, onBlur: () => outsideRef.current?.focus() };
    mount(
      <>
        <button ref={outsideRef} data-testid="redirect">
          Redirect
        </button>
        <Example presentation previous={previous} />
      </>,
    );
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="redirect"]').should('have.focus');
    cy.get('[data-testid="next"]').should('not.have.focus');
  });

  it('does not transfer to an inert Next', () => {
    mount(<Example />);
    cy.get('[data-testid="next"]').invoke('attr', 'inert', '');
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="next"]').should('not.have.focus');
  });

  it('keeps pairing inside the owning footer', () => {
    mount(
      <>
        <Example />
        <Example />
      </>,
    );
    cy.get('[data-testid="previous"]').first().focus().realPress('Enter');
    cy.get('[data-testid="next"]').first().should('have.focus').and('have.text', 'Next');
    cy.get('[data-testid="next"]').last().should('not.have.focus').and('have.text', 'Got it');
  });

  it('hands off inside a shadow root without treating the host as outside focus', () => {
    const ShadowExample = () => {
      const hostRef = React.useRef<HTMLDivElement>(null);
      const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot | null>(null);
      useIsomorphicLayoutEffect(() => {
        const host = hostRef.current!;
        setShadowRoot(host.shadowRoot ?? host.attachShadow({ mode: 'open' }));
      }, []);
      return (
        <>
          <div data-testid="shadow-host" ref={hostRef} />
          {shadowRoot && createPortal(<Example presentation />, shadowRoot)}
        </>
      );
    };
    mount(<ShadowExample />);
    cy.get('[data-testid="shadow-host"]').shadow().find('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="shadow-host"]')
      .shadow()
      .find('[data-testid="next"]')
      .should('have.focus')
      .and('have.text', 'Next');
    cy.realPress('Enter');
    cy.get('[data-testid="shadow-host"]').shadow().find('[data-testid="next"]').should('have.text', 'Got it');
  });
});
