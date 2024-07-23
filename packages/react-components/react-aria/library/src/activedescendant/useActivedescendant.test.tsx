import * as React from 'react';
import { useActiveDescendant } from './useActiveDescendant';
import { ActiveDescendantImperativeRef } from './types';
import { render } from '@testing-library/react';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';

interface CustomMatchers<R = unknown> {
  toHaveActiveDescendant(received: string | null | undefined): R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

expect.extend({
  toHaveActiveDescendant(received: HTMLElement | null, expected: string | null | undefined) {
    if (!received) {
      return {
        message: () => `HTML element is null!`,
        pass: false,
      };
    }

    const activeDescendantId = received.getAttribute('aria-activedescendant');

    if (activeDescendantId !== expected) {
      return {
        pass: false,
        message: () => `Expected: ${expected}\nReceived: ${activeDescendantId}`,
      };
    }

    if (activeDescendantId === null) {
      return { pass: true, message: () => `Unexpected error in toHaveActiveDescendant matcher` };
    }

    const activeDescendant = document.getElementById(activeDescendantId);
    if (!activeDescendant?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)) {
      return {
        pass: false,
        message: () => `Expected ${expected} to have attribute: ${ACTIVEDESCENDANT_ATTRIBUTE}`,
      };
    }

    const activeDescendantAttributeLength = document.body.querySelectorAll(`${ACTIVEDESCENDANT_ATTRIBUTE}`).length;
    if (activeDescendantAttributeLength > 1) {
      return {
        pass: false,
        message: () =>
          `Expected one element with ${ACTIVEDESCENDANT_ATTRIBUTE}, found ${activeDescendantAttributeLength}`,
      };
    }

    return {
      pass: true,
      message: () => `Unexpected error in toHaveActiveDescendant matcher`,
    };
  },
});

