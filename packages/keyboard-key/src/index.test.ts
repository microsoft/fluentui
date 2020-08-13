import { codes } from './codes';
import { getCode, getKey, keyboardKey } from './index';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('keyboardKey', () => {
  it('has a key/value for every value/key in codes', () => {
    Object.keys(codes).forEach(code => {
      const name = codes[Number(code)];

      if (Array.isArray(name)) {
        expect(String((keyboardKey as any)[name[0]])).toEqual(code);
        expect(String((keyboardKey as any)[name[1]])).toEqual(code);
      } else {
        expect(String((keyboardKey as any)[name])).toEqual(code);
      }
    });
  });

  describe('getCode', () => {
    it('is a function', () => {
      expect(getCode).toBeInstanceOf(Function);
    });
    it('returns the code for a given key name', () => {
      expect(getCode('Enter')).toEqual(13);
    });
    it('handles all key names in codes', () => {
      Object.keys(codes).forEach(code => {
        const name = codes[code];
        const _code = Number(code);

        if (Array.isArray(name)) {
          expect(getCode(name[0])).toEqual(_code);
          expect(getCode(name[1])).toEqual(_code);
        } else {
          expect(getCode(name)).toEqual(_code);
        }
      });
    });

    it('handles event like objects with `key` prop', () => {
      Object.keys(codes).forEach(code => {
        const name = codes[code];
        const _code = Number(code);

        if (Array.isArray(name)) {
          const key0 = { key: name[0], which: _code, keyCode: _code, shiftKey: false };
          const key1 = { key: name[1], which: _code, keyCode: _code, shiftKey: false };

          expect(getCode(key0)).toEqual(_code);
          expect(getCode(key1)).toEqual(_code);
        } else {
          const key = { key: name, which: _code, keyCode: _code, shiftKey: false };
          expect(getCode(key)).toEqual(_code);
        }
      });
    });
  });

  describe('getKey', () => {
    it('is a function', () => {
      expect(getKey).toBeInstanceOf(Function);
    });
    it('returns the code for a given key name', () => {
      expect(getKey(13)).toEqual('Enter');
    });
    it('handles all codes', () => {
      Object.keys(codes).forEach(code => {
        const name = codes[code];
        const keyName = getKey(Number(code));
        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like object: { keyCode: code, shiftKey: false }`', () => {
      Object.keys(codes).forEach(code => {
        const name = codes[code];
        const _code = Number(code);
        const keyName = getKey({ which: _code, keyCode: _code, shiftKey: false });

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like object: { keyCode: code, shiftKey: true }`', () => {
      Object.keys(codes).forEach(code => {
        const name = codes[code];
        const keyName = getKey({ keyCode: Number(code), shiftKey: true });

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[1]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like object: { which: code, shiftKey: false }', () => {
      Object.keys(codes).forEach(code => {
        const name = codes[code];
        const keyName = getKey({ which: Number(code), shiftKey: false });

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like object: { which: code, shiftKey: true }', () => {
      Object.keys(codes).forEach(code => {
        const name = codes[code];
        const keyName = getKey({ which: Number(code), shiftKey: true });

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[1]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like objects with a `key` property', () => {
      const keyName = getKey({ key: '/' });
      expect(keyName).toEqual('/');
    });
  });
});
