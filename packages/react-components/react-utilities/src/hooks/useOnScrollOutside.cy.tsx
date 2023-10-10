import { mount } from '@cypress/react';
import * as React from 'react';

import { useOnScrollOutside } from './useOnScrollOutside';

describe('useOnScrollOutside', () => {
  it('should work', () => {
    const onOutsideScroll = cy.spy();

    const OutsideScrollExample: React.FC<{ onOutsideScroll: () => void }> = props => {
      const innerRef = React.useRef<HTMLDivElement>(null);

      useOnScrollOutside({
        element: document,
        callback: props.onOutsideScroll,
        refs: [innerRef],
      });

      return (
        <div>
          <div
            id="inside-scrollable-area"
            ref={innerRef}
            style={{
              border: '3px solid blue',
              padding: 20,
              height: 100,
              overflow: 'auto',
            }}
          >
            <div style={{ height: 200 }} />
          </div>

          <div
            id="outside-scrollable-area"
            style={{
              border: '3px solid salmon',
              padding: 20,
              height: 100,
              overflow: 'auto',
            }}
          >
            <div style={{ height: 200 }} />
          </div>
        </div>
      );
    };

    mount(<OutsideScrollExample onOutsideScroll={onOutsideScroll} />);

    cy.get('#inside-scrollable-area')
      .trigger('wheel', { deltaY: 10 })
      .then(() => {
        expect(onOutsideScroll).not.to.be.called;
      });

    cy.get('#outside-scrollable-area')
      .trigger('wheel', { deltaY: 10 })
      .then(() => {
        expect(onOutsideScroll).to.be.called;
      });
  });

  it('should not trigger callback on browser-initiated scroll due to focus change', () => {
    const onOutsideScroll = cy.spy();

    const OutsideScrollExample: React.FC<{ onOutsideScroll: () => void }> = props => {
      const innerRef = React.useRef<HTMLDivElement>(null);

      useOnScrollOutside({
        element: document,
        callback: props.onOutsideScroll,
        refs: [innerRef],
      });

      return (
        <div
          id="outside-area"
          style={{
            border: '3px solid salmon',
            padding: 20,
            height: 100,
            overflow: 'auto',
          }}
        >
          <div
            id="inside-area"
            ref={innerRef}
            style={{
              border: '3px solid blue',
              padding: 20,
              overflow: 'auto',
            }}
          >
            <button id="inside-button">a button inside</button>
          </div>

          <div style={{ height: 200 }} />
          <button id="outside-button">a button outside</button>
        </div>
      );
    };

    mount(<OutsideScrollExample onOutsideScroll={onOutsideScroll} />);

    cy.get('#inside-button')
      .click()
      .realPress('Tab')
      .get('#outside-button')
      .should('be.focused')
      .then(() => {
        expect(onOutsideScroll).to.not.be.called;
      });
  });
});
