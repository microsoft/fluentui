import { DropdownSizePosCache } from './DropdownSizePosCache';
import { IDropdownOption, DropdownMenuItemType } from '../Dropdown.types';

const pureOptions: IDropdownOption[] = [
  { key: 'A', text: 'Option a' },
  { key: 'B', text: 'Option b' },
  { key: 'C', text: 'Option c' },
  { key: 'D', text: 'Option d' },
  { key: 'E', text: 'Option e' },
  { key: 'F', text: 'Option f' },
  { key: 'G', text: 'Option g' }
];

const mixedOptions: IDropdownOption[] = [
  { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
  { key: 'A', text: 'Option a', title: 'I am option a.' },
  { key: 'B', text: 'Option b' },
  { key: 'C', text: 'Option c', disabled: true },
  { key: 'D', text: 'Option d' },
  { key: 'E', text: 'Option e' },
  { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
  { key: 'F', text: 'Option f' },
  { key: 'G', text: 'Option g' },
  { key: 'H', text: 'Option h' },
  { key: 'I', text: 'Option i' },
  { key: 'J', text: 'Option j' }
];

describe('DropdownSizePosCache', () => {
  it('works correctly when all options are selectable', () => {
    const cache: DropdownSizePosCache = new DropdownSizePosCache();
    cache.updateOptions(pureOptions);
    expect(cache.optionSetSize).toBe(7);
    expect(cache.positionInSet(3)).toBe(4);
    expect(cache.positionInSet(undefined)).toBe(undefined);
  });

  it('works correctly when there are display only options', () => {
    const cache: DropdownSizePosCache = new DropdownSizePosCache();
    cache.updateOptions(mixedOptions);

    // implicitly, this means we count disabled items too in the set
    // because when the dropdown is expanded, this is the current behavior...
    expect(cache.optionSetSize).toBe(10);
    expect(cache.positionInSet(undefined)).toBe(undefined);
    expect(cache.positionInSet(1)).toBe(1);

    expect(cache.positionInSet(4)).toBe(4);
    expect(cache.positionInSet(9)).toBe(7);
    expect(() => {
      cache.positionInSet(0);
    }).toThrow();
  });

  it('update cache works correctly', () => {
    const cache: DropdownSizePosCache = new DropdownSizePosCache();
    cache.updateOptions(mixedOptions);
    expect(cache.optionSetSize).toBe(10);
    expect(cache.positionInSet(undefined)).toBe(undefined);
    expect(cache.positionInSet(1)).toBe(1);
    expect(cache.positionInSet(4)).toBe(4);
    expect(cache.positionInSet(9)).toBe(7);
    cache.updateOptions(pureOptions);
    expect(cache.optionSetSize).toBe(7);
    expect(cache.positionInSet(3)).toBe(4);
  });

  it('will respect hidden flag', () => {
    const optionsWithHidden: IDropdownOption[] = [...pureOptions, { key: 'K', text: 'Option k', hidden: true }];
    const cache: DropdownSizePosCache = new DropdownSizePosCache();
    cache.updateOptions(optionsWithHidden);

    expect(cache.optionSetSize).toBe(optionsWithHidden.length - 1);
  });
});
