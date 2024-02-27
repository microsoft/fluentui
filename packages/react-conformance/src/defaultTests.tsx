import * as React from 'react';
import * as _ from 'lodash';
import * as path from 'path';
import { render } from '@testing-library/react';

import { IsConformantOptions, DefaultTestObject } from './types';
import { defaultErrorMessages } from './defaultErrorMessages';
import { ComponentDoc } from 'react-docgen-typescript';
import { getPackagePath, getCallbackArguments, validateCallbackArguments } from './utils/index';
import { act } from 'react-dom/test-utils';

/**
 * TODO - TS 4.5 introduces strict catch `err` callback handling - opting out for sake of smoother ts 4.5 upgrade
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OptOutStrictCatchTypes = any;

const CALLBACK_REGEX = /^on(?!Render[A-Z])[A-Z]/;

/**
 * Find the target element where the attribute is applied using either `getTargetElement`,
 * or the first child of the container.
 */
function getTargetElement(
  testInfo: IsConformantOptions,
  ...[result, attr]: Parameters<Required<IsConformantOptions>['getTargetElement']>
) {
  return testInfo.getTargetElement
    ? testInfo.getTargetElement(result, attr)
    : (result.container.firstElementChild as HTMLElement);
}

/* eslint-disable @typescript-eslint/naming-convention */

