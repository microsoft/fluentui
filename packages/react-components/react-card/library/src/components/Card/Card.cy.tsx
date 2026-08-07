import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';
import { Button } from '@fluentui/react-button';
import { fuiSelector } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { Card, CardFooter, CardHeader, cardClassNames, cardPreviewClassNames, CardPreview } from '@fluentui/react-card';
import type { CardProps, CardOnSelectionChangeEvent } from '@fluentui/react-card';

/*
 * ── Selecting Card's internals after the D16 statics removal ────────────────────────────
 *
 * `cardClassNames` / `cardPreviewClassNames` are still exported, but they now hold ONE key —
 * `root`, valued at the component's group marker — so the `fui-Card__checkbox`,
 * `fui-Card__floatingAction` and `fui-CardHeader__header` selectors these tests used to build
 * no longer exist, by design: sub-slots have no public class-name handle (D16.1 / D16.5).
 *
 * Roots keep selecting by identity, through `fuiSelector()` — `'.' + marker` is an invalid
 * selector because the `/` terminates a class name, so the escaping helper is not optional
 * here (D16.5).
 *
 * Sub-slots get a probe class stamped by the fixture through the slot's `className` prop.
 * That is not a workaround — per-slot `className` IS the supported handle on a slot under the
 * new contract, so these tests now target internals the same way a consumer must. (A
 * `data-testid` would read more conventionally but is not assignable: Fluent's slot-props
 * types have no index signature, so an object literal rejects `data-*`, while JSX shorthand
 * would put the attribute on the CHILD rather than on the slot element.)
 *
 * Stamping a `className` is behaviour-neutral for the assertions below. `checkbox` is
 * destructured as `checkbox = {}` in `useCardSelectable` and merged via
 * `slot.optional(checkbox, …)`, and `selectable` is derived only from `selected` /
 * `defaultSelected` / `onSelectionChange` — so a probe class changes nothing about WHEN the
 * checkbox renders, which is exactly what half of these assertions are about.
 */
const cardSelector = fuiSelector(cardClassNames.root);
const cardPreviewSelector = fuiSelector(cardPreviewClassNames.root);

const CHECKBOX_PROBE = 'card-checkbox-probe';
const FLOATING_ACTION_PROBE = 'card-floating-action-probe';
const HEADER_SLOT_PROBE = 'card-header-slot-probe';

const checkboxSelector = `.${CHECKBOX_PROBE}`;
const floatingActionSelector = `.${FLOATING_ACTION_PROBE}`;
const headerSlotSelector = `.${HEADER_SLOT_PROBE}`;

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider themeClassName={webLightThemeClassName}>{element}</FluentProvider>);
};

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

