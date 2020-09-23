import { TestObject, IsConformantOptions } from './types';
import { ComponentDoc } from 'react-docgen-typescript';
import { getComponent } from './utils/getComponent';
import { mount } from 'enzyme';
import parseDocblock from './utils/parseDocblock';

import * as React from 'react';
import * as _ from 'lodash';
import * as path from 'path';
import consoleUtil from './utils/consoleUtil';

/* eslint-disable @typescript-eslint/naming-convention */

export const defaultTests: TestObject = {
  /** Component has a docblock with 5 to 25 words */
  'has-docblock': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const maxWords = 25;
    const minWords = 5;

    // No need to check if the description is undefined, ComponentDoc.description is a "string" not "string | undefined"
    it(`has a docblock with ${minWords} to ${maxWords} words`, () => {
      const docblock = parseDocblock(componentInfo.description);

      expect(_.words(docblock.description).length).toBeGreaterThanOrEqual(minWords);
      expect(_.words(docblock.description).length).toBeLessThanOrEqual(maxWords);
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
      const displayName = Component.displayName || constructorName;

      // This check is needed in case the Component is wrapped with the v7 styled() helper, which returns a wrapper
      // component with constructor name Wrapped, and adds a Styled prefix to the displayName. Components passed to
      // styled() typically have Base in their name, so remove that too.
      expect(displayName).toMatch(new RegExp(`^(Customized|Styled)?${testInfo.displayName}(Base)?$`));
    });
  },

  /** Component file handles classname prop */
  'component-contains-classname': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`has a className prop`, () => {
      const {
        Component,
        wrapperComponent,
        helperComponents = [],
        requiredProps,
        customMount = mount,
        passesUnhandledPropsTo,
      } = testInfo;
      const mergedProps: Partial<{}> = {
        ...requiredProps,
        className: 'testComponentClassName',
      };

      if (passesUnhandledPropsTo) {
        const el = customMount(<Component {...mergedProps} />).find(passesUnhandledPropsTo);
        const component = getComponent(el, helperComponents, wrapperComponent);

        expect(component.find('[testComponentClassName]'));
      } else {
        const wrapper = customMount(<Component {...mergedProps} />);
        const component = getComponent(wrapper, helperComponents, wrapperComponent);

        expect(component.find('[testComponentClassName]'));
      }
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

  /** Ensures component is exported at top level allowing `import { Component } from 'packageName'` */
  'exported-top-level': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (!testInfo.isInternal) {
      it(`is exported at top-level`, () => {
        const { displayName, componentPath, Component } = testInfo;
        const rootPath = componentPath.replace(/[\\/]src[\\/].*/, '');
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
        const rootPath = componentPath.replace(/[\\/]src[\\/].*/, '');
        const topLevelFile = require(path.join(rootPath, 'src', displayName));

        expect(topLevelFile[displayName]).toBe(Component);
      });
    }
  },

  /** If the component is a subcomponent, ensure its parent has the subcomponent as static property */
  'is-static-property-of-parent': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const { componentPath, displayName, Component } = testInfo;
    const componentFolder = componentPath.replace(path.basename(componentPath) + path.extname(componentPath), '');
    const dirName = path.basename(componentFolder).replace(path.extname(componentFolder), '');
    const isParent = displayName === dirName;
    if (!isParent) {
      it(`is a static property of its parent`, () => {
        const parentComponentFile = require(path.join(componentFolder, dirName));
        const ParentComponent = parentComponentFile.default || parentComponentFile[dirName];
        expect(ParentComponent[displayName]).toBe(Component);
      });
    }
  },

  /** Ensures aria attributes are kebab cased */
  'kebab-aria-attributes': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`uses kebab-case for aria attributes`, () => {
      const props = Object.keys(componentInfo.props);

      for (const prop of props) {
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
      const { testOptions = {} } = testInfo;
      const propNames = Object.keys(componentInfo.props);
      const ignoreProps = testOptions['consistent-callback-names']?.ignoreProps || [];

      for (const propName of Object.keys(propNames)) {
        if (!ignoreProps.includes(propName) && /^on(?!Render[A-Z])[A-Z]/.test(propName)) {
          const words = propName.slice(2).match(/[A-Z][a-z]+/g);

          if (words) {
            // Make sure last word doesn't end with ed
            const lastWord = words[words.length - 1];
            expect(lastWord.endsWith('ed')).toBe(false);
          }
        }
      }
    });
  },

  /** If it has "as" prop: Renders as functional component or passes as to the next component */
  'as-renders-fc': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (componentInfo.props.as) {
      it(`renders as a functional component or passes "as" to the next component`, () => {
        const {
          requiredProps,
          Component,
          customMount = mount,
          wrapperComponent,
          helperComponents = [],
          asPropHandlesRef,
        } = testInfo;
        const MyComponent = asPropHandlesRef ? React.forwardRef((props, ref) => null) : () => null;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wrapper = customMount(<Component {...requiredProps} {...({ as: MyComponent } as any)} />);
        const component = getComponent(wrapper, helperComponents, wrapperComponent);

        try {
          expect(component.type()).toBe(MyComponent);
        } catch (err) {
          expect(component.type()).not.toBe(Component);
          const comp = component
            .find('[as]')
            .last()
            .prop('as');
          expect(comp).toBe(MyComponent);
        }
      });
    }
  },

  /** If it has "as" prop: Renders as ReactClass or passes as to the next component */
  'as-renders-react-class': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (componentInfo.props.as && !testInfo.asPropHandlesRef) {
      it(`renders as a ReactClass or passes "as" to the next component`, () => {
        const { requiredProps, Component, customMount = mount, wrapperComponent, helperComponents = [] } = testInfo;

        class MyComponent extends React.Component {
          public render() {
            return <div data-my-react-class />;
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wrapper = customMount(<Component {...requiredProps} {...({ as: MyComponent } as any)} />);
        const component = getComponent(wrapper, helperComponents, wrapperComponent);

        try {
          expect(component.type()).toBe(MyComponent);
        } catch (err) {
          expect(component.type()).not.toBe(Component);
          expect(component.prop('as')).toBe(MyComponent);
        }
      });
    }
  },

  /** If it has "as" prop: Passes extra props to the component it renders as */
  'as-passes-as-value': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (componentInfo.props.as) {
      it(`passes extra props to the component it is renders as`, () => {
        const { customMount = mount, Component, requiredProps, passesUnhandledPropsTo, asPropHandlesRef } = testInfo;

        if (passesUnhandledPropsTo) {
          const el = mount(<Component {...requiredProps} data-extra-prop="foo" />).find(passesUnhandledPropsTo);

          expect(el.prop('data-extra-prop')).toBe('foo');
        } else {
          const MyComponent = asPropHandlesRef ? React.forwardRef((props, ref) => null) : () => null;
          const el = customMount(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <Component {...requiredProps} {...({ as: MyComponent } as any)} data-extra-prop="foo" />,
          ).find(MyComponent);
          expect(el.prop('data-extra-prop')).toBe('foo');
        }
      });
    }
  },

  /** If it has "as" prop: Renders component as HTML tags */
  'as-renders-html': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (componentInfo.props.as) {
      it(`renders component as HTML tags or passes "as" to the next component`, () => {
        // silence element nesting warnings
        consoleUtil.disableOnce();
        const tags = ['a', 'em', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'p', 'span', 'strong'];
        const { Component, customMount = mount, requiredProps, wrapperComponent, helperComponents = [] } = testInfo;

        tags.forEach(tag => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const wrapper = customMount(<Component {...requiredProps} {...({ as: tag } as any)} />);
          const component = getComponent(wrapper, helperComponents, wrapperComponent);

          try {
            expect(component.is(tag)).toBe(true);
          } catch (err) {
            expect(component.type()).not.toBe(Component);
            expect(component.prop('as')).toBe(tag);
          }
        });
      });
    }
  },
};
