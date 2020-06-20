import { TestObject, TestingOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';
import { mount } from 'enzyme';
import * as React from 'react';
import * as _ from 'lodash';
import * as path from 'path';
import * as ReactIs from 'react-is';

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
      const { componentPath, Component, displayName } = testInfo;
      const componentFile = require(componentPath);
      if (testInfo.useDefaultExport) {
        expect(componentFile.default).toBe(Component);
      } else {
        expect(componentFile[displayName]).toBe(Component);
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
   * If functional component: component has a displayName
   * Else: component's constructor is a named function and matches displayName
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

  /** Ensures component is exported at top level allowing import { Component } from 'packageName' */
  'exported-top-level': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    if (!testInfo.isInternal) {
      it(`is exported at top-level`, () => {
        const { displayName, componentPath, Component } = testInfo;
        const rootPath = componentPath.replace(/src.*/, '');
        const indexFile = require(path.join(rootPath, 'src', 'index'));

        expect(indexFile[displayName]).toBe(Component);
      });
    }
  },

  /** Ensures component has top level file in package/src/componentName */
  'has-top-level-file': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    if (!testInfo.isInternal) {
      it(`has corresponding top-level file 'package/src/Component'`, () => {
        const { displayName, componentPath, Component } = testInfo;
        const rootPath = componentPath.replace(/src.*/, '');
        const topLevelFile = require(path.join(rootPath, 'src', displayName));

        expect(topLevelFile.default ? topLevelFile.default : topLevelFile[displayName]).toBe(Component);
      });
    }
  },

  /** If the component is a subcomponent, ensure its parent has the subcomponent as static property */
  'is-static-property': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    it(`is a static property of its parent`, () => {
      const { componentPath, displayName, useDefaultExport } = testInfo;
      const componentFolder = componentPath.replace(path.basename(componentPath) + path.extname(componentPath), '');
      const dirName = path.basename(componentFolder).replace(path.extname(componentFolder), '');
      const isParent = displayName === dirName;

      if (!isParent) {
        const subComponentName = displayName.replace(dirName, '');
        const subComponentFile = require(path.join(componentFolder, subComponentName));
        const SubComponent = useDefaultExport ? subComponentFile.default : subComponentFile[subComponentName];

        expect(ReactIs.isValidElementType(SubComponent)).toBe(true);
      }
    });
  },

  /** Ensures aria attributes are kebab cased */
  'kebab-aria-attributes': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    it(`Aria attributes are kebab-cased`, () => {
      const { Component, customMount, requiredProps } = testInfo;
      const mountedComponent = customMount
        ? customMount(<Component {...requiredProps} />)
        : mount(<Component {...requiredProps} />);
      const props = mountedComponent.props();

      if (props) {
        for (const prop of Object.keys(props)) {
          if (prop.toLowerCase().includes('aria')) {
            expect(prop.split(/[A-Z][a-z]+/)?.length).toBeLessThanOrEqual(1);
            expect(prop.split('-').length).toBeGreaterThan(1);
          }
        }
      }
    });
  },

  /** Ensures that components have consistent custom callback names i.e. on[Part][Event] */
  'consistent-callback-names': (componentInfo: ComponentDoc, testInfo: TestingOptions) => {
    it(`has consistent custom callback names`, () => {
      const { Component, customMount, requiredProps } = testInfo;
      const mountedComponent = customMount
        ? customMount(<Component {...requiredProps} />)
        : mount(<Component {...requiredProps} />);
      const props = mountedComponent.props();

      if (props) {
        for (const prop of Object.keys(props)) {
          if (prop.slice(0, 3) === 'on') {
            const partAndEvent = prop.slice(3).split(/[A-Z][a-z]+/);
            // Needs to be partAndEvent >= 1 in case the callback is onChange, etc.
            expect(partAndEvent.length).toBeGreaterThanOrEqual(1);
          }
        }
      }
    });
  },
};
