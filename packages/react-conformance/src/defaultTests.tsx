import { TestObject, TestingOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';
import { mount } from 'enzyme';
import * as React from 'react';
import * as _ from 'lodash';
import * as path from 'path';

export const defaultTests: TestObject = {
  /** Component has a docblock with 5 to 25 words */
  'has-docblock': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    const maxWords = 25;
    const minWords = 5;

    // No need to check if the description is undefined, ComponentDoc.description is a "string" not "string | undefined"
    it(`has a docblock with ${minWords} to ${maxWords} words`, () => {
      expect(_.words(componentInfo.description).length).toBeGreaterThanOrEqual(minWords);
      expect(_.words(componentInfo.description).length).toBeLessThanOrEqual(maxWords);
    });
  },

  /** Component file exports a valid React element type  */
  'exports-component': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    it(`exports component from file under correct name`, () => {
      const componentFile = require(testInfo.componentPath);
      if (testInfo.useDefaultExport) {
        expect(componentFile.default).toBe(testInfo.Component);
      } else {
        expect(componentFile[testInfo.displayName]).toBe(testInfo.Component);
      }
    });
  },

  /** Component file exports a valid React element and can render it */
  'component-renders': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    it(`renders`, () => {
      const { requiredProps, Component, customMount } = testInfo;
      const mountedComponent = customMount
        ? customMount(<Component {...requiredProps} />)
        : mount(<Component {...requiredProps} />);
      expect(mountedComponent.exists()).toBeTruthy();
    });
  },

  /**
   * if functional component: component has a displayName
   * else: component's constructor is a named function and matches displayName
   */
  'component-has-displayname': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    const { Component } = testInfo;

    it(`has a displayName or constructor name`, () => {
      const constructorName = Component.prototype?.constructor.name;
      let displayName = Component.displayName || constructorName;

      // This check is needed in case the Component is wrapped with the v7 styled() helper, which returns a wrapper
      // component with constructor name Wrapped, and adds a Styled prefix to the displayName. Components passed to
      // styled() typically have Base in their name, so remove that too.
      if (constructorName === 'Wrapped') {
        displayName = displayName.replace(/^Styled/, '');
        displayName = displayName.replace(/Base$/, '');
      }

      expect(displayName).toEqual(testInfo.displayName);
    });
  },

  /** Constructor/component name matches filename */
  'name-matches-filename': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    it(`Component/constructor name matches filename`, () => {
      const { componentPath, displayName } = testInfo;
      const fileName = path.basename(componentPath, path.extname(componentPath));

      expect(displayName).toEqual(fileName);
    });
  },
};
