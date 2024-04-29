import type { TagAppearance, TagSize } from '@fluentui/react-tags/src/index';
import type { TagPickerSize } from '../TagPicker';
import { ComboboxBaseProps } from '@fluentui/react-combobox';

export function tagPickerSizeToTagSize(size: TagPickerSize): TagSize {
  switch (size) {
    case 'medium':
      return 'extra-small';
    case 'large':
      return 'small';
    case 'extra-large':
      return 'medium';
    default:
      return 'extra-small';
  }
}

export function tagSizeToTagPickerSize(size: TagSize): TagPickerSize {
  switch (size) {
    case 'extra-small':
      return 'medium';
    case 'small':
      return 'large';
    case 'medium':
      return 'extra-large';
    default:
      return 'medium';
  }
}

export function tagPickerAppearanceToTagAppearance(appearance: ComboboxBaseProps['appearance']): TagAppearance {
  switch (appearance) {
    case 'filled-darker':
      return 'outline';
    default:
      return 'filled';
  }
}
