import { Maybe, Something, Nothing } from '../maybe';

describe('Maybe', () => {
  it('new just has correct just value', () => {
    expect(Something(1).something).toBe(true);
    expect(Something('').something).toBe(true);
  });

  it('new just has correct value', () => {
    expect(Something(0).value).toBe(0);
    expect(Something('').value).toBe('');
  });

  it('just will error if you pass it undefined', () => {
    let error = false;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Something(undefined as any);
    } catch (_) {
      error = true;
    }
    expect(error).toBe(true);
  });

  it('new nothing has correct just value', () => {
    expect(Nothing().something).toBe(false);
  });

  it('maybe returns correct types', () => {
    const ma = Maybe(1);
    expect(ma.something).toBe(true);
    expect(ma.orElse(0)).toBe(1);

    const mb = Maybe(0);
    expect(mb.something).toBe(true);
    expect(mb.orElse(4)).toBe(0);

    const mc = Maybe('');
    expect(mc.something).toBe(true);
    expect(mc.orElse('error')).toBe('');
  });

  it('then returns another maybe', () => {
    expect(Maybe(10).then(v => 'asd').something).toBeDefined();
    expect(Maybe(undefined).then(v => 'asd').something).toBeDefined();
  });

  it('then returns nothing if undefined', () => {
    expect(Maybe(undefined).then(v => 'asd').something).toEqual(false);
  });

  it('then returns new maybe if it has a value', () => {
    expect(
      Maybe('avalue')
        .then(v => 'good')
        .orElse('bad'),
    ).toEqual('good');
  });

  it('then returns single maybe if maybe returned', () => {
    expect(
      Maybe('foo')
        .then(v => Maybe('newValue'))
        .orElse('bad'),
    ).toEqual('newValue');
  });

  it('wraps undefined in Maybe correctly', () => {
    expect(
      Maybe('foo')
        .then<string>(v => undefined as unknown as string)
        .orElse('defaultValue'),
    ).toEqual('defaultValue');
  });

  it('flattens a nested maybe correctly', () => {
    expect(Maybe(Maybe('foo')).flatten().orElse('newValue')).toEqual('foo');
  });

  it('flattens a single maybe directly', () => {
    expect(Maybe('foo').flatten().orElse('newValue')).toEqual('foo');
  });

  it('flattens a single maybe directly', () => {
    expect(
      Maybe(Maybe(Maybe('foo')))
        .flatten()
        .flatten()
        .orElse('newValue'),
    ).toEqual('foo');
  });
});
