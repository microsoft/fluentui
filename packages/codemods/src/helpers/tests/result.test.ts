import { Err, Ok, Result } from '../result';

const getOkay = <T, Z>(okay: T, left: Z): Result<T, Z> => {
  return Ok<T, Z>(okay!);
};

const getError = <T, Z>(okay: T, error: Z): Result<T, Z> => {
  return Err<T, Z>(error!);
};

describe('Maybe', () => {
  it('chained Okay value is evaluated correctly', () => {
    expect(
      getOkay(3, '4')
        .chain(v => Ok(v + 3))
        .okOrElse(100),
    ).toBe(6);
  });

  it('chained Err value is evaluated correctly', () => {
    expect(
      getError(3, '4')
        .chain(v => Ok(1))
        .okOrElse(100),
    ).toBe(100);
  });

  it('chain returning a Err returns a Err correctly', () => {
    expect(getOkay(3, '4').chain(v => Err('Error')).ok).toBe(false);
  });

  it('flattens correctly', () => {
    expect(
      getOkay(3, '4')
        .map(v => getOkay(9, 4))
        .flatten()
        .okOrElse(100),
    ).toBe(9);
  });

  it('flattens correctly', () => {
    expect(
      getOkay(3, '4')
        .map(v => getError(9, 'good'))
        .flatten()
        .errorOrElse('bad'),
    ).toBe('good');
  });

  it('fMaps correctly on Okay', () => {
    expect(
      getOkay(3, '4')
        .map(v => 'Good')
        .okOrElse('Bad'),
    ).toBe('Good');
  });

  it('fMaps correctly on Err', () => {
    expect(
      getError(3, '4')
        .map(v => 'Good')
        .okOrElse('Bad'),
    ).toBe('Bad');
  });

  it('Thens correctly on Okay', () => {
    expect(
      getOkay(3, '4')
        .then(v => 30)
        .then(v => v.toString())
        .okOrElse('Bad'),
    ).toBe('30');
  });

  it('Thens correctly on Err', () => {
    expect(
      getError(3, '4')
        .then(v => 30)
        .then(v => v.toString())
        .okOrElse('Bad'),
    ).toBe('Bad');
  });

  it('DoEither calls Okay function with Okay object value', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    getOkay(3, '4').resolve(spyRight, spyLeft);
    expect(spyRight).toHaveBeenCalled();
    expect(spyRight).toHaveBeenCalledWith(3);
  });

  it('DoEither calls Err function with Err object value', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    getError(3, '4').resolve(spyRight, spyLeft);
    expect(spyLeft).toHaveBeenCalled();
    expect(spyLeft).toHaveBeenCalledWith('4');
  });

  it('DoEither calls Err function with Err object value after then', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    getError(3, '4')
      .then(v => 10)
      .resolve(spyRight, spyLeft);
    expect(spyLeft).toHaveBeenCalled();
    expect(spyLeft).toHaveBeenCalledWith('4');
  });
});
