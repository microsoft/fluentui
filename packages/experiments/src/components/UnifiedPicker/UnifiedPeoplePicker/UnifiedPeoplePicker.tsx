import * as React from 'react';
import { IUnifiedPeoplePickerProps } from './UnifiedPeoplePicker.types';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { FloatingPeopleSuggestions } from '../../FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import { SelectedPeopleList, ISelectedPeopleListProps, ISelectedPeopleList } from '../../SelectedItemsList/SelectedPeopleList';
import { UnifiedPicker } from '../UnifiedPicker';

export const UnifiedPeoplePicker = (props: IUnifiedPeoplePickerProps): JSX.Element => {
  let _selectionList: ISelectedPeopleList;
  const _setSelectedItemsRef = (component: ISelectedPeopleList): void => {
    _selectionList = component;
  };

  const renderSelectedItems = (selectedPeopleListProps: ISelectedPeopleListProps<IPersonaProps>): JSX.Element => {
    return <SelectedPeopleList {...props} ref={_setSelectedItemsRef} />;
  };
  return (
    <>
      <UnifiedPicker {...props} onRenderSelectedItems={renderSelectedItems} onRederFloatingSuggestions={FloatingPeopleSuggestions} />
    </>
  );
};
