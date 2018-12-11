import { mount, ReactWrapper } from 'enzyme';
import { Component } from 'react';

export type __TS_2_8_WORKAROUND_COMPONENT__ = Component;

export const findNodes = (wrapper: ReactWrapper<any, any>, className: string): ReactWrapper<any, any> =>
  wrapper.find(className).filterWhere((node: ReactWrapper<any, any>) => typeof node.type() === 'string');

export const expectNodes = (wrapper: ReactWrapper<any, any>, className: string, n: number): void =>
  expect(findNodes(wrapper, className).length).toEqual(n);

export const expectOne = (wrapper: ReactWrapper<any, any>, className: string): void => expectNodes(wrapper, className, 1);

export const expectMissing = (wrapper: ReactWrapper<any, any>, className: string): void => expectNodes(wrapper, className, 0);

export function delay(millisecond: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, millisecond));
}

/**
 * Mounts the element attached to a child of document.body. This is primarily for tests involving
 * event handlers (which don't work right unless the element is attached).
 */
export function mountAttached<C extends React.Component, P = C['props'], S = C['state']>(element: React.ReactElement<any>) {
  const parent = document.createElement('div');
  document.body.appendChild(parent);
  return mount<C, P, S>(element, { attachTo: parent });
}
