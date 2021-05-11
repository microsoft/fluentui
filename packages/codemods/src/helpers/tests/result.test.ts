import { Err, Ok, Result } from '../result';

const getOk = <T, Z>(ok: T, err: Z): Result<T, Z> => {
  return Ok<T, Z>(ok!);
};

const getErr = <T, Z>(okay: T, err: Z): Result<T, Z> => {
  return Err<T, Z>(err!);
};

describe('Result', () => {
  it('chained Okay value is evaluated correctly', () => {
    expect(
      getOk(3, '4')
        .chain(v => Ok(v + 3))
        .okOrElse(100),
    ).toBe(6);
  });

  it('errChained Err value is evaluated correctly', () => {
    expect(
      getErr(3, '4')
        .errChain(v => Err<number, number>(7))
        .errOrElse(100),
    ).toBe(7);
  });

  it('chained Err value is evaluated correctly', () => {
    expect(
      getErr(3, '4')
        .chain(v => Ok(1))
        .okOrElse(100),
    ).toBe(100);
  });

  it('chained Err value is evaluated correctly', () => {
    expect(
      getErr(3, '4')
        .errChain(v => Ok(1))
        .okOrElse(100),
    ).toBe(1);
  });

  it('chain returning a Err returns a Err correctly', () => {
    expect(getOk(3, '4').chain(v => Err('Error')).ok).toBe(false);
  });

  it('errChain returning an Ok returns an Ok correctly', () => {
    expect(getOk(3, '4').chain(v => Ok('Error')).ok).toBe(true);
  });

  it('Thens correctly on Ok', () => {
    expect(
      getOk(3, '4')
        .then(v => 30)
        .then(v => v.toString())
        .okOrElse('Bad'),
    ).toBe('30');
  });

  it('Thens correctly on Err', () => {
    expect(
      getErr(3, '4')
        .then(v => 30)
        .then(v => v.toString())
        .okOrElse('Bad'),
    ).toBe('Bad');
  });

  it('orThens correctly on Err', () => {
    expect(
      getErr(3, '4')
        .errThen(v => 30)
        .errThen(v => v.toString())
        .errOrElse('Bad'),
    ).toBe('30');
  });

  it('orThens correctly on Ok', () => {
    expect(
      getOk(3, '4')
        .errThen(v => 30)
        .errThen(v => v.toString())
        .errOrElse('Bad'),
    ).toBe('Bad');
  });

  it('resolve calls Ok function with Ok object value', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    getOk(3, '4').resolve(spyRight, spyLeft);
    expect(spyRight).toHaveBeenCalled();
    expect(spyRight).toHaveBeenCalledWith(3);
  });

  it('resolve calls Err function with Err object value', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    getErr(3, '4').resolve(spyRight, spyLeft);
    expect(spyLeft).toHaveBeenCalled();
    expect(spyLeft).toHaveBeenCalledWith('4');
  });

  it('resolve calls Err function with Err object value after then', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    getErr(3, '4')
      .then(v => 10)
      .resolve(spyRight, spyLeft);
    expect(spyLeft).toHaveBeenCalled();
    expect(spyLeft).toHaveBeenCalledWith('4');
  });
});
