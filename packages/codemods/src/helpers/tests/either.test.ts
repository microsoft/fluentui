import { Left, Right, Either, DoEither } from '../either';

const getEither = <T, Z>(right: T, left: Z, returnLeft: boolean = false): Either<T, Z> => {
  if (returnLeft) {
    return Left<T, Z>(left!);
  }
  return Right<T, Z>(right!);
};

describe('Maybe', () => {
  it('chained Right value is evaluated correctly', () => {
    expect(
      getEither(3, '4')
        .chain(v => Right(v + 3))
        .rightOrElse(100),
    ).toBe(6);
  });

  it('chained Left value is evaluated correctly', () => {
    expect(
      getEither(3, '4', true)
        .chain(v => Right(1))
        .rightOrElse(100),
    ).toBe(100);
  });

  it('chain returning a Left returns a Left correctly', () => {
    expect(getEither(3, '4').chain(v => Left('Error')).left).toBe(true);
  });

  it('flattens correctly', () => {
    expect(
      getEither(3, '4')
        .fmap(v => getEither(9, 4))
        .flatten()
        .rightOrElse(100),
    ).toBe(9);
  });

  it('flattens correctly', () => {
    expect(
      getEither(3, '4')
        .fmap(v => getEither(9, 'good', true))
        .flatten()
        .leftOrElse('bad'),
    ).toBe('good');
  });

  it('fMaps correctly on Right', () => {
    expect(
      getEither(3, '4')
        .fmap(v => 'Good')
        .rightOrElse('Bad'),
    ).toBe('Good');
  });

  it('fMaps correctly on Left', () => {
    expect(
      getEither(3, '4', true)
        .fmap(v => 'Good')
        .rightOrElse('Bad'),
    ).toBe('Bad');
  });

  it('Thens correctly on Right', () => {
    expect(
      getEither(3, '4')
        .then(v => 30)
        .then(v => v.toString())
        .rightOrElse('Bad'),
    ).toBe('30');
  });

  it('Thens correctly on Left', () => {
    expect(
      getEither(3, '4', true)
        .then(v => 30)
        .then(v => v.toString())
        .rightOrElse('Bad'),
    ).toBe('Bad');
  });

  it('DoEither calls right function with Right object value', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    const either = getEither(3, '4');
    DoEither(either, spyRight, spyLeft);
    expect(spyRight).toHaveBeenCalled();
    expect(spyRight).toHaveBeenCalledWith(3);
  });

  it('DoEither calls left function with Left object value', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    const either = getEither(3, '4', true);
    DoEither(either, spyRight, spyLeft);
    expect(spyLeft).toHaveBeenCalled();
    expect(spyLeft).toHaveBeenCalledWith('4');
  });

  it('DoEither calls left function with Left object value after then', () => {
    const spyLeft = jest.fn();
    const spyRight = jest.fn();
    const either = getEither(3, '4', true).then(v => 10);
    DoEither(either, spyRight, spyLeft);
    expect(spyLeft).toHaveBeenCalled();
    expect(spyLeft).toHaveBeenCalledWith('4');
  });
});
