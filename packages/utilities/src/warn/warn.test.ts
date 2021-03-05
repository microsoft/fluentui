import { setWarningCallback } from './warn';
import { warnConditionallyRequiredProps } from './warnConditionallyRequiredProps';
import { warnMutuallyExclusive } from './warnMutuallyExclusive';
import { warnDeprecations } from './warnDeprecations';

const warningCallback = jest.fn();

function sharedBeforeEach(): void {
  setWarningCallback(warningCallback);
}

function sharedAfterEach(): void {
  warningCallback.mockReset();
  setWarningCallback(undefined);
}

describe('warnDeprecations', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('does not warn when unnecessary', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warnDeprecations('Foo', { bar: 1 }, { foo: null } as any);
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('can warn on a deprecated prop', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warnDeprecations('Foo', { foo: 1 }, { foo: null } as any);
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(`Foo property 'foo' was used but has been deprecated.`);
  });

  it('can warn on a deprecated prop with replacement', () => {
    warnDeprecations('Foo', { foo: 1 }, { foo: 'bar' });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Foo property 'foo' was used but has been deprecated. Use 'bar' instead.`,
    );
  });
});

describe('warnMutuallyExclusive', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('does not warn when unnecessary', () => {
    warnMutuallyExclusive('Foo', { foo: 1 }, { foo: 'bar' });
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('does not warn unnecessarily when the key of the exclusive map is explicitly undefined', () => {
    warnMutuallyExclusive('Foo', { foo: undefined, bar: 1 }, { foo: 'bar' });
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('does not warn unnecessarily when the matching prop of the exclusive map key is explicitly undefined', () => {
    warnMutuallyExclusive('Foo', { foo: 1, bar: undefined }, { foo: 'bar' });
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('does not warn unnecessarily when both of them are explicitly undefined', () => {
    warnMutuallyExclusive('Foo', { foo: undefined, bar: undefined }, { foo: 'bar' });
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('does not warn unnecessarily when the key of the exclusive map is implicitly undefined', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warnMutuallyExclusive('Foo', { bar: 1 }, { foo: 'bar' } as any);
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('does not warn unnecessarily when the matching prop of the exclusive map is implicitly undefined', () => {
    warnMutuallyExclusive('Foo', { foo: 1 }, { foo: 'bar' });
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('does not warn unnecessarily when both of the props are implicitly undefined ', () => {
    warnMutuallyExclusive('Foo', {}, {});
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('can warn on mutual exclusive props', () => {
    warnMutuallyExclusive('Foo', { foo: 1, bar: 1 }, { foo: 'bar' });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Foo property 'foo' is mutually exclusive with 'bar'. Use one or the other.`,
    );
  });

  it('can warn if the exclusive props with the key in the map is null', () => {
    warnMutuallyExclusive('Foo', { foo: null, bar: 1 }, { foo: 'bar' });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Foo property 'foo' is mutually exclusive with 'bar'. Use one or the other.`,
    );
  });

  it('can warn if the matching key in exclusive map is null', () => {
    warnMutuallyExclusive('Foo', { foo: 1, bar: null }, { foo: 'bar' });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Foo property 'foo' is mutually exclusive with 'bar'. Use one or the other.`,
    );
  });

  it('can warn if both of the props are null', () => {
    warnMutuallyExclusive('Foo', { foo: null, bar: null }, { foo: 'bar' });
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(
      `Foo property 'foo' is mutually exclusive with 'bar'. Use one or the other.`,
    );
  });
});

describe('warnConditionallyRequiredProps', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('does not warn when unnecessary', () => {
    warnConditionallyRequiredProps('Foo', { foo: 1, bar: 1 }, ['foo', 'bar'], 'foo', true);
    expect(warningCallback).not.toHaveBeenCalled();
  });

  it('can warn on required props', () => {
    warnConditionallyRequiredProps('Foo', { foo: 1 }, ['foo', 'bar'], 'foo', true);
    expect(warningCallback).toHaveBeenCalledTimes(1);
    expect(warningCallback).toHaveBeenLastCalledWith(`Foo property 'bar' is required when 'foo' is used.'`);
  });
});
