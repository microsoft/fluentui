import * as React from 'react';
import { createPortal } from 'react-dom';
import { RendererProvider, createDOMRenderer } from '@griffel/react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Slider } from './Slider';
import {
  LEGACY_STYLE_ID as STYLE_ID,
  LEGACY_VERTICAL_SLIDER_RULE,
  LEGACY_VERTICAL_SLIDER_SELECTOR,
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
 * Whether the browser running the spec orients a range input with `writing-mode`, from its version rather than the
 * probe, so every reading below is checked against the engine. Chromium added it in 124: the Cypress 13 Electron used
 * for the React 17 run (Chromium 118) needs the fallback, and the Cypress 14 Electron used for React 18 and 19 does not.
 */
const NATIVE_VERTICAL_RANGE = Number(/Chrome\/(\d+)/.exec(navigator.userAgent)?.[1] ?? 0) >= 124;

/**
 * The probe result is cached per document, so each case measures in a fresh same-origin iframe document.
 */
function withFrame(css: string, assert: (frameDocument: Document) => void) {
  mount(<iframe title="probe" style={{ width: 400, height: 300 }} />);

  cy.get('iframe')
    .should($iframe => {
      expect(($iframe[0] as HTMLIFrameElement).contentDocument?.body, 'iframe document ready').to.exist;
    })
    .then($iframe => {
      const frameDocument = ($iframe[0] as HTMLIFrameElement).contentDocument!;
      const style = frameDocument.createElement('style');
      style.textContent = css;
      frameDocument.head.append(style);
      assert(frameDocument);
    });
}

/**
 * Makes the capability probe in `win` read like an engine without vertical range support by reporting it wider than
 * tall, so the hook has to install the fallback on any engine. Equal axes (no layout) stay equal, so a hidden document
 * still reads as undecided. Only the probe (a range input in a shadow root of its own, under a host that is not a
 * Slider) is affected, so Slider layout is unchanged.
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
function legacyRuleIn(root: Document | ShadowRoot): boolean {
  const adopted = root.adoptedStyleSheets.some(sheet =>
    Array.from(sheet.cssRules).some(rule => rule.cssText.includes('slider-vertical')),
  );
  return adopted || root.querySelector(`#${STYLE_ID}`) !== null;
}

/**
 * Mounts a same-origin iframe and portals `children` into its document. A portal keeps the spec on the `mount` root,
 * so it runs on every React version the package supports (`react-dom/client` only exists from React 18).
 * `beforeRender` runs once, after the frame document exists and before `children` mount.
 */
const FramePortal: React.FC<{
  hidden: boolean;
  beforeRender: (frame: HTMLIFrameElement) => void;
  children: (frameDocument: Document) => React.ReactNode;
}> = ({ hidden, beforeRender, children }) => {
  const [frameDocument, setFrameDocument] = React.useState<Document | null>(null);
  const prepared = React.useRef(false);
  const frameRef = React.useCallback(
    (frame: HTMLIFrameElement | null) => {
      if (frame?.contentDocument?.body && !prepared.current) {
        prepared.current = true;
        beforeRender(frame);
        setFrameDocument(frame.contentDocument);
      }
    },
    [beforeRender],
  );

  return (
    <>
      <iframe ref={frameRef} title="probe" style={{ width: 400, height: 300, display: hidden ? 'none' : 'block' }} />
      {frameDocument && createPortal(children(frameDocument), frameDocument.body)}
    </>
  );
};

describe('legacyVerticalSliderAppearance', () => {
  describe('probe isolation', () => {
    for (const css of ['', ...GLOBAL_STYLES]) {
      it(`reads the engine's vertical range support with ${css ? `\`${css}\`` : 'no application styles'}`, () => {
        withFrame(css, frameDocument => {
          expect(supportsVerticalRangeInput(frameDocument)).to.equal(NATIVE_VERTICAL_RANGE);

          const input = frameDocument.body.appendChild(frameDocument.createElement('input'));
          ensureLegacyVerticalSliderInput(input);
          expect(legacyRuleIn(frameDocument)).to.equal(!NATIVE_VERTICAL_RANGE);
        });
      });
    }

    it('installs the legacy appearance for a vertical Slider under global input and track styles only when the engine needs it', () => {
      mount(
        <FluentProvider theme={webLightTheme}>
          <style>{GLOBAL_STYLES.join('\n')}</style>
          <div style={{ height: 200 }}>
            <Slider vertical defaultValue={50} />
          </div>
        </FluentProvider>,
      );

      cy.get('.fui-Slider__input').should('have.attr', 'orient', 'vertical');
      cy.document().should(doc => {
        expect(legacyRuleIn(doc)).to.equal(!NATIVE_VERTICAL_RANGE);
      });
    });
  });

  describe('content security policy', () => {
    it("reads the engine's vertical range support under a nonce-only style-src that blocks style attributes", () => {
      const policy = "default-src 'self'; style-src 'nonce-fui-test'";
      mount(
        <iframe
          title="csp"
          style={{ width: 400, height: 300 }}
          srcDoc={`<!doctype html><html><head><meta http-equiv="Content-Security-Policy" content="${policy}"></head><body></body></html>`}
        />,
      );

      cy.get('iframe')
        .should($iframe => {
          const frameDocument = ($iframe[0] as HTMLIFrameElement).contentDocument;
          expect(frameDocument?.querySelector('meta[http-equiv]'), 'policy document loaded').to.exist;
        })
        .then($iframe => {
          const frameDocument = ($iframe[0] as HTMLIFrameElement).contentDocument!;

          // The policy is really enforced: a style attribute is dropped.
          const blocked = frameDocument.body.appendChild(frameDocument.createElement('div'));
          blocked.setAttribute('style', 'width: 123px');
          expect(blocked.style.width, 'style attributes are blocked').to.equal('');
          blocked.remove();

          expect(supportsVerticalRangeInput(frameDocument)).to.equal(NATIVE_VERTICAL_RANGE);
          ensureLegacyVerticalSliderInput(frameDocument.body.appendChild(frameDocument.createElement('div')));
          expect(legacyRuleIn(frameDocument)).to.equal(!NATIVE_VERTICAL_RANGE);
        });
    });
  });

  describe('styling root', () => {
    it('installs the Slider rule even when the shadow root already adopts an unrelated slider-vertical sheet', () => {
      withFrame('', frameDocument => {
        const view = frameDocument.defaultView!;
        const host = frameDocument.body.appendChild(frameDocument.createElement('div'));
        const shadowRoot = host.attachShadow({ mode: 'open' });
        const unrelated = new view.CSSStyleSheet();
        unrelated.replaceSync('.native-range { -webkit-appearance: slider-vertical; }');
        shadowRoot.adoptedStyleSheets = [unrelated];
        const input = frameDocument.createElement('input');
        input.type = 'range';
        input.className = 'fui-Slider__input';
        input.setAttribute('orient', 'vertical');
        shadowRoot.append(input);

        installLegacyVerticalSliderRule(input);
        installLegacyVerticalSliderRule(input);

        const sliderSheets = shadowRoot.adoptedStyleSheets.filter(sheet =>
          Array.from(sheet.cssRules).some(
            rule => (rule as CSSStyleRule).selectorText === LEGACY_VERTICAL_SLIDER_SELECTOR,
          ),
        );
        expect(sliderSheets, 'the Slider rule is added once').to.have.length(1);
        expect(shadowRoot.adoptedStyleSheets, 'the unrelated sheet is kept').to.include(unrelated);
        expect(view.getComputedStyle(input).getPropertyValue('-webkit-appearance')).to.equal('slider-vertical');
      });
    });
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
      mount(
        // The only way the rule can appear is the hook retrying after the reveal.
        <FramePortal hidden beforeRender={frame => simulateLegacyEngine(frame.contentWindow!)}>
          {frameDocument => (
            <RendererProvider renderer={createDOMRenderer(frameDocument)} targetDocument={frameDocument}>
              <FluentProvider theme={webLightTheme} targetDocument={frameDocument}>
                <div style={{ height: 200 }}>
                  <Slider vertical defaultValue={50} />
                </div>
              </FluentProvider>
            </RendererProvider>
          )}
        </FramePortal>,
      );

      cy.get('iframe').then($iframe => {
        const frame = $iframe[0] as HTMLIFrameElement;
        const frameDocument = frame.contentDocument!;

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
      });
    });
  });
});
