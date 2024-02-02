/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, queryAllByAttribute, render, waitFor } from '@testing-library/react';
import * as React from 'react';
const ENV = require('../../config/tests');
const { Timezone } = require('../../config/constants');

export const getById = queryAllByAttribute.bind(null, 'id');
export const getByClass = queryAllByAttribute.bind(null, 'class');
export const runTestSuiteInTestEnv = ENV === 'TEST' ? describe : describe.skip;

// Test function that does not wait for any async calls to finish
export const testWithoutWait = (
  description: string,
  component: any,
  props: any,
  testFunction: (container: HTMLElement) => void,
  testFunctionAfterRender?: () => void,
  beforeAllFunction?: () => void,
  skip?: boolean,
) => {
  const runTest = skip ? test.skip : test;
  runTest(description, () => {
    beforeAllFunction !== undefined && beforeAllFunction();
    const { container } = render(React.createElement(component, (props = { ...props })));
    testFunctionAfterRender !== undefined && testFunctionAfterRender();
    testFunction(container);
  });
};

// Test function that waits for async calls to finish
export const testWithWait = (
  description: string,
  component: any,
  props: any,
  testFunction: (container: HTMLElement) => void,
  testFunctionAfterRender?: () => void,
  beforeAllFunction?: () => void,
  skip?: boolean,
) => {
  const runTest = skip ? test.skip : test;
  runTest(description, async () => {
    beforeAllFunction !== undefined && beforeAllFunction();
    const { container } = render(React.createElement(component, (props = { ...props })));
    testFunctionAfterRender !== undefined && testFunctionAfterRender();
    await waitFor(() => {
      testFunction(container);
    });
  });
};

// Test Screen Resolution changes like zoom in and zoom out
export const testScreenResolutionChanges = (testFunction: () => void) => {
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

it('getById and getByClass should be defined', () => {
  expect(getById).toBeDefined();
  expect(getByClass).toBeDefined();
});

const TIMEZONES: [string, string][] = Object.entries(Timezone);
export const forEachTimezone = (callback: (tzName: string, tzIdentifier: string) => void) => {
  TIMEZONES.forEach(([tzName, tzIdentifier]) => {
    callback(tzName, tzIdentifier);
  });
};
export const isTimezone = (timezone: string) => {
  return timezone === process.env.TZ;
};
