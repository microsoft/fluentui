import * as React from 'react';
import * as _ from 'lodash';
import * as path from 'path';
import { TestObject, getComponent } from '@fluentui/react-conformance';
import parseDocblock from '@fluentui/scripts/gulp/plugins/util/parseDocblock';
import { mount, ReactWrapper } from 'enzyme';
import { mountWithProvider } from '../../utils/withProvider';
import { consoleUtil } from '../../utils/index';

export type AsPropIsConformantOptions = {
  /**
   * If the component's 'as' property requires a ref, this will attach a forwardRef to the test component passed to 'as'
   * and disable the as-renders-react-class test.
   */
  asPropHandlesRef?: boolean;
};

/**
 * northstar-specific tests that run using react-conformance
 */
export const mainTests: TestObject = {
  /** Component has a docblock with 5 to 25 words */
  'has-docblock': (componentInfo, testInfo) => {
    const maxWords = 25;
    const minWords = 5;

    it(`has a docblock with ${minWords} to ${maxWords} words (has-docblock)`, () => {
      const docblock = parseDocblock(componentInfo.description);
      const description = docblock.description;
      const wordCount = _.words(description).length;

      expect(wordCount).toBeGreaterThanOrEqual(minWords);
      expect(wordCount).toBeLessThanOrEqual(maxWords);
    });
  },

  /** If the component is a subcomponent, ensure its parent has the subcomponent as static property */
  'is-static-property-of-parent': (componentInfo, testInfo) => {
    const { componentPath, displayName, Component } = testInfo;
    const componentFolder = componentPath.replace(path.basename(componentPath) + path.extname(componentPath), '');
    const dirName = path.basename(componentFolder).replace(path.extname(componentFolder), '');
    const isParent = displayName === dirName;
    if (isParent) {
      return;
    }

    it(`is a static property of its parent (is-static-property-of-parent)`, () => {
      const parentComponentFile = require(path.join(componentFolder, dirName));
      const ParentComponent = parentComponentFile.default || parentComponentFile[dirName];
      expect(ParentComponent[displayName]).toBe(Component);
    });
  },
};

/**
 * Tests specific to northstar-style `as` prop that run using react-conformance
 */
export const asPropTests: TestObject<{}, AsPropIsConformantOptions> = {
  /**
   * Renders as functional component or passes as to the next component.
   *
   * Possible resolutions if test fails:
   * - If your component doesn't have an "as" prop, enable isConformant's skipAsPropTests option.
   * - If your component uses forwardRef, enable isConformant's asPropHandlesRef option.
   * - Check if you are missing any requiredProps within the isConformant in your test file.
   * - Make sure that your component's implementation contains a valid return statement.
   * - Check to see if your component works as expected with Enzyme's mount().
   */
  'as-renders-fc': (componentInfo, testInfo) => {
    it(`renders as a functional component or passes "as" to the next  (as-renders-fc)`, () => {
      const { requiredProps, Component, wrapperComponent, helperComponents = [], asPropHandlesRef } = testInfo;
      const MyComponent = asPropHandlesRef ? React.forwardRef((props, ref) => null) : () => null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrapper = mountWithProvider(<Component {...requiredProps} {...({ as: MyComponent } as any)} />);
      const component = getComponent(wrapper, helperComponents, wrapperComponent);

      try {
        expect(component.type()).toBe(MyComponent);
      } catch (err) {
        expect(component.type()).not.toBe(Component);
        const comp = component.find('[as]').last().prop('as');
        expect(comp).toBe(MyComponent);
      }
    });
  },

  /**
   * Renders as ReactClass or passes as to the next component.
   *
   * Possible resolutions if test fails:
   * - If your component doesn't have an "as" prop, enable isConformant's skipAsPropTests option.
   * - If your component uses forwardRef, enable isConformant's asPropHandlesRef option.
   * - Check if you are missing any requiredProps within the isConformant in your test file.
   * - Make sure that your component's implementation contains a valid return statement.
   * - Check to see if your component works as expected with Enzyme's mount().
   */
  'as-renders-react-class': (componentInfo, testInfo) => {
    if (testInfo.asPropHandlesRef) {
      return;
    }

    it(`renders as a ReactClass or passes "as" to the next component (as-renders-react-class)`, () => {
      const { requiredProps, Component, wrapperComponent, helperComponents = [] } = testInfo;

      class MyComponent extends React.Component {
        render() {
          return <div data-my-react-class />;
        }
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrapper = mountWithProvider(<Component {...requiredProps} {...({ as: MyComponent } as any)} />);
      const component = getComponent(wrapper, helperComponents, wrapperComponent);

      try {
        expect(component.type()).toBe(MyComponent);
      } catch (err) {
        expect(component.type()).not.toBe(Component);
        expect(component.prop('as')).toBe(MyComponent);
      }
    });
  },

  /**
   * Passes extra props to the component it renders as.
   *
   * Possible resolutions if test fails:
   * - If your component doesn't have an "as" prop, enable isConformant's skipAsPropTests option.
   * - Ensure that you are spreading extra props to the "as" component when rendering.
   * - Ensure that there is not a problem rendering the component in isConformant (check previous test results).
   */
  'as-passes-as-value': (componentInfo, testInfo) => {
    it(`passes extra props to the component it is renders as (as-passes-as-value)`, () => {
      const { Component, requiredProps, targetComponent, asPropHandlesRef } = testInfo;

      let el: ReactWrapper;
      if (targetComponent) {
        el = mount(<Component {...requiredProps} data-extra-prop="foo" />).find(targetComponent);
      } else {
        const MyComponent = asPropHandlesRef ? React.forwardRef((props, ref) => null) : () => null;
        el = mountWithProvider(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Component {...requiredProps} {...({ as: MyComponent } as any)} data-extra-prop="foo" />,
        ).find(MyComponent);
      }

      expect(el.prop('data-extra-prop')).toBe('foo');
    });
  },

  /**
   * Renders component as HTML tags.
   *
   * Possible resolutions if it fails:
   * - If your component doesn't have an "as" prop, enable isConformant's skipAsPropTests option.
   * - Make sure that your component can correctly render as HTML tags.
   * - Check if you are missing any requiredProps within the isConformant in your test file.
   * - Make sure that your component's implementation contains a valid return statement.
   * - Check to see if your component works as expected with Enzyme's mount().
   */
  'as-renders-html': (componentInfo, testInfo) => {
    it(`renders component as HTML tags or passes "as" to the next component (as-renders-html)`, () => {
      // silence element nesting warnings
      consoleUtil.disableOnce();
      const tags = ['a', 'em', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'p', 'span', 'strong'];
      const { Component, requiredProps, wrapperComponent, helperComponents = [] } = testInfo;

      tags.forEach(tag => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wrapper = mountWithProvider(<Component {...requiredProps} {...({ as: tag } as any)} />);
        const component = getComponent(wrapper, helperComponents, wrapperComponent);

        try {
          expect(component.is(tag)).toBe(true);
        } catch (err) {
          expect(component.type()).not.toBe(Component);
          expect(component.prop('as')).toBe(tag);
        }
      });
    });
  },
};
