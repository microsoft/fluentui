import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { ColorArea } from './ColorArea';
import type { ColorAreaProps } from './ColorArea.types';
import { tinycolor } from '@ctrl/tinycolor';
import type { JSXElement } from '@fluentui/react-utilities';

const mountFluent = (element: JSXElement) => {
  mount(<FluentProvider theme={webLightTheme}>{element}</FluentProvider>);
};

/*
 * ── Selecting ColorArea's X input after the D16 statics removal ──────────────────────────
 *
 * This file used to reach the horizontal range input with `.fui-ColorArea__inputX`. That
 * static no longer exists: `colorAreaClassNames` holds ONE key now — `root`, valued at
 * ColorArea's group marker — and the per-slot `thumb` / `inputX` / `inputY` keys were removed
 * with every other BEM static (DECISIONS.md D16.1 / D16.5). The class the slot actually
 * carries is a hashed CSS module token, unaddressable from here.
 *
 * Unlike the two sliders, ColorArea has no primary slot and both hidden inputs are `<input
 * type="range">` (so `[role="slider"]` matches two elements), so the fixture stamps a probe
 * class through the slot's `className` prop — the same way TimePicker.cy.tsx and Card.cy.tsx
 * do. That is not a workaround: per-slot `className` IS the supported handle on a slot under
 * the new contract, so this targets the internal the way a consumer must. (A `data-testid`
 * would read more conventionally but is not assignable — Fluent's slot-props types have no
 * index signature.)
 *
 * Passing `inputX` is behaviour-neutral: `useColorArea_unstable` builds it with
 * `slot.always(inputX, { defaultProps: { id, type: 'range', … } })`, so supplying only a
 * `className` changes neither the element nor any of its props.
 */
const INPUT_X_PROBE = 'color-area-input-x-probe';

const ColorAreaNavigation = (props: ColorAreaProps) => {
  const [color, setColor] = React.useState(props.color);
  return (
    <>
      <div id="color">{tinycolor(color).toHexString()}</div>
      <ColorArea
        color={color}
        onChange={(_, data) => setColor(data.color)}
        id="color-area"
        inputX={{ className: INPUT_X_PROBE }}
      />
    </>
  );
};

describe('ColorArea', () => {
  describe('keyboard navigation', () => {
    it('color should be changed correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get(`.${INPUT_X_PROBE}`).focus();
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#7d3e64');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#7a3d62');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#783c60');
      cy.realPress('ArrowRight');
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#783a5f');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#75385d');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#75395d');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#753b5e');
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#783c60');
    });
    it('color selected on right edge correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 106, s: 0.96, v: 0.1 }} />);
      cy.get(`.${INPUT_X_PROBE}`).focus();
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#071a01');
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#061a01');
      cy.realPress('ArrowRight');
      cy.get('#color').should('have.text', '#061a00');
    });
    it('color selected on bottom edge correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 111, s: 1, v: 0.03 }} />);
      cy.get(`.${INPUT_X_PROBE}`).focus();
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#010500');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#000300');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#000000');
    });
    it('color selected on left edge correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 111, s: 0.03, v: 0.45 }} />);
      cy.get(`.${INPUT_X_PROBE}`).focus();
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#717370');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#727372');
      cy.realPress('ArrowLeft');
      cy.get('#color').should('have.text', '#737373');
    });
    it('color selected on top edge correctly', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 106, s: 1, v: 0.97 }} />);
      cy.get(`.${INPUT_X_PROBE}`).focus();
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#3afa00');
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#3bfc00');
      cy.realPress('ArrowUp');
      cy.get('#color').should('have.text', '#3cff00');
    });
    it('hue stays the same after achiving bottom edge', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 111, s: 1, v: 0.03 }} />);
      cy.get(`.${INPUT_X_PROBE}`).focus();
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.realPress('ArrowDown');
      cy.get('#color').should('have.text', '#000000');
      cy.get('#color-area').realClick();
      cy.get('#color').should('have.text', '#498040');
    });
  });

  describe('mouse navigation', () => {
    it('should select color onClick', () => {
      mountFluent(<ColorAreaNavigation color={{ h: 324, s: 0.5, v: 0.5 }} />);
      cy.get('#color-area').realClick();
      cy.get('#color').should('have.text', '#804066');
    });
  });
});
