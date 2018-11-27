/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { Autofill } from '../../Autofill/index';
import { IPersonaProps } from '../../Persona/index';
import { people } from '../examples/PeopleExampleData';
import { ExtendedPeoplePicker } from './ExtendedPeoplePicker';
import { SuggestionsStore, FloatingPeoplePicker, IBaseFloatingPickerProps } from '../../FloatingPicker/index';
import { ISelectedItemProps, IBaseSelectedItemsListProps, IExtendedPersonaProps, SelectedPeopleList } from '../../SelectedItemsList/index';

function onResolveSuggestions(text: string): IPersonaProps[] {
  const peopleList: IPersonaProps[] = people;
  return peopleList.filter(p => p.text && p.text.includes(text));
}

const floatingPickerProps = {
  onResolveSuggestions: onResolveSuggestions,
  suggestionsStore: new SuggestionsStore<IPersonaProps>()
};

const basicItemRenderer = (props: ISelectedItemProps<IPersonaProps>) => {
  return <div>{props.item.text}</div>;
};

const selectedItemsListProps: IBaseSelectedItemsListProps<IPersonaProps> = {
  onRenderItem: basicItemRenderer
};

const onRenderFloatingPicker = (props: IBaseFloatingPickerProps<IPersonaProps>): JSX.Element => {
  return <FloatingPeoplePicker {...props} />;
};

const onRenderSelectedItems = (props: IBaseSelectedItemsListProps<IExtendedPersonaProps>): JSX.Element => {
  return <SelectedPeopleList {...props} />;
};

describe('Pickers', () => {
  describe('ExtendedPeoplePicker', () => {
    it('sets the Autofill spellCheck is set to false', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const pickerRenderer = renderer.create(
        <ExtendedPeoplePicker
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderFloatingPicker={onRenderFloatingPicker}
          onRenderSelectedItems={onRenderSelectedItems}
        />
      );
      const pickerInstance = pickerRenderer.root;

      expect(pickerInstance.findByType(Autofill).props.spellCheck).toBe(false);
    });

    it('sets the Autofill autoCorrect prop to off', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const pickerRenderer = renderer.create(
        <ExtendedPeoplePicker
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderFloatingPicker={onRenderFloatingPicker}
          onRenderSelectedItems={onRenderSelectedItems}
        />
      );
      const pickerInstance = pickerRenderer.root;

      expect(pickerInstance.findByType(Autofill).props.autoCorrect).toBe('off');
    });

    it('overwrites spellCheck', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const pickerRenderer = renderer.create(
        <ExtendedPeoplePicker
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderFloatingPicker={onRenderFloatingPicker}
          onRenderSelectedItems={onRenderSelectedItems}
          inputProps={{ spellCheck: true }}
        />
      );
      const pickerInstance = pickerRenderer.root;

      expect(pickerInstance.findByType(Autofill).props.spellCheck).toBe(false);
    });

    it('overwrites autoCorrect', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const pickerRenderer = renderer.create(
        <ExtendedPeoplePicker
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderFloatingPicker={onRenderFloatingPicker}
          onRenderSelectedItems={onRenderSelectedItems}
          inputProps={{ autoCorrect: 'on' }}
        />
      );
      const pickerInstance = pickerRenderer.root;

      expect(pickerInstance.findByType(Autofill).props.autoCorrect).toBe('off');
    });
  });
});