describe('useActivedescendant', () => {
  const Test: React.FC<{ imperativeRef: React.RefObject<ActiveDescendantImperativeRef> }> = ({ imperativeRef }) => {
    const { listboxRef, activeParentRef } = useActiveDescendant<HTMLButtonElement, HTMLDivElement>({
      matchOption: el => el.getAttribute('role') === 'option',
      imperativeRef,
    });

    return (
      <>
        <button ref={activeParentRef}>active parent</button>
        <div ref={listboxRef}>
          <div role="option" id="option-1" />
          <div role="option" id="option-2" />
          <div role="option" id="option-3" />
          <div role="option" id="option-4" />
        </div>
      </>
    );
  };

  it('should focus first option', () => {
    const expecetdOption = 'option-1';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    const res = imperativeRef.current?.first();
    expect(res).toBe(expecetdOption);
    const button = getByRole('button');
    expect(button).toHaveActiveDescendant(expecetdOption);
  });

  it('should not have aria-activedescendant attribute if hideAttributes invoked', () => {
    const expecetdOption = 'option-1';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.hideAttributes();

    const res = imperativeRef.current?.first();
    expect(res).toBe(expecetdOption);
    const button = getByRole('button');
    expect(button).not.toHaveActiveDescendant(expecetdOption);

    imperativeRef.current?.showAttributes();
    expect(button).toHaveActiveDescendant(expecetdOption);
  });

  it('should focus next option', () => {
    const expectedOption = 'option-2';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.first();
    const res = imperativeRef.current?.next();
    expect(res).toBe(expectedOption);
    expect(getByRole('button')).toHaveActiveDescendant(expectedOption);
  });

  it('should do nothing when there is no next option', () => {
    const expectedOption = 'option-4';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.focus(expectedOption);
    const res = imperativeRef.current?.next();
    expect(res).toBeUndefined();
    expect(getByRole('button')).toHaveActiveDescendant(expectedOption);
  });

  it('should focus previous option', () => {
    const expectedOption = 'option-1';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.first();
    imperativeRef.current?.next();
    const res = imperativeRef.current?.prev();
    expect(res).toBe(expectedOption);
    expect(getByRole('button')).toHaveActiveDescendant(expectedOption);
  });

  it('should do nothing if there is no previous option', () => {
    const expectedOption = 'option-1';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.focus(expectedOption);
    const res = imperativeRef.current?.prev();
    expect(res).toBeUndefined();
    expect(getByRole('button')).toHaveActiveDescendant(expectedOption);
  });

  it('should focus specific option', () => {
    const expectedOption = 'option-3';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.first();
    imperativeRef.current?.focus(expectedOption);
    expect(getByRole('button')).toHaveActiveDescendant(expectedOption);
  });

  it('should blur listbox', () => {
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.focus('option-3');
    imperativeRef.current?.blur();
    expect(getByRole('button')).toHaveActiveDescendant(null);
  });

  it('should return active element', () => {
    const expecetdOption = 'option-4';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.focus(expecetdOption);
    expect(imperativeRef.current?.active()).toEqual(expecetdOption);
  });

  it('should focus last element', () => {
    const expecetdOption = 'option-4';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    const res = imperativeRef.current?.last();
    expect(res).toBe(expecetdOption);
    expect(getByRole('button')).toHaveActiveDescendant(expecetdOption);
  });

  it('should find element and focus it', () => {
    const expectedOption = 'option-3';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    const res = imperativeRef.current?.find(id => id === expectedOption);
    expect(res).toBe(expectedOption);
    expect(getByRole('button')).toHaveActiveDescendant(expectedOption);
  });

  it('should find element and focus it starting from', () => {
    const expectedOption = 'option-3';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

    const res = imperativeRef.current?.find(id => document.getElementById(id)?.getAttribute('role') === 'option', {
      startFrom: 'option-3',
    });
    expect(res).toBe(expectedOption);
    expect(getByRole('button')).toHaveActiveDescendant(expectedOption);
  });

  describe('passive', () => {
    it('should return first option', () => {
      const expecetdOption = 'option-1';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

      const res = imperativeRef.current?.first({ passive: true });
      expect(res).toBe(expecetdOption);
      expect(getByRole('button')).toHaveActiveDescendant(null);
    });

    it('should return next option', () => {
      const expectedOption = 'option-2';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

      imperativeRef.current?.first();
      const res = imperativeRef.current?.next({ passive: true });
      expect(res).toBe(expectedOption);
      expect(getByRole('button')).toHaveActiveDescendant('option-1');
    });

    it('should return  previous option', () => {
      const expectedOption = 'option-1';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

      imperativeRef.current?.first();
      imperativeRef.current?.next();
      const res = imperativeRef.current?.prev({ passive: true });
      expect(res).toBe(expectedOption);
      expect(getByRole('button')).toHaveActiveDescendant('option-2');
    });

    it('should get last element', () => {
      const expecetdOption = 'option-4';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

      const res = imperativeRef.current?.last({ passive: true });
      expect(res).toBe(expecetdOption);
      expect(getByRole('button')).toHaveActiveDescendant(null);
    });

    it('should find element', () => {
      const expectedOption = 'option-3';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

      imperativeRef.current?.first();
      const res = imperativeRef.current?.find(id => id === expectedOption, { passive: true });
      expect(res).toBe(expectedOption);
      expect(getByRole('button')).toHaveActiveDescendant('option-1');
    });

    it('should focus last active descendant', () => {
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

      // there should not be a last active descendant yet
      // eslint-disable-next-line deprecation/deprecation
      expect(imperativeRef.current?.focusLastActive()).toBeFalsy();

      imperativeRef.current?.focus('option-3');
      expect(imperativeRef.current?.active()).toBe('option-3');

      imperativeRef.current?.blur();
      expect(imperativeRef.current?.active()).toBeUndefined();

      // eslint-disable-next-line deprecation/deprecation
      expect(imperativeRef.current?.focusLastActive()).toBeTruthy();
      expect(imperativeRef.current?.active()).toBe('option-3');

      expect(getByRole('button')).toHaveActiveDescendant('option-3');
    });

    it('should find element starting from', () => {
      const expectedOption = 'option-3';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { getByRole } = render(<Test imperativeRef={imperativeRef} />);

      imperativeRef.current?.first();
      const res = imperativeRef.current?.find(id => document.getElementById(id)?.getAttribute('role') === 'option', {
        startFrom: 'option-3',
        passive: true,
      });
      expect(res).toBe(expectedOption);
      expect(getByRole('button')).toHaveActiveDescendant('option-1');
    });
  });
});
