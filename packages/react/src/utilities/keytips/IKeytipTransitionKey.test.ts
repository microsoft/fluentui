import { transitionKeysAreEqual, transitionKeysContain } from './IKeytipTransitionKey';
import { KeyCodes } from '@fluentui/utilities';
import type { IKeytipTransitionKey } from './IKeytipTransitionKey';

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
      const key1: IKeytipTransitionKey = { key: 'a', modifierKeys: [KeyCodes.alt] };
      const key2: IKeytipTransitionKey = { key: 'a' };
      const key3: IKeytipTransitionKey = { key: 'a', modifierKeys: [KeyCodes.ctrl] };
      const key4: IKeytipTransitionKey = {
        key: 'a',
        modifierKeys: [KeyCodes.alt, KeyCodes.shift],
      };
      const key5: IKeytipTransitionKey = {
        key: 'a',
        modifierKeys: [KeyCodes.shift, KeyCodes.alt],
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
      const key1: IKeytipTransitionKey = { key: 'a', modifierKeys: [KeyCodes.alt] };

      const keys1: IKeytipTransitionKey[] = [{ key: 'a', modifierKeys: [KeyCodes.alt] }];
      const keys2: IKeytipTransitionKey[] = [{ key: 'b', modifierKeys: [KeyCodes.alt] }];
      const keys3: IKeytipTransitionKey[] = [
        { key: 'a', modifierKeys: [KeyCodes.alt, KeyCodes.ctrl] },
        { key: 'a', modifierKeys: [KeyCodes.alt] },
      ];

      expect(transitionKeysContain(keys1, key1)).toEqual(true);
      expect(transitionKeysContain(keys2, key1)).toEqual(false);
      expect(transitionKeysContain(keys3, key1)).toEqual(true);
    });
  });
});