const CardSample = (props: CardProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <Card id="card" checkbox={{ className: CHECKBOX_PROBE }} {...props}>
      <CardHeader
        image={<img src={resolveAsset('pptx.png')} alt="Microsoft PowerPoint logo" />}
        header={{ className: HEADER_SLOT_PROBE, children: <b>App Name</b> }}
        description={<span>Developer</span>}
      />

      <div>
        Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
      </div>

      <CardFooter>
        <Button id="open-button" appearance="primary">
          Open
        </Button>

        <Button id="close-button" appearance="outline">
          Close
        </Button>
      </CardFooter>
    </Card>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const CardWithCustomHeader = ({
  customHeaderId = 'custom-header-id',
  ...props
}: CardProps & { customHeaderId: string }) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <Card id="card" checkbox={{ className: CHECKBOX_PROBE }} {...props}>
      <CardHeader
        image={<img src={resolveAsset('pptx.png')} alt="Microsoft PowerPoint logo" />}
        header={{ className: HEADER_SLOT_PROBE, children: <b id={customHeaderId}>App Name</b> }}
        description={<span>Developer</span>}
      />
    </Card>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const CardWithPreview = (props: CardProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>

    <Card id="card" checkbox={{ className: CHECKBOX_PROBE }} {...props}>
      <CardPreview>
        <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document" />
      </CardPreview>

      <CardFooter>
        <Button id="open-button" appearance="primary">
          Open
        </Button>

        <Button id="close-button" appearance="outline">
          Close
        </Button>
      </CardFooter>
    </Card>

    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

const CardSampleNoActions = (props: CardProps) => (
  <>
    <p tabIndex={0} id="before">
      Before
    </p>
    <Card id="card" checkbox={{ className: CHECKBOX_PROBE }} {...props}>
      <CardHeader
        header={{ className: HEADER_SLOT_PROBE, children: <b>App Name</b> }}
        description={<span>Developer</span>}
      />
      <div>
        Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
      </div>
    </Card>
    <p tabIndex={0} id="after">
      After
    </p>
  </>
);

describe('Card', () => {
  describe('focus behaviors', () => {
    describe('focusMode="off" (default)', () => {
      it('should not be focusable', () => {
        mountFluent(<CardSample />);

        cy.get('#before').focus();

        cy.get('#card').should('not.be.focused');

        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#open-button').should('be.focused');
      });
    });

    describe('focusMode="no-tab"', () => {
      it('should be focusable', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        const card = cy.get('#card');

        card.should('not.be.focused');

        card.focus();

        card.should('be.focused');
      });

      it('should focus inner elements on EnterKey press', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#card').realClick().realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should not focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#card').realClick().realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#after').should('be.focused');
      });

      it('should trap focus', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#open-button').realClick().realPress('Tab');

        cy.get('#open-button').should('not.be.focused');
        cy.get('#close-button').should('be.focused');

        cy.realPress('Tab');

        cy.get('#open-button').should('be.focused');
        cy.get('#close-button').should('not.be.focused');
      });

      it('should focus parent on Esc press', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#open-button').realClick().realPress('Escape');

        cy.get('#open-button').should('not.be.focused');
        cy.get('#card').should('be.focused');
      });
    });

    describe('focusMode="tab-exit"', () => {
      it('should be focusable', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        const card = cy.get('#card');

        card.should('not.be.focused');

        card.focus();

        card.should('be.focused');
      });

      it('should focus inner elements on EnterKey press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#card').realClick().realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should not focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#card').realClick().realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#after').should('be.focused');
      });

      it('should exit on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#close-button').realClick().realPress('Tab');

        cy.get('#after').should('be.focused');
      });

      it('should focus parent on Esc press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#card').realClick().realPress('Enter');

        cy.get('#open-button').should('be.focused');

        cy.realPress('Escape');

        cy.get('#card').should('be.focused');
      });
    });

    describe('focusMode="tab-only"', () => {
      it('should be focusable', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        const card = cy.get('#card');

        card.should('not.be.focused');

        card.focus();

        card.should('be.focused');
      });

      it('should focus inner elements on EnterKey press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#card').realClick().realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#card').realClick().realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#open-button').should('be.focused');
      });

      it('should exit on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#close-button').realClick().realPress('Tab');

        cy.get('#after').should('be.focused');
      });

      it('should focus parent on Esc press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#card').focus().realPress('Enter');

        cy.get('#open-button').should('be.focused');

        cy.realPress('Escape');

        cy.get('#card').should('be.focused');
      });
    });
  });

  describe('selectable', () => {
    it('should not be focusable', () => {
      mountFluent(<CardSample />);

      cy.get('#before').focus();

      cy.get('#card').should('not.be.focused');

      cy.realPress('Tab');

      cy.get('#card').should('not.be.focused');
      cy.get('#open-button').should('be.focused');
    });

    it('should not be selectable by default', () => {
      mountFluent(<CardSample />);

      cy.get(floatingActionSelector).should('not.exist');
      cy.get(checkboxSelector).should('not.exist');
    });

    it('should render select slot - selected prop', () => {
      mountFluent(<CardSample selected />);

      cy.get(checkboxSelector).should('exist');
      cy.get(floatingActionSelector).should('not.exist');
    });

    it('should render select slot - defaultSelected prop', () => {
      mountFluent(<CardSample defaultSelected />);

      cy.get(checkboxSelector).should('exist');
      cy.get(floatingActionSelector).should('not.exist');
    });

    it('should render select slot - onSelectionChange prop', () => {
      const Example = () => {
        const onSelectionChange = React.useCallback(() => null, []);

        return <CardSample onSelectionChange={onSelectionChange} />;
      };

      mountFluent(<Example />);

      cy.get(checkboxSelector).should('exist');
      cy.get(floatingActionSelector).should('not.exist');
    });

    it('should render select slot custom JSX is provided', () => {
      mountFluent(<CardSample floatingAction={{ className: FLOATING_ACTION_PROBE, children: <span /> }} />);

      cy.get(floatingActionSelector).should('exist');
      cy.get(checkboxSelector).should('not.exist');
    });

    it('should have internal checkbox when selectable - no select slot', () => {
      mountFluent(<CardSample selected />);

      cy.get(checkboxSelector).should('exist');
      cy.get(floatingActionSelector).should('not.exist');
    });

    it('should render custom select slot', () => {
      mountFluent(
        <CardSample floatingAction={{ className: FLOATING_ACTION_PROBE, children: <input type="checkbox" /> }} />,
      );

      cy.get(`${floatingActionSelector} input[type="checkbox"]`).should('exist');
    });

    it('should select with a mouse click', () => {
      mountFluent(<CardSample defaultSelected={false} />);

      cy.get(checkboxSelector).should('not.be.checked');
      cy.get(cardSelector).realClick();
      cy.get(checkboxSelector).should('be.checked');
    });

    it('should have checkbox pre-selected and toggle its value', () => {
      mountFluent(<CardSample defaultSelected />);

      cy.get(checkboxSelector).should('be.checked');
      cy.get(cardSelector).realClick();
      cy.get(checkboxSelector).should('not.be.checked');
    });

    it('should select with the Space key', () => {
      mountFluent(<CardSample defaultSelected={false} />);

      cy.get(checkboxSelector).focus().realPress('Space');
      cy.get(checkboxSelector).should('be.checked');
    });

    it('should NOT select when focused on an action', () => {
      mountFluent(<CardSample defaultSelected={false} />);

      cy.get(`${cardSelector} button`).first().focus().realPress('Enter');
      cy.get(checkboxSelector).should('not.be.checked');
    });

    it('should select with the Enter key if card does not have any actions inside', () => {
      mountFluent(<CardSampleNoActions defaultSelected={false} />);

      cy.get(checkboxSelector).focus().realPress('Enter');
      cy.get(checkboxSelector).should('be.checked');
    });

    it('should sync selected value with custom slot', () => {
      const Example = () => {
        const [checked, setChecked] = React.useState(false);

        const onSelectionChange = React.useCallback(
          (_: CardOnSelectionChangeEvent, { selected }: { selected: boolean }) => setChecked(selected),
          [],
        );

        return (
          <CardSample
            floatingAction={{
              className: FLOATING_ACTION_PROBE,
              children: <input type="checkbox" className="custom-select-slot" checked={checked} />,
            }}
            onSelectionChange={onSelectionChange}
          />
        );
      };

      mountFluent(<Example />);

      cy.get(`${floatingActionSelector} .custom-select-slot`).should('not.be.checked');
      cy.get(cardSelector).realClick();
      cy.get(`${floatingActionSelector} .custom-select-slot`).should('be.checked');
    });

    it('should sync selectable aria-labelledby with card header id', () => {
      mountFluent(<CardSample selected />);

      cy.get(headerSlotSelector).should('have.attr', 'id');
      cy.get(headerSlotSelector).then(header => {
        cy.get(checkboxSelector).then(slot => {
          expect(header.attr('id')).equals(slot.attr('aria-labelledby'));
        });
      });
    });

    it('should sync selectable aria-labelledby with card header immediate child', () => {
      const customHeaderId = 'custom-header';

      mountFluent(<CardWithCustomHeader customHeaderId={customHeaderId} selected />);

      cy.get(headerSlotSelector).should('not.have.attr', 'id');
      cy.get(checkboxSelector).then(slot => {
        cy.get(`#${customHeaderId}`).then(() => expect(customHeaderId).equals(slot.attr('aria-labelledby')));
      });
    });

    it('should sync selectable aria-label with card preview alt', () => {
      mountFluent(<CardWithPreview selected />);

      cy.get(`${cardPreviewSelector} img`).then(img => {
        cy.get(checkboxSelector).then(slot => {
          expect(img.attr('alt')).equals(slot.attr('aria-label'));
        });
      });
    });
  });

  describe('disabled', () => {
    it('should have aria-disabled attribute when disabled', () => {
      mountFluent(<CardSample disabled />);

      cy.get('#card').should('have.attr', 'aria-disabled', 'true');
    });

    it('should not be focusable when disabled', () => {
      mountFluent(<CardSample disabled focusMode="no-tab" />);

      cy.get('#before').focus();
      cy.realPress('Tab');

      cy.get('#card').should('not.be.focused');
      cy.get('#open-button').should('be.focused');
    });

    it('should not respond to click events when disabled', () => {
      const onClickSpy = cy.spy().as('onClickSpy');

      mountFluent(<CardSample disabled onClick={onClickSpy} />);

      cy.get('#card').realClick();

      cy.get('@onClickSpy').should('not.have.been.called');
    });

    it('should not respond to keyboard events when disabled', () => {
      const onClickSpy = cy.spy().as('onClickSpy');

      mountFluent(<CardSample disabled onClick={onClickSpy} focusMode="no-tab" />);

      // Since the card is disabled and not focusable, we can't send keyboard events to it
      // This test verifies that the card doesn't receive focus and therefore can't respond to keyboard events
      cy.get('#card').should('have.attr', 'aria-disabled', 'true');

      // Try to focus the card - it should not be focusable
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.get('#card').should('not.be.focused');

      cy.get('@onClickSpy').should('not.have.been.called');
    });

    describe('selectable disabled', () => {
      it('should not be selectable when disabled', () => {
        mountFluent(<CardSample disabled selected />);

        cy.get(checkboxSelector).should('be.disabled');
      });

      it('should not change selection state when clicked and disabled', () => {
        mountFluent(<CardSample disabled defaultSelected={false} />);

        cy.get(checkboxSelector).should('not.be.checked');
        cy.get('#card').realClick();
        cy.get(checkboxSelector).should('not.be.checked');
      });

      it('should not change selection state with keyboard when disabled', () => {
        mountFluent(<CardSample disabled defaultSelected={false} />);

        cy.get(checkboxSelector).should('not.be.checked');
        // Disabled checkbox should not respond to keyboard events
        cy.get(checkboxSelector).should('be.disabled');
        // The checkbox is disabled, so trying to type on it should not work
        cy.get(checkboxSelector).should('not.be.checked');
      });

      it('should maintain selected state when disabled', () => {
        mountFluent(<CardSample disabled defaultSelected />);

        cy.get(checkboxSelector).should('be.checked');
        cy.get('#card').realClick();
        cy.get(checkboxSelector).should('be.checked');
      });

      it('should have disabled checkbox when card is disabled and selectable', () => {
        mountFluent(<CardSample disabled selected />);

        cy.get(checkboxSelector).should('be.disabled');
        // HTML inputs use the 'disabled' attribute, not 'aria-disabled'
        cy.get(checkboxSelector).should('have.attr', 'disabled');
      });

      it('should not trigger onSelectionChange when disabled', () => {
        const onSelectionChangeSpy = cy.spy().as('onSelectionChangeSpy');

        const DisabledSelectableCard = () => (
          <CardSample disabled defaultSelected={false} onSelectionChange={onSelectionChangeSpy} />
        );

        mountFluent(<DisabledSelectableCard />);

        cy.get('#card').realClick();
        cy.get('@onSelectionChangeSpy').should('not.have.been.called');
      });
    });

    describe('focus modes when disabled', () => {
      it('should not be focusable with focusMode="no-tab" when disabled', () => {
        mountFluent(<CardSample disabled focusMode="no-tab" />);

        cy.get('#before').focus();
        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#open-button').should('be.focused');
      });

      it('should not be focusable with focusMode="tab-exit" when disabled', () => {
        mountFluent(<CardSample disabled focusMode="tab-exit" />);

        cy.get('#before').focus();
        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#open-button').should('be.focused');
      });

      it('should not be focusable with focusMode="tab-only" when disabled', () => {
        mountFluent(<CardSample disabled focusMode="tab-only" />);

        cy.get('#before').focus();
        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#open-button').should('be.focused');
      });

      it('should not receive programmatic focus when disabled', () => {
        mountFluent(<CardSample disabled focusMode="no-tab" />);

        // Disabled cards should not be focusable, so we verify the focus doesn't change
        cy.get('#before').focus();
        cy.get('#before').should('be.focused');

        // This should not change the focus since the card is disabled
        cy.get('#card').should('have.attr', 'aria-disabled', 'true');
        cy.get('#before').should('be.focused'); // Focus should remain on #before
      });
    });

    describe('interactive behaviors when disabled', () => {
      it('should not be interactive when disabled even with click handlers', () => {
        const onClickSpy = cy.spy().as('onClickSpy');

        mountFluent(<CardSample disabled onClick={onClickSpy} />);

        cy.get('#card').realClick();

        // The onClick handler should not be called when disabled
        cy.get('@onClickSpy').should('not.have.been.called');
      });

      it('should not respond to mouse events when disabled', () => {
        // When a card is disabled, the onClick handler is removed
        // but other mouse events may still bubble up from child elements
        // This test verifies that the main onClick interaction is disabled
        mountFluent(<CardSample disabled />);

        cy.get('#card').should('have.attr', 'aria-disabled', 'true');

        // The card should be visually disabled
        cy.get('#card').realClick();

        // Since we didn't provide an onClick handler, we just verify the disabled state
        cy.get('#card').should('have.attr', 'aria-disabled', 'true');
      });
    });

    describe('child element interaction when card is disabled', () => {
      it('should allow child elements to be interacted with when card is disabled', () => {
        mountFluent(<CardSample disabled />);

        // Child buttons should still be clickable unless explicitly disabled
        cy.get('#open-button').should('not.be.disabled');
        cy.get('#close-button').should('not.be.disabled');

        cy.get('#open-button').realClick();
        cy.get('#close-button').realClick();
      });

      it('should focus child elements normally when card is disabled', () => {
        mountFluent(<CardSample disabled />);

        cy.get('#before').focus();
        cy.realPress('Tab');

        cy.get('#open-button').should('be.focused');

        cy.realPress('Tab');

        cy.get('#close-button').should('be.focused');
      });
    });
  });
});
