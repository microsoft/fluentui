import { IUnifiedPickerProps } from '../UnifiedPicker.types';
import { Omit } from '@uifabric/utilities';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';

export type IUnifiedPeoplePickerProps = Omit<
  IUnifiedPickerProps<IPersonaProps>,
  'onRenderSelectedItems' | 'onRenderFloatingSuggestions'
>;
