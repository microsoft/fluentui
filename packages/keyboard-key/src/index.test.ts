import keyboardKey from './index';

// tslint:disable:no-any

describe('keyboardKey', () => {
  it('has a key/value for every value/key in codes', () => {
    Object.keys(keyboardKey.codes).forEach(code => {
      const name = keyboardKey.codes[Number(code)];

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
      expect(keyboardKey.getCode).toBeInstanceOf(Function);
    });
    it('returns the code for a given key name', () => {
      expect(keyboardKey.getCode('Enter')).toEqual(13);
    });
    it('handles all key names in codes', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code];
        const _code = Number(code);

        if (Array.isArray(name)) {
          expect(keyboardKey.getCode(name[0])).toEqual(_code);
          expect(keyboardKey.getCode(name[1])).toEqual(_code);
        } else {
          expect(keyboardKey.getCode(name)).toEqual(_code);
        }
      });
    });

    it('handles event like objects with `key` prop', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code];
        const _code = Number(code);

        if (Array.isArray(name)) {
          const key0 = { key: name[0], which: _code, keyCode: _code, shiftKey: false };
          const key1 = { key: name[1], which: _code, keyCode: _code, shiftKey: false };

          expect(keyboardKey.getCode(key0)).toEqual(_code);
          expect(keyboardKey.getCode(key1)).toEqual(_code);
        } else {
          const key = { key: name, which: _code, keyCode: _code, shiftKey: false };
          expect(keyboardKey.getCode(key)).toEqual(_code);
        }
      });
    });
  });

  describe('getKey', () => {
    it('is a function', () => {
      expect(keyboardKey.getKey).toBeInstanceOf(Function);
    });
    it('returns the code for a given key name', () => {
      expect(keyboardKey.getKey(13)).toEqual('Enter');
    });
    it('handles all codes', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code];
        const keyName = keyboardKey.getKey(Number(code));
        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like object: { keyCode: code, shiftKey: false }`', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code];
        const _code = Number(code);
        const keyName = keyboardKey.getKey({ which: _code, keyCode: _code, shiftKey: false });

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like object: { keyCode: code, shiftKey: true }`', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code];
        const keyName = keyboardKey.getKey({ keyCode: Number(code), shiftKey: true });

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[1]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like object: { which: code, shiftKey: false }', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code];
        const keyName = keyboardKey.getKey({ which: Number(code), shiftKey: false });

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[0]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like object: { which: code, shiftKey: true }', () => {
      Object.keys(keyboardKey.codes).forEach(code => {
        const name = keyboardKey.codes[code];
        const keyName = keyboardKey.getKey({ which: Number(code), shiftKey: true });

        if (Array.isArray(name)) {
          expect(keyName).toEqual(name[1]);
        } else {
          expect(keyName).toEqual(name);
        }
      });
    });
    it('handles event like objects with a `key` property', () => {
      const keyName = keyboardKey.getKey({ key: '/' });
      expect(keyName).toEqual('/');
    });
  });
});
