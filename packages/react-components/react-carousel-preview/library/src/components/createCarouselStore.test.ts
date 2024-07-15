import { createCarouselStore } from './createCarouselStore';

describe('createCarouselStore', () => {
  describe('addValue', () => {
    it('adds a value', () => {
      const store = createCarouselStore(null);
      store.addValue('foo');

      expect(store.getSnapshot()).toEqual({ activeValue: null, values: ['foo'], loopCount: 0, navDirection: 'next' });
    });
  });

  describe('insertValue', () => {
    it('inserts a value', () => {
      const store = createCarouselStore(null);

      store.addValue('foo');
      store.addValue('bar');
      store.insertValue('baz', 'foo');

      expect(store.getSnapshot()).toEqual({
        activeValue: null,
        values: ['foo', 'baz', 'bar'],
        loopCount: 0,
        navDirection: 'next',
      });
    });
  });

  describe('removeValue', () => {
    it('removes a value', () => {
      const store = createCarouselStore(null);

      store.addValue('foo');
      store.addValue('bar');
      store.addValue('baz');
      store.removeValue('bar');

      expect(store.getSnapshot()).toEqual({
        activeValue: null,
        values: ['foo', 'baz'],
        loopCount: 0,
        navDirection: 'next',
      });
    });
  });

  describe('clear', () => {
    it('clears all values', () => {
      const store = createCarouselStore(null);

      store.addValue('foo');
      store.addValue('bar');
      store.clearValues();

      expect(store.getSnapshot()).toEqual({ activeValue: null, values: [], loopCount: 0, navDirection: 'next' });
    });
  });

  describe('subscribe', () => {
    it('subscribes to changes', () => {
      const store = createCarouselStore(null);
      const listener = jest.fn();

      store.subscribe(listener);
      store.addValue('foo');

      expect(listener).toHaveBeenCalled();
    });

    it('unsubscribes from changes', () => {
      const store = createCarouselStore(null);
      const listener = jest.fn();

      const unsubscribe = store.subscribe(listener);
      unsubscribe();
      store.addValue('foo');

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
