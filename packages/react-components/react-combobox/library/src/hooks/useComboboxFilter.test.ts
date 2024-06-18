import { renderHook } from '@testing-library/react-hooks';
import { useComboboxFilter } from './useComboboxFilter';

describe('useComboboxFilter', () => {
  const options = [
    { children: 'Alligator', value: '1' },
    { children: 'Bee', value: '2' },
    { children: 'Bird', value: '3' },
    { children: 'Cheetah', value: '4' },
    { children: 'Dog', value: '5' },
    { children: 'Dolphin', value: '6' },
    { children: 'Ferret', value: '7' },
    { children: 'Firefly', value: '8' },
    { children: 'Fish', value: '9' },
    { children: 'Goat', value: '10' },
    { children: 'Horse', value: '11' },
    { children: 'Lion', value: '12' },
  ];

  it('returns all options when the query is empty', () => {
    const query = '';
    const { result } = renderHook(() => useComboboxFilter(query, options, {}));

    expect(result.current).toHaveLength(options.length);
  });

  it('filters options in according to the query', () => {
    const query = 'al';
    const { result } = renderHook(() => useComboboxFilter(query, options, {}));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].props.children).toBe('Alligator');
  });

  it('filters options in according to the query (string options)', () => {
    const query = 'al';
    const comboboxOptions = options.map(option => option.children);
    const { result } = renderHook(() => useComboboxFilter(query, comboboxOptions, {}));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].props.children).toEqual('Alligator');
  });

  it('filters with a custom filter function', () => {
    const query = 'a';
    const { result } = renderHook(() =>
      useComboboxFilter(query, options, {
        filter: (optionText, q) => optionText.toLowerCase().startsWith(q),
      }),
    );

    expect(result.current).toHaveLength(1);
    expect(result.current[0].props.children).toBe('Alligator');
  });

  it('returns no options message when there are no matches', () => {
    const { result } = renderHook(() => useComboboxFilter('xyz', options, {}));

    expect(result.current).toHaveLength(1);
    expect(result.current[0].props.children).toBe("We couldn't find any matches.");
  });
});
