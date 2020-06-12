import { TestObject, TestingOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';
import { mount } from 'enzyme';
import * as ReactIs from 'react-is';
import * as React from 'react';
import * as _ from 'lodash';
import * as path from 'path';

/** For a reference of the tests, check the file rules.md in @fluentui/react-conformance */

export const defaultTests: TestObject = {
  /** Component has a docblock with 5 to 25 words */
  'has-docblock': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const maxWords = 25;
    const minWords = 5;

    // No need to check if the description is undefined, ComponentDoc.description is a "string" not "string | undefined"
    it(`has a docblock with ${minWords} to ${maxWords} words`, () => {
      expect(_.words(componentInfo.description)).toBeGreaterThanOrEqual(minWords);
      expect(_.words(componentInfo.description)).toBeLessThanOrEqual(maxWords);
    });
  },

  /** Component file exports a valid React element type  */
  'exports-react-element': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    it(`file exports valid React Element type`, () => {
      expect(ReactIs.isValidElementType(require(componentPath))).toBe(true);
    });
  },

  /** Component file exports a valid React element and can render it */
  'component-renders': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    it(`renders`, () => {
      const { requiredProps } = testInfo;
      const componentFile = require(componentPath);
      const Component = componentFile.default || componentFile[componentInfo.displayName];
      expect(Component).toBeDefined();
      const mountedComponent = mount(<Component {...requiredProps} />);
      expect(mountedComponent.exists()).toBeTruthy();
    });
  },

  /**
   * if functional component: component has a displayName
   * else: component's constructor is a named function and matches displayName
   */
  'component-has-displayname': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    const componentFile = require(componentPath);
    const Component = componentFile.default || componentFile[componentInfo.displayName];
    if (Component.prototype.constructor) {
      it(`constructor is a named function and matches displayName`, () => {
        const constructorName = Component.prototype.constructor.name;
        expect(constructorName).toEqual(Component.displayName);
      });
    } else {
      it(`has a displayName`, () => {
        expect(Component.displayName).toBeTruthy();
      });
    }
  },

  /** Constructor/component name matches filename */
  'name-matches-filename': (componentInfo: ComponentDoc, componentPath: string, testInfo: TestingOptions) => {
    it(`Component/constructor name matches filename`, () => {
      const Component = require(componentPath);
      const fileName = path.basename(componentPath, path.extname(componentPath));
      const constructorName = Component.prototype.constructor?.name;

      expect(componentInfo.displayName || constructorName).toEqual(fileName);
    });
  },
};
