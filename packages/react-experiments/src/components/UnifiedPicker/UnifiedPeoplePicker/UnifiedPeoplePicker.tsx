import * as React from 'react';
import { IUnifiedPeoplePickerProps } from './UnifiedPeoplePicker.types';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { FloatingPeopleSuggestions } from '../../FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import { IFloatingPeopleSuggestionsProps } from '../../FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions.types';
import {
  SelectedPeopleList,
  ISelectedPeopleListProps,
} from '../../SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import { UnifiedPicker } from '../UnifiedPicker';

export const UnifiedPeoplePicker = (props: IUnifiedPeoplePickerProps): JSX.Element => {
  function renderSelectedItems(selectedPeopleListProps: ISelectedPeopleListProps<IPersonaProps>): JSX.Element {
    return <SelectedPeopleList {...selectedPeopleListProps} ref={null} />;
  }

  function renderFloatingPeopleSuggestions(floatingPeoplePickerProps: IFloatingPeopleSuggestionsProps): JSX.Element {
    return <FloatingPeopleSuggestions {...floatingPeoplePickerProps} />;
  }

  return (
    <UnifiedPicker
      {...props}
      onRenderSelectedItems={renderSelectedItems}
      onRenderFloatingSuggestions={renderFloatingPeopleSuggestions}
    />
  );
};
