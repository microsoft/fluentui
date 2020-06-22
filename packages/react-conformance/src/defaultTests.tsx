import { TestObject, IsConformantOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';
import { mount } from 'enzyme';
import * as React from 'react';
import * as _ from 'lodash';
import * as path from 'path';
import * as ReactIs from 'react-is';

export const defaultTests: TestObject = {
  /** Component has a docblock with 5 to 25 words */
  'has-docblock': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const maxWords = 25;
    const minWords = 5;

    // No need to check if the description is undefined, ComponentDoc.description is a "string" not "string | undefined"
    it(`has a docblock with ${minWords} to ${maxWords} words`, () => {
      expect(_.words(componentInfo.description).length).toBeGreaterThanOrEqual(minWords);
      expect(_.words(componentInfo.description).length).toBeLessThanOrEqual(maxWords);
    });
  },

  /** Component file exports a valid React element type  */
  'exports-component': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
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
  'component-renders': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`renders`, () => {
      const { requiredProps, Component, customMount = mount } = testInfo;
      const mountedComponent = customMount(<Component {...requiredProps} />);
      expect(mountedComponent.exists()).toBeTruthy();
    });
  },

  /**
   * If functional component: component has a displayName
   * Else: component's constructor is a named function and matches displayName
   */
  'component-has-displayname': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
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
  'name-matches-filename': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`Component/constructor name matches filename`, () => {
      const { componentPath, displayName } = testInfo;
      const fileName = path.basename(componentPath, path.extname(componentPath));

      expect(displayName).toEqual(fileName);
    });
  },

  /** Ensures component is exported at top level allowing import { Component } from 'packageName' */
  'exported-top-level': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
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
  'has-top-level-file': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (!testInfo.isInternal) {
      it(`has corresponding top-level file 'package/src/Component'`, () => {
        const { displayName, componentPath, Component } = testInfo;
        const rootPath = componentPath.replace(/src.*/, '');
        const topLevelFile = require(path.join(rootPath, 'src', displayName));

        expect(topLevelFile.default || topLevelFile[displayName]).toBe(Component);
      });
    }
  },

  /** If the component is a subcomponent, ensure its parent has the subcomponent as static property */
  'is-static-property-of-parent': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
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
  'kebab-aria-attributes': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`Aria attributes are kebab-cased`, () => {
      const props = Object.keys(componentInfo.props);

      for (const prop of Object.keys(props)) {
        if (prop.startsWith('aria')) {
          expect(prop).toMatch(/^aria-[a-z]+$/);
        }
      }
    });
  },

  // TODO: Test last word of callback name against list of valid verbs
  /** Ensures that components have consistent custom callback names i.e. on[Part][Event] */
  'consistent-callback-names': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`has consistent custom callback names`, () => {
      const propKeys = Object.keys(componentInfo.props);
      const { testingOptions } = testInfo;
      const ignoreProps = testingOptions ? testingOptions['consistent-callback-names']?.ignoreProps : undefined;

      for (const propName of Object.keys(propKeys)) {
        if (!ignoreProps?.includes(propName) && /^on[A-Z]/.test(propName)) {
          const words = propName.slice(2).match(/[A-Z][a-z]+/g);

          if (words) {
            // Make sure last word doesn't end with ed
            const lastWord = words[words.length - 1];
            expect(lastWord.lastIndexOf('ed')).not.toBe(lastWord.length - 2);

            // Checking on[Part][Event] [Part] matches a prop
            const firstWord = words[0].toLowerCase;
            expect(propKeys).toContain(firstWord);
          }
        }
      }
    });
  },
};
