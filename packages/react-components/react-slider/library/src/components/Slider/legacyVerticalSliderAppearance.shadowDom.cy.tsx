import * as React from 'react';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { RendererProvider } from '@griffel/react';
import { createRoot } from 'react-dom/client';
import { Slider } from './Slider';
import { LEGACY_STYLE_ID } from './legacyVerticalSliderAppearance';

/**
 * Cypress runs each spec file in its own document, and the capability probe caches its result per document, so this
 * case lives in its own spec to probe a document that an earlier case has not already measured.
 *
 * It swaps the axes the probe reports (a range input in a shadow root of its own, never a Slider input) so the browser
 * reads like an engine without vertical range support, and the hook has to install the fallback.
 */
function simulateLegacyEngine(win: Window) {
  const proto = (win as Window & typeof globalThis).HTMLElement.prototype;
  const width = Object.getOwnPropertyDescriptor(proto, 'offsetWidth')!;
  const height = Object.getOwnPropertyDescriptor(proto, 'offsetHeight')!;
  const isProbe = (el: HTMLElement) =>
    el.tagName === 'INPUT' && !el.classList.contains('fui-Slider__input') && el.getRootNode() !== el.ownerDocument;
  Object.defineProperty(proto, 'offsetWidth', {
    configurable: true,
    get(this: HTMLElement) {
      return (isProbe(this) ? height : width).get!.call(this);
    },
  });
  Object.defineProperty(proto, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement) {
      return (isProbe(this) ? width : height).get!.call(this);
    },
  });
}

describe('legacyVerticalSliderAppearance with createShadowDOMRenderer', () => {
  it('puts the fallback into the shadow root the Slider renders in, once, and nowhere in the document', () => {
    mount(<div id="shadow-host" />);

    cy.get('#shadow-host').then($host => {
      const win = $host[0].ownerDocument.defaultView!;
      simulateLegacyEngine(win);
      const shadowRoot = $host[0].attachShadow({ mode: 'open' });
      const container = shadowRoot.appendChild(win.document.createElement('div'));
      createRoot(container).render(
        <RendererProvider renderer={createShadowDOMRenderer(shadowRoot)} targetDocument={win.document}>
          <FluentProvider theme={webLightTheme} targetDocument={win.document}>
            <div style={{ height: 200 }}>
              <Slider vertical defaultValue={50} />
              <Slider vertical defaultValue={25} />
            </div>
          </FluentProvider>
        </RendererProvider>,
      );

      cy.wrap(shadowRoot).should(() => {
        const inputs = shadowRoot.querySelectorAll('.fui-Slider__input');
        expect(inputs).to.have.length(2);
        const legacySheets = shadowRoot.adoptedStyleSheets.filter(sheet =>
          Array.from(sheet.cssRules).some(rule => rule.cssText.includes('slider-vertical')),
        );
        expect(legacySheets, 'one legacy sheet for the shadow root').to.have.length(1);
        expect(win.document.getElementById(LEGACY_STYLE_ID), 'nothing in the document').to.equal(null);
        expect(win.getComputedStyle(inputs[0]).getPropertyValue('-webkit-appearance')).to.equal('slider-vertical');
      });
    });
  });
});
