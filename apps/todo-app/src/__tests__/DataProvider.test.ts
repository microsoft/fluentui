import { DataProvider } from '../DataProvider';
import { TodoItemData } from '../types/index';

// This test is meant as a demonstration of Jest testing.
// Note that in a real app which connects to a server, you'd need to set up a mock data provider.
// https://jestjs.io/docs/en/manual-mocks
// https://jestjs.io/docs/en/es6-class-mocks
describe('DataProvider', () => {
  // Run once before any of the tests
  beforeAll(() => {
    // Some of the DataProvider operations use a timer to simulate loading from the server
    jest.useFakeTimers();
    // DataProvider uses Math.random() to generate GUIDs (not good in tests)
    jest.spyOn(Math, 'random').mockImplementation(() => 0);
  });

  // Run before every test
  beforeEach(() => {
    // DataProvider operations use timeouts, so use Jest's mock timers
    // https://jestjs.io/docs/en/timer-mocks.html
    jest.useFakeTimers();
  });

  // Run after every test
  afterEach(() => {
    jest.useRealTimers();
  });

  // Run once after the tests finish
  afterAll(() => {
    // no-op for now
  });

  const items: TodoItemData[] = ['a', 'b', 'c', 'd', 'e'].map(id => ({
    id,
    title: 'Item ' + id.toUpperCase(),
    isComplete: false,
  }));

  it('uses items passed in', () => {
    const dataProvider = new DataProvider(items);
    jest.runOnlyPendingTimers(); // "load" the items

    // toEqual and toBe are matchers: https://jestjs.io/docs/en/using-matchers
    // toEqual does deep comparisons
    expect(dataProvider.items).toEqual(items);
    // toBe is like ===
    expect(dataProvider.isLoading).toBe(false);
  });

  it('calls change listener', () => {
    const dataProvider = new DataProvider();
    jest.runOnlyPendingTimers(); // "load" the items

    // jest.fn() returns a mock/spy function (can optionally provide an implementation)
    // https://jestjs.io/docs/en/mock-functions
    const onChangeItems = jest.fn();
    dataProvider.addListener(onChangeItems);

    dataProvider.items = items;
    expect(onChangeItems).toHaveBeenCalledTimes(1);
    expect(dataProvider.items).toEqual(items);
  });

  it('removes change listener', () => {
    const dataProvider = new DataProvider();
    jest.runOnlyPendingTimers(); // "load" the items

    const onChangeItems = jest.fn();
    dataProvider.addListener(onChangeItems);

    dataProvider.items = items;
    expect(onChangeItems).toHaveBeenCalledTimes(1);

    // not called after removal
    dataProvider.removeListener(onChangeItems);
    dataProvider.items = [items[1]];
    expect(onChangeItems).toHaveBeenCalledTimes(1);
  });

  it('creates an item', async () => {
    const startItems = [items[0]];
    const generateId = () => 'id';
    const dataProvider = new DataProvider(startItems, generateId);
    jest.runOnlyPendingTimers(); // "load" the items

    const onChangeItems = jest.fn();
    dataProvider.addListener(onChangeItems);

    const itemPromise = dataProvider.createItem('text');
    expect(dataProvider.isLoading).toBe(true);
    expect(onChangeItems).toHaveBeenCalledTimes(1);
    // createItem does a timeout to simulate loading from a server--fast forward through it
    jest.runAllTimers();

    // If you return a promise from a test, Jest will wait for it to complete
    const updatedItems = await itemPromise;
    // More matchers https://jestjs.io/docs/en/expect
    expect(onChangeItems).toHaveBeenCalledTimes(2);
    expect(dataProvider.isLoading).toBe(false);
    expect(updatedItems).toBe(dataProvider.items);
    expect(updatedItems).toHaveLength(2);
    expect(updatedItems[1]).toEqual({ id: 'id', title: 'text', isComplete: false });
    // didn't mutate original array
    expect(startItems).toHaveLength(1);
  });

  it('completes an item', async () => {
    const startItems = [items[0], items[1]];
    const dataProvider = new DataProvider(startItems);
    jest.runOnlyPendingTimers(); // "load" the items

    const onChangeItems = jest.fn();
    dataProvider.addListener(onChangeItems);

    await dataProvider.toggleComplete(startItems[0]);
    expect(onChangeItems).toHaveBeenCalledTimes(1);
    expect(dataProvider.items).toEqual([{ ...startItems[0], isComplete: true }, startItems[1]]);
    // didn't mutate original item
    expect(startItems[0].isComplete).toBe(false);
  });

  it('errors when completing nonexistent item', async () => {
    const dataProvider = new DataProvider();
    const onChangeItems = jest.fn();
    dataProvider.addListener(onChangeItems);

    try {
      const completePromise = dataProvider.toggleComplete(items[0]);
      jest.runOnlyPendingTimers();
      await completePromise;
      // shouldn't get here
      throw new Error('method should have thrown an error');
    } catch (err) {
      expect(err.message).toEqual(`Item id "${items[0].id}" can't be completed because it doesn't exist.`);
      expect(onChangeItems).toHaveBeenCalledTimes(0);
    }
  });

  it('deletes an item', async () => {
    const startItems = [items[0], items[1]];
    const dataProvider = new DataProvider(startItems);
    jest.runOnlyPendingTimers(); // "load" the items

    const onChangeItems = jest.fn();
    dataProvider.addListener(onChangeItems);

    const deletePromise = dataProvider.deleteItem(startItems[0]);
    jest.runOnlyPendingTimers(); // "load" the items
    await deletePromise;
    expect(onChangeItems).toHaveBeenCalledTimes(1);
    expect(dataProvider.items).toEqual([startItems[1]]);
    // didn't mutate original array
    expect(startItems).toHaveLength(2);
  });

  it('errors when deleting nonexistent item', async () => {
    const dataProvider = new DataProvider();
    const onChangeItems = jest.fn();
    dataProvider.addListener(onChangeItems);

    try {
      const deletePromise = dataProvider.deleteItem(items[0]);
      jest.runOnlyPendingTimers();
      await deletePromise;
      // shouldn't get here
      throw new Error('method should have thrown an error');
    } catch (err) {
      expect(err.message).toEqual(`Item id "${items[0].id}" can't be deleted because it doesn't exist.`);
      expect(onChangeItems).toHaveBeenCalledTimes(0);
    }
  });
});
