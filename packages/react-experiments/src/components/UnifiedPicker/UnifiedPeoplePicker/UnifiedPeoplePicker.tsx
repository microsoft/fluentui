import * as React from 'react';
import { FloatingPeopleSuggestions } from '../../FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions';
import { SelectedPeopleList } from '../../SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import { UnifiedPicker } from '../UnifiedPicker';
import type { IUnifiedPeoplePickerProps } from './UnifiedPeoplePicker.types';
import type { IPersonaProps } from '@fluentui/react/lib/Persona';
import type { IFloatingPeopleSuggestionsProps } from '../../FloatingSuggestionsComposite/FloatingPeopleSuggestions/FloatingPeopleSuggestions.types';
import type { ISelectedPeopleListProps } from '../../SelectedItemsList/SelectedPeopleList/SelectedPeopleList';
import type { JSXElement } from '@fluentui/utilities';

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const UnifiedPeoplePicker = (props: IUnifiedPeoplePickerProps): JSXElement => {
  const renderSelectedItems = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    (selectedPeopleListProps: ISelectedPeopleListProps<IPersonaProps>): JSXElement => {
      return <SelectedPeopleList {...selectedPeopleListProps} ref={null} />;
    },
    // Intentional extra dependency to cause a new callback to be generated
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.selectedItemsListProps.selectedItems],
  );

  const renderFloatingPeopleSuggestions = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    (floatingPeoplePickerProps: IFloatingPeopleSuggestionsProps): JSXElement => {
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
