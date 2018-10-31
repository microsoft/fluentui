/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
/* tslint:enable:no-unused-variable */
import * as renderer from 'react-test-renderer';

import { TagPicker, ITag } from './TagPicker/TagPicker';
import { IBasePickerProps } from './BasePicker.types';
import { BasePicker } from './BasePicker';
import { IPickerItemProps } from './PickerItem.types';

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
  ]
    .filter(tag => tag.toLowerCase().indexOf(text.toLowerCase()) === 0)
    .map(item => ({ key: item, name: item }));
}

const basicRenderer = (props: IPickerItemProps<{ key: string; name: string }>) => {
  return <div> {props.item.name} </div>;
};

const basicSuggestionRenderer = (props: ISimple) => {
  return <div> {props.name} </div>;
};

export interface ISimple {
  key: string;
  name: string;
}

export type TypedBasePicker = BasePicker<ISimple, IBasePickerProps<ISimple>>;

describe('Pickers', () => {
  describe('BasePicker', () => {
    const BasePickerWithType = BasePicker as new (props: IBasePickerProps<ISimple>) => BasePicker<ISimple, IBasePickerProps<ISimple>>;
    const onRenderItem = (props: IPickerItemProps<{ key: string; name: string }>): JSX.Element => (
      <div key={props.item.name}>{basicRenderer(props)}</div>
    );

    it('renders BasePicker correctly', () => {
      const component = renderer.create(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
        />
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('can provide custom renderers', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      const picker: TypedBasePicker = ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
        />,
        root
      ) as TypedBasePicker;
      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';

      ReactTestUtils.Simulate.input(input);

      const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

      expect(suggestions).toBeDefined();
      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      expect(suggestionOptions.length).toEqual(2);
      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      expect(picker.items.length).toEqual(1);
      expect(picker.items[0].name).toEqual('black');

      ReactDOM.unmountComponentAtNode(root);
    });

    it('can will not render input when items reach itemLimit', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      const picker: TypedBasePicker = ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={1}
        />,
        root
      ) as TypedBasePicker;
      let input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.input(input);

      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
      ReactTestUtils.Simulate.click(suggestionOptions[0]);
      expect(picker.items.length).toEqual(1);
      input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      expect(input).toBeNull();

      ReactDOM.unmountComponentAtNode(root);
    });

    it('will still render with itemLimit set to 0', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={0}
        />,
        root
      ) as TypedBasePicker;

      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      expect(input).toBeNull();

      ReactDOM.unmountComponentAtNode(root);
    });

    it('can be set with selectedItems and a lower itemLimit', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      const picker: TypedBasePicker = ReactDOM.render(
        <BasePickerWithType
          selectedItems={[{ key: '1', name: 'blue' }, { key: '2', name: 'black' }]}
          onResolveSuggestions={onResolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
          itemLimit={0}
        />,
        root
      ) as TypedBasePicker;

      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      expect(input).toBeNull();
      expect(picker.items.length).toEqual(2);

      ReactDOM.unmountComponentAtNode(root);
    });

    it('can render MRU when input is focused', () => {
      const root = document.createElement('div');
      const resolveSuggestions = () => onResolveSuggestions('');
      document.body.appendChild(root);
      const picker: TypedBasePicker = ReactDOM.render(
        <BasePickerWithType
          onResolveSuggestions={onResolveSuggestions}
          onEmptyInputFocus={resolveSuggestions}
          onRenderItem={onRenderItem}
          onRenderSuggestionsItem={basicSuggestionRenderer}
        />,
        root
      ) as TypedBasePicker;
      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();

      const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

      expect(suggestions).toBeDefined();
      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');
      expect(suggestionOptions.length).toEqual(15);
      expect(picker.items.length).toEqual(0);

      ReactDOM.unmountComponentAtNode(root);
    });
  });

  describe('TagPicker', () => {
    it('renders TagPicker correctly', () => {
      const component = renderer.create(<TagPicker onResolveSuggestions={onResolveSuggestions} />);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('can search for and select tags', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      const picker: TagPicker = ReactDOM.render(<TagPicker onResolveSuggestions={onResolveSuggestions} />, root) as TagPicker;
      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;
      input.focus();
      input.value = 'bl';

      ReactTestUtils.Simulate.input(input);

      const suggestions = document.querySelector('.ms-Suggestions') as HTMLInputElement;

      expect(suggestions).toBeDefined();
      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      expect(suggestionOptions.length).toEqual(2);
      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      expect(picker.items.length).toEqual(1);
      expect(picker.items[0].name).toEqual('black');
      ReactDOM.unmountComponentAtNode(root);
    });

    it('can be a controlled component', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      let picker: TagPicker = ReactDOM.render(
        <TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} />,
        root
      ) as TagPicker;
      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.input(input);

      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      expect(picker.items.length).toEqual(0);

      picker = ReactDOM.render(
        <TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[{ key: 'testColor', name: 'testColor' }]} />,
        root
      ) as TagPicker;

      expect(picker.items.length).toEqual(1);
      expect(picker.items[0].name).toEqual('testColor');
      ReactDOM.unmountComponentAtNode(root);
    });
    it('fires change events correctly for controlled components', done => {
      const root = document.createElement('div');
      document.body.appendChild(root);
      const onChange = (items: ITag[] | undefined): void => {
        expect(items!.length).toBe(1);
        expect(items![0].name).toBe('black');
        done();
      };

      ReactDOM.render(<TagPicker onResolveSuggestions={onResolveSuggestions} selectedItems={[]} onChange={onChange} />, root) as TagPicker;
      const input = document.querySelector('.ms-BasePicker-input') as HTMLInputElement;

      input.focus();
      input.value = 'bl';
      ReactTestUtils.Simulate.input(input);

      const suggestionOptions = document.querySelectorAll('.ms-Suggestions-itemButton');

      ReactTestUtils.Simulate.click(suggestionOptions[0]);

      ReactDOM.unmountComponentAtNode(root);
    });
  });
});
