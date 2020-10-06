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
  const renderSelectedItems = React.useCallback(
    (selectedPeopleListProps: ISelectedPeopleListProps<IPersonaProps>): JSX.Element => {
      return <SelectedPeopleList {...selectedPeopleListProps} ref={null} />;
    },
    // Intentional extra dependency to cause a new callback to be generated
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.selectedItemsListProps.selectedItems],
  );

  const renderFloatingPeopleSuggestions = React.useCallback(
    (floatingPeoplePickerProps: IFloatingPeopleSuggestionsProps): JSX.Element => {
      return <FloatingPeopleSuggestions {...floatingPeoplePickerProps} />;
    },
    // Intentional extra dependency to cause a new callback to be generated
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.floatingSuggestionProps.suggestions],
  );

  return (
    <UnifiedPicker
      {...props}
      onRenderSelectedItems={renderSelectedItems}
      onRenderFloatingSuggestions={renderFloatingPeopleSuggestions}
    />
  );
};
