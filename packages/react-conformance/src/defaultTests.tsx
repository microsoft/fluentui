import { TestObject, TestingOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';
import { mount } from 'enzyme';
import * as ReactIs from 'react-is';
import * as React from 'react';

/** For a reference of the tests, check the file rules.md in @fluentui/react-conformance */

export const defaultTests: TestObject = {
  /** Component has a docblock with 5 to 25 words */
  'v0-1a': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const maxWords = 25;
    const minWords = 5;

    // No need to check if the description is undefined, ComponentDoc.description is a "string" not "string | undefined"
    it(`Component has a docblock with ${minWords} to ${maxWords} words`, () => {
      expect(componentInfo.description).toBeGreaterThanOrEqual(minWords);
      expect(componentInfo.description).toBeLessThanOrEqual(maxWords);
    });
  },
  /** Component file exports a valid React element type  */
  'v0-3': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    it(`Component file exports valid React Element type`, () => {
      expect(ReactIs.isValidElementType(require(componentPath))).toBe(true);
    });
  },
  /** Component file exports a valid React element and can render it */
  'v0-1b': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const { requiredProps } = testInfo;
    const Component = require(componentPath);
    const mountedComponent = mount(<Component {...requiredProps} />);

    it(`Component renders`, () => {
      expect(mountedComponent.exists()).toBe(true);
    });
  },
  /** Component's constructor is a named function or component has a displayName */
  'v0-2': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const Component = require(componentPath);
    const constructorName = Component.prototype.constructor.name;

    it(`Component's constructor name is a named function or has displayName`, () => {
      expect(constructorName || componentInfo.displayName).toBeTruthy();
    });
  },
  /** Component has a static displayName matching constructor name */
  'v0-16': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const Component = require(componentPath);
    const constructorName = Component.prototype.constructor.name;

    it(`Component has a static displayName that matches the constructor's name`, () => {
      expect(Component.displayName).toEqual(constructorName);
    });
  },
  /** Constructor/component name matches filename */
  'v0-4': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const Component = require(componentPath);
    const fileName = componentPath
      .split('/')
      .pop()!
      .replace('.tsx', '')
      .replace('.ts', '');
    const constructorName = Component.prototype.constructor.name;

    it(`Component/constructor name matches filename`, () => {
      expect(componentInfo.displayName || constructorName).toEqual(fileName);
    });
  },
};
