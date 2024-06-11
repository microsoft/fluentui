import * as React from 'react';
import { mount } from '@cypress/react';
import type {} from '@cypress/react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Button } from '@fluentui/react-button';
import {
  Card,
  CardFooter,
  CardHeader,
  cardClassNames,
  cardHeaderClassNames,
  cardPreviewClassNames,
  CardPreview,
} from '@fluentui/react-card';
import type { CardProps } from '@fluentui/react-card';

const mountFluent = (element: JSX.Element) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
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

    <Card id="card" {...props}>
      <CardHeader
        image={<img src={resolveAsset('pptx.png')} alt="Microsoft PowerPoint logo" />}
        header={<b>App Name</b>}
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

    <Card id="card" {...props}>
      <CardHeader
        image={<img src={resolveAsset('pptx.png')} alt="Microsoft PowerPoint logo" />}
        header={<b id={customHeaderId}>App Name</b>}
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

    <Card id="card" {...props}>
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
    <Card id="card" {...props}>
      <CardHeader header={<b>App Name</b>} description={<span>Developer</span>} />
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

        cy.get('#card').focus();

        cy.realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should not focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#card').focus();

        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#after').should('be.focused');
      });

      it('should trap focus', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#open-button').focus();

        cy.realPress('Tab');

        cy.get('#open-button').should('not.be.focused');
        cy.get('#close-button').should('be.focused');

        cy.realPress('Tab');

        cy.get('#open-button').should('be.focused');
        cy.get('#close-button').should('not.be.focused');
      });

      it('should focus parent on Esc press', () => {
        mountFluent(<CardSample focusMode="no-tab" />);

        cy.get('#open-button').focus();

        cy.realPress('Escape');

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

        cy.get('#card').focus();

        cy.realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should not focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#card').focus();

        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#after').should('be.focused');
      });

      it('should exit on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#close-button').focus();

        cy.realPress('Tab');

        cy.get('#after').should('be.focused');
      });

      it('should focus parent on Esc press', () => {
        mountFluent(<CardSample focusMode="tab-exit" />);

        cy.get('#card').focus().realPress('Enter');

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

        cy.get('#card').focus();

        cy.realPress('Enter');

        cy.get('#open-button').should('be.focused');
      });

      it('should focus inner elements on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#card').focus();

        cy.realPress('Tab');

        cy.get('#card').should('not.be.focused');
        cy.get('#open-button').should('be.focused');
      });

      it('should exit on Tab press', () => {
        mountFluent(<CardSample focusMode="tab-only" />);

        cy.get('#close-button').focus();

        cy.realPress('Tab');

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

      cy.get(`.${cardClassNames.floatingAction}`).should('not.exist');
      cy.get(`.${cardClassNames.checkbox}`).should('not.exist');
    });

    it('should render select slot - selected prop', () => {
      mountFluent(<CardSample selected />);

      cy.get(`.${cardClassNames.checkbox}`).should('exist');
      cy.get(`.${cardClassNames.floatingAction}`).should('not.exist');
    });

    it('should render select slot - defaultSelected prop', () => {
      mountFluent(<CardSample defaultSelected />);

      cy.get(`.${cardClassNames.checkbox}`).should('exist');
      cy.get(`.${cardClassNames.floatingAction}`).should('not.exist');
    });

    it('should render select slot - onSelectionChange prop', () => {
      const Example = () => {
        const onSelectionChange = React.useCallback(() => null, []);

        return <CardSample onSelectionChange={onSelectionChange} />;
      };

      mountFluent(<Example />);

      cy.get(`.${cardClassNames.checkbox}`).should('exist');
      cy.get(`.${cardClassNames.floatingAction}`).should('not.exist');
    });

    it('should render select slot custom JSX is provided', () => {
      mountFluent(<CardSample floatingAction={<span />} />);

      cy.get(`.${cardClassNames.floatingAction}`).should('exist');
      cy.get(`.${cardClassNames.checkbox}`).should('not.exist');
    });

    it('should have internal checkbox when selectable - no select slot', () => {
      mountFluent(<CardSample selected />);

      cy.get(`.${cardClassNames.checkbox}`).should('exist');
      cy.get(`.${cardClassNames.floatingAction}`).should('not.exist');
    });

    it('should render custom select slot', () => {
      mountFluent(<CardSample floatingAction={<input type="checkbox" />} />);

      cy.get(`.${cardClassNames.floatingAction} input[type="checkbox"]`).should('exist');
    });

    it('should select with a mouse click', () => {
      mountFluent(<CardSample defaultSelected={false} />);

      cy.get(`.${cardClassNames.checkbox}`).should('not.be.checked');
      cy.get(`.${cardClassNames.root}`).realClick();
      cy.get(`.${cardClassNames.checkbox}`).should('be.checked');
    });

    it('should have checkbox pre-selected and toggle its value', () => {
      mountFluent(<CardSample defaultSelected />);

      cy.get(`.${cardClassNames.checkbox}`).should('be.checked');
      cy.get(`.${cardClassNames.root}`).realClick();
      cy.get(`.${cardClassNames.checkbox}`).should('not.be.checked');
    });

    it('should select with the Space key', () => {
      mountFluent(<CardSample defaultSelected={false} />);

      cy.get(`.${cardClassNames.checkbox}`).focus().realPress('Space');
      cy.get(`.${cardClassNames.checkbox}`).should('be.checked');
    });

    it('should NOT select when focused on an action', () => {
      mountFluent(<CardSample defaultSelected={false} />);

      cy.get(`.${cardClassNames.root} button`).first().focus().realPress('Enter');
      cy.get(`.${cardClassNames.checkbox}`).should('not.be.checked');
    });

    it('should select with the Enter key if card does not have any actions inside', () => {
      mountFluent(<CardSampleNoActions defaultSelected={false} />);

      cy.get(`.${cardClassNames.checkbox}`).focus().realPress('Enter');
      cy.get(`.${cardClassNames.checkbox}`).should('be.checked');
    });

    it('should sync selected value with custom slot', () => {
      const Example = () => {
        const [checked, setChecked] = React.useState(false);

        const onSelectionChange = React.useCallback((event, { selected }) => setChecked(selected), []);

        return (
          <CardSample
            floatingAction={<input type="checkbox" className="custom-select-slot" checked={checked} />}
            onSelectionChange={onSelectionChange}
          />
        );
      };

      mountFluent(<Example />);

      cy.get(`.${cardClassNames.floatingAction} .custom-select-slot`).should('not.be.checked');
      cy.get(`.${cardClassNames.root}`).realClick();
      cy.get(`.${cardClassNames.floatingAction} .custom-select-slot`).should('be.checked');
    });

    it('should sync selectable aria-labelledby with card header id', () => {
      mountFluent(<CardSample selected />);

      cy.get(`.${cardHeaderClassNames.header}`).should('have.attr', 'id');
      cy.get(`.${cardHeaderClassNames.header}`).then(header => {
        cy.get(`.${cardClassNames.checkbox}`).then(slot => {
          expect(header.attr('id')).equals(slot.attr('aria-labelledby'));
        });
      });
    });

    it('should sync selectable aria-labelledby with card header immediate child', () => {
      const customHeaderId = 'custom-header';

      mountFluent(<CardWithCustomHeader customHeaderId={customHeaderId} selected />);

      cy.get(`.${cardHeaderClassNames.header}`).should('not.have.attr', 'id');
      cy.get(`.${cardClassNames.checkbox}`).then(slot => {
        cy.get(`#${customHeaderId}`).then(() => expect(customHeaderId).equals(slot.attr('aria-labelledby')));
      });
    });

    it('should sync selectable aria-label with card preview alt', () => {
      mountFluent(<CardWithPreview selected />);

      cy.get(`.${cardPreviewClassNames.root} img`).then(img => {
        cy.get(`.${cardClassNames.checkbox}`).then(slot => {
          expect(img.attr('alt')).equals(slot.attr('aria-label'));
        });
      });
    });
  });
});
