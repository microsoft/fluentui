import { IUnifiedPickerProps } from '../UnifiedPicker.types';
import { Omit } from '@fluentui/utilities';
import { IPersonaProps } from '@fluentui/react/lib/Persona';

export type IUnifiedPeoplePickerProps = Omit<
  IUnifiedPickerProps<IPersonaProps>,
  'onRenderSelectedItems' | 'onRenderFloatingSuggestions'
>;
