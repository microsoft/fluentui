import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Slider } from './Slider';

const input = '.fui-Slider__input';

describe('Slider', () => {
  for (const dir of ['ltr', 'rtl'] as const) {
    describe(`vertical native interaction in ${dir}`, () => {
      beforeEach(() => {
        mount(
          <FluentProvider theme={webLightTheme} dir={dir}>
            <Slider vertical defaultValue={50} aria-label="Vertical slider" />
          </FluentProvider>,
        );
      });

      it('sets the maximum at the top and the minimum at the bottom', () => {
        cy.get(input).realClick({ position: 'top' });
        cy.get(input).should('have.value', '100');
        cy.get(input).realClick({ position: 'bottom' });
        cy.get(input).should('have.value', '0');
      });

      it('increases with ArrowUp and decreases with ArrowDown', () => {
        cy.get(input).focus();
        cy.realPress('ArrowUp');
        cy.get(input).should('have.value', '51');
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.get(input).should('have.value', '49');
      });

      it('preserves the native direction when standard vertical controls are supported', function () {
        cy.window().then(win => {
          if (!win.CSS.supports('writing-mode', 'sideways-lr')) {
            this.skip();
          }
          cy.get(input).should('have.css', 'writing-mode', 'vertical-lr').and('have.css', 'direction', 'rtl');
        });
      });
    });

    it(`preserves horizontal pointer direction in ${dir}`, () => {
      mount(
        <FluentProvider theme={webLightTheme} dir={dir}>
          <Slider defaultValue={50} aria-label="Horizontal slider" />
        </FluentProvider>,
      );
      cy.get(input).realClick({ position: dir === 'ltr' ? 'right' : 'left' });
      cy.get(input).should('have.value', '100');
      cy.get(input).realClick({ position: dir === 'ltr' ? 'left' : 'right' });
      cy.get(input).should('have.value', '0');
    });
  }
});
