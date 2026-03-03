import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { useTabsterAttributes } from '@fluentui/react-tabster';
import { Tab } from './Tab';
import { isConformant } from '../../testing/isConformant';
import { TabListContext } from '../TabList/TabListContext';
import { TabListContextValue } from '../TabList/TabList.types';
import { CalendarMonthRegular } from '@fluentui/react-icons';

describe('Tab', () => {
  isConformant({
    Component: Tab,
    displayName: 'Tab',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            content: 'Test Content',
          },
        },
      ],
    },
  });

  const defaultContext: TabListContextValue = {
    appearance: 'transparent',
    disabled: false,
    size: 'medium',
    vertical: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onRegister: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onUnregister: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSelect: () => {},
    getRegisteredTabs: () => {
      return {
        registeredTabs: {},
      };
    },
  };

  it('renders correctly', () => {
    const contextValues = {
      tabList: { ...defaultContext },
    };

    const result = render(
      <TabListContext.Provider value={contextValues.tabList}>
        <Tab value="1">Default Tab</Tab>
      </TabListContext.Provider>,
    );

    expect(result.container).toMatchSnapshot();
  });

  it('selected when clicked', () => {
    const onSelect = jest.fn();

    const contextValues = {
      tabList: { ...defaultContext, onSelect },
    };

    const result = render(
      <TabListContext.Provider value={contextValues.tabList}>
        <Tab value="1">Default Tab</Tab>
      </TabListContext.Provider>,
    );

    fireEvent.click(result.getByRole('tab'));
    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { value: '1' });
  });

  it.each([
    ['default', { ...defaultContext }],
    ['subtle appearance', { ...defaultContext, appearance: 'subtle' }],
    ['vertical', { ...defaultContext, vertical: true }],
    ['small size', { ...defaultContext, size: 'small' }],
    ['small size and vertical', { ...defaultContext, size: 'small', vertical: true }],
    ['medium size', { ...defaultContext, size: 'medium' }],
    ['medium size and vertical', { ...defaultContext, size: 'medium', vertical: true }],
    ['large size', { ...defaultContext, size: 'large' }],
    ['large size and vertical', { ...defaultContext, size: 'large', vertical: true }],
  ])('renders %s correctly with icon slotted', (_testName, tabList) => {
    const contextValues = {
      tabList: tabList as TabListContextValue,
    };

    const result = render(
      <TabListContext.Provider value={contextValues.tabList}>
        <Tab icon={<CalendarMonthRegular />} value="1">
          Default Tab
        </Tab>
      </TabListContext.Provider>,
    );

    expect(result.container).toMatchSnapshot();
  });

  it('renders correctly when disabled', () => {
    const contextValues = {
      tabList: { ...defaultContext },
    };

    const result = render(
      <TabListContext.Provider value={contextValues.tabList}>
        <Tab value="1" disabled>
          Default Tab
        </Tab>
      </TabListContext.Provider>,
    );

    expect(result.container).toMatchSnapshot();
  });

  it('calls the ref function for content slot once', () => {
    const contextValues = {
      tabList: { ...defaultContext },
    };

    const ref = jest.fn();

    render(
      <TabListContext.Provider value={contextValues.tabList}>
        <Tab value="1" content={{ ref }}>
          Default Tab
        </Tab>
      </TabListContext.Provider>,
    );

    expect(ref).toHaveBeenCalledTimes(1);
  });

  it('tabster attributes can be overridden', () => {
    const AttrProvider: React.FC<{
      children: (attributes: ReturnType<typeof useTabsterAttributes>) => React.ReactNode;
    }> = props => {
      const attributes = useTabsterAttributes({
        observed: { names: ['foo'] },
      });

      return props.children(attributes);
    };

    const { getAllByRole } = render(
      <>
        <AttrProvider>
          {attributes => (
            <Tab value="1" {...attributes}>
              Tab 1
            </Tab>
          )}
        </AttrProvider>
        <Tab value="2">Tab 2</Tab>
      </>,
    );

    const tabs = getAllByRole('tab');

    expect(tabs).toHaveLength(2);

    const tab1 = tabs[0];
    const tab2 = tabs[1];

    expect(tab1.dataset).toMatchInlineSnapshot(`
      DOMStringMap {
        "tabster": "{\\"observed\\":{\\"names\\":[\\"foo\\"]}}",
      }
    `);
    expect(tab2.dataset).toMatchInlineSnapshot(`
      DOMStringMap {
        "tabster": "{\\"focusable\\":{\\"isDefault\\":false}}",
      }
    `);
  });
});
