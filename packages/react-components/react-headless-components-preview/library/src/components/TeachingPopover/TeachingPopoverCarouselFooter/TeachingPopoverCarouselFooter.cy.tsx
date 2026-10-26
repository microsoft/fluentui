import * as React from 'react';
import { createPortal } from 'react-dom';
import { mount } from '@fluentui/scripts-cypress';
import { slot, useMergedRefs, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { ForwardRefComponent, RefAttributes } from '@fluentui/react-utilities';
import { Button } from '../../Button';
import type { ButtonProps } from '../../Button';
import {
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselFooterButton,
  useTeachingPopoverCarouselFooter,
  renderTeachingPopoverCarouselFooter,
  useTeachingPopoverCarouselFooterButton,
  renderTeachingPopoverCarouselFooterButton,
} from '../index';
import type { TeachingPopoverCarouselFooterButtonProps } from '../TeachingPopoverCarouselFooterButton';
import type { TeachingPopoverCarouselFooterProps } from './TeachingPopoverCarouselFooter.types';

const ForwardingButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const mergedRef = useMergedRefs(ref);
  return <Button {...props} ref={element => mergedRef(element)} data-adapter-root />;
});

const PresentationButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> = React.forwardRef(
  (props, ref) => {
    const localRef = React.useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    useIsomorphicLayoutEffect(() => {
      const button = localRef.current;
      if (button?.hasAttribute('data-blur-on-empty') && !button.hasChildNodes()) {
        button.blur();
      }
    });
    const baseState = useTeachingPopoverCarouselFooterButton(props, useMergedRefs(ref, localRef));
    const state = {
      ...baseState,
      components: { root: ForwardingButton },
      root: slot.always(baseState.root, { elementType: ForwardingButton }),
    };
    return renderTeachingPopoverCarouselFooterButton(state);
  },
);

const PresentationFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps> = React.forwardRef((props, ref) => {
  const baseState = useTeachingPopoverCarouselFooter(props, ref);
  const state = {
    ...baseState,
    components: { root: 'div' as const, previous: PresentationButton, next: PresentationButton },
    previous: slot.optional(baseState.previous, { elementType: PresentationButton }),
    next: slot.always(baseState.next, { elementType: PresentationButton }),
  };
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
  omitNext?: boolean;
  extraNext?: boolean;
  visibilityOverride?: boolean;
  blockFallback?: boolean;
};

const Example = ({
  controlled,
  previous,
  next,
  hidePrevious = true,
  presentation,
  omitNext,
  extraNext,
  visibilityOverride,
  blockFallback,
}: ExampleProps) => {
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
      <div style={{ visibility: visibilityOverride ? 'hidden' : undefined }}>
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
          <TeachingPopoverCarouselCard value="one" style={blockFallback ? { display: 'none' } : undefined}>
            One
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
          <Footer
            previous={{
              navType: 'prev',
              children: 'Previous',
              altText: null,
              className: 'paired-previous',
              style: visibilityOverride ? { visibility: 'visible' } : undefined,
              ...{ 'data-testid': 'previous' },
              ...previous,
            }}
            next={
              omitNext
                ? { navType: 'next', altText: 'Got it', children: () => null }
                : {
                    navType: 'next',
                    children: 'Next',
                    altText: 'Got it',
                    style: visibilityOverride ? { visibility: 'visible' } : undefined,
                    ...{ 'data-testid': 'next' },
                    ...next,
                  }
            }
          >
            {extraNext && (
              <TeachingPopoverCarouselFooterButton navType="next" altText="Auxiliary" data-testid="auxiliary">
                Auxiliary
              </TeachingPopoverCarouselFooterButton>
            )}
          </Footer>
        </TeachingPopoverCarousel>
      </div>
    </>
  );
};

