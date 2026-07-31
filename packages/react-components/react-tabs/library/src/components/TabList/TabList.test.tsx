import * as React from 'react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Tab } from '../Tab/index';
import { TabList } from './index';

describe('TabList', () => {
  isConformant({
    Component: TabList,
    displayName: 'TabList',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts it
    // was called with the consumer className last; this component now composes with clsx and
    // never calls mergeClasses. `classname-overrides-win` below is its cascade-native
    // replacement (DECISIONS.md D9).
    //
    // `component-has-static-classnames-object` asserts the exact `fui-<Component>` format the
    // conversion retired; `tabListClassNames` is now `{ root }` holding the group marker
    // (DECISIONS.md D16.5/D16.6) and `component-has-group-marker` (a default test) replaces it.
    disabledTests: ['component-has-static-classnames-object'],
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onTabSelect'],
      },
    },
  });

  it('renders with tabs', () => {
    const result = render(
      <TabList>
        <Tab value="1">First</Tab>
        <Tab value="2">Second</Tab>
        <Tab value="3">Third</Tab>
      </TabList>,
    );

    expect(result.container).toMatchSnapshot();
  });

  it('renders with no tabs', () => {
    const result = render(<TabList />);
    expect(result.container).toMatchSnapshot();
  });

  it('renders tabs with default selected tab', () => {
    const result = render(
      <TabList defaultSelectedValue="2">
        <Tab value="1">First</Tab>
        <Tab value="2">Second</Tab>
        <Tab value="3">Third</Tab>
      </TabList>,
    );

    expect(result.container).toMatchSnapshot();
  });

  it('renders tabs when disabled', () => {
    const result = render(
      <TabList defaultSelectedValue="2" disabled>
        <Tab value="1">First</Tab>
        <Tab value="2">Second</Tab>
        <Tab value="3">Third</Tab>
      </TabList>,
    );

    expect(result.container).toMatchSnapshot();
  });
});
