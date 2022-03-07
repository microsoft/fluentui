import { TestObject, IsConformantOptions } from './types';
import { defaultErrorMessages } from './defaultErrorMessages';
import { ComponentDoc } from 'react-docgen-typescript';
import { getComponent, getPackagePath, getCallbackArguments, validateCallbackArguments } from './utils/index';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import * as React from 'react';
import * as _ from 'lodash';
import * as path from 'path';

const CALLBACK_REGEX = /^on(?!Render[A-Z])[A-Z]/;

/* eslint-disable @typescript-eslint/naming-convention */

export const defaultTests: TestObject = {
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
          primarySlot = 'root',
        } = testInfo;

        const rootRef = React.createRef<HTMLDivElement>();
        const mergedProps: Partial<{}> = {
          ...requiredProps,
          ...(primarySlot !== 'root'
            ? {
                // If primarySlot is something other than 'root', add the ref to
                // the root slot rather than to the component's props.
                root: { ref: rootRef },
              }
            : {
                [elementRefName]: rootRef,
              }),
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

  /**
   * Component does not apply `size` as a native prop when a custom version is defined.
   *
   * Background: `input` and `select` support a `size` prop which is not very useful
   * (https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size).
   * Since we don't anticipate ever needing this functionality, and we often want to use the prop name
   * `size` to refer to visual size (like small/medium/large), we want to ensure that components defining
   * a custom `size` prop don't also apply it as a native prop by accident.
   *
   * (In the extremely unlikely event that someone has a compelling need for the native functionality
   * in the future, it can be added under an `htmlSize` prop.)
   */
  'omits-size-prop': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const sizeType = componentInfo.props.size?.type?.name;
    if (!sizeType || componentInfo.props.htmlSize) {
      return;
    }
    // if the size prop is defined, type.name will probably be 'string | undefined'
    // or something like '"small" | "medium" | "large" | undefined'
    const sizeIsString = /\bstring\b/.test(sizeType);
    const sizeLiteralMatch = sizeType.match(/"(.*?)"/);
    if (!sizeIsString || sizeLiteralMatch) {
      return; // not a format we know how to test
    }

    it(`does not apply native size prop if custom one is defined (omits-size-prop)`, () => {
      const { customMount = mount, Component, requiredProps, helperComponents = [], wrapperComponent } = testInfo;

      const size = sizeLiteralMatch?.[1] || 'foo';
      const mergedProps = {
        ...requiredProps,
        size,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any; // we know the size prop is supported but there's not a good way to derive the actual type

      const el = customMount(<Component {...mergedProps} />);
      const component = getComponent(el, helperComponents, wrapperComponent);
      const elementWithSize = component.getDOMNode().querySelector('[size]');

      try {
        expect(elementWithSize).toBeFalsy();
      } catch (e) {
        throw new Error(defaultErrorMessages['omits-size-prop'](testInfo, e, size, elementWithSize!));
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

  /** Component file has assigned and exported static class */
  'component-has-static-classname': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    const {
      componentPath,
      Component,
      wrapperComponent,
      helperComponents = [],
      requiredProps,
      customMount = mount,
    } = testInfo;
    const componentClassName = `fui-${componentInfo.displayName}`;

    it(`has static classname (component-has-static-classname)`, () => {
      const defaultEl = customMount(<Component {...requiredProps} />);

      const defaultComponent = getComponent(defaultEl, helperComponents, wrapperComponent);
      const classNames = defaultComponent.prop<string>('className');

      try {
        expect(classNames).toContain(componentClassName);
      } catch (e) {
        throw new Error(
          defaultErrorMessages['component-has-static-classname'](testInfo, e, componentClassName, classNames),
        );
      }
    });

    it(`static classname is exported at top-level (component-has-static-classname-exported)`, () => {
      if (testInfo.isInternal) {
        return;
      }

      const exportName =
        componentInfo.displayName.slice(0, 1).toLowerCase() + componentInfo.displayName.slice(1) + 'ClassName';

      try {
        const indexFile = require(path.join(getPackagePath(componentPath), 'src', 'index'));

        expect(indexFile[exportName]).toBe(componentClassName);
      } catch (e) {
        throw new Error(
          defaultErrorMessages['component-has-static-classname-exported'](testInfo, e, componentClassName, exportName),
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
        const indexFile = require(path.join(getPackagePath(componentPath), 'src', 'index'));

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
        const topLevelFile = require(path.join(getPackagePath(componentPath), 'src', displayName));

        expect(topLevelFile[displayName]).toBe(Component);
      } catch (e) {
        throw new Error(defaultErrorMessages['has-top-level-file'](testInfo, e));
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
        if (!ignoreProps.includes(propName) && CALLBACK_REGEX.test(propName)) {
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

  /** Ensures that components have consistent callback arguments (ev, data) */
  'consistent-callback-args': (componentInfo, testInfo, tsProgram) => {
    it('has consistent custom callback arguments (consistent-callback-args)', () => {
      const { testOptions = {} } = testInfo;

      const propNames = Object.keys(componentInfo.props);
      const ignoreProps = testOptions['consistent-callback-args']?.ignoreProps || [];

      const invalidProps = propNames.reduce<Record<string, Error>>((errors, propName) => {
        if (!ignoreProps.includes(propName) && CALLBACK_REGEX.test(propName)) {
          const propInfo = componentInfo.props[propName];

          if (!propInfo.declarations) {
            throw new Error(
              [
                `Definition for "${propName}" does not have ".declarations" produced by "react-docgen-typescript".`,
                'Please report a bug in Fluent UI repo if this happens. Include in a bug report details about file',
                'where it happens and used interfaces.',
              ].join(' '),
            );
          }

          if (propInfo.declarations.length !== 1) {
            throw new Error(
              [
                `Definition for "${propName}" has multiple elements in ".declarations" produced by `,
                `"react-docgen-typescript".`,
                'Please report a bug in Fluent UI repo if this happens. Include in a bug report details about file',
                'where it happens and used interfaces.',
              ].join(' '),
            );
          }

          const rootFileName = propInfo.declarations[0].fileName;
          const propsTypeName = propInfo.declarations[0].name;

          try {
            validateCallbackArguments(getCallbackArguments(tsProgram, rootFileName, propsTypeName, propName));
          } catch (err) {
            console.log('err', err);

            return { ...errors, [propName]: err };
          }
        }

        return errors;
      }, {});

      try {
        expect(invalidProps).toEqual({});
      } catch (e) {
        throw new Error(defaultErrorMessages['consistent-callback-args'](testInfo, invalidProps));
      }
    });
  },

  /** If the primary slot is specified, it receives native props other than 'className' and 'style' */
  'primary-slot-gets-native-props': (componentInfo: ComponentDoc, testInfo: IsConformantOptions) => {
    it(`applies correct native props to the primary and root slots (primary-slot-gets-native-props)`, () => {
      try {
        const {
          customMount = mount,
          Component,
          requiredProps,
          helperComponents = [],
          wrapperComponent,
          targetComponent,
          primarySlot = 'root',
        } = testInfo;

        // This test only applies if this component has a primary slot other than 'root'
        if (primarySlot === 'root') {
          return;
        }

        // Add this data attribute directly to the primary slot so that its DOM node can be
        // found to verify that the props went to the correct element
        const primarySlotDataTag = 'data-primary-slot';

        // Add these values to the component's props to make sure they are forwarded to the appropriate slot
        const ref = React.createRef<HTMLElement>();
        const testDataAttribute = 'data-conformance-test'; // A data attribute is a proxy for any arbitrary native prop
        const testClass = 'conformance-test-class-name';
        const testStyleFontFamily = 'conformance-test-font-family';

        const mergedProps: Partial<{}> = {
          ...requiredProps,
          [primarySlot]: {
            [primarySlotDataTag]: true,
          },
          ref,
          className: testClass,
          style: { fontFamily: testStyleFontFamily },
          [testDataAttribute]: testDataAttribute,
        };

        const el = targetComponent
          ? customMount(<Component {...mergedProps} />).find(targetComponent)
          : customMount(<Component {...mergedProps} />);

        act(() => {
          const component = getComponent(el, helperComponents, wrapperComponent);

          const rootNode = component.getDOMNode();
          expect(rootNode).toBeInstanceOf(HTMLElement);
          if (!(rootNode instanceof HTMLElement)) {
            return;
          }

          // Find the node that represents the primary slot, searching for its data attribute
          const primaryNode = rootNode.querySelector(`[${primarySlotDataTag}]`);

          // We should have found the primary slot's node
          expect(primaryNode).toBeInstanceOf(HTMLElement);
          if (!(primaryNode instanceof HTMLElement)) {
            return;
          }

          // className and style should go the *root* slot
          expect(rootNode.className).toContain(testClass);
          expect(rootNode.style.fontFamily).toEqual(testStyleFontFamily);
          // ... and not the primary slot
          expect(primaryNode.className).not.toContain(testClass);
          expect(primaryNode.style.fontFamily).not.toEqual(testStyleFontFamily);

          // Ref and all other native props should go to the *primary* slot
          expect(primaryNode).toBe(ref.current);
          expect(primaryNode.getAttribute(testDataAttribute)).toEqual(testDataAttribute);
          // ... and not the root slot
          expect(rootNode).not.toBe(ref.current);
          expect(rootNode.getAttribute(testDataAttribute)).not.toEqual(testDataAttribute);
        });
      } catch (e) {
        throw new Error(defaultErrorMessages['primary-slot-gets-native-props'](testInfo, e));
      }
    });
  },
};
