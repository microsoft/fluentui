import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { AlphaSlider } from './AlphaSlider';
import type { AlphaSliderProps } from './AlphaSlider.types';
import { calculateTransparencyValue } from './alphaSliderUtils';
import { INITIAL_COLOR_HSV } from '../../utils/constants';
import type { JSXElement } from '@fluentui/react-utilities';
import { alphaSliderCSSVars } from './AlphaSlider.constants';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

const AlphaSliderExample = (props: AlphaSliderProps) => {
  const { transparency = false } = props;
  const [color, setColor] = React.useState(props.color ?? INITIAL_COLOR_HSV);
  return (
    <AlphaSlider
      color={color}
      onChange={(_, data) => setColor(data.color)}
      id="alpha-slider"
      aria-label="Alpha"
      aria-valuetext={`${calculateTransparencyValue(transparency, color.a ?? 1)}%`}
      transparency={transparency}
    />
  );
};

describe('AlphaSlider', () => {
  describe('native endpoints, thumb and ramp alignment', () => {
    for (const dir of ['ltr', 'rtl'] as const) {
      for (const vertical of [false, true]) {
        for (const transparency of [false, true]) {
          it(`${dir}, ${vertical ? 'vertical' : 'horizontal'}, ${transparency ? 'transparency' : 'opacity'}`, () => {
            const onChange = cy.stub();
            mount(
              <FluentProvider dir={dir} theme={webLightTheme}>
                <AlphaSlider
                  defaultColor={{ h: 240, s: 0.4, v: 0.8, a: 0.6 }}
                  onChange={onChange}
                  transparency={transparency}
                  vertical={vertical}
                />
              </FluentProvider>,
            );
            cy.get('.fui-AlphaSlider__input').focus();
            for (const [key, value] of [
              ['Home', 0],
              ['End', 100],
              ['Home', 0],
            ] as const) {
              cy.realPress(key);
              cy.get('.fui-AlphaSlider__input').should('have.value', String(value));
              cy.get('.fui-AlphaSlider').should($root => {
                const root = $root[0];
                const alpha = (transparency ? 100 - value : value) / 100;
                expect(onChange.lastCall.args[1].color).to.deep.equal({ h: 240, s: 0.4, v: 0.8, a: alpha });
                expect(root.style.getPropertyValue(alphaSliderCSSVars.sliderProgressVar)).to.equal(`${value}%`);
                const rail = root.querySelector<HTMLElement>('.fui-AlphaSlider__rail')!;
                const thumb = root.querySelector<HTMLElement>('.fui-AlphaSlider__thumb')!;
                const railRect = rail.getBoundingClientRect();
                const thumbRect = thumb.getBoundingClientRect();
                const view = root.ownerDocument.defaultView!;
                const direction = vertical
                  ? transparency
                    ? '180deg'
                    : '0deg'
                  : dir === 'ltr'
                  ? transparency
                    ? '-90deg'
                    : '90deg'
                  : transparency
                  ? '90deg'
                  : '-90deg';
                const gradientStart = direction === '180deg' ? 'linear-gradient(rgba' : `linear-gradient(${direction}`;
                expect(view.getComputedStyle(rail).backgroundImage).to.contain(gradientStart);
                const position = vertical ? thumbRect.top + thumbRect.height / 2 : thumbRect.left + thumbRect.width / 2;
                const expectedPosition = vertical
                  ? value === 0
                    ? railRect.bottom
                    : railRect.top
                  : (value === 0) === (dir === 'ltr')
                  ? railRect.left
                  : railRect.right;
                expect(position).to.be.closeTo(expectedPosition, 2);
              });
            }
          });
        }
      }
    }
  });

  describe('keyboard navigation', () => {
    it('has correct focus behavior', () => {
      mountFluent(
        <>
          <p tabIndex={0} id="before">
            Before
          </p>
          <AlphaSliderExample color={{ h: 106, s: 0.96, v: 0.1 }} />
          <p tabIndex={0} id="after">
            After
          </p>
        </>,
      );
      cy.get('#before').focus();
      cy.realPress('Tab');
      cy.get('#alpha-slider').should('have.focus');
      cy.realPress('Tab');
      cy.get('#alpha-slider').should('not.have.focus');
      cy.get('#after').should('have.focus');
    });

    describe('alpha channel', () => {
      it('selected correctly', () => {
        mountFluent(<AlphaSliderExample color={{ h: 106, s: 0.96, v: 0.1, a: 0.5 }} />);
        cy.get('.fui-AlphaSlider__input').focus();

        // decrements the value two times
        cy.realPress('ArrowLeft');
        cy.realPress('ArrowLeft');
        assertSliderValue('48');

        // increments the value
        cy.realPress('ArrowRight');
        assertSliderValue('49');

        // increments the value with arrowUp
        cy.realPress('ArrowUp');
        assertSliderValue('50');

        // decrements the value with arrowDown
        cy.realPress('ArrowDown');
        assertSliderValue('49');
      });

      it('selected on left edge correctly', () => {
        mountFluent(<AlphaSliderExample color={{ h: 111, s: 1, v: 0.03, a: 0.02 }} />);
        cy.get('.fui-AlphaSlider__input').focus();

        // decrements the value two times
        cy.realPress('ArrowLeft');
        cy.realPress('ArrowLeft');
        assertSliderValue('0');

        // decrements the value on left edge
        cy.realPress('ArrowLeft');
        assertSliderValue('0');

        // increments the value
        cy.realPress('ArrowRight');
        assertSliderValue('1');
      });

      it('selected on right edge correctly', () => {
        mountFluent(<AlphaSliderExample color={{ h: 111, s: 0.03, v: 0.45, a: 0.98 }} />);
        cy.get('.fui-AlphaSlider__input').focus();

        // increments the value
        cy.realPress('ArrowRight');
        assertSliderValue('99');

        // increments the value
        cy.realPress('ArrowRight');
        assertSliderValue('100');

        // increments the value on right edge
        cy.realPress('ArrowRight');
        assertSliderValue('100');

        // decrements the value
        cy.realPress('ArrowLeft');
        assertSliderValue('99');
      });
    });
  });

  describe('transparency', () => {
    it('selected correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 106, s: 0.96, v: 0.1, a: 0.7 }} transparency />);
      cy.get('.fui-AlphaSlider__input').focus();

      // decrements the value two times
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      assertSliderValue('28');

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('29');

      // increments the value with arrowUp
      cy.realPress('ArrowUp');
      assertSliderValue('30');

      // decrements the value with arrowDown
      cy.realPress('ArrowDown');
      assertSliderValue('29');
    });

    it('selected on left edge correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 111, s: 1, v: 0.03, a: 0.98 }} transparency />);
      cy.get('.fui-AlphaSlider__input').focus();

      // decrements the value two times
      cy.realPress('ArrowLeft');
      cy.realPress('ArrowLeft');
      assertSliderValue('0');

      // decrements the value on left edge
      cy.realPress('ArrowLeft');
      assertSliderValue('0');

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('1');
    });

    it('selected on right edge correctly', () => {
      mountFluent(<AlphaSliderExample color={{ h: 111, s: 0.03, v: 0.45, a: 0.02 }} transparency />);
      cy.get('.fui-AlphaSlider__input').focus();

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('99');

      // increments the value
      cy.realPress('ArrowRight');
      assertSliderValue('100');

      // increments the value on right edge
      cy.realPress('ArrowRight');
      assertSliderValue('100');

      // decrements the value
      cy.realPress('ArrowLeft');
      assertSliderValue('99');
    });
  });

  describe('mouse navigation', () => {
    it('has correct a11y attributes', () => {
      mountFluent(<AlphaSliderExample color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get('#alpha-slider').should('have.attr', 'aria-label', 'Alpha');
      assertSliderValue('100');
      cy.get('#alpha-slider').realClick();
      assertSliderValue('50');
    });
  });
});

function assertSliderValue(value: string) {
  cy.get('#alpha-slider').should('have.attr', 'aria-valuetext', `${value}%`);
  cy.get('#alpha-slider').should('have.attr', 'value', value);
}
