import type { IUnifiedPickerProps } from '../UnifiedPicker.types';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';

export type IUnifiedPeoplePickerProps = Omit<
  IUnifiedPickerProps<IPersonaProps>,
  'onRenderSelectedItems' | 'onRenderFloatingSuggestions'
>;
