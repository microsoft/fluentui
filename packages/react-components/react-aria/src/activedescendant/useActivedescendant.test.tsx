import * as React from 'react';
import { useActiveDescendant } from './useActiveDescendant';
import { ActiveDescendantImperativeRef } from './types';
import { render } from '@testing-library/react';
import { ACTIVEDESCENDANT_ATTRIBUTE } from './constants';

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
    const { container } = render(<Test imperativeRef={imperativeRef} />);

    const res = imperativeRef.current?.first();
    expect(res).toBe(expecetdOption);
    expect(container.querySelector(`#${expecetdOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(true);
  });

  it('should focus next option', () => {
    const expectedOption = 'option-2';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { container, getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.first();
    const res = imperativeRef.current?.next();
    expect(res).toBe(expectedOption);
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
    expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(true);
    expect(getByRole('button').getAttribute('aria-activedescendant')).toBe(expectedOption);
  });

  it('should do nothing when there is no next option', () => {
    const expectedOption = 'option-4';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { container, getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.focus(expectedOption);
    const res = imperativeRef.current?.next();
    expect(res).toBeUndefined();
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
    expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(true);
    expect(getByRole('button').getAttribute('aria-activedescendant')).toBe(expectedOption);
  });

  it('should focus previous option', () => {
    const expectedOption = 'option-1';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { container, getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.first();
    imperativeRef.current?.next();
    const res = imperativeRef.current?.prev();
    expect(res).toBe(expectedOption);
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
    expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(true);
    expect(getByRole('button').getAttribute('aria-activedescendant')).toBe(expectedOption);
  });

  it('should do nothing if there is no previous option', () => {
    const expectedOption = 'option-1';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { container, getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.focus(expectedOption);
    const res = imperativeRef.current?.prev();
    expect(res).toBeUndefined();
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
    expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(true);
    expect(getByRole('button').getAttribute('aria-activedescendant')).toBe(expectedOption);
  });

  it('should focus specific option', () => {
    const expectedOption = 'option-3';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { container, getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.first();
    imperativeRef.current?.focus(expectedOption);
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
    expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(true);
    expect(getByRole('button').getAttribute('aria-activedescendant')).toBe(expectedOption);
  });

  it('should blur listbox', () => {
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { container, getByRole } = render(<Test imperativeRef={imperativeRef} />);

    imperativeRef.current?.focus('option-3');
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
    imperativeRef.current?.blur();
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(0);
    expect(getByRole('button').hasAttribute('aria-activedescendant')).toBe(false);
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
    const { container, getByRole } = render(<Test imperativeRef={imperativeRef} />);

    const res = imperativeRef.current?.last();
    expect(res).toBe(expecetdOption);
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
    expect(getByRole('button').getAttribute('aria-activedescendant')).toBe(expecetdOption);
  });

  it('should find element and focus it', () => {
    const expectedOption = 'option-3';
    const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
    const { container, getByRole } = render(<Test imperativeRef={imperativeRef} />);

    const res = imperativeRef.current?.find(id => id === expectedOption);
    expect(res).toBe(expectedOption);
    expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
    expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(true);
    expect(getByRole('button').getAttribute('aria-activedescendant')).toBe(expectedOption);
  });

  describe('passive', () => {
    it('should return first option', () => {
      const expecetdOption = 'option-1';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { container } = render(<Test imperativeRef={imperativeRef} />);

      const res = imperativeRef.current?.first({ passive: true });
      expect(res).toBe(expecetdOption);
      expect(container.querySelector(`#${expecetdOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(false);
    });

    it('should return next option', () => {
      const expectedOption = 'option-2';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { container } = render(<Test imperativeRef={imperativeRef} />);

      imperativeRef.current?.first();
      const res = imperativeRef.current?.next({ passive: true });
      expect(res).toBe(expectedOption);
      expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
      expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(false);
    });

    it('should return  previous option', () => {
      const expectedOption = 'option-1';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { container } = render(<Test imperativeRef={imperativeRef} />);

      imperativeRef.current?.first();
      imperativeRef.current?.next();
      const res = imperativeRef.current?.prev({ passive: true });
      expect(res).toBe(expectedOption);
      expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
      expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(false);
    });

    it('should get last element', () => {
      const expecetdOption = 'option-4';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { container } = render(<Test imperativeRef={imperativeRef} />);

      const res = imperativeRef.current?.last({ passive: true });
      expect(res).toBe(expecetdOption);
      expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(0);
    });

    it('should find element', () => {
      const expectedOption = 'option-3';
      const imperativeRef = React.createRef<ActiveDescendantImperativeRef>();
      const { container } = render(<Test imperativeRef={imperativeRef} />);

      imperativeRef.current?.first();
      const res = imperativeRef.current?.find(id => id === expectedOption, { passive: true });
      expect(res).toBe(expectedOption);
      expect(container.querySelectorAll(`[${ACTIVEDESCENDANT_ATTRIBUTE}]`).length).toBe(1);
      expect(container.querySelector(`#${expectedOption}`)?.hasAttribute(ACTIVEDESCENDANT_ATTRIBUTE)).toBe(false);
    });
  });
});
