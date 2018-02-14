import { IKeytipTransitionKey, transitionKeysAreEqual, transitionKeysContain } from './IKeytipTransitionKey';
import { ModifierKeyCodes } from '../keytip/ModifierKeyCodes';

describe('IKeytipTransitionKey', () => {

  describe('transitionKeysAreEqual', () => {
    it('key only equality', () => {
      let key1: IKeytipTransitionKey = { key: 'a' };
      let key2: IKeytipTransitionKey = { key: 'b' };
      let key3: IKeytipTransitionKey = { key: 'a' };

      expect(transitionKeysAreEqual(key1, key2)).toEqual(false);
      expect(transitionKeysAreEqual(key1, key3)).toEqual(true);
    });

    it('key and modifier equality', () => {
      let key1: IKeytipTransitionKey = { key: 'a', modifierKeys: [ModifierKeyCodes.alt] };
      let key2: IKeytipTransitionKey = { key: 'a' };
      let key3: IKeytipTransitionKey = { key: 'a', modifierKeys: [ModifierKeyCodes.ctrl] };
      let key4: IKeytipTransitionKey = { key: 'a', modifierKeys: [ModifierKeyCodes.alt, ModifierKeyCodes.shift] };
      let key5: IKeytipTransitionKey = { key: 'a', modifierKeys: [ModifierKeyCodes.shift, ModifierKeyCodes.alt] };

      expect(transitionKeysAreEqual(key1, key2)).toEqual(false);
      expect(transitionKeysAreEqual(key1, key3)).toEqual(false);
      expect(transitionKeysAreEqual(key1, key4)).toEqual(false);
      // Order doesn't matter
      expect(transitionKeysAreEqual(key4, key5)).toEqual(true);
    });
  });

  describe('transitionKeySequencesContain', () => {
    it('key only', () => {
      let key1: IKeytipTransitionKey = { key: 'a' };

      let keys1: IKeytipTransitionKey[] = [{ key: 'a' }];
      let keys2: IKeytipTransitionKey[] = [{ key: 'a' }, { key: 'b' }];
      let keys3: IKeytipTransitionKey[] = [{ key: 'c' }, { key: 'b' }];

      expect(transitionKeysContain(keys1, key1)).toEqual(true);
      expect(transitionKeysContain(keys2, key1)).toEqual(true);
      expect(transitionKeysContain(keys3, key1)).toEqual(false);
    });

    it('key and modifier', () => {
      let key1: IKeytipTransitionKey = { key: 'a', modifierKeys: [ModifierKeyCodes.alt] };

      let keys1: IKeytipTransitionKey[] = [{ key: 'a', modifierKeys: [ModifierKeyCodes.alt] }];
      let keys2: IKeytipTransitionKey[] = [{ key: 'b', modifierKeys: [ModifierKeyCodes.alt] }];
      let keys3: IKeytipTransitionKey[] = [
        { key: 'a', modifierKeys: [ModifierKeyCodes.alt, ModifierKeyCodes.ctrl] },
        { key: 'a', modifierKeys: [ModifierKeyCodes.alt] }
      ];

      expect(transitionKeysContain(keys1, key1)).toEqual(true);
      expect(transitionKeysContain(keys2, key1)).toEqual(false);
      expect(transitionKeysContain(keys3, key1)).toEqual(true);
    });
  });
});