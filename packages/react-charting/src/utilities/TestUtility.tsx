/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, queryAllByAttribute, render, waitFor } from '@testing-library/react';
import * as React from 'react';

export const getById = queryAllByAttribute.bind(null, 'id');
export const getByClass = queryAllByAttribute.bind(null, 'class');

export const testWithoutWait = (
  description: string,
  component: any,
  props: any,
  testFunction: (container: HTMLElement) => void,
  testFunctionBeforeWait?: () => void,
) => {
  test(description, () => {
    const { container } = render(React.createElement(component, (props = { ...props })));
    testFunctionBeforeWait !== undefined && testFunctionBeforeWait();
    testFunction(container);
  });
};

export const testWithWait = (
  description: string,
  component: any,
  props: any,
  testFunction: (container: HTMLElement) => void,
) => {
  test(description, async () => {
    const { container } = render(React.createElement(component, (props = { ...props })));
    await waitFor(() => {
      testFunction(container);
    });
  });
};

export const testScreenResolution = (testFunction: () => void) => {
  const originalInnerWidth = global.innerWidth;
  const originalInnerHeight = global.innerHeight;
  afterEach(() => {
    global.innerWidth = originalInnerWidth;
    global.innerHeight = originalInnerHeight;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
  });
  test('Should remain unchanged on zoom in', () => {
    testFunction();
    global.innerWidth = window.innerWidth / 2;
    global.innerHeight = window.innerHeight / 2;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
  });
  test('Should remain unchanged on zoom out', () => {
    testFunction();
    global.innerWidth = window.innerWidth * 2;
    global.innerHeight = window.innerHeight * 2;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
  });
};
