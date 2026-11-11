import * as React from 'react';
import { render } from '@testing-library/react';
import { DrawerBody } from './DrawerBody';
import { DrawerProvider, useDrawerContextValue } from '../../contexts';
import { isConformant } from '../../testing/isConformant';

type ScrollMetrics = {
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
};

/**
 * jsdom reports 0 for every layout measurement, so the values `getScrollState` reads are stubbed
 * on the prototype. Fractional values reproduce what browsers report when zoom is not a whole
 * number: `scrollTop` keeps its fraction while `clientHeight` and `scrollHeight` are rounded.
 */
const scrollMetrics: ScrollMetrics = { scrollTop: 0, clientHeight: 0, scrollHeight: 0 };

const ScrollStateHarness: React.FC = () => {
  const contextValue = useDrawerContextValue();

  return (
    <DrawerProvider value={contextValue}>
      <DrawerBody>Content</DrawerBody>
      <div data-testid="scroll-state">{contextValue.scrollState}</div>
    </DrawerProvider>
  );
};

const renderWithScrollMetrics = (metrics: ScrollMetrics): string | null => {
  Object.assign(scrollMetrics, metrics);

  return render(<ScrollStateHarness />).getByTestId('scroll-state').textContent;
};

describe('DrawerBody', () => {
  isConformant({
    Component: DrawerBody,
    displayName: 'DrawerBody',
  });

  it('renders a default state', () => {
    const result = render(<DrawerBody>Default DrawerBody</DrawerBody>);
    expect(result.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="fui-DrawerBody"
        >
          Default DrawerBody
        </div>
      </div>
    `);
  });

  describe('scroll state', () => {
    const originalDescriptors = new Map<keyof ScrollMetrics, PropertyDescriptor | undefined>();

    beforeAll(() => {
      (Object.keys(scrollMetrics) as (keyof ScrollMetrics)[]).forEach(key => {
        originalDescriptors.set(key, Object.getOwnPropertyDescriptor(HTMLElement.prototype, key));
        Object.defineProperty(HTMLElement.prototype, key, {
          configurable: true,
          get: () => scrollMetrics[key],
        });
      });
    });

    afterAll(() => {
      originalDescriptors.forEach((descriptor, key) => {
        if (descriptor) {
          Object.defineProperty(HTMLElement.prototype, key, descriptor);
        } else {
          // These live on Element.prototype, so removing the stub restores the inherited accessor.
          Reflect.deleteProperty(HTMLElement.prototype, key);
        }
      });
    });

    it('reports "none" when the content fits', () => {
      expect(renderWithScrollMetrics({ scrollTop: 0, clientHeight: 300, scrollHeight: 300 })).toBe('none');
    });

    it('reports "top" when scrollable and not scrolled', () => {
      expect(renderWithScrollMetrics({ scrollTop: 0, clientHeight: 300, scrollHeight: 500 })).toBe('top');
    });

    it('reports "middle" when scrolled between the ends', () => {
      expect(renderWithScrollMetrics({ scrollTop: 100, clientHeight: 300, scrollHeight: 500 })).toBe('middle');
    });

    it('reports "bottom" when scrolled to the end', () => {
      expect(renderWithScrollMetrics({ scrollTop: 200, clientHeight: 300, scrollHeight: 500 })).toBe('bottom');
    });

    // Regression: https://github.com/microsoft/fluentui/issues/36331
    // At fractional browser zoom the scroll offset stops short of `scrollHeight - clientHeight`,
    // which used to leave the state at 'middle' and kept the DrawerFooter divider visible.
    // 198.5652 is the widest gap measured in Chromium, at 115% zoom.
    const fractionalOffsets: Array<[string, number]> = [
      ['110% zoom', 199.0909],
      ['115% zoom', 198.5652],
      ['125% zoom', 199.8],
      ['150% zoom', 199.6667],
    ];

    it.each(fractionalOffsets)('reports "bottom" when scrolled to the end at %s', (_zoom, scrollTop) => {
      expect(renderWithScrollMetrics({ scrollTop, clientHeight: 300, scrollHeight: 500 })).toBe('bottom');
    });

    // Fractional layout can round `scrollHeight` a pixel above `clientHeight` on an element that
    // cannot actually be scrolled, which used to report 'top' and show the divider.
    it('reports "none" when overflow is within rounding error of the client height', () => {
      expect(renderWithScrollMetrics({ scrollTop: 0, clientHeight: 300, scrollHeight: 301 })).toBe('none');
    });
  });
});