export const defaultTests: DefaultTestObject = {
  /** Component file exports a valid React element type  */
  'exports-component': (testInfo: IsConformantOptions) => {
    it(`exports component from file under correct name (exports-component)`, () => {
      const { componentPath, Component, displayName } = testInfo;
      const componentFile = require(componentPath);

      try {
        if (testInfo.useDefaultExport) {
          expect(componentFile.default).toBe(Component);
        } else {
          expect(componentFile[displayName]).toBe(Component);
        }
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['exports-component'](testInfo, e, Object.keys(componentFile)));
      }
    });
  },

  /** Component file exports a valid React element and can render it */
  'component-renders': (testInfo: IsConformantOptions) => {
    it(`renders (component-renders)`, () => {
      try {
        const { requiredProps, Component, renderOptions } = testInfo;
        expect(() => render(<Component {...requiredProps} />, renderOptions)).not.toThrow();
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['component-renders'](testInfo, e));
      }
    });
  },

  /**
   * If functional component: component has a displayName
   * Else: component's constructor is a named function and matches displayName
   */
  'component-has-displayname': (testInfo: IsConformantOptions) => {
    const { Component } = testInfo;

    it(`has a displayName or constructor name (component-has-displayname)`, () => {
      try {
        const constructorName = Component.prototype?.constructor.name;
        const displayName = Component.displayName || constructorName;

        // This check is needed in case the Component is wrapped with the v7 styled() helper, which returns a wrapper
        // component with constructor name Wrapped, and adds a Styled prefix to the displayName. Components passed to
        // styled() typically have Base in their name, so remove that too.
        expect(displayName).toMatch(new RegExp(`^(Customized|Styled)?${testInfo.displayName}(Base)?$`));
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['component-has-displayname'](testInfo, e));
      }
    });
  },

  /** Component handles ref */
  'component-handles-ref': (testInfo: IsConformantOptions) => {
    it(`handles ref (component-handles-ref)`, () => {
      // This test simply verifies that the passed ref is applied to an element *anywhere* in the DOM
      const { Component, requiredProps, elementRefName = 'ref', renderOptions } = testInfo;
      const rootRef = React.createRef<HTMLDivElement>();
      const mergedProps: Partial<{}> = {
        ...requiredProps,
        [elementRefName]: rootRef,
      };

      const { baseElement } = render(<Component {...mergedProps} />, renderOptions);

      try {
        expect(rootRef.current).toBeInstanceOf(HTMLElement);
        expect(baseElement.contains(rootRef.current)).toBe(true);
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['component-handles-ref'](testInfo, e));
      }
    });
  },

  /** Component has ref applied to the root component DOM node */
  'component-has-root-ref': (testInfo: IsConformantOptions) => {
    it(`applies ref to root element (component-has-root-ref)`, () => {
      const { renderOptions, Component, requiredProps, elementRefName = 'ref', primarySlot = 'root' } = testInfo;

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

      const result = render(<Component {...mergedProps} />, renderOptions);
      const refEl = getTargetElement(testInfo, result, 'ref');
      expect(refEl).toBeTruthy();

      try {
        // Do an instanceof check first because if `ref` returns a class instance, the toBe check
        // will print out the very long stringified version in the error (which isn't helpful)
        expect(rootRef.current).toBeInstanceOf(HTMLElement);
        expect(rootRef.current).toBe(refEl);
      } catch (e: OptOutStrictCatchTypes) {
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
  'omits-size-prop': (testInfo: IsConformantOptions, componentInfo: ComponentDoc) => {
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
      const { renderOptions, Component, requiredProps } = testInfo;

      const size = sizeLiteralMatch?.[1] || 'foo';
      const mergedProps = {
        ...requiredProps,
        size,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any; // we know the size prop is supported but there's not a good way to derive the actual type

      const { baseElement } = render(<Component {...mergedProps} />, renderOptions);
      const elementWithSize = baseElement.querySelector('[size]');

      try {
        expect(elementWithSize).toBeFalsy();
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['omits-size-prop'](testInfo, e, size, elementWithSize!));
      }
    });
  },

  /** Component file handles classname prop */
  'component-handles-classname': (testInfo: IsConformantOptions) => {
    const { Component, requiredProps, renderOptions } = testInfo;
    const testClassName = 'testComponentClassName';
    let handledClassName = false;
    let defaultClassNames: string[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mergedProps: any = {
      ...requiredProps,
      className: testClassName,
    };

    it('has default classNames', () => {
      // this is not a real test, it's just to get the default class names without causing
      // possible side effects within another test by rendering the component twice
      const defaultResult = render(<Component {...requiredProps} />, renderOptions);
      const defaultEl = getTargetElement(testInfo, defaultResult, 'className');
      defaultClassNames = classListToStrings(defaultEl.classList);
    });

    it(`handles className prop (component-handles-classname)`, () => {
      const result = render(<Component {...mergedProps} />, renderOptions);
      const domNode = getTargetElement(testInfo, result, 'className');
      expect(domNode).toBeTruthy();
      const classNames = classListToStrings(domNode.classList);

      try {
        expect(classNames).toContain(testClassName);
        handledClassName = true;
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(
          defaultErrorMessages['component-handles-classname'](testInfo, e, testClassName, classNames, domNode),
        );
      }
    });

    it(`preserves component's default classNames (component-preserves-default-classname)`, () => {
      if (!handledClassName || !defaultClassNames?.length) {
        return; // don't run this test if the main className test failed or there are no defaults
      }

      const result = render(<Component {...mergedProps} />, renderOptions);
      const el = getTargetElement(testInfo, result, 'className');
      const classNames = classListToStrings(el.classList);

      let defaultClassName: string = '';
      try {
        for (defaultClassName of defaultClassNames) {
          expect(classNames).toContain(defaultClassName);
        }
      } catch (e: OptOutStrictCatchTypes) {
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

  /** Component file has assigned and exported static classnames object */
  'component-has-static-classnames-object': (testInfo: IsConformantOptions) => {
    const { componentPath, Component, testOptions = {}, requiredProps, renderOptions } = testInfo;

    const componentName = testInfo.displayName;
    const classNamePrefix = testOptions?.['component-has-static-classname']?.prefix ?? 'fui';
    const componentClassName = `${classNamePrefix}-${componentName}`;
    const exportName = `${componentName[0].toLowerCase()}${componentName.slice(1)}ClassNames`;
    const indexPath = path.join(getPackagePath(componentPath), 'src', 'index');
    let handledClassNamesObjectExport = false;

    it('has static classnames exported at top-level (component-has-static-classnames-object)', () => {
      if (testInfo.isInternal) {
        return;
      }

      try {
        const indexFile = require(indexPath);
        const classNamesFromFile = indexFile[exportName];
        expect(classNamesFromFile).toBeTruthy();
        handledClassNamesObjectExport = true;
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(
          defaultErrorMessages['component-has-static-classnames-object-exported'](testInfo, e, exportName),
        );
      }
    });

    it('has static classnames in correct format (component-has-static-classnames-object)', () => {
      if (!handledClassNamesObjectExport) {
        return;
      }

      const indexFile = require(indexPath);
      const classNamesFromFile = indexFile[exportName];

      const expectedClassNames = Object.keys(classNamesFromFile).reduce(
        (obj: { [key: string]: string }, key: string) => {
          obj[key] = key === 'root' ? componentClassName : `${componentClassName}__${key}`;
          return obj;
        },
        {},
      );

      try {
        expect(classNamesFromFile).toEqual(expectedClassNames);
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(
          defaultErrorMessages['component-has-static-classnames-in-correct-format'](testInfo, e, exportName),
        );
      }
    });

    it(`has static classnames in rendered component (component-has-static-classnames-object)`, () => {
      if (!handledClassNamesObjectExport) {
        return;
      }

      const staticClassNameVariants = testOptions['has-static-classnames'] ?? [{ props: {} }];

      for (const staticClassNames of staticClassNameVariants) {
        const mergedProps = {
          ...requiredProps,
          ...staticClassNames.props,
        };
        const result = render(<Component {...mergedProps} />, renderOptions);
        const rootEl = getTargetElement(testInfo, result, 'className');
        const portalEl = staticClassNames.getPortalElement && staticClassNames.getPortalElement(result);

        const indexFile = require(indexPath);
        const classNamesFromFile = indexFile[exportName];

        const expectedClassNames: { [key: string]: string } = staticClassNames.expectedClassNames ?? classNamesFromFile;
        let missingClassNames = Object.values(expectedClassNames).filter(
          className => !rootEl.classList.contains(className) && !rootEl.querySelector(`.${className}`),
        );

        if (missingClassNames.length && portalEl) {
          missingClassNames = missingClassNames.filter(
            className => !portalEl.classList.contains(className) && !portalEl.querySelector(`.${className}`),
          );
        }

        try {
          expect(missingClassNames).toHaveLength(0);
        } catch (e: OptOutStrictCatchTypes) {
          throw new Error(
            defaultErrorMessages['component-has-static-classnames'](
              testInfo,
              e,
              componentName,
              missingClassNames.join(', '),
              rootEl,
            ),
          );
        }
      }
    });
  },

  /** Constructor/component name matches filename */
  'name-matches-filename': (testInfo: IsConformantOptions) => {
    it(`Component/constructor name matches filename (name-matches-filename)`, () => {
      try {
        const { componentPath, displayName } = testInfo;
        const fileName = path.basename(componentPath, path.extname(componentPath));

        expect(displayName).toMatch(fileName);
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['name-matches-filename'](testInfo, e));
      }
    });
  },

  /** Ensures component is exported at top level allowing `import { Component } from 'packageName'` */
  'exported-top-level': (testInfo: IsConformantOptions) => {
    if (testInfo.isInternal) {
      return;
    }

    it(`is exported at top-level (exported-top-level)`, () => {
      try {
        const { displayName, componentPath, Component } = testInfo;
        const indexFile = require(path.join(getPackagePath(componentPath), 'src', 'index'));

        expect(indexFile[displayName]).toBe(Component);
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['exported-top-level'](testInfo, e));
      }
    });
  },

  /** Ensures component has top level file in package/src/componentName */
  'has-top-level-file': (testInfo: IsConformantOptions) => {
    if (testInfo.isInternal) {
      return;
    }

    it(`has corresponding top-level file 'package/src/Component' (has-top-level-file)`, () => {
      try {
        const { displayName, componentPath, Component } = testInfo;
        const topLevelFile = require(path.join(getPackagePath(componentPath), 'src', displayName));

        expect(topLevelFile[displayName]).toBe(Component);
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['has-top-level-file'](testInfo, e));
      }
    });
  },

  /** Ensures aria attributes are kebab cased */
  'kebab-aria-attributes': (testInfo: IsConformantOptions, componentInfo: ComponentDoc) => {
    it(`uses kebab-case for aria attributes (kebab-aria-attributes)`, () => {
      const invalidProps = Object.keys(componentInfo.props).filter(
        prop => prop.startsWith('aria') && !/^aria-[a-z]+$/.test(prop),
      );
      try {
        expect(invalidProps).toEqual([]);
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['kebab-aria-attributes'](testInfo, invalidProps));
      }
    });
  },

  // TODO: Test last word of callback name against list of valid verbs
  /** Ensures that components have consistent custom callback names i.e. on[Part][Event] */
  'consistent-callback-names': (testInfo: IsConformantOptions, componentInfo: ComponentDoc) => {
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
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['consistent-callback-names'](testInfo, invalidProps));
      }
    });
  },

  /**
   * Ensures that components have consistent callback arguments (ev, data)
   * @deprecated this test is for existing callbacks. The newly added callbacks' type will be guarded by eslint rule consistent-callback-type
   */
  'consistent-callback-args': (testInfo, componentInfo, tsProgram) => {
    it('has consistent custom callback arguments (consistent-callback-args)', () => {
      const { testOptions = {} } = testInfo;

      const propNames = Object.keys(componentInfo.props);
      const legacyCallbacks = testOptions['consistent-callback-args']?.legacyCallbacks || [];

      // verify that legacyCallbacks option contains real props:
      const legacyCallbacksNotInProp = legacyCallbacks.filter(legacyCallback => !propNames.includes(legacyCallback));
      if (legacyCallbacksNotInProp.length) {
        throw new Error(
          [
            `Option "consistent-callback-args.legacyCallbacks" contains "${legacyCallbacksNotInProp.join(', ')}" prop,`,
            'which is not present in component props.',
          ].join(' '),
        );
      }

      const invalidProps = propNames.reduce<Record<string, Error>>((errors, propName) => {
        if (legacyCallbacks.includes(propName)) {
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
          } catch (err: OptOutStrictCatchTypes) {
            console.log('err', err);

            return { ...errors, [propName]: err };
          }
        }

        return errors;
      }, {});

      try {
        expect(invalidProps).toEqual({});
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['consistent-callback-args'](testInfo, invalidProps));
      }
    });
  },

  /** If the primary slot is specified, it receives native props other than 'className' and 'style' */
  'primary-slot-gets-native-props': (testInfo: IsConformantOptions) => {
    it(`applies correct native props to the primary and root slots (primary-slot-gets-native-props)`, () => {
      try {
        const { Component, requiredProps, primarySlot = 'root', renderOptions } = testInfo;

        // This test only applies if this component has a primary slot other than 'root'
        // (this also prevents the test from running for northstar and v8)
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

        const { container } = render(<Component {...mergedProps} />, renderOptions);
        const rootNode = container.firstElementChild as HTMLElement;
        expect(rootNode).toBeTruthy();

        act(() => {
          // Find the node that represents the primary slot, searching for its data attribute
          const primaryNode = rootNode.querySelector(`[${primarySlotDataTag}]`);

          // We should have found the primary slot's node
          expect(primaryNode).toBeInstanceOf(HTMLElement);
          if (!(primaryNode instanceof HTMLElement)) {
            return;
          }

          // className and style should go the *root* slot
          expect(classListToStrings(rootNode.classList)).toContain(testClass);
          expect(rootNode.style.fontFamily).toEqual(testStyleFontFamily);
          // ... and not the primary slot
          expect(classListToStrings(primaryNode.classList)).not.toContain(testClass);
          expect(primaryNode.style.fontFamily).not.toEqual(testStyleFontFamily);

          // Ref and all other native props should go to the *primary* slot
          expect(primaryNode).toBe(ref.current);
          expect(primaryNode.getAttribute(testDataAttribute)).toEqual(testDataAttribute);
          // ... and not the root slot
          expect(rootNode).not.toBe(ref.current);
          expect(rootNode.getAttribute(testDataAttribute)).not.toEqual(testDataAttribute);
        });
      } catch (e: OptOutStrictCatchTypes) {
        throw new Error(defaultErrorMessages['primary-slot-gets-native-props'](testInfo, e));
      }
    });
  },
};

function classListToStrings(classList: DOMTokenList): string[] {
  // We should be able to just do [...classList] but that requires lib: dom.iterable in tsconfig.json.
  // Due to path aliases, react-conformance gets type-checked with each converged package,
  // so we'd need to add dom.iterable in all converged packages too.
  // This function is a workaround.
  const result: string[] = [];
  for (let i = 0; i < classList.length; i++) {
    result.push(classList[i]);
  }
  return result;
}
