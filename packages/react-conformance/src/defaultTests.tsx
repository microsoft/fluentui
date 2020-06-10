import { ConformanceTest, TestingOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';
import { mountWithProvider as mount } from './utilities/withProvider';
import * as ReactIs from 'react-is';
import * as React from 'react';

export let defaultTests: ConformanceTest[] = [
  /** Component has a docblock with 5 to 25 words */
  (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const maxWords = 25;
    const minWords = 5;

    // No need to check if the description is undefined, ComponentDoc.description is a "string" not "string | undefined"
    test(`${componentInfo.displayName} has a docblock with ${minWords} to ${maxWords} words`, () => {
      expect(componentInfo.description).toBeGreaterThanOrEqual(minWords);
      expect(componentInfo.description).toBeLessThanOrEqual(maxWords);
    });
  },
  /** Component file exports a valid React element type  */
  (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    test(`${componentInfo.displayName} file exports valid React Element type`, () => {
      expect(ReactIs.isValidElementType(require(componentPath))).toBe(true);
    });
  },
  /** Component file exports a valid React element and can render it */
  (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const { requiredProps } = testInfo;
    const Component = require(componentPath);
    const mountedComponent = mount(<Component {...requiredProps} />);

    test(`${componentInfo.displayName} renders`, () => {
      expect(mountedComponent.exists()).toBe(true);
    });
  },
  /** Component's constructor is a named function or component has a displayName */
  (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const Component = require(componentPath);
    const constructorName = Component.prototype.constructor.name;

    test(`${componentInfo.displayName}'s constructor name is a named function or has displayName`, () => {
      expect(constructorName || componentInfo.displayName).toBeTruthy();
    });
  },
  /** Component has a static displayName matching constructor name */
  (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const Component = require(componentPath);
    const constructorName = Component.prototype.constructor.name;

    test(`${componentInfo.displayName} has a static displayName that matches the constructor's name`, () => {
      expect(Component.displayName).toEqual(constructorName);
    });
  },
  /** Constructor/component name matches filename */
  (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const Component = require(componentPath);
    const fileName = componentPath
      .split('/')
      .pop()!
      .replace('.tsx', '')
      .replace('.ts', '');
    const constructorName = Component.prototype.constructor.name;

    test(`Component/constructor name matches filename`, () => {
      expect(componentInfo.displayName || constructorName).toEqual(fileName);
    });
  },
];
