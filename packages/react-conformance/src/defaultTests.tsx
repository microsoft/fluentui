import { TestObject, IsConformantOptions } from './types';
import { defaultErrorMessages } from './defaultErrorMessages';
import { ComponentDoc } from 'react-docgen-typescript';
import { getComponent } from './utils/getComponent';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
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

    it(`has a docblock with ${minWords} to ${maxWords} words (has-docblock)`, () => {
      let description = '(not yet parsed)'; // improves the error message if there's a parsing error
      let wordCount: number | undefined;
      try {
        const docblock = parseDocblock(componentInfo.description);
        description = docblock.description;
        wordCount = _.words(description).length;

        expect(wordCount).toBeGreaterThanOrEqual(minWords);
        expect(wordCount).toBeLessThanOrEqual(maxWords);
      } catch (e) {
        throw new Error(defaultErrorMessages['has-docblock'](testInfo, e, description, wordCount));
      }
    });
  },

  /** Component file exports a valid React element type  */
  'exports-component': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`exports component from file under correct name (exports-component)`, () => {
      const { componentPath, Component, displayName } = testInfo;
      const componentFile = require(componentPath);

      try {
        if (testInfo.useDefaultExport) {
          expect(componentFile.default).toBe(Component);
        } else {
          expect(componentFile[displayName]).toBe(Component);
        }
      } catch (e) {
        throw new Error(defaultErrorMessages['exports-component'](testInfo, e, Object.keys(componentFile)));
      }
    });
  },

  /** Component file exports a valid React element and can render it */
  'component-renders': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`renders (component-renders)`, () => {
      try {
        const { requiredProps, Component, customMount = mount } = testInfo;
        const mountedComponent = customMount(<Component {...requiredProps} />);
        expect(mountedComponent.exists()).toBeTruthy();
      } catch (e) {
        throw new Error(defaultErrorMessages['component-renders'](testInfo, e));
      }
    });
  },

  /**
   * If functional component: component has a displayName
   * Else: component's constructor is a named function and matches displayName
   */
  'component-has-displayname': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const { Component } = testInfo;

    it(`has a displayName or constructor name (component-has-displayname)`, () => {
      try {
        const constructorName = Component.prototype?.constructor.name;
        const displayName = Component.displayName || constructorName;

        // This check is needed in case the Component is wrapped with the v7 styled() helper, which returns a wrapper
        // component with constructor name Wrapped, and adds a Styled prefix to the displayName. Components passed to
        // styled() typically have Base in their name, so remove that too.
        expect(displayName).toMatch(new RegExp(`^(Customized|Styled)?${testInfo.displayName}(Base)?$`));
      } catch (e) {
        throw new Error(defaultErrorMessages['component-has-displayname'](testInfo, e));
      }
    });
  },

  /** Component handles ref */
  'component-handles-ref': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`handles ref (component-handles-ref)`, () => {
      try {
        const { Component, requiredProps, elementRefName = 'ref', targetComponent, customMount = mount } = testInfo;
        const rootRef = React.createRef<HTMLDivElement>();
        const mergedProps: Partial<{}> = {
          ...requiredProps,
          [elementRefName]: rootRef,
        };

        act(() => {
          targetComponent
            ? customMount(<Component {...mergedProps} />).find(targetComponent)
            : customMount(<Component {...mergedProps} />);

          expect(rootRef.current).toBeTruthy();
          // Ref should resolve to an HTML element.
          expect(rootRef.current?.getAttribute).toBeTruthy();
        });
      } catch (e) {
        throw new Error(defaultErrorMessages['component-handles-ref'](testInfo, e));
      }
    });
  },

  /** Component has ref applied to the root component DOM node */
  'component-has-root-ref': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`applies ref to root element (component-has-root-ref)`, () => {
      try {
        const {
          customMount = mount,
          Component,
          requiredProps,
          helperComponents = [],
          wrapperComponent,
          elementRefName = 'ref',
          targetComponent,
        } = testInfo;

        const rootRef = React.createRef<HTMLDivElement>();
        const mergedProps: Partial<{}> = {
          ...requiredProps,
          [elementRefName]: rootRef,
        };

        const el = targetComponent
          ? customMount(<Component {...mergedProps} />).find(targetComponent)
          : customMount(<Component {...mergedProps} />);

        act(() => {
          const component = getComponent(el, helperComponents, wrapperComponent);

          // Do an instanceof check first because if `ref` returns a class instance, the toBe check
          // will print out the very long stringified version in the error (which isn't helpful)
          expect(rootRef.current).toBeInstanceOf(HTMLElement);

          expect(rootRef.current).toBe(component.getDOMNode());
        });
      } catch (e) {
        throw new Error(defaultErrorMessages['component-has-root-ref'](testInfo, e));
      }
    });
  },

  /** Component file handles classname prop */
  'component-handles-classname': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const { Component, wrapperComponent, helperComponents = [], requiredProps, customMount = mount } = testInfo;
    const testClassName = 'testComponentClassName';
    let handledClassName = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mergedProps: any = {
      ...requiredProps,
      className: testClassName,
    };

    it(`handles className prop (component-handles-classname)`, () => {
      const el = customMount(<Component {...mergedProps} />);
      const component = getComponent(el, helperComponents, wrapperComponent);
      const domNode = component.getDOMNode();
      const classNames = (domNode.getAttribute('class') || '').split(' ');

      try {
        expect(classNames).toContain(testClassName);
        handledClassName = true;
      } catch (e) {
        throw new Error(
          defaultErrorMessages['component-handles-classname'](
            testInfo,
            e,
            testClassName,
            classNames,
            domNode.outerHTML,
          ),
        );
      }
    });

    it(`preserves component's default classNames (component-preserves-default-classname)`, () => {
      if (!handledClassName) {
        return; // don't run this test if the main className test failed
      }
      const defaultEl = customMount(<Component {...requiredProps} />);
      const defaultComponent = getComponent(defaultEl, helperComponents, wrapperComponent);
      const defaultClassNames = defaultComponent.getDOMNode().getAttribute('class')?.split(' ') || [];

      const el = customMount(<Component {...mergedProps} />);
      const component = getComponent(el, helperComponents, wrapperComponent);
      const classNames = (component.getDOMNode().getAttribute('class') || '').split(' ');

      let defaultClassName: string = '';
      try {
        if (defaultClassNames.length && defaultClassNames[0]) {
          for (defaultClassName of defaultClassNames) {
            expect(classNames).toContain(defaultClassName);
          }
        }
      } catch (e) {
        throw new Error(
          defaultErrorMessages['component-preserves-default-classname'](
            testInfo,
            e,
            testClassName,
            defaultClassName,
            classNames,
          ),
        );
      }
    });
  },

  /** Constructor/component name matches filename */
  'name-matches-filename': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`Component/constructor name matches filename (name-matches-filename)`, () => {
      try {
        const { componentPath, displayName } = testInfo;
        const fileName = path.basename(componentPath, path.extname(componentPath));

        expect(displayName).toMatch(fileName);
      } catch (e) {
        throw new Error(defaultErrorMessages['name-matches-filename'](testInfo, e));
      }
    });
  },

  /** Ensures component is exported at top level allowing `import { Component } from 'packageName'` */
  'exported-top-level': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (testInfo.isInternal) {
      return;
    }

    it(`is exported at top-level (exported-top-level)`, () => {
      try {
        const { displayName, componentPath, Component } = testInfo;
        const rootPath = componentPath.replace(/[\\/]src[\\/].*/, '');
        const indexFile = require(path.join(rootPath, 'src', 'index'));

        expect(indexFile[displayName]).toBe(Component);
      } catch (e) {
        throw new Error(defaultErrorMessages['exported-top-level'](testInfo, e));
      }
    });
  },

  /** Ensures component has top level file in package/src/componentName */
  'has-top-level-file': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (testInfo.isInternal) {
      return;
    }

    it(`has corresponding top-level file 'package/src/Component' (has-top-level-file)`, () => {
      try {
        const { displayName, componentPath, Component } = testInfo;
        const rootPath = componentPath.replace(/[\\/]src[\\/].*/, '');
        const topLevelFile = require(path.join(rootPath, 'src', displayName));

        expect(topLevelFile[displayName]).toBe(Component);
      } catch (e) {
        throw new Error(defaultErrorMessages['has-top-level-file'](testInfo, e));
      }
    });
  },

  /** If the component is a subcomponent, ensure its parent has the subcomponent as static property */
  'is-static-property-of-parent': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const { componentPath, displayName, Component } = testInfo;
    const componentFolder = componentPath.replace(path.basename(componentPath) + path.extname(componentPath), '');
    const dirName = path.basename(componentFolder).replace(path.extname(componentFolder), '');
    const isParent = displayName === dirName;
    if (isParent) {
      return;
    }

    it(`is a static property of its parent (is-static-property-of-parent)`, () => {
      try {
        const parentComponentFile = require(path.join(componentFolder, dirName));
        const ParentComponent = parentComponentFile.default || parentComponentFile[dirName];
        expect(ParentComponent[displayName]).toBe(Component);
      } catch (e) {
        throw new Error(defaultErrorMessages['is-static-property-of-parent'](testInfo, e));
      }
    });
  },

  /** Ensures aria attributes are kebab cased */
  'kebab-aria-attributes': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`uses kebab-case for aria attributes (kebab-aria-attributes)`, () => {
      const invalidProps = Object.keys(componentInfo.props).filter(
        prop => prop.startsWith('aria') && !/^aria-[a-z]+$/.test(prop),
      );
      try {
        expect(invalidProps).toEqual([]);
      } catch (e) {
        throw new Error(defaultErrorMessages['kebab-aria-attributes'](testInfo, invalidProps));
      }
    });
  },

  // TODO: Test last word of callback name against list of valid verbs
  /** Ensures that components have consistent custom callback names i.e. on[Part][Event] */
  'consistent-callback-names': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`has consistent custom callback names (consistent-callback-names)`, () => {
      const { testOptions = {} } = testInfo;
      const propNames = Object.keys(componentInfo.props);
      const ignoreProps = testOptions['consistent-callback-names']?.ignoreProps || [];

      const invalidProps = propNames.filter(propName => {
        if (!ignoreProps.includes(propName) && /^on(?!Render[A-Z])[A-Z]/.test(propName)) {
          const words = propName.slice(2).match(/[A-Z][a-z]+/g);
          if (words) {
            // Make sure last word doesn't end with ed
            const lastWord = words[words.length - 1];
            return lastWord.endsWith('ed');
          }
        }
        return false;
      });

      try {
        expect(invalidProps).toEqual([]);
      } catch (e) {
        throw new Error(defaultErrorMessages['consistent-callback-names'](testInfo, invalidProps));
      }
    });
  },

  /** If it has "as" prop: Renders as functional component or passes as to the next component */
  'as-renders-fc': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (testInfo.skipAsPropTests) {
      return;
    }

    it(`renders as a functional component or passes "as" to the next  (as-renders-fc)`, () => {
      try {
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
          const comp = component.find('[as]').last().prop('as');
          expect(comp).toBe(MyComponent);
        }
      } catch (e) {
        throw new Error(defaultErrorMessages['as-renders-fc'](testInfo, e));
      }
    });
  },

  /** If it has "as" prop: Renders as ReactClass or passes as to the next component */
  'as-renders-react-class': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (testInfo.skipAsPropTests || testInfo.asPropHandlesRef) {
      return;
    }

    it(`renders as a ReactClass or passes "as" to the next component (as-renders-react-class)`, () => {
      try {
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
      } catch (e) {
        throw new Error(defaultErrorMessages['as-renders-react-class'](testInfo, e));
      }
    });
  },

  /** If it has "as" prop: Passes extra props to the component it renders as */
  'as-passes-as-value': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (testInfo.skipAsPropTests) {
      return;
    }

    it(`passes extra props to the component it is renders as (as-passes-as-value)`, () => {
      const { customMount = mount, Component, requiredProps, targetComponent, asPropHandlesRef } = testInfo;

      let el: ReactWrapper;
      if (targetComponent) {
        el = mount(<Component {...requiredProps} data-extra-prop="foo" />).find(targetComponent);
      } else {
        const MyComponent = asPropHandlesRef ? React.forwardRef((props, ref) => null) : () => null;
        el = customMount(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Component {...requiredProps} {...({ as: MyComponent } as any)} data-extra-prop="foo" />,
        ).find(MyComponent);
      }

      try {
        expect(el.prop('data-extra-prop')).toBe('foo');
      } catch (e) {
        throw new Error(defaultErrorMessages['as-passes-as-value'](testInfo, e));
      }
    });
  },

  /** If it has "as" prop: Renders component as HTML tags */
  'as-renders-html': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    if (testInfo.skipAsPropTests) {
      return;
    }

    it(`renders component as HTML tags or passes "as" to the next component (as-renders-html)`, () => {
      try {
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
      } catch (e) {
        throw new Error(defaultErrorMessages['as-renders-html'](testInfo, e));
      }
    });
  },
};
