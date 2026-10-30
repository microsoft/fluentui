import * as React from 'react';
import { createPortal } from 'react-dom';
import { createShadowDOMRenderer } from '@griffel/shadow-dom';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { RendererProvider } from '@griffel/react';
import { Slider } from './Slider';
import { LEGACY_STYLE_ID } from './legacyVerticalSliderAppearance';

/**
 * Cypress runs each spec file in its own document, and the capability probe caches its result per document, so this
 * case lives in its own spec to probe a document that an earlier case has not already measured.
 *
 * It forces the probe (a range input in a shadow root of its own, never a Slider input) to report itself wider than
 * tall, so on any engine the browser reads like one without vertical range support and the hook has to install the
 * fallback.
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
      const value = width.get!.call(this);
      return isProbe(this) ? Math.max(value, height.get!.call(this)) : value;
    },
  });
  Object.defineProperty(proto, 'offsetHeight', {
    configurable: true,
    get(this: HTMLElement) {
      const value = height.get!.call(this);
      return isProbe(this) ? Math.min(value, width.get!.call(this)) : value;
    },
  });
}

/**
 * Attaches an open shadow root to its host and portals two vertical Sliders into it. A portal keeps the spec on the
 * `mount` root, so it runs on every React version the package supports (`react-dom/client` only exists from React 18).
 * The legacy engine is simulated once, before the Sliders mount.
 */
const ShadowSliders: React.FC = () => {
  const [shadowRoot, setShadowRoot] = React.useState<ShadowRoot | null>(null);
  const hostRef = React.useCallback((host: HTMLDivElement | null) => {
    if (host && !host.shadowRoot) {
      simulateLegacyEngine(host.ownerDocument.defaultView!);
      setShadowRoot(host.attachShadow({ mode: 'open' }));
    }
  }, []);

  return (
    <div id="shadow-host" ref={hostRef}>
      {shadowRoot &&
        createPortal(
          <RendererProvider renderer={createShadowDOMRenderer(shadowRoot)} targetDocument={shadowRoot.ownerDocument}>
            <FluentProvider theme={webLightTheme} targetDocument={shadowRoot.ownerDocument}>
              <div style={{ height: 200 }}>
                <Slider vertical defaultValue={50} />
                <Slider vertical defaultValue={25} />
              </div>
            </FluentProvider>
          </RendererProvider>,
          shadowRoot,
        )}
    </div>
  );
};

describe('legacyVerticalSliderAppearance with createShadowDOMRenderer', () => {
  it('puts the fallback into the shadow root the Slider renders in, once, and nowhere in the document', () => {
    mount(<ShadowSliders />);

    cy.get('#shadow-host').then($host => {
      const win = $host[0].ownerDocument.defaultView!;
      const shadowRoot = $host[0].shadowRoot!;

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
