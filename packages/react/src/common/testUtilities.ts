import * as React from 'react';
import type * as ReactTestUtils from 'react-dom/test-utils';
import { render } from '@testing-library/react';

// v2 - avoiding usage of enzyme

// Helper function to find all elements with a specific class name that are not React components

export function getBySelector(container: HTMLElement | Element, selector: string) {
  return container.querySelector(selector);
}
export function getByAllSelector(container: HTMLElement | Element, selector: string) {
  return container.querySelectorAll(selector);
}
export function findNodesV2(container: HTMLElement, selector: string): HTMLElement[] {
  return Array.from(container.querySelectorAll(selector)).filter(
    node => node.nodeType === Node.ELEMENT_NODE,
  ) as HTMLElement[];
}

export function expectNodesV2(container: HTMLElement, className: string, n: number): void {
  expect(findNodesV2(container, className).length).toEqual(n);
}

export function expectOneV2(container: HTMLElement, selector: string): void {
  expectNodesV2(container, selector, 1);
}

/** @deprecated Use fake timers and `jest.runAllTimers()` instead */
export function delay(millisecond: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, millisecond));
}

export function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
  const component = render(element);
  const renderedDOM = component.container.firstChild;
  return renderedDOM as HTMLElement;
}

export function mockEvent(targetValue: string = ''): ReactTestUtils.SyntheticEventData {
  const target: EventTarget = { value: targetValue } as HTMLInputElement;
  return { target };
}

/**
 * Hack for forcing Jest to run pending promises
 * https://github.com/facebook/jest/issues/2157#issuecomment-897935688
 */
export function flushPromises() {
  return new Promise<void>(jest.requireActual('timers').setImmediate);
}

/**
 * Verify that the given element and its parents do NOT have `aria-hidden` set.
 */
export function expectNoHiddenParents(element: HTMLElement) {
  let el: HTMLElement | null = element;
  while (el) {
    expect(el.getAttribute('aria-hidden')).not.toBe('true');
    el = el.parentElement;
  }
}
