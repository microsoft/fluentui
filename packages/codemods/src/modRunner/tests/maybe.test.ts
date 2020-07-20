import { Maybe, Just, Nothing } from '../../maybe';

describe('Maybe', () => {
  it('new just has correct just value', () => {
    expect(Just(1).just).toBe(true);
    expect(Just('').just).toBe(true);
  });

  it('new just has correct value', () => {
    expect(Just(0).value).toBe(0);
    expect(Just('').value).toBe('');
  });

  it('just will error if you pass it undefined', () => {
    let error = false;
    try {
      Just(undefined as unknown);
    } catch (_) {
      error = true;
    }
    expect(error).toBe(true);
  });

  it('new nothing has correct just value', () => {
    expect(Nothing().just).toBe(false);
  });

  it('maybe returns correct types', () => {
    const ma = Maybe(1);
    expect(ma.just).toBe(true);
    expect(ma.orElse(0)).toBe(1);

    const mb = Maybe(0);
    expect(mb.just).toBe(true);
    expect(mb.orElse(4)).toBe(0);

    const mc = Maybe('');
    expect(mc.just).toBe(true);
    expect(mc.orElse('error')).toBe('');
  });

  it('then returns another maybe', () => {
    expect(Maybe(10).then(v => 'asd').just).toBeDefined();
    expect(Maybe(undefined).then(v => 'asd').just).toBeDefined();
  });

  it('then returns nothing if undefined', () => {
    expect(Maybe(undefined).then(v => 'asd').just).toEqual(false);
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
        .then<string>(v => (undefined as unknown) as string)
        .orElse('defaultValue'),
    ).toEqual('defaultValue');
  });
});
