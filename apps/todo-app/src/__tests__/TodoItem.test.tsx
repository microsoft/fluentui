import * as React from 'react';
import { act } from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { TodoItem } from '../components/TodoItem';
import { TodoItemData } from '../types/index';

describe('TodoItem', () => {
  const item: TodoItemData = { id: 'a', title: 'Item A', isComplete: false };
  const noOp = () => undefined;
  let wrapper: ReactWrapper | undefined;

  // Run before every test
  beforeEach(() => {
    // completing or deleting uses a timeout, so use Jest's mock timers
    // https://jestjs.io/docs/en/timer-mocks.html
    jest.useFakeTimers();
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

  // This is a snapshot test, which saves the rendered output of your component into a file
  // which is checked in and can be compared against in PRs. However, something to consider is that
  // it's less than ideal to include 3rd-party libraries' components (such as Fabric) in snapshots
  // for another app, due to the amount of churn that could occur when updating the library (if
  // it's changed DOM structure or styling at all).
  // https://reactjs.org/docs/test-renderer.html
  it('renders correctly', () => {
    // Most of the test is commented out here to avoid making people run update-snapshots in this package
    // if they change any of the components inside TodoItem.
    /*const component =*/ renderer.create(<TodoItem item={item} onDeleteItem={noOp} onToggleComplete={noOp} />);
    // const tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
  });

  it('renders essential item elements', () => {
    // Enzyme's mount() simulates React rendering for testing purposes
    // https://airbnb.io/enzyme/docs/api/mount.html
    wrapper = mount(<TodoItem item={item} onDeleteItem={noOp} onToggleComplete={noOp} />);

    // ReactWrapper.text() is kind of like textContent
    expect(wrapper.text()).toBe(item.title);

    // ReactWrapper.find() is kind of like querySelectorAll
    // (but some of the operations automatically work on only the first object)
    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(checkbox).toHaveLength(1);
    expect(checkbox.prop('checked')).toBe(false);

    // ReactWrapper.prop() gets a prop value
    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.prop('title')).toBe('Delete this item');
  });

  it('can complete item', () => {
    const onComplete = jest.fn();
    wrapper = mount(<TodoItem item={item} onDeleteItem={noOp} onToggleComplete={onComplete} />);

    // Simulate clicking a checkbox
    // act() is required for testing hooks https://reactjs.org/blog/2019/02/06/react-v16.8.0.html#testing-hooks
    act(() => {
      wrapper!.find('input[type="checkbox"]').simulate('change');
    });

    // At this point, the component has updated but the wrapper is out of sync.
    wrapper.update();
    expect(wrapper.childAt(0).prop('className')).toContain('ms-slideUpOut20');

    // Run the timeout to finish the animation and hide the item
    act(() => {
      jest.runAllTimers();
    });
    // The item will be hidden and onComplete will have been called, but its completed state won't
    // have actually changed since that's normally done by the real complete callback
    expect(onComplete).toHaveBeenCalledWith(item);
    expect(getComputedStyle(wrapper.getDOMNode()).display).toBe('none');
  });

  it('can delete item', () => {
    const onDelete = jest.fn();
    wrapper = mount(<TodoItem item={item} onDeleteItem={onDelete} onToggleComplete={noOp} />);

    // This is mostly the same as the previous test, except we're clicking a button not a checkbox
    act(() => {
      wrapper!.find('button').simulate('click');
    });

    wrapper.update();
    expect(wrapper.childAt(0).prop('className')).toContain('ms-slideUpOut20');

    act(() => {
      jest.runAllTimers();
    });
    expect(onDelete).toHaveBeenCalledWith(item);
    expect(getComputedStyle(wrapper.getDOMNode()).display).toBe('none');
  });
});
