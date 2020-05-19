import * as React from 'react';
import { IUnifiedPeoplePickerProps } from './UnifiedPeoplePicker.types';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { FloatingPeopleSuggestions } from '../../FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import {
  SelectedPeopleList,
  ISelectedPeopleListProps,
} from '../../SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import { UnifiedPicker } from '../UnifiedPicker';

export const UnifiedPeoplePicker = (props: IUnifiedPeoplePickerProps): JSX.Element => {
  const renderSelectedItems = (selectedPeopleListProps: ISelectedPeopleListProps<IPersonaProps>): JSX.Element => {
    return <SelectedPeopleList {...selectedPeopleListProps} ref={null} />;
  };
  return (
    <>
      <UnifiedPicker
        {...props}
        onRenderSelectedItems={renderSelectedItems}
        onRenderFloatingSuggestions={FloatingPeopleSuggestions}
      />
    </>
  );
};
