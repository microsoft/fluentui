import {
  LEGACY_VERTICAL_SLIDER_RULE,
  ensureLegacyVerticalSliderInput,
  supportsVerticalRangeInput,
} from './legacyVerticalSliderAppearance';

const STYLE_ID = 'fui-Slider-legacy-vertical-appearance';

function mockProbeRect(size: { height: number; width: number }): jest.SpyInstance {
  jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(size.width);
  return jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(size.height);
}

function createDocument(): Document {
  return document.implementation.createHTMLDocument('probe');
}

describe('legacyVerticalSliderAppearance', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does nothing without a document, so server rendering is unaffected', () => {
    expect(() => {
      ensureLegacyVerticalSliderInput(undefined);
    }).not.toThrow();
  });

  it('reads vertical range support from the probe layout', () => {
    mockProbeRect({ height: 129, width: 16 });
    expect(supportsVerticalRangeInput(createDocument())).toBe(true);

    mockProbeRect({ height: 16, width: 129 });
    expect(supportsVerticalRangeInput(createDocument())).toBe(false);
  });

  it('treats a document without layout as inconclusive and installs nothing', () => {
    const targetDocument = createDocument();
    mockProbeRect({ height: 0, width: 0 });

    expect(supportsVerticalRangeInput(targetDocument)).toBeUndefined();
    ensureLegacyVerticalSliderInput(targetDocument);

    expect(targetDocument.getElementById(STYLE_ID)).toBeNull();
  });

  it('retries a document whose first probe was inconclusive', () => {
    const targetDocument = createDocument();
    mockProbeRect({ height: 0, width: 0 });
    ensureLegacyVerticalSliderInput(targetDocument);

    mockProbeRect({ height: 16, width: 129 });
    ensureLegacyVerticalSliderInput(targetDocument);

    expect(targetDocument.getElementById(STYLE_ID)).not.toBeNull();
  });

  it('does not add the legacy value when the engine orients range inputs', () => {
    const targetDocument = createDocument();
    mockProbeRect({ height: 129, width: 16 });

    ensureLegacyVerticalSliderInput(targetDocument);

    expect(targetDocument.getElementById(STYLE_ID)).toBeNull();
  });

  it('adds the legacy value once per document when the engine cannot orient range inputs', () => {
    const targetDocument = createDocument();
    const spy = mockProbeRect({ height: 16, width: 129 });

    ensureLegacyVerticalSliderInput(targetDocument);
    ensureLegacyVerticalSliderInput(targetDocument);

    const styles = targetDocument.querySelectorAll(`#${STYLE_ID}`);
    expect(styles).toHaveLength(1);
    expect(styles[0].textContent).toBe(LEGACY_VERTICAL_SLIDER_RULE);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('only targets vertical inputs, because the legacy value also turns a horizontal input vertical', () => {
    const targetDocument = createDocument();
    mockProbeRect({ height: 16, width: 129 });
    ensureLegacyVerticalSliderInput(targetDocument);

    const vertical = targetDocument.createElement('input');
    vertical.className = 'fui-Slider__input';
    vertical.setAttribute('orient', 'vertical');
    const horizontal = targetDocument.createElement('input');
    horizontal.className = 'fui-Slider__input';
    targetDocument.body.append(vertical, horizontal);

    const selector = LEGACY_VERTICAL_SLIDER_RULE.slice(0, LEGACY_VERTICAL_SLIDER_RULE.indexOf('{'));
    expect(vertical.matches(selector)).toBe(true);
    expect(horizontal.matches(selector)).toBe(false);
  });

  it('applies the style element attributes, so a CSP nonce reaches the injected style', () => {
    const targetDocument = createDocument();
    mockProbeRect({ height: 16, width: 129 });

    ensureLegacyVerticalSliderInput(targetDocument, { nonce: 'abc123', 'data-test': 'x' });

    const style = targetDocument.getElementById(STYLE_ID);
    expect(style?.getAttribute('nonce')).toBe('abc123');
    expect(style?.getAttribute('data-test')).toBe('x');
  });

  it('isolates the probe from application styles so global input sizing cannot skew the measurement', () => {
    const targetDocument = createDocument();
    const appended = jest.spyOn(targetDocument.body, 'append');
    mockProbeRect({ height: 129, width: 16 });

    supportsVerticalRangeInput(targetDocument);

    const probe = appended.mock.calls[0][0] as HTMLInputElement;
    expect(probe.style.getPropertyValue('all')).toBe('initial');
    expect(probe.style.getPropertyPriority('all')).toBe('important');
    expect(probe.style.getPropertyPriority('writing-mode')).toBe('important');
    expect(targetDocument.body.contains(probe)).toBe(false);
  });
});
