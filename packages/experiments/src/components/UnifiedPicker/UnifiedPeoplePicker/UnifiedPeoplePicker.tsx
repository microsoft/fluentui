import * as React from 'react';
import { IUnifiedPeoplePickerProps } from './UnifiedPeoplePicker.types';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { FloatingPeopleSuggestions } from '../../FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import {
  SelectedPeopleList,
  ISelectedPeopleListProps,
} from '../../SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import { UnifiedPicker } from '../UnifiedPicker';
import { IFloatingSuggestionItemProps } from '@uifabric/experiments/lib/FloatingPeopleSuggestionsComposite';
import { IFloatingPeopleSuggestionsProps } from '@uifabric/experiments/lib/FloatingPeopleSuggestionsComposite';

export const UnifiedPeoplePicker = (props: IUnifiedPeoplePickerProps): JSX.Element => {
  // update the suggestion like componentWillReceiveProps
  const [peopleSuggestions, setPeopleSuggestions] = React.useState<IFloatingSuggestionItemProps<IPersonaProps>[]>([]);

  React.useEffect(() => {
    setPeopleSuggestions(props.floatingSuggestionProps.suggestions);
  }, [props.floatingSuggestionProps.suggestions]);

  // update the selectedListItems like componentWillReceiveProps
  const [peopleSelectedItems, setPeopleSelectedItems] = React.useState<IPersonaProps[]>([]);

  React.useEffect(() => {
    if (props.selectedItemsListProps.selectedItems) {
      setPeopleSelectedItems(props.selectedItemsListProps.selectedItems);
    }
  }, [props.selectedItemsListProps.selectedItems]);

  const renderSelectedItems = React.useCallback(
    (selectedPeopleListProps: ISelectedPeopleListProps<IPersonaProps>): JSX.Element => {
      return <SelectedPeopleList {...selectedPeopleListProps} ref={null} />;
    },
    [peopleSelectedItems],
  );

  const renderFloatingPeopleSuggestions = React.useCallback(
    (floatingPeoplePickerProps: IFloatingPeopleSuggestionsProps): JSX.Element => {
      return <FloatingPeopleSuggestions {...floatingPeoplePickerProps} />;
    },
    [peopleSuggestions],
  );

  return (
    <>
      <UnifiedPicker
        {...props}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderSelectedItems={renderSelectedItems}
        onRenderFloatingSuggestions={renderFloatingPeopleSuggestions}
      />
    </>
  );
};
