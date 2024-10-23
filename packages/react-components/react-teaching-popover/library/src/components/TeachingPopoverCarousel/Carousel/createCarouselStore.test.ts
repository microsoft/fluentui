import { createCarouselStore } from './createCarouselStore';

describe('createCarouselStore', () => {
  describe('addValue', () => {
    it('adds a value', () => {
      const store = createCarouselStore();
      store.addValue('foo');

      expect(store.getSnapshot()).toEqual(['foo']);
    });
  });

  describe('insertValue', () => {
    it('inserts a value', () => {
      const store = createCarouselStore();

      store.addValue('foo');
      store.addValue('bar');
      store.insertValue('baz', 'foo');

      expect(store.getSnapshot()).toEqual(['foo', 'baz', 'bar']);
    });
  });

  describe('removeValue', () => {
    it('removes a value', () => {
      const store = createCarouselStore();

      store.addValue('foo');
      store.addValue('bar');
      store.addValue('baz');
      store.removeValue('bar');

      expect(store.getSnapshot()).toEqual(['foo', 'baz']);
    });
  });

  describe('clear', () => {
    it('clears all values', () => {
      const store = createCarouselStore();

      store.addValue('foo');
      store.addValue('bar');
      store.clear();

      expect(store.getSnapshot()).toEqual([]);
    });
  });

  describe('subscribe', () => {
    it('subscribes to changes', () => {
      const store = createCarouselStore();
      const listener = jest.fn();

      store.subscribe(listener);
      store.addValue('foo');

      expect(listener).toHaveBeenCalled();
    });

    it('unsubscribes from changes', () => {
      const store = createCarouselStore();
      const listener = jest.fn();

      const unsubscribe = store.subscribe(listener);
      unsubscribe();
      store.addValue('foo');

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
