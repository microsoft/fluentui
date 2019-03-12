import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';

/**
 * These tests verify that Fabric components fulfill the following conditions:
 *
 *    1) The component accepts a className prop.
 *    2) The component applies the className prop to some DOM element
 *        (preferably the root element unless otherwise specified).
 *
 * Any conditions that Fabric components should fulfill can be added to this test suite.
 */

// Common props required by List-based components in order for tests to pass
const listProps = {
  items: [],
  skipViewportMeasures: true,
  onShouldVirtualize: () => false
};

// Props required by certain components in order for tests to pass
const requiredProps: { [key: string]: any } = {
  PlainCard: {
    onRenderPlainCard: () => null
  },
  Announced: {
    message: 'TestMessage'
  },
  ColorPicker: {
    color: '#ffffff'
  },
  Calendar: {
    strings: {
      months: [],
      shortMonths: [],
      days: [],
      shortDays: [],
      goToToday: ''
    }
  },
  ContextualMenu: {
    items: [{ text: 'TestText', key: 'TestKey', canCheck: true, isChecked: true }]
  },
  DetailsList: listProps,
  ExpandingCard: {
    onRenderCompactCard: () => null,
    onRenderExpandedCard: () => null
  },
  GroupedList: {
    ...listProps,
    groups: []
  },
  HoverCard: {
    target: { __events__: {} }
  },
  List: listProps,
  Modal: {
    isOpen: true
  },
  Nav: {
    groups: []
  },
  Panel: {
    isOpen: true
  },
  ResizeGroup: {
    onRenderData: () => null
  },
  SelectedPeopleList: {
    onRenderItem: () => <div key="TestItem" />,
    selectedItems: ['TestItem']
  },
  StackItem: {
    children: ['TestItem']
  },
  Suggestions: {
    suggestions: []
  },
  SuggestionsItem: {
    suggestionModel: { item: '', selected: false },
    RenderSuggestion: () => null
  },
  SwatchColorPicker: {
    colorCells: [{ id: 'TestId', color: '#ffffff' }],
    columnCount: 1
  },
  Text: {
    children: 'TestText'
  }
};

// Some components inject the className prop on a child DOM element rather than the root,
// so the test needs to look for className on the child props object that has the given class name
const classNameSelectors: { [key: string]: string } = {
  Breadcrumb: 'ms-Breadcrumb',
  Callout: 'ms-Callout',
  ContextualMenu: 'ms-ContextualMenu',
  DetailsList: 'ms-DetailsList',
  Dropdown: 'ms-Dropdown',
  ExpandingCard: 'ms-Callout',
  Modal: 'ms-Modal',
  Nav: 'ms-Nav',
  Panel: 'ms-Panel',
  PlainCard: 'ms-Callout',
  Tooltip: 'ms-Tooltip'
};

// NOTE: Please consider modifying your component to work with this test instead
//        of adding it to the exclusion list as this will make regression harder to detect.
const excludedComponents: string[] = [
  'Beak', // className is not injected
  'Button', // deprecated, test Button variants instead
  'CardCallout', // className injected one level above
  'ChoiceGroupOption', // className is not injected
  'Coachmark', // className is not injected
  'ColorRectangle', // className is not injected
  'ContextualMenuItemWrapper', // className is not injected
  'Dialog', // className is deprecated
  'Keytip', // helper component, not meant to take a className
  'KeytipData', // helper component, not meant to take a className
  'KeytipLayer', // helper component, not meant to take a className
  'Layer', // className is not injected
  'PersonaPresence', // className is not injected
  'PositioningContainer', // className is not injected
  'Rating', // className is not injected
  'SelectedPeopleList', // does not accept className
  'ShimmerCircle', // className is not injected
  'ShimmerElementsGroup', // className is not injected
  'ShimmerLine', // className is not injected
  'ShimmerGap', // className is not injected
  'SpinButton', // className is not injected
  'Sticky', // accepts stickyClassName instead of className
  'TeachingBubble', // does not accept className
  'ThemeGenerator' // not intended to be tested
];

// Some components require nodes to be mocked when creating the test component (e.g. components that use refs)
const mockNodeComponents = ['ScrollablePane'];

