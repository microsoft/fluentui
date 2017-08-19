/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
/* tslint:enable:no-unused-variable */

let { expect } = chai;

import { TagPicker, ITag } from './TagPicker/TagPicker';
import { IBasePickerProps } from './BasePicker.Props';
import { BasePicker } from './BasePicker';
import { IPickerItemProps } from './PickerItem.Props';

function onResolveSuggestions(text: string): ITag[] {
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
  ].filter(tag => tag.toLowerCase().indexOf(text.toLowerCase()) === 0).map(item => ({ key: item, name: item }));
}

const basicRenderer = (props: IPickerItemProps<{ key: string, name: string }>) => {
  return <div> { props.item.name } </div>;
};

const basicSuggestionRenderer = (props: ISimple) => {
  return <div> { props.name } </div>;
};

export interface ISimple {
  key: string;
  name: string;
}

export type TypedBasePicker = BasePicker<ISimple, IBasePickerProps<ISimple>>;

describe('Pickers', () => {
  describe('BasePicker', () => {
    const BasePickerWithType = BasePicker as new (props: IBasePickerProps<ISimple>) => BasePicker<ISimple, IBasePickerProps<ISimple>>;
    it('can provide custom renderers', () => {
      let root = document.createElement('div');
      document.body.appendChild(root);
      let picker: TypedBasePicker = ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={ onResolveSuggestions }
          onRenderItem={ (props: IPickerItemProps<{ key: string, name: string }>) => <div key={ props.item.name }>{ basicRenderer(props) }</div> }
          onRenderSuggestionsItem={ basicSuggestionRenderer }
        />,
        root
      ) as TypedBasePicker;
      let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';

      ReactTestUtils.Simulate.change(input);

      let suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

      expect(suggestions).to.exist;
      let suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      expect(suggestionOptions.length).to.be.equal(2, 'There were not 2 suggestions');
      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      expect(picker.items.length).to.be.equal(1, 'There was not only 1 item selected');
      expect(picker.items[0].name).to.be.equal('black', 'The selected item did not have the correct text');

      ReactDOM.unmountComponentAtNode(root);

    });

    it('can be restricted to only one selection', () => {
      let root = document.createElement('div');
      document.body.appendChild(root);
      let picker: TypedBasePicker = ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={ onResolveSuggestions }
          onRenderItem={ (props: IPickerItemProps<{ key: string, name: string }>) => <div key={ props.item.name }>{ basicRenderer(props) }</div> }
          onRenderSuggestionsItem={ basicSuggestionRenderer }
          itemLimit={ 1 }
        />,
        root
      ) as TypedBasePicker;
      let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.change(input);

      let suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;
      let suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
      ReactTestUtils.Simulate.click(suggestionOptions[0]);
      expect(picker.items.length).to.be.equal(1, 'There was not only 1 item selected');
      input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      console.log(input);
      expect(input).to.be.null;

      ReactDOM.unmountComponentAtNode(root);
    });

  });

  describe('TagPicker', () => {

    it('can search for and select tags', () => {
      let root = document.createElement('div');
      document.body.appendChild(root);
      let picker: TagPicker = ReactDOM.render(
        <TagPicker
          onResolveSuggestions={ onResolveSuggestions }
        />,
        root
      ) as TagPicker;
      let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';

      ReactTestUtils.Simulate.change(input);

      let suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

      expect(suggestions).to.exist;
      let suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      expect(suggestionOptions.length).to.be.equal(2, 'There were not 2 suggestions');
      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      expect(picker.items.length).to.be.equal(1, 'There was not only 1 item selected');
      expect(picker.items[0].name).to.be.equal('black', 'The selected item did not have the correct text');
      ReactDOM.unmountComponentAtNode(root);

    });

    it('can be a controlled component', () => {
      let root = document.createElement('div');
      document.body.appendChild(root);
      let picker: TagPicker = ReactDOM.render(
        <TagPicker
          onResolveSuggestions={ onResolveSuggestions }
          selectedItems={ [] }
        />,
        root
      ) as TagPicker;
      let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.change(input);

      let suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      expect(picker.items.length).to.be.equal(0, 'The picker incorrectly added an item');

      picker = ReactDOM.render(
        <TagPicker
          onResolveSuggestions={ onResolveSuggestions }
          selectedItems={ [{ key: 'testColor', name: 'testColor' }] }
        />,
        root
      ) as TagPicker;

      expect(picker.items.length).to.be.equal(1, 'The picker rendered with an item.');
      expect(picker.items[0].name).to.be.equal('testColor', 'The selected item did not have the correct text');
      ReactDOM.unmountComponentAtNode(root);
    });
    it('fires change events correctly for controlled components', (done) => {
      let root = document.createElement('div');
      document.body.appendChild(root);
      let picker: TagPicker = ReactDOM.render(
        <TagPicker
          onResolveSuggestions={ onResolveSuggestions }
          selectedItems={ [] }
          onChange={ (items) => {
            expect(items!.length).to.be.equal(1, 'The picker incorrectly added an item');
            expect(items![0].name).to.be.equal('black', 'The picker incorrectly added an item');
            done();
          } }
        />,
        root
      ) as TagPicker;
      let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.change(input);

      let suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      ReactDOM.unmountComponentAtNode(root);
    });
  });
});