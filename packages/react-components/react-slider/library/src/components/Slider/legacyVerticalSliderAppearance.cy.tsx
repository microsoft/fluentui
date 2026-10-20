import * as React from 'react';
import { mount } from '@fluentui/scripts-cypress';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { Slider } from './Slider';
import { ensureLegacyVerticalSliderInput, supportsVerticalRangeInput } from './legacyVerticalSliderAppearance';

const STYLE_ID = 'fui-Slider-legacy-vertical-appearance';

// Application styles that resize or restyle every input; none of them may change the capability reading.
const GLOBAL_STYLES = [
  'input { width: 100%; }',
  'input { width: 100% !important; height: 1px !important; }',
  'input { min-width: 400px; max-height: 10px; aspect-ratio: 10 / 1; }',
  '* { box-sizing: border-box; } input { padding: 20px; border: 5px solid; zoom: 2; }',
  'input { writing-mode: horizontal-tb !important; transform: rotate(90deg); }',
  'body { transform: rotate(90deg) scale(0.5, 3); }',
];

/**
 * The probe result is cached per document, so each case measures in a fresh same-origin iframe document that carries
 * the global styles, in the real browser layout engine.
 */
function withStyledFrame(css: string, assert: (frameDocument: Document) => void) {
  mount(<iframe title="probe" style={{ width: 400, height: 300 }} />);

  cy.get('iframe').then($iframe => {
    const frameDocument = ($iframe[0] as HTMLIFrameElement).contentDocument!;
    const style = frameDocument.createElement('style');
    style.textContent = css;
    frameDocument.head.append(style);
    assert(frameDocument);
  });
}

describe('legacyVerticalSliderAppearance', () => {
  for (const css of ['', ...GLOBAL_STYLES]) {
    it(`measures native vertical range support with ${css ? `\`${css}\`` : 'no application styles'}`, () => {
      withStyledFrame(css, frameDocument => {
        expect(supportsVerticalRangeInput(frameDocument)).to.equal(true);

        ensureLegacyVerticalSliderInput(frameDocument);
        expect(frameDocument.getElementById(STYLE_ID)).to.equal(null);
      });
    });
  }

  it('does not install the legacy appearance for a vertical Slider under global input sizing', () => {
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
      expect(doc.getElementById(STYLE_ID)).to.equal(null);
    });
  });
});
