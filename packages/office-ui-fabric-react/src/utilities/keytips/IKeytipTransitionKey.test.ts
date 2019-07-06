import { IKeytipTransitionKey, transitionKeysAreEqual, transitionKeysContain, KeytipTransitionModifier } from './IKeytipTransitionKey';

describe('IKeytipTransitionKey', () => {
  describe('transitionKeysAreEqual', () => {
    it('key only equality', () => {
      const key1: IKeytipTransitionKey = { key: 'a' };
      const key2: IKeytipTransitionKey = { key: 'b' };
      const key3: IKeytipTransitionKey = { key: 'a' };

      expect(transitionKeysAreEqual(key1, key2)).toEqual(false);
      expect(transitionKeysAreEqual(key1, key3)).toEqual(true);
    });

    it('key and modifier equality', () => {
      const key1: IKeytipTransitionKey = { key: 'a', modifierKeys: [KeytipTransitionModifier.alt] };
      const key2: IKeytipTransitionKey = { key: 'a' };
      const key3: IKeytipTransitionKey = { key: 'a', modifierKeys: [KeytipTransitionModifier.ctrl] };
      const key4: IKeytipTransitionKey = {
        key: 'a',
        modifierKeys: [KeytipTransitionModifier.alt, KeytipTransitionModifier.shift]
      };
      const key5: IKeytipTransitionKey = {
        key: 'a',
        modifierKeys: [KeytipTransitionModifier.shift, KeytipTransitionModifier.alt]
      };

      expect(transitionKeysAreEqual(key1, key2)).toEqual(false);
      expect(transitionKeysAreEqual(key1, key3)).toEqual(false);
      expect(transitionKeysAreEqual(key1, key4)).toEqual(false);
      // Order doesn't matter
      expect(transitionKeysAreEqual(key4, key5)).toEqual(true);
    });
  });

  describe('transitionKeySequencesContain', () => {
    it('key only', () => {
      const key1: IKeytipTransitionKey = { key: 'a' };

      const keys1: IKeytipTransitionKey[] = [{ key: 'a' }];
      const keys2: IKeytipTransitionKey[] = [{ key: 'a' }, { key: 'b' }];
      const keys3: IKeytipTransitionKey[] = [{ key: 'c' }, { key: 'b' }];

      expect(transitionKeysContain(keys1, key1)).toEqual(true);
      expect(transitionKeysContain(keys2, key1)).toEqual(true);
      expect(transitionKeysContain(keys3, key1)).toEqual(false);
    });

    it('key and modifier', () => {
      const key1: IKeytipTransitionKey = { key: 'a', modifierKeys: [KeytipTransitionModifier.alt] };

      const keys1: IKeytipTransitionKey[] = [{ key: 'a', modifierKeys: [KeytipTransitionModifier.alt] }];
      const keys2: IKeytipTransitionKey[] = [{ key: 'b', modifierKeys: [KeytipTransitionModifier.alt] }];
      const keys3: IKeytipTransitionKey[] = [
        { key: 'a', modifierKeys: [KeytipTransitionModifier.alt, KeytipTransitionModifier.ctrl] },
        { key: 'a', modifierKeys: [KeytipTransitionModifier.alt] }
      ];

      expect(transitionKeysContain(keys1, key1)).toEqual(true);
      expect(transitionKeysContain(keys2, key1)).toEqual(false);
      expect(transitionKeysContain(keys3, key1)).toEqual(true);
    });
  });
});
