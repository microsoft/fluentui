import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { InteractiveTab } from './InteractiveTab';
import { isConformant } from '../../testing/isConformant';
import { TabListContext } from '../TabList';
import type { TabListContextValue } from '../TabList';

describe('InteractiveTab', () => {
  isConformant({
    Component: InteractiveTab,
    displayName: 'InteractiveTab',
    primarySlot: 'button',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
            children: 'Test Content',
            contentBefore: 'Test Content Before',
            contentAfter: 'Test Content After',
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
        <InteractiveTab value="1" contentBefore="Before" contentAfter="After">
          Default Tab
        </InteractiveTab>
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
        <InteractiveTab value="1" contentBefore="Before" contentAfter="After">
          Default Tab
        </InteractiveTab>
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
        <InteractiveTab icon={<CalendarMonthRegular />} value="1" contentBefore="Before" contentAfter="After">
          Default Tab
        </InteractiveTab>
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
        <InteractiveTab value="1" disabled contentBefore="Before" contentAfter="After">
          Default Tab
        </InteractiveTab>
      </TabListContext.Provider>,
    );

    expect(result.container).toMatchSnapshot();
  });
});
