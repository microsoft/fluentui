import { mount } from '@cypress/react';
import * as React from 'react';
import root from 'react-shadow';

import { useOnClickOutside } from './useOnClickOutside';

const Example: React.FC<{ useShadowDOM: boolean; onOutsideClick: () => void }> = props => {
  const innerRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside({
    element: document,
    callback: props.onOutsideClick,
    refs: [innerRef],
  });

  const containerEl = (
    <div style={{ display: 'flex', gap: 20 }}>
      <div id="inside-area" ref={innerRef} style={{ border: '3px solid blue', padding: 20 }}>
        <button id="inside-button">a button inside</button>
      </div>

      <div id="outside-areaA" style={{ border: '3px solid violet', padding: 20 }}>
        <button id="outside-buttonA">a button outside (A)</button>
      </div>
    </div>
  );

  return (
    <div style={{ border: '3px solid green', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h3>using Shadow DOM: {props.useShadowDOM ? '✅' : '❌'}</h3>

      {props.useShadowDOM ? <root.div id="shadow-host">{containerEl}</root.div> : containerEl}

      <div id="outside-areaB" style={{ border: '3px solid olive', padding: 20 }}>
        <button id="outside-buttonB">a button outside (B)</button>
      </div>
    </div>
  );
};

describe('useOnClickOutside', () => {
  it('should work within Light DOM', () => {
    const onOutsideClick = cy.spy();

    mount(<Example useShadowDOM={false} onOutsideClick={onOutsideClick} />);

    cy.get('#inside-button')
      .click()
      .then(() => {
        expect(onOutsideClick).to.not.be.called;
      });

    cy.get('#outside-buttonA')
      .click()
      .then(() => {
        expect(onOutsideClick).to.be.calledOnce;
      });

    cy.get('#outside-buttonB')
      .click()
      .then(() => {
        expect(onOutsideClick).to.be.calledTwice;
      });
  });

  it('should work within Shadow DOM', () => {
    const onOutsideClick = cy.spy();

    mount(<Example useShadowDOM onOutsideClick={onOutsideClick} />);

    cy.get('#shadow-host')
      .shadow()
      .find('#inside-button')
      .click()
      .then(() => {
        expect(onOutsideClick).to.not.be.called;
      });

    cy.get('#shadow-host')
      .shadow()
      .find('#outside-buttonA')
      .click()
      .then(() => {
        expect(onOutsideClick).to.be.calledOnce;
      });

    cy.get('#outside-buttonB')
      .click()
      .then(() => {
        expect(onOutsideClick).to.be.calledTwice;
      });
  });

  it('should not call callback with inside text selection finishing outside', () => {
    const onOutsideClick = cy.spy();

    mount(<Example useShadowDOM={false} onOutsideClick={onOutsideClick} />);

    cy.get('#inside-button')
      .trigger('mousedown', { which: 1 })
      .trigger('mousemove')
      .get('#outside-buttonA')
      .trigger('mousemove')
      .trigger('mouseup')
      .trigger('click')
      .then(() => {
        expect(onOutsideClick).to.not.be.called;
      });
  });
});
