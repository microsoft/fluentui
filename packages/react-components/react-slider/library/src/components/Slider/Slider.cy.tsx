import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

import { Slider } from './Slider';

const input = '.fui-Slider__input';

const mountVerticalSlider = (dir: 'ltr' | 'rtl') => {
  mount(
    <FluentProvider theme={webLightTheme} dir={dir}>
      <div style={{ height: 200 }}>
        <Slider vertical defaultValue={50} />
      </div>
    </FluentProvider>,
  );
};

describe('Slider', () => {
  // The native input handles pointer and keyboard interaction, so these use real events.
  describe('vertical native interaction', () => {
    (['ltr', 'rtl'] as const).forEach(dir => {
      it(`sets the maximum at the top and the minimum at the bottom in ${dir}`, () => {
        mountVerticalSlider(dir);

        cy.get(input).realClick({ position: 'top' });
        cy.get(input).should('have.value', '100');
        cy.get(input).realClick({ position: 'bottom' });
        cy.get(input).should('have.value', '0');
      });

      it(`increases the value with ArrowUp and decreases it with ArrowDown in ${dir}`, () => {
        mountVerticalSlider(dir);

        cy.get(input).focus();
        cy.realPress('ArrowUp');
        cy.get(input).should('have.value', '51');
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.get(input).should('have.value', '49');
      });
    });
  });
});
