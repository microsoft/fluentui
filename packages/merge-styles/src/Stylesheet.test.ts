import { InjectionMode, IStyleSheetConfig, Stylesheet } from './Stylesheet';

describe('Stylesheet', () => {
  let _stylesheet: Stylesheet;

  const resetStylesheetInstanceSetup = () => {
    (window as Window & { __stylesheet__?: Stylesheet }).__stylesheet__ = undefined;
  };

  const cacheClassNameSetup = (stylesheet: Stylesheet) => {
    const className = stylesheet.getClassName();
    const key = 'kobzol';
    const args = [{ background: 'red' }];
    const rules = ['a { background: red };'];

    stylesheet.cacheClassName(className, key, args, rules);

    return {
      args,
      className,
      key,
      rules,
      stylesheet,
    };
  };

  beforeEach(() => {
    resetStylesheetInstanceSetup();
    _stylesheet = Stylesheet.getInstance();
    // We need to set InjectionMode to none as we are running headless tests and have no element to inject into.
    _stylesheet.setConfig({ injectionMode: InjectionMode.none });
  });

  describe('test util', () => {
    it('resetStylesheetInstanceSetup works', () => {
      const instance = Stylesheet.getInstance();

      expect(instance).toBe(_stylesheet);

      resetStylesheetInstanceSetup();

      const newInstance = Stylesheet.getInstance();

      expect(newInstance).not.toBe(_stylesheet);
    });

    it('cacheClassNameSetup works', () => {
      const setupReturn = cacheClassNameSetup(_stylesheet);

      const classNameCache = _stylesheet.getClassNameCache();

      expect(setupReturn).toEqual({
        args: [{ background: 'red' }],
        className: 'css-0',
        key: 'kobzol',
        rules: ['a { background: red };'],
        stylesheet: _stylesheet,
      });
      expect(classNameCache).toEqual({
        [setupReturn.key]: setupReturn.className,
      });
    });
  });

  describe('config', () => {
    it('can override the default prefix', () => {
      _stylesheet.setConfig({ defaultPrefix: 'myCss' });

      const className = _stylesheet.getClassName();

      expect(className).toEqual('myCss-0');
    });

    it('can provide className namespace', () => {
      _stylesheet.setConfig({ namespace: 'kobzol' });

      const className = _stylesheet.getClassName();

      expect(className).toEqual('kobzol-css-0');
    });
  });

  describe('public API', () => {
    describe('getInstance', () => {
      it('returns same instance of Stylesheet', () => {
        const instance = Stylesheet.getInstance();

        expect(instance).toBe(_stylesheet);
      });

      it('returns a new instance on mismatched global', () => {
        // We need to modify internals in order to mock this behaviour.
        (_stylesheet as any)._lastStyleElement = { ownerDocument: {} };

        const newInstance = Stylesheet.getInstance();

        expect(newInstance).not.toBe(_stylesheet);
      });
    });

    describe('setConfig', () => {
      it('accepts IStyleSheetConfig and returns void', () => {
        const config: IStyleSheetConfig = {
          defaultPrefix: 'myCss',
          namespace: 'kobzol',
        };

        const returnVal = _stylesheet.setConfig(config);

        expect(returnVal).toBe(undefined);
      });
    });

    describe('reset', () => {
      it('fully resets stylesheet', () => {
        _stylesheet.getClassName();
        _stylesheet.insertRule('a { background: red };');

        _stylesheet.reset();

        const classNameCache = _stylesheet.getClassNameCache();
        const rules = _stylesheet.getRules();
        const className = _stylesheet.getClassName();

        expect(classNameCache).toEqual({});
        expect(rules).toEqual('');
        // Check for counter reset.
        expect(className).toEqual('css-0');
      });

      it('does not reset preserved rules', () => {
        _stylesheet.insertRule('a { background: red };', true);

        _stylesheet.reset();

        const rules = _stylesheet.getRules(true);

        expect(rules).toEqual('a { background: red };');
      });
    });

    describe('resetKeys', () => {
      it('resets keys of cached classNames', () => {
        cacheClassNameSetup(_stylesheet);

        _stylesheet.resetKeys();

        const classNameCache = _stylesheet.getClassNameCache();

        expect(classNameCache).toEqual({});
      });

      it('does not call an onReset() callback', () => {
        const onResetFn = jest.fn();

        _stylesheet.onReset(onResetFn);
        _stylesheet.resetKeys();

        expect(onResetFn).toHaveBeenCalledTimes(0);
      });
    });

    describe('onReset', () => {
      it('gets called with callbacks when reset() is called', () => {
        const onResetFn = jest.fn();

        _stylesheet.onReset(onResetFn);
        _stylesheet.reset();

        expect(onResetFn).toHaveBeenCalledTimes(1);
      });

      it('provides a way to unregister a callback', () => {
        const onResetFn1 = jest.fn();
        const onResetFn2 = jest.fn();

        const unregister1 = _stylesheet.onReset(onResetFn1);
        _stylesheet.onReset(onResetFn2);
        _stylesheet.reset();

        expect(onResetFn1).toHaveBeenCalledTimes(1);
        expect(onResetFn2).toHaveBeenCalledTimes(1);

        unregister1();
        _stylesheet.reset();

        expect(onResetFn1).toHaveBeenCalledTimes(1);
        expect(onResetFn2).toHaveBeenCalledTimes(2);
      });
    });

    describe('getClassName', () => {
      it('generates indexed names', () => {
        const class1 = _stylesheet.getClassName();
        const class2 = _stylesheet.getClassName();
        const class3 = _stylesheet.getClassName();

        expect(class1).toEqual('css-0');
        expect(class2).toEqual('css-1');
        expect(class3).toEqual('css-2');
      });

      it('gets default prefix from config', () => {
        _stylesheet.setConfig({ defaultPrefix: 'myCss' });

        const className = _stylesheet.getClassName();

        expect(className).toEqual('myCss-0');
      });

      it('gets namespace from config', () => {
        _stylesheet.setConfig({ namespace: 'kobzol' });

        const className = _stylesheet.getClassName();

        expect(className).toEqual('kobzol-css-0');
      });

      it('accepts displayName override over default prefix', () => {
        const className = _stylesheet.getClassName('kobzol');

        expect(className).toEqual('kobzol-0');
      });
    });

    describe('cacheClassName', () => {
      it('preserves className in a cache', () => {
        const { className, key } = cacheClassNameSetup(_stylesheet);

        const classNameCache = _stylesheet.getClassNameCache();

        expect(classNameCache).toEqual({
          [key]: className,
        });
      });
    });

    describe('classNameFromKey', () => {
      it('fetches preserved className from cache', () => {
        const { className, key } = cacheClassNameSetup(_stylesheet);

        const result = _stylesheet.classNameFromKey(key);

        expect(result).toEqual(className);
      });
    });

    describe('argsFromClassName', () => {
      it('gets args from a cached className', () => {
        const { args, className } = cacheClassNameSetup(_stylesheet);

        const result = _stylesheet.argsFromClassName(className);

        expect(result).toEqual(args);
      });

      it('returns "undefined" if classNames is not in cache', () => {
        cacheClassNameSetup(_stylesheet);

        const result = _stylesheet.argsFromClassName('uncached-className');

        expect(result).toBeUndefined();
      });
    });

    describe('insertedRulesFromClassName', () => {
      it('gets rules from a cached className', () => {
        const { rules, className } = cacheClassNameSetup(_stylesheet);

        const result = _stylesheet.insertedRulesFromClassName(className);

        expect(result).toEqual(rules);
      });

      it('returns "undefined" if classNames is not in cache', () => {
        cacheClassNameSetup(_stylesheet);

        const result = _stylesheet.insertedRulesFromClassName('uncached-className');

        expect(result).toBeUndefined();
      });
    });

    describe('insertRule', () => {
      it('inserts a rule into a stylesheet', () => {
        _stylesheet.insertRule('a { background: red };');

        const rules = _stylesheet.getRules();

        expect(rules).toEqual('a { background: red };');
      });

      it('can insert a preserved rule into a stylesheet', () => {
        _stylesheet.insertRule('a { background: red };', true);

        _stylesheet.reset();
        const rules = _stylesheet.getRules(true);

        expect(rules).toEqual('a { background: red };');
      });

      it('DEPRECATED: calls onInsertRuleCallback from config upon rule insertion', () => {
        const onInsertRuleFn = jest.fn();
        _stylesheet.setConfig({ onInsertRule: onInsertRuleFn });
        _stylesheet.insertRule('a { background: red };');

        expect(onInsertRuleFn).toHaveBeenCalledTimes(1);
        expect(onInsertRuleFn).toHaveBeenCalledWith('a { background: red };');
      });
    });

    describe('onInsertRule', () => {
      it('gets called with callbacks when insertRule() is called', () => {
        const onInsertRuleFn = jest.fn();

        _stylesheet.onInsertRule(onInsertRuleFn);
        _stylesheet.insertRule('a { background: red };');

        expect(onInsertRuleFn).toHaveBeenCalledTimes(1);
      });

      it('provides a way to unregister a callback', () => {
        const onInsertRuleFn1 = jest.fn();
        const onInsertRuleFn2 = jest.fn();

        const unregister1 = _stylesheet.onInsertRule(onInsertRuleFn1);
        _stylesheet.onInsertRule(onInsertRuleFn2);
        _stylesheet.insertRule('a { background: red };');

        expect(onInsertRuleFn1).toHaveBeenCalledTimes(1);
        expect(onInsertRuleFn2).toHaveBeenCalledTimes(1);

        unregister1();
        _stylesheet.insertRule('a { background: red };');

        expect(onInsertRuleFn1).toHaveBeenCalledTimes(1);
        expect(onInsertRuleFn2).toHaveBeenCalledTimes(2);
      });
    });

    describe('getRules', () => {
      it('gets rules defined in stylesheet', () => {
        _stylesheet.insertRule('a { background: red };');
        _stylesheet.insertRule('h1 { background: blue };');

        const rules = _stylesheet.getRules();

        expect(rules).toEqual('a { background: red };h1 { background: blue };');
      });

      it('gets preserved rules defined in stylesheet when "includePreservedRules" is true', () => {
        _stylesheet.insertRule('a { background: red };', true);
        _stylesheet.insertRule('h1 { background: blue };', true);

        const rules = _stylesheet.getRules(true);

        expect(rules).toEqual(
          'a { background: red };h1 { background: blue };a { background: red };h1 { background: blue };',
        );
      });

      it('omits preserved rules defined in stylesheet when "includePreservedRules" is undefined', () => {
        _stylesheet.insertRule('a { background: red };', true);
        _stylesheet.insertRule('h1 { background: blue };', true);

        const rules = _stylesheet.getRules();

        expect(rules).toEqual('a { background: red };h1 { background: blue };');
      });

      it('omits preserved rules defined in stylesheet when "includePreservedRules" is false', () => {
        _stylesheet.insertRule('a { background: red };', true);
        _stylesheet.insertRule('h1 { background: blue };', true);

        const rules = _stylesheet.getRules(false);

        expect(rules).toEqual('a { background: red };h1 { background: blue };');
      });

      it('prepends preserved rules before other rules', () => {
        _stylesheet.insertRule('a { background: red };');
        _stylesheet.insertRule('h1 { background: blue };', true);

        const rules = _stylesheet.getRules(true);

        expect(rules).toEqual('h1 { background: blue };a { background: red };h1 { background: blue };');
      });
    });

    describe('serialization', () => {
      it('can be serialized (empty)', () => {
        const serializedStylesheet = _stylesheet.serialize();

        expect(serializedStylesheet).toEqual(
          '{"classNameToArgs":{},"counter":0,"keyToClassName":{},"preservedRules":[],"rules":[]}',
        );
      });

      it('can be serialized (with data)', () => {
        _stylesheet.getClassName();
        _stylesheet.insertRule('a { background: red };');
        cacheClassNameSetup(_stylesheet);

        const serializedStylesheet = _stylesheet.serialize();

        expect(serializedStylesheet).toEqual(
          // eslint-disable-next-line @fluentui/max-len
          '{"classNameToArgs":{"css-1":{"args":[{"background":"red"}],"rules":["a { background: red };"]}},"counter":2,"keyToClassName":{"kobzol":"css-1"},"preservedRules":[],"rules":["a { background: red };"]}',
        );
      });

      it('can be deserialized', () => {
        const rehydrationData = JSON.parse(
          // eslint-disable-next-line @fluentui/max-len
          '{"classNameToArgs":{"css-1":{"args":[{"background":"red"}],"rules":["a { background: red };"]}},"counter":2,"keyToClassName":{"kobzol":"css-1"},"preservedRules":[],"rules":["a { background: red };"]}',
        );

        expect(rehydrationData).toStrictEqual({
          classNameToArgs: {
            'css-1': {
              args: [
                {
                  background: 'red',
                },
              ],
              rules: ['a { background: red };'],
            },
          },
          counter: 2,
          keyToClassName: {
            kobzol: 'css-1',
          },
          preservedRules: [],
          rules: ['a { background: red };'],
        });
      });
    });
  });
});
