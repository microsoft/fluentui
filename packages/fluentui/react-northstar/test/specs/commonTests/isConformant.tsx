import { Accessibility, AriaRole, IS_FOCUSABLE_ATTRIBUTE } from '@fluentui/accessibility';
import { compose, ComposedComponent, FocusZone, Telemetry } from '@fluentui/react-bindings';
import { Ref, RefFindNode } from '@fluentui/react-component-ref';
import { isConformant as isConformantBase, IsConformantOptions } from '@fluentui/react-conformance';
import { Renderer } from '@fluentui/react-northstar-styles-renderer';
import { ComponentSlotStylesPrepared, emptyTheme } from '@fluentui/styles';
import * as faker from 'faker';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactIs from 'react-is';
import { ComponentType, ReactWrapper } from 'enzyme';
import * as ReactDOMServer from 'react-dom/server';
import { act } from 'react-dom/test-utils';
import {
  assertBodyContains,
  getDisplayName,
  mountWithProvider as mount,
  syntheticEvent,
  mountWithProvider,
} from 'test/utils';
import { commonHelpers } from './commonHelpers';

import * as FluentUI from 'src/index';
import { getEventTargetComponent, EVENT_TARGET_ATTRIBUTE } from './eventTarget';

export interface Conformant<TProps = {}> extends Pick<IsConformantOptions<TProps>, 'disabledTests' | 'testOptions'> {
  /** Path to the test file. */
  testPath: string;
  constructorName?: string;
  /** Map of events and the child component to target. */
  eventTargets?: object;
  hasAccessibilityProp?: boolean;
  /** Props required to render Component without errors or warnings. */
  requiredProps?: object;
  /** Does this component render a Portal powered component? */
  rendersPortal?: boolean;
  /** This component uses wrapper slot to wrap the 'meaningful' element. */
  wrapperComponent?: React.ElementType;
  /** List of autocontrolled props for this component. */
  autoControlledProps?: string[];
  /** Child component that will receive unhandledProps. */
  passesUnhandledPropsTo?: ComponentType<any>;
  /** Child component that will receive ref. */
  forwardsRefTo?: string | false;
}

/**
 * Assert Component conforms to guidelines that are applicable to all components.
 * @param Component - A component that should conform.
 */
