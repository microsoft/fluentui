import type { ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';

export function getAllSelectedOptions(options: ISelectableOption[], selectedIndices: number[]): ISelectableOption[] {
  const selectedOptions: ISelectableOption[] = [];
  for (const index of selectedIndices) {
    const option = options[index];

    if (option) {
      selectedOptions.push(option);
    }
  }

  return selectedOptions;
}
