/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { IBaseExtendedPickerProps } from './BaseExtendedPicker.types';
import { BaseExtendedPicker } from './BaseExtendedPicker';
import { IBaseFloatingPickerProps, BaseFloatingPicker, SuggestionsStore } from '../FloatingPicker/index';
import { IBaseSelectedItemsListProps, ISelectedItemProps, BaseSelectedItemsList } from '../SelectedItemsList/index';
import { KeyCodes } from '../../Utilities';

function onResolveSuggestions(text: string): ISimple[] {
  return [
    'black',
    'blue',
    'brown',
    'cyan',
    'green',
    'magenta',
    'mauve',
    'orange',
    'pink',
    'purple',
    'red',
    'rose',
    'violet',
    'white',
    'yellow'
  ]
    .filter((tag: string) => tag.toLowerCase().indexOf(text.toLowerCase()) === 0)
    .map((item: string) => ({ key: item, name: item }));
}

const BasePickerWithType = BaseFloatingPicker as new (props: IBaseFloatingPickerProps<ISimple>) => BaseFloatingPicker<
  ISimple,
  IBaseFloatingPickerProps<ISimple>
>;

const BaseSelectedItemsListWithType = BaseSelectedItemsList as new (props: IBaseSelectedItemsListProps<ISimple>) => BaseSelectedItemsList<
  ISimple,
  IBaseSelectedItemsListProps<ISimple>
>;

const basicSuggestionRenderer = (props: ISimple) => {
  return <div> {props.name} </div>;
};

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div> {props.name} </div>;
};

const basicRenderFloatingPicker = (props: IBaseFloatingPickerProps<ISimple>) => {
  return <BasePickerWithType {...props} />;
};

const basicRenderSelectedItemsList = (props: IBaseSelectedItemsListProps<ISimple>) => {
  return <BaseSelectedItemsListWithType />;
};

const floatingPickerProps = {
  onResolveSuggestions: onResolveSuggestions,
  onRenderSuggestionsItem: basicSuggestionRenderer,
  suggestionsStore: new SuggestionsStore<ISimple>()
};

const selectedItemsListProps: IBaseSelectedItemsListProps<ISimple> = {
  onRenderItem: basicItemRenderer
};

export interface ISimple {
  key: string;
  name: string;
}

export type TypedBaseExtendedPicker = BaseExtendedPicker<ISimple, IBaseExtendedPickerProps<ISimple>>;

describe('Pickers', () => {
  describe('BasePicker', () => {
    const BaseExtendedPickerWithType = BaseExtendedPicker as new (props: IBaseExtendedPickerProps<ISimple>) => BaseExtendedPicker<
      ISimple,
      IBaseExtendedPickerProps<ISimple>
    >;

    it('renders BaseExtendedPicker correctly', () => {
      const component = renderer.create(
        <BaseExtendedPickerWithType
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('force resolves to the first suggestion', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const picker: TypedBaseExtendedPicker = ReactDOM.render(
        <BaseExtendedPickerWithType
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
        root
      ) as TypedBaseExtendedPicker;

      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
      }

      expect(picker.floatingPicker.current && picker.floatingPicker.current.suggestions.length).toBe(2);
      expect(picker.floatingPicker.current && picker.floatingPicker.current.suggestions[0].name).toBe('black');

      // Force resolve to the first suggestions
      picker.floatingPicker.current && picker.floatingPicker.current.forceResolveSuggestion();
      expect(picker.items.length).toBe(1);
      expect(picker.items[0].name).toBe('black');

      ReactDOM.unmountComponentAtNode(root);
    });

    it('Can hide and show picker', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const picker: TypedBaseExtendedPicker = ReactDOM.render(
        <BaseExtendedPickerWithType
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
        root
      ) as TypedBaseExtendedPicker;

      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
      }

      expect(picker.floatingPicker.current && picker.floatingPicker.current.isSuggestionsShown).toBeTruthy();
      picker.floatingPicker.current && picker.floatingPicker.current.hidePicker();
      expect(picker.floatingPicker.current && picker.floatingPicker.current.isSuggestionsShown).toBeFalsy();
      picker.floatingPicker.current && picker.floatingPicker.current.showPicker();
      expect(picker.floatingPicker.current && picker.floatingPicker.current.isSuggestionsShown).toBeTruthy();

      ReactDOM.unmountComponentAtNode(root);
    });

    it('Completes the suggestion', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const picker: TypedBaseExtendedPicker = ReactDOM.render(
        <BaseExtendedPickerWithType
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
        root
      ) as TypedBaseExtendedPicker;

      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
        ReactTestUtils.Simulate.keyDown(picker.inputElement, { which: KeyCodes.down });
      }

      picker.floatingPicker.current && picker.floatingPicker.current.completeSuggestion();
      expect(picker.selectedItemsList.current && picker.selectedItemsList.current.items.length).toBe(1);
      expect(picker.selectedItemsList.current && picker.selectedItemsList.current.items[0].name).toBe('blue');

      ReactDOM.unmountComponentAtNode(root);
    });
  });
});
