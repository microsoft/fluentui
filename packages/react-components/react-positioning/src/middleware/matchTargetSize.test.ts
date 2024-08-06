import type { MiddlewareArguments } from '@floating-ui/dom';
import { matchTargetSize, matchTargetSizeCssVar } from './matchTargetSize';
import { CSSProperties } from 'react';

describe('matchTargetSize', () => {
  const middlewareFn = matchTargetSize().fn;
  const createElementMock = () => ({
    style: { setProperty: jest.fn() } as CSSProperties & { setProperty: jest.Mock },
  });
  it('should match reference width if not same', async () => {
    expect.assertions(3);
    const floatingElement = createElementMock();
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
    expect(floatingElement.style.setProperty).toHaveBeenCalledWith(matchTargetSizeCssVar, `${referenceWidth}px`);
    expect(floatingElement.style.width).toEqual('var(--fui-match-target-size)');
  });

  it('should not apply width style if already set', async () => {
    expect.assertions(3);
    const floatingElement = createElementMock();
    floatingElement.style.width = '100px';
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
    expect(floatingElement.style.setProperty).toHaveBeenCalledWith(matchTargetSizeCssVar, `${referenceWidth}px`);
    expect(floatingElement.style.width).toEqual('100px');
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
      middlewareData: { matchTargetSize: { matchTargetSizeAttempt: true } },
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
