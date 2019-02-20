import { ReactWrapper, mount } from 'enzyme';
import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

export type __TS_2_8_WORKAROUND_COMPONENT__ = Component;

export function findNodes(wrapper: ReactWrapper<any, any>, className: string): ReactWrapper<any, any> {
  return wrapper.find(className).filterWhere((node: ReactWrapper<any, any>) => typeof node.type() === 'string');
}

export function expectNodes(wrapper: ReactWrapper<any, any>, className: string, n: number): void {
  expect(findNodes(wrapper, className).length).toEqual(n);
}

export function expectOne(wrapper: ReactWrapper<any, any>, className: string): void {
  expectNodes(wrapper, className, 1);
}

export function expectMissing(wrapper: ReactWrapper<any, any>, className: string): void {
  expectNodes(wrapper, className, 0);
}

export function delay(millisecond: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, millisecond));
}

/**
 * Mounts the element attached to a child of document.body. This is primarily for tests involving
 * event handlers (which don't work right unless the element is attached).
 */
export function mountAttached<C extends Component, P = C['props'], S = C['state']>(element: React.ReactElement<P>): ReactWrapper<P, S, C> {
  const parent = document.createElement('div');
  document.body.appendChild(parent);
  return mount(element, { attachTo: parent });
}

export function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
  const component = ReactTestUtils.renderIntoDocument(element);
  const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
  return renderedDOM as HTMLElement;
}

export function mockEvent(targetValue: string = ''): ReactTestUtils.SyntheticEventData {
  const target: EventTarget = { value: targetValue } as HTMLInputElement;
  return { target };
}
