import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import type { JSXElement } from '@fluentui/react-utilities';

import { RangeSlider } from './RangeSlider';
import type { RangeSliderProps } from './RangeSlider.types';

const mountFluent = (element: JSXElement, dir: 'ltr' | 'rtl' = 'ltr') => {
  mount(
    <FluentProvider theme={webLightTheme} dir={dir}>
      {element}
    </FluentProvider>,
  );
};

const startInput = 'input[aria-label="Start"]';

const TestRangeSlider = (props: Partial<RangeSliderProps>) => (
  <RangeSlider startInput={{ 'aria-label': 'Start' }} endInput={{ 'aria-label': 'End' }} {...props} />
);

describe('RangeSlider', () => {
  describe('vertical keyboard direction', () => {
    (['ltr', 'rtl'] as const).forEach(dir => {
      it(`increases the value with ArrowUp and decreases it with ArrowDown in ${dir}`, () => {
        mountFluent(<TestRangeSlider vertical step={5} defaultValue={{ start: 15, end: 40 }} />, dir);

        cy.get(startInput).focus();
        cy.realPress('ArrowUp');
        cy.get(startInput).should('have.value', '20');
        cy.realPress('ArrowDown');
        cy.realPress('ArrowDown');
        cy.get(startInput).should('have.value', '10');
      });
    });
  });

  describe('disabled thumb', () => {
    it('does not move a slot-disabled thumb', () => {
      mountFluent(
        <TestRangeSlider
          step={5}
          defaultValue={{ start: 10, end: 90 }}
          startInput={{ 'aria-label': 'Start', disabled: true }}
        />,
      );

      cy.get(startInput).focus();
      cy.realPress('ArrowRight');
      cy.get(startInput).should('have.value', '10');
    });
  });
});
