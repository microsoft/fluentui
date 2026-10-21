import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RendererProvider, createDOMRenderer } from '@griffel/react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Slider } from './Slider';
import {
  LEGACY_STYLE_ID as STYLE_ID,
  LEGACY_VERTICAL_SLIDER_RULE,
  ensureLegacyVerticalSliderInput,
  installLegacyVerticalSliderRule,
  supportsVerticalRangeInput,
} from './legacyVerticalSliderAppearance';

// Application styles that resize or restyle every input or its range parts; none may change the capability reading.
const GLOBAL_STYLES = [
  'input { width: 100%; }',
  'input { width: 100% !important; height: 1px !important; }',
  'input { min-width: 400px; max-height: 10px; aspect-ratio: 10 / 1; }',
  '* { box-sizing: border-box; } input { padding: 20px; border: 5px solid; zoom: 2; }',
  'input { writing-mode: horizontal-tb !important; transform: rotate(90deg); }',
  'body { transform: rotate(90deg) scale(0.5, 3); }',
  'input::-webkit-slider-runnable-track { width: 200px; height: 8px; }',
  'input::-webkit-slider-thumb { -webkit-appearance: none; width: 300px; height: 300px; }',
  'input::-moz-range-track { width: 300px; height: 4px; }',
];

/**
 * The probe result is cached per document, so each case measures in a fresh same-origin iframe document.
 */
function withFrame(css: string, assert: (frameDocument: Document, frame: HTMLIFrameElement) => void, hidden = false) {
  mount(<iframe title="probe" style={{ width: 400, height: 300, display: hidden ? 'none' : 'block' }} />);

  cy.get('iframe')
    .should($iframe => {
      expect(($iframe[0] as HTMLIFrameElement).contentDocument?.body, 'iframe document ready').to.exist;
    })
    .then($iframe => {
      const frame = $iframe[0] as HTMLIFrameElement;
      const frameDocument = frame.contentDocument!;
      const style = frameDocument.createElement('style');
      style.textContent = css;
      frameDocument.head.append(style);
      assert(frameDocument, frame);
    });
}

/**
 * Makes the capability probe in `win` read like an engine without vertical range support by swapping the axes the
 * probe reports, so the hook has to install the fallback. Only the probe (a range input in a shadow root of its own,
 * under a host that is not a Slider) is affected, so Slider layout is unchanged.
 */
function simulateLegacyEngine(win: Window) {
  const proto = (win as Window & typeof globalThis).HTMLElement.prototype;
  const width = Object.getOwnPropertyDescriptor(proto, 'offsetWidth')!;
  const height = Object.getOwnPropertyDescriptor(proto, 'offsetHeight')!;
  const isProbe = (el: HTMLElement) => {
    const root = el.getRootNode();
    return el.tagName === 'INPUT' && !el.classList.contains('fui-Slider__input') && root !== el.ownerDocument;
  };
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
function legacyRuleIn(root: Document | ShadowRoot): boolean {
  const adopted = root.adoptedStyleSheets.some(sheet =>
    Array.from(sheet.cssRules).some(rule => rule.cssText.includes('slider-vertical')),
  );
  return adopted || root.querySelector(`#${STYLE_ID}`) !== null;
}

describe('legacyVerticalSliderAppearance', () => {
  describe('probe isolation', () => {
    for (const css of ['', ...GLOBAL_STYLES]) {
      it(`measures native vertical range support with ${css ? `\`${css}\`` : 'no application styles'}`, () => {
        withFrame(css, frameDocument => {
          expect(supportsVerticalRangeInput(frameDocument)).to.equal(true);

          const input = frameDocument.body.appendChild(frameDocument.createElement('input'));
          ensureLegacyVerticalSliderInput(input);
          expect(legacyRuleIn(frameDocument)).to.equal(false);
        });
      });
    }

    it('does not install the legacy appearance for a vertical Slider under global input and track styles', () => {
      mount(
        <FluentProvider theme={webLightTheme}>
          <style>{GLOBAL_STYLES.join('\n')}</style>
          <div style={{ height: 200 }}>
            <Slider vertical defaultValue={50} />
          </div>
        </FluentProvider>,
      );

      cy.get('.fui-Slider__input').should('have.attr', 'orient', 'vertical');
      cy.document().then(doc => {
        expect(legacyRuleIn(doc)).to.equal(false);
      });
    });
  });

  describe('styling root', () => {
    it('adds the rule to the shadow root a Slider renders in, so a shadow-root Slider matches it', () => {
      withFrame('', frameDocument => {
        const host = frameDocument.body.appendChild(frameDocument.createElement('div'));
        const shadowRoot = host.attachShadow({ mode: 'open' });
        const input = frameDocument.createElement('input');
        input.type = 'range';
        input.className = 'fui-Slider__input';
        input.setAttribute('orient', 'vertical');
        shadowRoot.append(input);

        installLegacyVerticalSliderRule(input);
        installLegacyVerticalSliderRule(input);

        expect(legacyRuleIn(frameDocument)).to.equal(false);
        const sheets = shadowRoot.adoptedStyleSheets.filter(sheet =>
          Array.from(sheet.cssRules).some(rule => rule.cssText.includes('slider-vertical')),
        );
        expect(sheets).to.have.length(1);
        expect(input.matches(LEGACY_VERTICAL_SLIDER_RULE.slice(0, LEGACY_VERTICAL_SLIDER_RULE.indexOf('{')))).to.equal(
          true,
        );
      });
    });
  });

  describe('hidden mount', () => {
    it('installs the fallback once a Slider mounted in a display: none iframe is revealed, without prop changes', () => {
      withFrame(
        '',
        (frameDocument, frame) => {
          // The only way the rule can appear is the hook retrying after the reveal.
          simulateLegacyEngine(frame.contentWindow!);

          const container = frameDocument.body.appendChild(frameDocument.createElement('div'));
          createRoot(container).render(
            <RendererProvider renderer={createDOMRenderer(frameDocument)} targetDocument={frameDocument}>
              <FluentProvider theme={webLightTheme} targetDocument={frameDocument}>
                <div style={{ height: 200 }}>
                  <Slider vertical defaultValue={50} />
                </div>
              </FluentProvider>
            </RendererProvider>,
          );

          cy.wrap(frameDocument)
            .should(() => {
              expect(frameDocument.querySelector('.fui-Slider__input')).to.not.equal(null);
            })
            .then(() => {
              // Hidden: no layout, so nothing is installed on a guess.
              expect(legacyRuleIn(frameDocument)).to.equal(false);
              frame.style.display = 'block';
            });

          // Revealed: the input is laid out, the hook's observer retries, and the fallback is installed once.
          cy.wrap(frameDocument).should(() => {
            expect(frameDocument.querySelectorAll(`#${STYLE_ID}`)).to.have.length(1);
          });
        },
        true,
      );
    });
  });
});
