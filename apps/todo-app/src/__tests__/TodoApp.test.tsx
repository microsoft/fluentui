import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, ReactWrapper } from 'enzyme';
import { TodoApp } from '../components/TodoApp';
import { TodoItemData } from '../types/index';
import { DataProvider } from '../DataProvider';

describe('TodoApp', () => {
  const items: TodoItemData[] = ['a', 'b', 'c', 'd', 'e'].map(id => ({
    id,
    title: 'Item ' + id.toUpperCase(),
    isComplete: false,
  }));
  /** CSS selector for the first item */
  const itemASelector = '[data-item-id="a"]';

  let wrapper: ReactWrapper | undefined;
  let dataProvider: DataProvider;

  function runOnlyPendingTimers() {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  }

  // Run before every test
  beforeEach(() => {
    // completing or deleting uses a timeout, so use Jest's mock timers
    // https://jestjs.io/docs/en/timer-mocks.html
    jest.useFakeTimers();
    dataProvider = new DataProvider(items);
  });

  // Run after every test
  afterEach(() => {
    jest.useRealTimers();
    if (wrapper) {
      // Enzyme doesn't automatically unmount the wrapper. Do this manually to prevent tests from bleeding over.
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  it('can complete item (full action)', () => {
    const spy = jest.spyOn(dataProvider, 'toggleComplete');
    wrapper = mount(<TodoApp dataProvider={dataProvider} />);

    // "load" the items
    runOnlyPendingTimers();
    wrapper.update();

    expect(wrapper.find(itemASelector)).toHaveLength(1);

    // Simulate clicking a checkbox
    // act() is required for testing hooks https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks
    act(() => {
      wrapper!.find(`${itemASelector} input`).simulate('change');
    });

    // let the animation finish
    runOnlyPendingTimers();
    wrapper.update();

    expect(spy).toHaveBeenCalledWith(items[0]);
    expect(wrapper.find(itemASelector)).toHaveLength(0);
    expect(dataProvider.items[0].isComplete).toEqual(true);
  });

  it('can delete item (full action)', () => {
    const spy = jest.spyOn(dataProvider, 'deleteItem');
    wrapper = mount(<TodoApp dataProvider={dataProvider} />);

    // "load" the items
    runOnlyPendingTimers();
    wrapper.update();

    expect(wrapper.find(itemASelector)).toHaveLength(1);

    // This is mostly the same as the previous test, except we're clicking a button not a checkbox
    act(() => {
      wrapper!.find(`${itemASelector} button`).simulate('click');
    });

    // let the animation and "loading" finish
    runOnlyPendingTimers();
    runOnlyPendingTimers();
    wrapper.update();

    expect(spy).toHaveBeenCalledWith(items[0]);
    expect(wrapper.find(itemASelector)).toHaveLength(0);
    expect(dataProvider.items[0].id).not.toEqual('a');
  });
});
