import type { MiddlewareArguments } from '@floating-ui/dom';
import { matchTargetSize } from './matchTargetSize';

describe('matchTargetSize', () => {
  const middlewareFn = matchTargetSize().fn;
  it('should match reference width if not same', async () => {
    expect.assertions(3);
    const floatingElement = document.createElement('div');
    const referenceWidth = 100;
    const middlewareArguments = {
      middlewareData: {},
      elements: {
        floating: floatingElement,
      },

      rects: {
        reference: { width: referenceWidth },
        floating: { width: '1px' },
      },
    } as unknown as MiddlewareArguments;

    const result = await middlewareFn(middlewareArguments);

    expect(result).toEqual({
      data: {
        matchTargetSizeAttempt: true,
      },
      reset: {
        rects: true,
      },
    });
    expect(floatingElement.style.width).toBe(`${referenceWidth}px`);
    expect(floatingElement.style.boxSizing).toBe('border-box');
  });

  it('should do nothing if reference width is equal to floating width', async () => {
    expect.assertions(1);
    const floatingElement = document.createElement('div');
    const referenceWidth = 100;
    const middlewareArguments = {
      middlewareData: {},
      elements: {
        floating: floatingElement,
      },

      rects: {
        reference: { width: referenceWidth },
        floating: { width: referenceWidth },
      },
    } as unknown as MiddlewareArguments;

    const result = await middlewareFn(middlewareArguments);

    expect(result).toEqual({});
  });

  it('should do nothing if there have been a match attempt', async () => {
    expect.assertions(1);
    const floatingElement = document.createElement('div');
    const referenceWidth = 100;
    const middlewareArguments = {
      middlewareData: { matchTargetSizeAttempt: true },
      elements: {
        floating: floatingElement,
      },

      rects: {
        reference: { width: referenceWidth },
        floating: { width: '1px' },
      },
    } as unknown as MiddlewareArguments;

    const result = await middlewareFn(middlewareArguments);

    expect(result).toEqual({});
  });
});
