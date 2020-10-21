import { IUnifiedPickerProps } from '../UnifiedPicker.types';
import { Omit } from '@uifabric/utilities';
import { IPersonaProps } from '@fluentui/react/lib/Persona';

export type IUnifiedPeoplePickerProps = Omit<
  IUnifiedPickerProps<IPersonaProps>,
  'onRenderSelectedItems' | 'onRenderFloatingSuggestions'
>;