/**
 * Automatically consume and test any components that are exported
 * from a file that matches its parent folder name (e.g. ActivityItem/ActivityItem.tsx)
 *
 * If you are here and are getting a failure due to a component you recently added,
 *    here are some options:
 *
 *    1) Is the test failing due to a runtime error in the component, or is the component null?
 *       The component may require certain props in order to render. Consider adding the props to the
 *       requiredProps object above.
 *
 *    2) Does the component inject its className prop onto an element other than the root?
 *       Consider adding the class name of the element where the className prop is injected
 *       to the classNameSelectors list above.
 *
 *    3) Does the component use refs? It may need DOM nodes to be mocked.
 *       Consider adding the component name to the mockNodeComponents list above.
 *
 * In any case, adding your component to the exclusion list is discouraged as this will make regression
 *    harder to catch.
 */
describe('Component File Conformance', () => {
  beforeAll(() => {
    // Mock Layer since otherwise components that use Layer will have empty JSON representations
    jest.mock('./Layer', () => {
      return {
        Layer: jest.fn().mockImplementation(props => {
          return props.children;
        })
      };
    });
  });

  const files: string[] = glob.sync(path.resolve(process.cwd(), 'src/components/**/*.ts*')).filter((file: string) => {
    const componentName = path.basename(path.dirname(file));
    const fileName = path.basename(file);
    const isComponentFile = fileName === componentName + '.tsx' || fileName === componentName + '.ts';
    return isComponentFile && excludedComponents.indexOf(componentName) === -1;
  });

  files.forEach((file: string) => {
    const componentName = path.basename(file).split('.')[0];

    it(componentName + ' injects a className prop', () => {
      try {
        const ComponentFile = require(file);
        const Component: React.ComponentClass = ComponentFile[componentName];
        if (!Component || typeof Component !== 'function') {
          return;
        }

        const testClass = 'testClass';
        const props = {
          ...requiredProps[componentName],
          className: testClass
        };

        let component;
        if (mockNodeComponents.indexOf(componentName) === -1) {
          component = renderer.create(<Component {...props} />);
        } else {
          component = renderer.create(<Component {...props} />, {
            createNodeMock: () => {
              return { __events__: {} };
            }
          });
        }

        const json = component.toJSON();
        if (!json) {
          fail(componentName + ' is null');
          return;
        }

        let componentProps = json.props;
        if (classNameSelectors[componentName]) {
          const instanceHasClassName = (instance: renderer.ReactTestInstance) => {
            return instance.props.className && instance.props.className.split(' ').indexOf(classNameSelectors[componentName]) !== -1;
          };
          componentProps = component.root.find(instanceHasClassName).props;
        }

        expect(componentProps.className).toContain(testClass);
      } catch (e) {
        console.warn(
          'ERROR: ' +
            e +
            ', TEST NOTE: Failure with ' +
            componentName +
            '. ' +
            'Have you recently added a component? If so, please see notes in Conformance.test.tsx.'
        );
      }
    });
  });
});

describe('Top Level Component File Conformance', () => {
  const privateComponents = new Set(['ContextualMenuItemWrapper']);

  const components: string[] = glob
    .sync(path.resolve(process.cwd(), 'src/components/**/index.ts*'))
    .map(file => {
      const componentName = path.basename(path.dirname(file));
      return componentName[0] === componentName[0].toUpperCase() ? path.basename(path.dirname(file)) : '';
    })
    .filter(f => f && !privateComponents.has(f));

  const topLevelComponentFiles = components
    .map(f => {
      for (const fileName of [`${f}.ts`, `${f}.tsx`]) {
        const fullPath = path.resolve(__dirname, '..', fileName);
        if (fs.existsSync(fullPath)) {
          return fullPath;
        }
      }
      return '';
    })
    .filter(f => f);

  beforeEach(() => {
    jest.resetModules();
  });

  // Top Level Compoennt File Compliance -
  // make sure that there is a corresponding top level component file for each component in the directory
  components.forEach(componentName => {
    it(`${componentName} has a corresponding top level component file`, () => {
      expect(
        fs.existsSync(path.resolve(__dirname, `../${componentName}.ts`)) ||
          fs.existsSync(path.resolve(__dirname, `../${componentName}.tsx`))
      ).toBeTruthy();
    });
  });

  // make sure that there is a version import in each corresponding top level component file
  topLevelComponentFiles.forEach(file => {
    const componentName = path.basename(file).split('.')[0];

    it(componentName + ' imports the OUFR version file', () => {
      (window as any).__packages__ = null;
      require(file);
      expect((window as any).__packages__['office-ui-fabric-react']).not.toBeUndefined();
    });
  });
});
