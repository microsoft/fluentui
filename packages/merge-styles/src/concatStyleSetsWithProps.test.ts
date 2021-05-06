import { concatStyleSetsWithProps } from './concatStyleSetsWithProps';
import { IStyle } from './IStyle';

type IFooProps = {
  foo: string;
};

describe('concatStyleSetsWithProps', () => {
  it('can resolve styles with props', () => {
    const result = concatStyleSetsWithProps<IFooProps, { root: IStyle }>(
      { foo: 'bar' },
      (props: IFooProps) => ({ root: { background: props.foo } }),
      (props: IFooProps) => ({ root: { color: props.foo } }),
    );

    expect(result).toEqual({ root: [{ background: 'bar' }, { color: 'bar' }] });
  });

  it('can resolve mixed objects and functions', () => {
    const result = concatStyleSetsWithProps<IFooProps, { root: IStyle }>(
      { foo: 'bar' },
      { root: { background: 'red' } },
      (props: IFooProps) => ({ root: { color: props.foo } }),
    );

    expect(result).toEqual({ root: [{ background: 'red' }, { color: 'bar' }] });
  });
});
