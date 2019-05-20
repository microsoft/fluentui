import { setWarningCallback } from './warn';
import { warnConditionallyRequiredProps } from './warnConditionallyRequiredProps';
import { warnMutuallyExclusive } from './warnMutuallyExclusive';
import { warnDeprecations } from './warnDeprecations';

let _lastWarning: string | undefined;

describe('warnDeprecations', () => {
  beforeEach(() => {
    _lastWarning = undefined;
    setWarningCallback((message: string) => (_lastWarning = message));
  });

  afterEach(() => setWarningCallback(undefined));

  it('does not warn when unnecessary', () => {
    // tslint:disable-next-line:no-any
    warnDeprecations('Foo', { bar: 1 }, { foo: null } as any);
    expect(_lastWarning).toEqual(undefined);
  });

  it('can warn on a deprecated prop', () => {
    // tslint:disable-next-line:no-any
    warnDeprecations('Foo', { foo: 1 }, { foo: null } as any);
    expect(_lastWarning).toEqual(`Foo property 'foo' was used but has been deprecated.`);
  });

  it('can warn on a deprecated prop with replacement', () => {
    warnDeprecations('Foo', { foo: 1 }, { foo: 'bar' });
    expect(_lastWarning).toEqual(`Foo property 'foo' was used but has been deprecated. Use 'bar' instead.`);
  });
});

describe('warnMutuallyExclusive', () => {
  beforeEach(() => {
    _lastWarning = undefined;
    setWarningCallback((message: string) => (_lastWarning = message));
  });

  afterEach(() => setWarningCallback(undefined));

  it('does not warn when unnecessary', () => {
    warnMutuallyExclusive('Foo', { foo: 1 }, { foo: 'bar' });
    expect(_lastWarning).toEqual(undefined);
  });

  it('does not warn unnecessarily when the key of the exclusive map is explicitly undefined', () => {
    warnMutuallyExclusive('Foo', { foo: undefined, bar: 1 }, { foo: 'bar' });
    expect(_lastWarning).toEqual(undefined);
  });

  it('does not warn unnecessarily when the matching prop of the exclusive map key is explicitly undefined', () => {
    warnMutuallyExclusive('Foo', { foo: 1, bar: undefined }, { foo: 'bar' });
    expect(_lastWarning).toEqual(undefined);
  });

  it('does not warn unnecessarily both of them are undefined', () => {
    warnMutuallyExclusive('Foo', { foo: undefined, bar: undefined }, { foo: 'bar' });
    expect(_lastWarning).toEqual(undefined);
  });

  it('does not warn unnecessarily when the key of the exclusive map is implicitly undefined', () => {
    // tslint:disable-next-line:no-any
    warnMutuallyExclusive('Foo', { bar: 1 }, { foo: 'bar' } as any);
    expect(_lastWarning).toEqual(undefined);
  });

  it('does not warn unnecessarily when the matching prop of the exclusive map is implicitly undefined', () => {
    warnMutuallyExclusive('Foo', { foo: 1 }, { foo: 'bar' });
    expect(_lastWarning).toEqual(undefined);
  });

  it('does not warn unnecessarily when both of the props are implicitly undefined ', () => {
    warnMutuallyExclusive('Foo', {}, {});
    expect(_lastWarning).toEqual(undefined);
  });

  it('can warn on mutual exclusive props', () => {
    warnMutuallyExclusive('Foo', { foo: 1, bar: 1 }, { foo: 'bar' });
    expect(_lastWarning).toEqual(`Foo property 'foo' is mutually exclusive with 'bar'. Use one or the other.`);
  });

  it('can warn if the exclusive props with the key in the map is null', () => {
    warnMutuallyExclusive('Foo', { foo: null, bar: 1 }, { foo: 'bar' });
    expect(_lastWarning).toEqual(`Foo property 'foo' is mutually exclusive with 'bar'. Use one or the other.`);
  });

  it('can warn if the matching key in exclusive map is null', () => {
    warnMutuallyExclusive('Foo', { foo: 1, bar: null }, { foo: 'bar' });
    expect(_lastWarning).toEqual(`Foo property 'foo' is mutually exclusive with 'bar'. Use one or the other.`);
  });

  it('can warn if both of the exclusive props are null', () => {
    warnMutuallyExclusive('Foo', { foo: null, bar: null }, { foo: 'bar' });
    expect(_lastWarning).toEqual(`Foo property 'foo' is mutually exclusive with 'bar'. Use one or the other.`);
  });
});

describe('warnConditionallyRequiredProps', () => {
  beforeEach(() => {
    _lastWarning = undefined;
    setWarningCallback((message: string) => (_lastWarning = message));
  });

  afterEach(() => setWarningCallback(undefined));

  it('does not warn when unnecessary', () => {
    warnConditionallyRequiredProps('Foo', { Foo: 1, Bar: 1 }, ['Foo', 'Bar'], 'Foo', 'foo' === 'foo');
    expect(_lastWarning).toEqual(undefined);
  });

  it('can warn on required props', () => {
    warnConditionallyRequiredProps('Foo', { Foo: 1, bar: 1 }, ['Foo', 'Bar'], 'Foo', 'foo' === 'foo');
    expect(_lastWarning).toEqual(`Foo property 'Bar' is required when 'Foo' is used.'`);
  });
});