const OwnershipExample = ({
  scenario,
}: {
  scenario:
    | 'remove'
    | 'replace'
    | 'commit'
    | 'iframe'
    | 'content'
    | 'ancestor'
    | 'alternate'
    | 'contents-button'
    | 'contents-anchor';
}) => {
  const [step, setStep] = React.useState(0);
  const value =
    scenario === 'replace' || scenario === 'alternate'
      ? step === 2
        ? 'one'
        : 'two'
      : step === 1 || step === 3
      ? 'one'
      : 'two';
  const displayContents = scenario === 'contents-button' || scenario === 'contents-anchor';
  const previousRef = React.useRef<HTMLButtonElement>(null);
  const outsideRef = React.useRef<HTMLButtonElement>(null);
  const nextRef = React.useCallback(
    (element: HTMLButtonElement | HTMLAnchorElement | null) => {
      if (element && step === 1 && scenario === 'commit') {
        previousRef.current?.blur();
        outsideRef.current?.focus();
        outsideRef.current?.blur();
      }
    },
    [scenario, step],
  );
  return (
    <>
      <style>{`
        .ownership-content:empty { content-visibility: hidden; width: 100px; height: 30px; }
        .ownership-blocked [data-testid="ownership-next"] { display: none; }
      `}</style>
      <button ref={outsideRef} data-testid="ownership-outside">
        Outside
      </button>
      {[1, 2, 3].map(nextStep => (
        <button key={nextStep} data-testid={`ownership-step-${nextStep}`} onClick={() => setStep(nextStep)}>
          Commit {nextStep}
        </button>
      ))}
      <div data-testid="ownership-ancestor" className={scenario === 'ancestor' ? 'ownership-blocked' : undefined}>
        <TeachingPopoverCarousel value={value}>
          <TeachingPopoverCarouselCard
            value="one"
            style={scenario === 'ancestor' || scenario === 'iframe' ? { display: 'none' } : undefined}
          >
            One
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselFooter
            previous={
              scenario === 'remove' && step === 1
                ? null
                : {
                    as: (scenario === 'replace' && step > 0) || scenario === 'contents-anchor' ? 'a' : 'button',
                    navType: 'prev',
                    altText: scenario === 'alternate' && step < 2 ? 'Restart' : null,
                    children: 'Previous',
                    ...{ ref: previousRef },
                    hidden: scenario !== 'content' && !displayContents && value === 'one',
                    style: displayContents && value === 'one' ? { display: 'contents' } : undefined,
                    className: scenario === 'content' ? 'ownership-content' : undefined,
                    ...{ 'data-testid': 'ownership-previous' },
                  }
            }
            next={{
              navType: 'next',
              altText: 'Done',
              children: 'Next',
              ...{ ref: nextRef },
              hidden: scenario === 'iframe' && step < 3,
              ...{ 'data-testid': 'ownership-next' },
            }}
          />
        </TeachingPopoverCarousel>
      </div>
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

  const CompleteRecoveryExample = ({
    direction = 'prev',
    controls = true,
    pairedAvailable = false,
    controlled = 'accept',
  }: {
    direction?: 'prev' | 'next';
    controls?: boolean;
    pairedAvailable?: boolean;
    controlled?: 'accept' | 'delay' | 'reject';
  }) => {
    const [value, setValue] = React.useState('middle');
    const pending = React.useRef('middle');
    return (
      <>
        <button data-testid="recovery-outside">Outside</button>
        <button data-testid="recovery-accept" onClick={() => setValue(pending.current)}>
          Accept
        </button>
        <TeachingPopoverCarousel
          value={value}
          onValueChange={(_, data) => {
            if (data.value === undefined) {
              throw new Error('Expected a registered card');
            }
            pending.current = data.value;
            if (controlled === 'accept') {
              setValue(data.value);
            }
          }}
        >
          {['first', 'middle', 'last'].map(page => (
            <TeachingPopoverCarouselCard key={page} value={page} data-testid={`recovery-card-${page}`}>
              {page}
              <button disabled>Disabled action</button>
              <button hidden>Hidden action</button>
              <div aria-hidden="true">
                <button>Excluded action</button>
              </div>
              {controls && <input aria-label={`${page} action`} data-testid={`recovery-action-${page}`} />}
            </TeachingPopoverCarouselCard>
          ))}
          <PresentationFooter
            previous={{
              navType: 'prev',
              children: 'Previous',
              altText: null,
              hidden: value === 'first',
              disabled: direction === 'next' && !pairedAvailable,
              ...{ 'data-testid': 'recovery-previous' },
            }}
            next={{
              navType: 'next',
              children: 'Next',
              altText: null,
              hidden: value === 'last',
              disabled: direction === 'prev' && !pairedAvailable,
              ...{ 'data-testid': 'recovery-next' },
            }}
          />
        </TeachingPopoverCarousel>
      </>
    );
  };

  describe('TeachingPopoverCarouselFooter complete headless recovery', () => {
    (['prev', 'next'] as const).forEach(direction => {
      const source = direction === 'prev' ? 'previous' : 'next';
      const paired = direction === 'prev' ? 'next' : 'previous';
      const card = direction === 'prev' ? 'first' : 'last';

      it(`prefers paired navigation when ${source} disappears`, () => {
        mount(<CompleteRecoveryExample direction={direction} pairedAvailable />);
        cy.get(`[data-testid="recovery-${source}"]`).focus().realPress('Enter');
        cy.get(`[data-testid="recovery-${paired}"]`).should('have.focus');
        cy.get(`[data-testid="recovery-action-${card}"]`).should('not.have.focus');
      });

      it(`recovers to an eligible accepted-card control when ${paired} is disabled`, () => {
        mount(<CompleteRecoveryExample direction={direction} />);
        cy.get(`[data-testid="recovery-${source}"]`).focus().realPress('Enter');
        cy.get(`[data-testid="recovery-${source}"]`).should('not.be.visible');
        cy.get(`[data-testid="recovery-action-${card}"]`).should('have.focus').and('be.visible');
        cy.get(`[data-testid="recovery-${paired}"]`).should('not.have.focus');
      });

      it(`uses the accepted card container as the final ${source} recovery target`, () => {
        mount(<CompleteRecoveryExample direction={direction} controls={false} />);
        cy.get(`[data-testid="recovery-${source}"]`).focus().realPress('Enter');
        cy.get(`[data-testid="recovery-card-${card}"]`).should('have.focus').and('have.attr', 'tabindex', '-1');
        cy.get('[data-testid="recovery-outside"]').focus();
        cy.get(`[data-testid="recovery-card-${card}"]`).should('not.have.attr', 'tabindex');
      });
    });

    it('does not recover on a rejected controlled request', () => {
      mount(<CompleteRecoveryExample controlled="reject" />);
      cy.get('[data-testid="recovery-previous"]').focus().realPress('Enter');
      cy.get('[data-testid="recovery-previous"]').should('have.focus').and('be.visible');
      cy.get('[data-testid="recovery-action-middle"]').should('not.have.focus');
    });

    it('waits for accepted card content before recovering focus', () => {
      mount(<CompleteRecoveryExample controlled="delay" />);
      cy.get('[data-testid="recovery-previous"]').focus().realPress('Enter');
      cy.get('[data-testid="recovery-previous"]').should('have.focus');
      cy.get('[data-testid="recovery-accept"]').trigger('click');
      cy.get('[data-testid="recovery-action-first"]').should('have.focus');
    });

    it('does not override intentional outside focus before delayed acceptance', () => {
      mount(<CompleteRecoveryExample controlled="delay" />);
      cy.get('[data-testid="recovery-previous"]').focus().realPress('Enter');
      cy.get('[data-testid="recovery-outside"]').focus();
      cy.get('[data-testid="recovery-accept"]').trigger('click');
      cy.get('[data-testid="recovery-outside"]').should('have.focus');
      cy.get('[data-testid="recovery-action-first"]').should('not.have.focus');
    });

    (['open', 'closed'] as const).forEach(mode => {
      it(`recovers to an accepted-card action inside a ${mode} shadow root`, () => {
        let shadow: ShadowRoot;
        const ShadowTour = () => {
          const hostRef = React.useRef<HTMLDivElement>(null);
          const [root, setRoot] = React.useState<ShadowRoot | null>(null);
          useIsomorphicLayoutEffect(() => {
            if (!shadow) {
              shadow = hostRef.current!.attachShadow({ mode });
            }
            setRoot(shadow);
          }, []);
          return (
            <>
              <div ref={hostRef} data-testid="recovery-shadow" data-ready={!!root} />
              {root && createPortal(<CompleteRecoveryExample />, root)}
            </>
          );
        };
        mount(<ShadowTour />);
        cy.get('[data-testid="recovery-shadow"][data-ready="true"]').then(() => {
          cy.wrap(shadow).find('[data-testid="recovery-previous"]').focus().realPress('Enter');
          cy.wrap(shadow).find('[data-testid="recovery-action-first"]').should('have.focus');
        });
      });
    });

    it('recovers within the owning iframe rather than the parent document', () => {
      const frameRef = React.createRef<HTMLIFrameElement>();
      const FrameTour = () => {
        const [body, setBody] = React.useState<HTMLElement | null>(null);
        useIsomorphicLayoutEffect(() => {
          setBody(frameRef.current!.contentDocument!.body);
        }, []);
        return (
          <>
            <iframe ref={frameRef} title="Accepted card recovery" data-testid="recovery-frame" />
            {body && createPortal(<CompleteRecoveryExample />, body)}
          </>
        );
      };
      mount(<FrameTour />);
      cy.get<HTMLIFrameElement>('[data-testid="recovery-frame"]').then(frame => {
        const body = frame[0].contentDocument!.body;
        cy.wrap(body).find('[data-testid="recovery-previous"]').focus().trigger('click');
        cy.wrap(body).find('[data-testid="recovery-action-first"]').should('have.focus');
      });
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

  it('preserves ownership through a same-page rerender before alternate text becomes null', () => {
    mount(<OwnershipExample scenario="alternate" />);
    cy.get('[data-testid="ownership-previous"]').focus();
    cy.get('[data-testid="ownership-step-1"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').should('have.focus').and('have.text', 'Previous');
    cy.get('[data-testid="ownership-step-2"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').should('be.empty').and('not.be.visible');
    cy.get('[data-testid="ownership-next"]').should('have.focus').and('have.text', 'Next');
  });

  (['contents-button', 'contents-anchor'] as const).forEach(scenario => {
    it(`recovers focus after ${scenario} removes the Previous box`, () => {
      mount(<OwnershipExample scenario={scenario} />);
      cy.get('[data-testid="ownership-previous"]').focus();
      cy.get('[data-testid="ownership-step-1"]').trigger('click');
      cy.get('[data-testid="ownership-previous"]').should('be.empty').and('have.css', 'display', 'contents');
      cy.get('[data-testid="ownership-previous"]').should(previous =>
        expect(previous[0].getClientRects()).to.have.length(0),
      );
      cy.get('[data-testid="ownership-next"]').should('have.focus').and('be.visible');
    });
  });

  it('allows a visible Next beneath a display:contents ancestor', () => {
    mount(
      <div style={{ display: 'contents' }}>
        <Example />
      </div>,
    );
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="next"]').should('have.focus').and('be.visible');
    cy.realPress('Enter');
    cy.get('[data-testid="next"]').should('have.focus').and('have.text', 'Got it');
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
    [
      { disabled: true },
      { disabledFocusable: true },
      { hidden: true },
      { style: { display: 'none' } },
      { style: { display: 'contents' } },
    ] as const
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
    cy.get('[data-testid="previous"]').should('have.attr', 'data-adapter-root');
    cy.get('[data-testid="next"]').should('have.attr', 'data-adapter-root');
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

  it('does not focus another footer child when the designated Next is absent', () => {
    mount(<Example omitNext extraNext />);
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="previous"]').should('not.be.visible');
    cy.get('[data-testid="next"]').should('not.exist');
    cy.get('[data-testid="auxiliary"]').should('not.have.focus');
  });

  it('hands off to a visible Next overriding ancestor visibility:hidden', () => {
    mount(<Example visibilityOverride />);
    cy.get('[data-testid="previous"]').should('be.visible').focus().realPress('Enter');
    cy.get('[data-testid="previous"]').should('not.be.visible');
    cy.get('[data-testid="next"]').should('be.visible').and('have.focus');
    cy.realPress('Enter');
    cy.get('[data-testid="next"]').should('have.text', 'Got it');
  });

  it('retries after the designated Next becomes available', () => {
    mount(<Example next={{ hidden: true }} blockFallback />);
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="previous"]').should('not.be.visible');
    cy.get('[data-testid="next"]').should('not.have.focus').invoke('removeAttr', 'hidden');
    cy.get('[data-testid="next"]').should('have.focus');
  });

  it('cancels pending handoff if outside focus is moved and then blurred', () => {
    mount(<Example next={{ hidden: true }} />);
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="outside"]').focus().blur();
    cy.get('[data-testid="next"]').invoke('removeAttr', 'hidden').should('not.have.focus');
  });

  it('does not carry ownership through removal and restoration of Previous', () => {
    mount(<OwnershipExample scenario="remove" />);
    cy.get('[data-testid="ownership-previous"]').focus();
    cy.get('[data-testid="ownership-step-1"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').should('not.exist');
    cy.get('[data-testid="ownership-step-2"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').should('be.visible').and('not.have.focus');
    cy.get('[data-testid="ownership-step-3"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').should('not.be.visible');
    cy.get('[data-testid="ownership-next"]').should('not.have.focus');
  });

  it('records outside focus and blur during a callback ref commit', () => {
    mount(<OwnershipExample scenario="commit" />);
    cy.get('[data-testid="ownership-outside"]').then(outside => {
      const focused = cy.stub().as('commitOutsideFocus');
      outside[0].addEventListener('focus', focused);
    });
    cy.get('[data-testid="ownership-previous"]').focus();
    cy.get('[data-testid="ownership-step-1"]').trigger('click');
    cy.get('@commitOutsideFocus').should('have.been.calledOnce');
    cy.get('[data-testid="ownership-next"]').should('not.have.focus');
  });

  it('does not inherit ownership when Previous changes from a button to an anchor', () => {
    mount(<OwnershipExample scenario="replace" />);
    cy.get('[data-testid="ownership-previous"]')
      .focus()
      .then(previous => {
        const original = previous[0];
        cy.get('[data-testid="ownership-step-1"]').trigger('click');
        cy.get('[data-testid="ownership-previous"]')
          .should('have.prop', 'tagName', 'A')
          .and('not.have.focus')
          .then(replacement => expect(replacement[0]).not.to.equal(original));
      });
    cy.get('[data-testid="ownership-step-2"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').should('not.be.visible');
    cy.get('[data-testid="ownership-next"]').should('not.have.focus');
    cy.get('[data-testid="ownership-step-3"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').focus();
    cy.get('[data-testid="ownership-step-2"]').trigger('click');
    cy.get('[data-testid="ownership-next"]').should('have.focus').and('have.text', 'Next');
  });

  it('retries when tabindex changes without a footer render', () => {
    mount(<Example next={{ tabIndex: -1 }} blockFallback />);
    cy.get('[data-testid="previous"]').focus().realPress('Enter');
    cy.get('[data-testid="previous"]').should('not.be.visible');
    cy.get('[data-testid="next"]').should('not.have.focus').invoke('attr', 'tabindex', '0');
    cy.get('[data-testid="next"]').should('have.focus');
  });

  it('retries when a class outside the footer stops hiding Next', () => {
    mount(<OwnershipExample scenario="ancestor" />);
    cy.get('[data-testid="ownership-previous"]').focus();
    cy.get('[data-testid="ownership-step-1"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').should('not.be.visible');
    cy.get('[data-testid="ownership-next"]').should('not.be.visible').and('not.have.focus');
    cy.get('[data-testid="ownership-ancestor"]').invoke('removeClass', 'ownership-blocked');
    cy.get('[data-testid="ownership-next"]').should('be.visible').and('have.focus');
  });

  it('keeps focus on a visible Previous box whose own contents are skipped', () => {
    mount(<OwnershipExample scenario="content" />);
    cy.get('[data-testid="ownership-previous"]').focus();
    cy.get('[data-testid="ownership-step-1"]').trigger('click');
    cy.get('[data-testid="ownership-previous"]').should('be.empty').and('be.visible').and('have.focus');
    cy.get('[data-testid="ownership-next"]').should('not.have.focus');
  });

  it('does not steal focus back from the document outside its owning iframe', () => {
    const IframeExample = () => {
      const frameRef = React.useRef<HTMLIFrameElement>(null);
      const [body, setBody] = React.useState<HTMLElement | null>(null);
      useIsomorphicLayoutEffect(() => {
        setBody(frameRef.current!.contentDocument!.body);
      }, []);
      return (
        <>
          <button data-testid="parent-outside">Parent outside</button>
          <iframe ref={frameRef} title="Footer focus owner" data-testid="owner-frame" />
          {body && createPortal(<OwnershipExample scenario="iframe" />, body)}
        </>
      );
    };
    mount(<IframeExample />);
    cy.get<HTMLIFrameElement>('[data-testid="owner-frame"]').then(frame => {
      const body = frame[0].contentDocument!.body;
      cy.wrap(body).find('[data-testid="ownership-previous"]').focus();
      cy.wrap(body).find('[data-testid="ownership-step-1"]').trigger('click');
      cy.wrap(body).find('[data-testid="ownership-previous"]').should('not.be.visible');
      cy.wrap(body).find('[data-testid="ownership-next"]').should('not.be.visible');
      cy.get('[data-testid="parent-outside"]').focus().should('have.focus');
      cy.wrap(body).find('[data-testid="ownership-step-3"]').trigger('click');
      cy.wrap(body).find('[data-testid="ownership-next"]').should('be.visible').and('not.have.focus');
      cy.get('[data-testid="parent-outside"]').should('have.focus');
    });
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
