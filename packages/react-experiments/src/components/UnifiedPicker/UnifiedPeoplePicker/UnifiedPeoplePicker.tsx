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
  const renderSelectedItems = (selectedPeopleListProps: ISelectedPeopleListProps<IPersonaProps>): JSX.Element => {
    return <SelectedPeopleList {...selectedPeopleListProps} ref={null} />;
  };

  const renderFloatingPeopleSuggestions = (floatingPeoplePickerProps: IFloatingPeopleSuggestionsProps): JSX.Element => {
    return <FloatingPeopleSuggestions {...floatingPeoplePickerProps} />;
  };

  return (
    <UnifiedPicker
      {...props}
      // eslint-disable-next-line react/jsx-no-bind
      onRenderSelectedItems={renderSelectedItems}
      // eslint-disable-next-line react/jsx-no-bind
      onRenderFloatingSuggestions={renderFloatingPeopleSuggestions}
    />
  );
};
