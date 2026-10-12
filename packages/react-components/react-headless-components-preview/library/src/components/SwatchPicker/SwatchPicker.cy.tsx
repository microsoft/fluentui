import * as React from 'react';
import { mount as mountBase } from '@fluentui/scripts-cypress';
import { polyfillBodyAndObserve } from '@microsoft/focusgroup-polyfill';
import type { JSXElement } from '@fluentui/react-utilities';

import { Provider } from '../Provider';
import { SwatchPicker } from './SwatchPicker';
import { ColorSwatch } from './ColorSwatch/ColorSwatch';
import { SwatchPickerRow } from './SwatchPickerRow/SwatchPickerRow';

polyfillBodyAndObserve();

const mount = (element: JSXElement) => mountBase(<Provider>{element}</Provider>);

describe('SwatchPicker', () => {
  it('returns focus to the last focused swatch when no swatch is selected', () => {
    mount(
      <>
        <button>Before</button>
        <SwatchPicker aria-label="Colors">
          <ColorSwatch color="#f00" value="red" aria-label="Red" />
          <ColorSwatch color="#0f0" value="green" aria-label="Green" />
          <ColorSwatch color="#00f" value="blue" aria-label="Blue" />
        </SwatchPicker>
        <button>After</button>
      </>,
    );

    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.get('[aria-label="Red"]').should('be.focused').realPress('ArrowRight');
    cy.get('[aria-label="Green"]').should('be.focused').realPress('Tab');
    cy.contains('button', 'After').should('be.focused').realPress(['Shift', 'Tab']);
    cy.get('[aria-label="Green"]').should('be.focused');
  });

  it('returns focus to the selected swatch after leaving and re-entering', () => {
    mount(
      <>
        <button>Before</button>
        <SwatchPicker aria-label="Colors" defaultSelectedValue="green">
          <ColorSwatch color="#f00" value="red" aria-label="Red" />
          <ColorSwatch color="#0f0" value="green" aria-label="Green" />
          <ColorSwatch color="#00f" value="blue" aria-label="Blue" />
        </SwatchPicker>
        <button>After</button>
      </>,
    );

    cy.contains('button', 'Before').focus().realPress('Tab');
    cy.get('[aria-label="Green"]').should('be.focused').realPress('ArrowRight');
    cy.get('[aria-label="Blue"]').should('be.focused').realPress('Tab');
    cy.contains('button', 'After').should('be.focused').realPress(['Shift', 'Tab']);
    cy.get('[aria-label="Green"]').should('be.focused');
  });

  // TODO: Enable this test once the focusgroup-polyfill is updated to support the new arrow key navigation behavior
  it.skip('moves focus through a grid with arrow keys and wraps', () => {
    mount(
      <SwatchPicker aria-label="Colors" layout="grid" focusMode="arrow">
        <SwatchPickerRow>
          <ColorSwatch color="#f00" value="red" aria-label="Red" />
          <ColorSwatch color="#fa0" value="orange" aria-label="Orange" disabled />
          <ColorSwatch color="#ff0" value="yellow" aria-label="Yellow" />
        </SwatchPickerRow>
        <SwatchPickerRow>
          <ColorSwatch color="#0f0" value="green" aria-label="Green" />
          <ColorSwatch color="#00f" value="blue" aria-label="Blue" />
          <ColorSwatch color="#70f" value="violet" aria-label="Violet" />
        </SwatchPickerRow>
      </SwatchPicker>,
    );

    cy.get('[role="grid"]').should('have.attr', 'focusgroup', 'grid manual rowflow');
    cy.get('[role="grid"]').should('not.have.attr', 'data-tabster');
    cy.get('[aria-label="Red"]').focus().realPress('ArrowRight');
    cy.get('[aria-label="Yellow"]').should('be.focused').realPress('ArrowDown');
    cy.get('[aria-label="Violet"]').should('be.focused').realPress('ArrowRight');
    cy.get('[aria-label="Red"]').should('be.focused');
  });
});
