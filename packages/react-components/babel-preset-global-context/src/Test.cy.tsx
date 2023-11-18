/*
 * These tests are run with the specific cypress.config.ts file
 * in this project in order to consume @fluentui/babel-preset-global-context during bundling
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from '@cypress/react';
import { ProviderContext as ProviderContextV1 } from './testing/fake_node_modules/context-v1.0.0';
import { ProviderContext as ProviderContextV11 } from './testing/fake_node_modules/context-v1.1.0';
import { ProviderContext as ProviderContextV2 } from './testing/fake_node_modules/context-v2.0.0';

import { ProviderContext as IgnoredContextV1 } from './testing/fake_node_modules/ignored-context-v1.0.0';
import { ProviderContext as IgnoredContextV11 } from './testing/fake_node_modules/ignored-context-v1.1.0';

describe('babel-preset-global-context', () => {
  describe('targeted packages', () => {
    const v1Foo = 'v1-foo';
    const v1Bar = 'v1-bar';
    const v2Bar = 'v2-bar';

    // eslint-disable-next-line @typescript-eslint/naming-convention
    function Consumer() {
      const ctx = React.useContext(ProviderContextV1);
      const ctxV11 = React.useContext(ProviderContextV11);
      const ctxV2 = React.useContext(ProviderContextV2);
      return (
        <>
          <div className={v1Foo}>{ctx.foo}</div>
          <div className={v1Bar}>{ctx.bar}</div>
          <div className={v1Foo}>{ctxV11.foo}</div>
          <div className={v1Bar}>{ctxV11.bar}</div>
          <div className={v2Bar}>{ctxV2.bar}</div>
        </>
      );
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function Example() {
      return (
        <ProviderContextV1.Provider value={{ foo: 'red', bar: 'blue' }}>
          <ProviderContextV2.Provider value={{ bar: 'white', baz: 'black' }}>
            <Consumer />
          </ProviderContextV2.Provider>
        </ProviderContextV1.Provider>
      );
    }

    it('Contexts in the same major should have the same values', () => {
      mount(<Example />);
      cy.get(`.${v1Foo}`).each($el => {
        expect($el.text()).equals('red');
      });
      cy.get(`.${v1Bar}`).each($el => {
        expect($el.text()).equals('blue');
      });
    });

    it('Contexts between different majors should have different values', () => {
      mount(<Example />);
      cy.get(`.${v1Bar}`).each($el => {
        expect($el.text()).equals('blue');
      });

      cy.get(`.${v2Bar}`).each($el => {
        expect($el.text()).equals('white');
      });
    });
  });

  // The contexts used in these tests should be ignored by babel preset
  // configured in cypress.config.ts
  describe('untargeted packages', () => {
    const v1Foo = 'v1-foo';
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function Consumer() {
      const ctx = React.useContext(IgnoredContextV1);
      const ctxV11 = React.useContext(IgnoredContextV11);
      return (
        <>
          <div className={v1Foo}>{ctx.foo}</div>
          <div className={v1Foo}>{ctxV11.foo}</div>
        </>
      );
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    function Example() {
      return (
        <IgnoredContextV1.Provider value={{ foo: 'red' }}>
          <Consumer />
        </IgnoredContextV1.Provider>
      );
    }
    it('Contexts should have different values', () => {
      mount(<Example />);
      cy.get(`.${v1Foo}`).first().should('have.text', 'red').get(`.${v1Foo}`).eq(1).should('have.text', 'foo');
    });
  });
});
