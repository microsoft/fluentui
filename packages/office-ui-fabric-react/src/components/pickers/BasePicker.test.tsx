/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';
/* tslint:enable:no-unused-variable */

let { expect } = chai;

import { TagPicker, ITag, BasePicker, IBasePickerProps, IPickerItemProps } from './index';

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

const basicRenderer = (props) => {
  return <div> { props.item.name } </div>;
};

const basicSuggestionRenderer = (props) => {
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
      let suggestionOptions = document.querySelectorAll('.ms-Suggestions-item');

      expect(suggestionOptions.length).to.be.equal(2, 'There were not 2 suggestions');
      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      expect(picker.items.length).to.be.equal(1, 'There was not only 1 item selected');
      expect(picker.items[0].name).to.be.equal('black', 'The selected item did not have the correct text');

      ReactDOM.unmountComponentAtNode(root);

    });

    it('correctly limits amount of items that can be selected', () => {
      let root = document.createElement('div');
      document.body.appendChild(root);
      let picker: TypedBasePicker = ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={ onResolveSuggestions }
          onRenderItem={ (props: IPickerItemProps<{ key: string, name: string }>) => <div key={ props.item.name }>{ basicRenderer(props) }</div> }
          onRenderSuggestionsItem={ basicSuggestionRenderer }
          itemLimit={ 2 }
          />,
        root
      ) as TypedBasePicker;
      let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

      clickSuggestionAtIndex(input, 'bl', 0, 2);

      expect(picker.items.length).to.be.equal(1, 'There was not only 1 item selected');
      expect(picker.items[0].name).to.be.equal('black', 'The selected item did not have the correct text');
      expect(input.disabled).to.be.eq(false, 'Input was disabled even though item limit had not been reached');

      clickSuggestionAtIndex(input, 'blu');

      expect(picker.items.length).to.be.equal(2, 'There were not only 2 items selected');
      expect(input.disabled).to.be.eq(true, 'Input was not disabled even though item limit reached');

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

      clickSuggestionAtIndex(input, 'bl', 0, 2);

      expect(picker.items.length).to.be.equal(1, 'There was not only 1 item selected');
      expect(picker.items[0].name).to.be.equal('black', 'The selected item did not have the correct text');

      ReactDOM.unmountComponentAtNode(root);
    });
  });
});

export function clickSuggestionAtIndex(input: HTMLInputElement, startingText: string, index: number = 0, expectedNumberOfSuggestions?: number) {
  input.focus();
  input.value = startingText;

  ReactTestUtils.Simulate.change(input);

  let suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

  expect(suggestions).to.exist;
  let suggestionOptions = document.querySelectorAll('.ms-Suggestions-item');

  expect(suggestionOptions.length).to.be.gte(1, `There were no suggestions for the given text ${startingText}`);

  if (expectedNumberOfSuggestions) {
    expect(suggestionOptions.length).to.be.eq(expectedNumberOfSuggestions, `There were not ${expectedNumberOfSuggestions} suggestions`);
  }

  ReactTestUtils.Simulate.click(suggestionOptions[0]);
}