export function isConformant(
  Component: React.ComponentType<any> & {
    handledProps?: string[];
    autoControlledProps?: string[];
    deprecated_className?: string;
  },
  options: Conformant,
) {
  const {
    testPath,
    constructorName = Component.prototype.constructor.name,
    eventTargets = {},
    hasAccessibilityProp = true,
    requiredProps = {},
    rendersPortal = false,
    wrapperComponent = null,
    autoControlledProps = [],
    passesUnhandledPropsTo,
    forwardsRefTo,
  } = options;

  const { throwError } = commonHelpers('isConformant', Component);

  const defaultConfig: Partial<IsConformantOptions> = {
    customMount: mountWithProvider,
    componentPath: testPath
      .replace(/test[/\\]specs/, 'src')
      .replace('-test.', '.')
      .replace(/.ts$/, '.tsx'),
    Component,
    displayName: constructorName,
    disabledTests: ['has-top-level-file'],
    helperComponents: [Ref, RefFindNode, FocusZone],
  };

  isConformantBase(defaultConfig, options);

  const componentType = typeof Component;
  // composed components store `handledProps` under config
  const isComposedComponent: boolean = !!(Component as ComposedComponent).fluentComposeConfig;
  const handledProps = isComposedComponent
    ? (Component as ComposedComponent).fluentComposeConfig?.handledProps
    : Component.handledProps;

  const helperComponentNames = [...[Ref, RefFindNode], ...(wrapperComponent ? [wrapperComponent] : [])].map(
    getDisplayName,
  );

  const toNextNonTrivialChild = (from: ReactWrapper) => {
    const current = from.childAt(0);

    if (!current) return current;

    return helperComponentNames.indexOf(current.name()) === -1 ? current : toNextNonTrivialChild(current);
  };

  const getComponent = (wrapper: ReactWrapper) => {
    let componentElement = toNextNonTrivialChild(wrapper);

    // passing through Focus Zone wrappers
    if (componentElement.type() === FocusZone) {
      // another HOC component is added: FocusZone
      componentElement = componentElement.childAt(0); // skip through <FocusZone>
    }

    // in that case 'topLevelChildElement' we've found so far is a wrapper's topmost child
    // thus, we should continue search
    return wrapperComponent ? toNextNonTrivialChild(componentElement) : componentElement;
  };

  // make sure components are properly exported
  if (!ReactIs.isValidElementType(Component)) {
    throwError(`Components should export a valid React element type, got: ${componentType}.`);
  }

  // tests depend on Component constructor names, enforce them
  if (!constructorName) {
    throwError(
      [
        'Component is not a named function. This should help identify it:\n\n',
        `${ReactDOMServer.renderToStaticMarkup(<Component />)}`,
      ].join(''),
    );
  }

  // ----------------------------------------
  // Component info
  // ----------------------------------------
  // This is pretty ugly because:
  // - jest doesn't support custom error messages
  // - jest will run all test
  const infoJSONPath = `@fluentui/react-northstar/componentInfo/${constructorName}.info.json`;

  let info;

  try {
    info = require(infoJSONPath);
  } catch (err) {
    // handled in the test() below
    test('component info file exists', () => {
      throw new Error(
        [
          '!! ==========================================================',
          `!! Missing ${infoJSONPath}.`,
          '!! Run `yarn test` or `yarn test:watch` again to generate one.',
          '!! ==========================================================',
        ].join('\n'),
      );
    });
    return null;
  }

  // ----------------------------------------
  // Props
  // ----------------------------------------
  test('spreads user props', () => {
    const propName = 'data-is-conformant-spread-props';
    const props = { [propName]: true };

    const component = mount(<Component {...requiredProps} {...props} />);

    // The component already has the prop, so we are testing if it's children also have the props,
    // that is why we are testing if it is greater then 1
    expect(component.find(props).length).toBeGreaterThan(1);
  });

  // ---------------------------------------
  // Autocontrolled props
  // ---------------------------------------
  test('autoControlled props should have prop, default prop and on change handler in handled props', () => {
    autoControlledProps.forEach(propName => {
      const capitalisedPropName = `${propName.slice(0, 1).toUpperCase()}${propName.slice(1)}`;
      const expectedDefaultProp = `default${capitalisedPropName}`;
      const expectedChangeHandler =
        propName === 'value' || propName === 'checked' ? 'onChange' : `on${capitalisedPropName}Change`;

      expect(handledProps).toContain(propName);
      expect(handledProps).toContain(expectedDefaultProp);
      expect(handledProps).toContain(expectedChangeHandler);
    });
  });

  // ---------------------------------------
  // Handled props
  // ---------------------------------------
  describe('handles props', () => {
    test('defines handled props in handledProps', () => {
      expect(handledProps).toBeDefined();
      expect(Array.isArray(handledProps)).toEqual(true);
    });

    test(`has 'styles' as handled prop`, () => {
      expect(handledProps).toContain('styles');
    });

    test(`has 'variables' as handled prop`, () => {
      expect(handledProps).toContain('variables');
    });

    test('handledProps includes props defined in autoControlledProps, defaultProps or propTypes', () => {
      const computedProps = _.union(
        Component.autoControlledProps,
        _.keys(Component.defaultProps),
        _.keys(Component.propTypes),
      );
      const expectedProps = _.uniq(computedProps).sort();

      const message =
        'Not all handled props were defined correctly. All props defined in handled props, must be defined' +
        'either in static autoControlledProps, static defaultProps or static propTypes.';

      expect({
        message,
        handledProps: handledProps.sort(),
      }).toEqual(
        expect.objectContaining({
          message,
          handledProps: expect.arrayContaining(expectedProps),
        }),
      );
    });

    const isClassComponent = !!Component.prototype?.isReactComponent;

    if (!isClassComponent) {
      test('uses "useUnhandledProps" hook', () => {
        const wrapper = passesUnhandledPropsTo
          ? mount(<Component {...requiredProps} />).find(passesUnhandledPropsTo)
          : mount(<Component {...requiredProps} />);
        const element = getComponent(wrapper);

        expect(element.prop('data-uses-unhanded-props')).toBeTruthy();
      });
    }
  });

  if (hasAccessibilityProp) {
    const role = faker.lorem.word() as AriaRole;
    const noopBehavior: Accessibility = () => ({
      attributes: {
        root: {
          [IS_FOCUSABLE_ATTRIBUTE]: true,
          role,
        },
      },
    });

    test('defines an "accessibility" prop in handledProps', () => {
      expect(handledProps).toContain('accessibility');
    });

    test('spreads "attributes" on root', () => {
      const wrapper = mount(<Component {...requiredProps} accessibility={noopBehavior} />);
      const element = getComponent(wrapper);

      expect(element.prop(IS_FOCUSABLE_ATTRIBUTE)).toBe(true);
      expect(element.prop('role')).toBe(role);
    });

    test("client's attributes override the ones provided by Fluent UI", () => {
      const wrapperProps = { ...requiredProps, [IS_FOCUSABLE_ATTRIBUTE]: false };
      const wrapper = passesUnhandledPropsTo
        ? mount(<Component {...wrapperProps} accessibility={noopBehavior} />).find(passesUnhandledPropsTo)
        : mount(<Component {...wrapperProps} accessibility={noopBehavior} />);
      const element = getComponent(wrapper);

      expect(element.prop(IS_FOCUSABLE_ATTRIBUTE)).toBe(false);
    });

    _.forEach(['onKeyDown', 'onKeyPress', 'onKeyUp'], listenerName => {
      test(`handles ${listenerName} transparently`, () => {
        // onKeyDown => keyDown
        const eventName = _.camelCase(listenerName.replace('on', ''));
        const handler = jest.fn();

        const wrapperProps = {
          ...requiredProps,
          [EVENT_TARGET_ATTRIBUTE]: true,
          [listenerName]: handler,
        };
        const wrapper = mount(<Component {...wrapperProps} />);

        getEventTargetComponent(wrapper, listenerName, eventTargets).simulate(eventName);
        expect(handler).toBeCalledTimes(1);
      });
    });
  }

  // ----------------------------------------
  // Events
  // ----------------------------------------

  test('handles events transparently', () => {
    // Events should be handled transparently, working just as they would in vanilla React.
    // Example, both of these handler()s should be called with the same event:
    //
    //   <Button onClick={handler} />
    //   <button onClick={handler} />
    //
    // This test catches the case where a developer forgot to call the event prop
    // after handling it internally. It also catch cases where the synthetic event was not passed back.
    _.each(syntheticEvent.types, ({ eventShape, listeners }) => {
      _.each(listeners, listenerName => {
        // onKeyDown => keyDown
        const eventName = _.camelCase(listenerName.replace('on', ''));

        const handlerSpy = jest.fn();
        const props = {
          ...requiredProps,
          [listenerName]: handlerSpy,
          [EVENT_TARGET_ATTRIBUTE]: true,
        };

        const component = mount(<Component {...props} />);
        const eventTarget = getEventTargetComponent(component, listenerName, eventTargets);

        const customHandler: Function = eventTarget.prop(listenerName);

        if (customHandler) {
          act(() => {
            customHandler(eventShape);
          });
        } else {
          if (Component.propTypes[listenerName]) {
            throw new Error(
              `Handler for '${listenerName}' is not passed to child event emitter element <${eventTarget.type()} />`,
            );
          }

          // We are checking only props handled by component
          return;
        }

        // give event listeners opportunity to cleanup
        if (component.instance() && component.instance().componentWillUnmount) {
          component.instance().componentWillUnmount();
        }

        // <Dropdown onBlur={handleBlur} />
        //                   ^ was not called once on "blur"
        const leftPad = ' '.repeat(info.displayName.length + listenerName.length + 3);

        // onKeyDown => handleKeyDown
        const handlerName = _.camelCase(listenerName.replace('on', 'handle'));

        try {
          expect(handlerSpy).toHaveBeenCalled();
        } catch (err) {
          throw new Error(
            [
              `<${info.displayName} ${listenerName}={${handlerName}} />\n`,
              `${leftPad} ^ was not called once on "${eventName}".`,
              'You may need to hoist your event handlers up to the root element.\n',
            ].join(''),
          );
        }

        let expectedArgs = [eventShape];
        let errorMessage = 'was not called with (event)';

        if (_.has(Component.propTypes, listenerName)) {
          expectedArgs = [eventShape, expect.objectContaining(component.props())];
          errorMessage = [
            'was not called with (event, data).\n',
            `Ensure that 'props' object is passed to '${listenerName}'\n`,
            `event handler of <${Component.displayName} />.`,
          ].join('');
        }

        // Components should return the event first, then any data
        try {
          const lastHandlerCall = _.last(handlerSpy.mock.calls);

          // We are using there a manual assert instead of `toHaveBeenLastCalledWith()` to
          // run a comparison based on `expectedArgs` instead of comparing actual args from
          // a function call.
          expectedArgs.forEach((expectedArg, argI) => {
            expect(lastHandlerCall[argI]).toEqual(expectedArg);
          });
        } catch (err) {
          throw new Error(
            [
              `<${info.displayName} ${listenerName}={${handlerName}} />\n`,
              `${leftPad} ^ ${errorMessage}`,
              'It was called with args:',
              JSON.stringify(handlerSpy.mock.calls[0], null, 2),
            ].join('\n'),
          );
        }
      });
    });
  });

  // ----------------------------------------
  // Handles className
  // ----------------------------------------
  describe('className const (common)', () => {
    const componentClassName = info.componentClassName || `ui-${Component.displayName}`.toLowerCase();
    const getClassesOfRootElement = component => {
      return component
        .find('[className]')
        .hostNodes()
        .at(wrapperComponent ? 1 : 0)
        .prop('className');
    };

    const constClassName = _.camelCase(`${Component.displayName}ClassName`);

    test(`exports a const equal to "${componentClassName}"`, () => {
      expect(FluentUI[constClassName]).toEqual(componentClassName);
    });

    test(`is applied to the root element`, () => {
      const component = mount(<Component {...requiredProps} />);

      // only test components that implement className
      if (component.find('[className]').hostNodes().length > 0) {
        expect(_.includes(getClassesOfRootElement(component), componentClassName)).toEqual(true);
      }
    });

    test("applies user's className to root component", () => {
      const className = 'is-conformant-class-string';

      // Portal powered components can render to two elements, a trigger and the actual component
      // The actual component is shown when the portal is open
      // If a trigger is rendered, open the portal and make assertions on the portal element
      // TODO some component using renderPortal = 'true'
      if (rendersPortal) {
        const mountNode = document.createElement('div');
        document.body.appendChild(mountNode);

        const wrapper = mount(<Component {...requiredProps} className={className} />, {
          attachTo: mountNode,
        });
        wrapper.setProps({ open: true } as any);

        // portals/popups/etc may render the component to somewhere besides descendants
        // we look for the component anywhere in the DOM
        assertBodyContains(`.${className}`);

        wrapper.detach();
        document.body.removeChild(mountNode);
      } else {
        const component = mount(<Component {...requiredProps} className={className} />);
        expect(_.includes(getClassesOfRootElement(component), className)).toEqual(true);
      }
    });

    test("user's className does not override the default classes", () => {
      const component = mount(<Component {...requiredProps} />);
      const defaultClasses = getClassesOfRootElement(component);

      if (!defaultClasses) return;

      const userClasses = 'generate';
      const wrapperWithCustomClasses = mount(<Component {...requiredProps} className={userClasses} />);
      const mixedClasses = getClassesOfRootElement(wrapperWithCustomClasses);

      const message = [
        'Make sure you are using the `getUnhandledProps` util to spread the `unhandledProps` props.',
        'This may also be of help: https://facebook.github.io/react/docs/transferring-props.html.',
      ].join(' ');

      defaultClasses.split(' ').forEach(defaultClass => {
        expect({ message, result: _.includes(mixedClasses, defaultClass) }).toEqual({
          message,
          result: true,
        });
      });
    });
  });

  // ---------------------------------------
  // Telemetry
  // ---------------------------------------
  describe('telemetry', () => {
    test('reports telemetry to its Provider', () => {
      const telemetry = new Telemetry();
      const wrapper = mount(<Component {...requiredProps} />, {
        wrappingComponentProps: { telemetry },
      });

      wrapper.unmount();
      expect(telemetry.performance).toHaveProperty(Component.displayName);
    });
  });

  // ---------------------------------------
  // compose()
  // ---------------------------------------
  if (isComposedComponent) {
    describe('compose', () => {
      describe('debug', () => {
        const displayName = 'ComposedComponent';
        const ComposedComponent = compose<'div', { accessibility?: Accessibility }, {}, {}, {}>(
          Component as ComposedComponent,
          {
            displayName,
          },
        );

        it('overrides default "displayName"', () => {
          expect(ComposedComponent.displayName).toBe(displayName);
        });

        it('overrides default debug name for accessibility', () => {
          const noopBehavior: Accessibility = () => ({
            attributes: {
              root: { 'aria-label': 'test' },
            },
          });

          const wrapper = mount(<ComposedComponent {...requiredProps} accessibility={noopBehavior} />);
          const element = getComponent(wrapper);

          expect(element.prop('data-aa-class')).toBe(displayName);
        });

        it('overrides default name for telemetry', () => {
          const telemetry = new Telemetry();
          const wrapper = mount(<ComposedComponent {...requiredProps} />, {
            wrappingComponentProps: { telemetry },
          });

          wrapper.unmount();
          expect(telemetry.performance).toHaveProperty(displayName);
        });
      });

      describe('styles', () => {
        type ComposedComponentProps = { test?: boolean };
        type ComposedComponentStylesProps = { stylesTest: boolean | undefined };

        const ComposedComponent = compose<'footer', ComposedComponentProps, ComposedComponentStylesProps, {}, {}>(
          Component as ComposedComponent,
          {
            className: 'ui-composed',
            mapPropsToStylesProps: props => ({ stylesTest: props.test }),
            handledProps: ['test'],
          },
        );

        it('overrides default "className"', () => {
          const wrapper = mount(<ComposedComponent {...requiredProps} test />);
          const element = getComponent(wrapper);

          expect(element.prop('className')).toContain('ui-composed');
        });

        it('allows to define additional styles props', () => {
          const renderer: Partial<Renderer> = {
            renderRule: styles => {
              const props = (styles as unknown) as ComposedComponentStylesProps;

              return props.stylesTest ? 'has-test' : 'has-not-test';
            },
          };
          const theme = {
            ...emptyTheme,
            // Noop to pass all props as styles to `renderRule()`
            componentStyles: new Proxy(
              {},
              { get: (): ComponentSlotStylesPrepared => ({ root: ({ props }) => props }) },
            ),
          };

          const wrapper = mount(<ComposedComponent {...requiredProps} />, {
            wrappingComponentProps: { renderer, theme },
          });
          expect(getComponent(wrapper).prop('className')).toContain('has-not-test');

          wrapper.setProps({ test: true });
          expect(getComponent(wrapper).prop('className')).toContain('has-test');
        });
      });

      if (forwardsRefTo !== false) {
        it('passes a ref to "root" element', () => {
          const ComposedComponent = compose<'div', { accessibility?: Accessibility }, {}, {}, {}>(
            Component as ComposedComponent,
          );
          const rootRef = jest.fn();

          const wrapper = forwardsRefTo
            ? mount(<ComposedComponent {...requiredProps} ref={rootRef} />).find(forwardsRefTo as string)
            : mount(<ComposedComponent {...requiredProps} ref={rootRef} />);

          const element = getComponent(wrapper);
          expect(typeof element.type()).toBe('string');
          expect(rootRef).toBeCalledWith(expect.objectContaining({ tagName: _.upperCase(element.type()) }));
        });
      }
    });
  }
}
