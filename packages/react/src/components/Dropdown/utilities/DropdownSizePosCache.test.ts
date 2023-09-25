import { DropdownSizePosCache } from './DropdownSizePosCache';
import { DropdownMenuItemType } from '../Dropdown.types';
import type { IDropdownOption } from '../Dropdown.types';

const pureOptions: IDropdownOption[] = [
  { key: 'A', text: 'Option a' },
  { key: 'B', text: 'Option b' },
  { key: 'C', text: 'Option c' },
  { key: 'D', text: 'Option d' },
  { key: 'E', text: 'Option e' },
  { key: 'F', text: 'Option f' },
  { key: 'G', text: 'Option g' },
];

const mixedOptions: IDropdownOption[] = [
  { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
  { key: 'A', text: 'Option a', title: 'I am option a.' },
  { key: 'B', text: 'Option b' },
  { key: 'C', text: 'Option c', disabled: true },
  { key: 'D', text: 'Option d' },
  { key: 'E', text: 'Option e' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'Header1', text: 'People', itemType: DropdownMenuItemType.Header },
  { key: 'F', text: 'Option f' },
  { key: 'G', text: 'Option g' },
  { key: 'H', text: 'Option h' },
  { key: 'I', text: 'Option i' },
  { key: 'J', text: 'Option j' },
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
    const optionsWithHidden: IDropdownOption[] = [
      { key: '0', text: 'Option 0', hidden: true }, // position in set 1
      ...pureOptions, // position in set 2 through 8
      { key: 'header-2', text: 'Header', itemType: DropdownMenuItemType.Header }, // position in set 9
      { key: 'divider-2', text: '-', itemType: DropdownMenuItemType.Divider },
      { key: 'h', text: 'Option J', hidden: true },
      { key: 'i', text: 'Option H', hidden: true },
    ];
    const cache: DropdownSizePosCache = new DropdownSizePosCache();

    cache.updateOptions(optionsWithHidden);

    expect(cache.optionSetSize).toBe(pureOptions.length);
    expect(cache.positionInSet(0)).toBe(undefined);
    expect(cache.positionInSet(1)).toBe(1);
    expect(cache.positionInSet(7)).toBe(7);
    expect(cache.positionInSet(8)).toBe(undefined);
    expect(cache.positionInSet(11)).toBe(undefined);
  });
});
