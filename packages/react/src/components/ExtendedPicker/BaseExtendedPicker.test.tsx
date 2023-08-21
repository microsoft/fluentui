import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { BaseExtendedPicker } from './BaseExtendedPicker';
import { BaseFloatingPicker, SuggestionsStore } from '../FloatingPicker/index';
import { BaseSelectedItemsList } from '../../SelectedItemsList';
import { KeyCodes } from '../../Utilities';
import type { IBaseExtendedPickerProps } from './BaseExtendedPicker.types';
import type { IBaseFloatingPickerProps } from '../FloatingPicker/index';
import type { IBaseSelectedItemsListProps, ISelectedItemProps } from '../../SelectedItemsList';

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
    'yellow',
  ]
    .filter((tag: string) => tag.toLowerCase().indexOf(text.toLowerCase()) === 0)
    .map((item: string) => ({ key: item, name: item }));
}

const BasePickerWithType = BaseFloatingPicker as new (props: IBaseFloatingPickerProps<ISimple>) => BaseFloatingPicker<
  ISimple,
  IBaseFloatingPickerProps<ISimple>
>;

const BaseSelectedItemsListWithType = BaseSelectedItemsList as new (
  props: IBaseSelectedItemsListProps<ISimple>,
) => BaseSelectedItemsList<ISimple, IBaseSelectedItemsListProps<ISimple>>;

const basicSuggestionRenderer = (props: ISimple) => {
  return <div key={props.key}> {props.name} </div>;
};

const basicItemRenderer = (props: ISelectedItemProps<ISimple>) => {
  return <div key={props.key}> {props.name} </div>;
};

const basicRenderFloatingPicker = (props: IBaseFloatingPickerProps<ISimple>) => {
  return <BasePickerWithType {...props} />;
};

const basicRenderSelectedItemsList = (props: IBaseSelectedItemsListProps<ISimple>) => {
  return <BaseSelectedItemsListWithType {...props} />;
};

const floatingPickerProps = {
  onResolveSuggestions,
  onRenderSuggestionsItem: basicSuggestionRenderer,
  suggestionsStore: new SuggestionsStore<ISimple>(),
};

const selectedItemsListProps: IBaseSelectedItemsListProps<ISimple> = {
  onRenderItem: basicItemRenderer,
};

export interface ISimple {
  key: string;
  name: string;
}

export type TypedBaseExtendedPicker = BaseExtendedPicker<ISimple, IBaseExtendedPickerProps<ISimple>>;

describe('Pickers', () => {
  describe('BasePicker', () => {
    const BaseExtendedPickerWithType = BaseExtendedPicker as new (
      props: IBaseExtendedPickerProps<ISimple>,
    ) => BaseExtendedPicker<ISimple, IBaseExtendedPickerProps<ISimple>>;
    // Our functional tests need to run against actual DOM for callouts to work,
    // since callout mount a new react root with ReactDOM.
    //
    // see https://github.com/facebook/react/pull/12895
    let hostNode: HTMLDivElement | null = null;
    const create = (elem: React.ReactElement) => {
      hostNode = document.createElement('div');
      document.body.appendChild(hostNode);
      ReactDOM.render(elem, hostNode);
    };

    afterEach(() => {
      if (hostNode) {
        ReactDOM.unmountComponentAtNode(hostNode);
        document.body.removeChild(hostNode);
        hostNode = null;
      }
    });

    it('renders BaseExtendedPicker correctly with no items', () => {
      const component = renderer.create(
        <BaseExtendedPickerWithType
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('renders BaseExtendedPicker correctly with selected and suggested items', () => {
      const component = renderer.create(
        <BaseExtendedPickerWithType
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
          suggestionItems={[
            {
              name: 'yellow',
              key: 'yellow',
            },
          ]}
          selectedItems={[
            {
              name: 'red',
              key: 'red',
            },
            {
              name: 'green',
              key: 'green',
            },
          ]}
        />,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('force resolves to the first suggestion', () => {
      jest.useFakeTimers();
      const pickerRef: React.RefObject<TypedBaseExtendedPicker> = React.createRef();
      create(
        <BaseExtendedPickerWithType
          ref={pickerRef}
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
      );

      expect(pickerRef.current).not.toBeFalsy();
      const picker = pickerRef.current!;

      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
        ReactTestUtils.Simulate.input(picker.inputElement);
        ReactTestUtils.act(() => {
          jest.runAllTimers();
        });
      }

      ReactDOM.render(
        <BaseExtendedPickerWithType
          ref={pickerRef}
          defaultSelectedItems={[]}
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
        hostNode,
      );

      expect(picker.state.queryString).toBe('bl');
      expect(picker.floatingPicker.current && picker.floatingPicker.current.suggestions.length).toBe(2);
      expect(picker.floatingPicker.current && picker.floatingPicker.current.suggestions[0].item.name).toBe('black');

      // Force resolve to the first suggestions
      picker.floatingPicker.current && picker.floatingPicker.current.forceResolveSuggestion();

      ReactDOM.render(
        <BaseExtendedPickerWithType
          ref={pickerRef}
          defaultSelectedItems={[]}
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
        hostNode,
      );

      expect(picker.items.length).toBe(1);
      expect(picker.items[0].name).toBe('black');
    });

    it('Can hide and show picker', () => {
      jest.useFakeTimers();
      const pickerRef: React.RefObject<TypedBaseExtendedPicker> = React.createRef();
      create(
        <BaseExtendedPickerWithType
          ref={pickerRef}
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
      );

      expect(pickerRef.current).not.toBeFalsy();
      const picker = pickerRef.current!;

      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
        ReactTestUtils.Simulate.input(picker.inputElement);
      }

      ReactTestUtils.act(() => {
        jest.runAllTimers();
      });

      expect(picker.floatingPicker.current && picker.floatingPicker.current.isSuggestionsShown).toBeTruthy();
      picker.floatingPicker.current && picker.floatingPicker.current.hidePicker();
      expect(picker.floatingPicker.current && picker.floatingPicker.current.isSuggestionsShown).toBeFalsy();
      picker.floatingPicker.current && picker.floatingPicker.current.showPicker();
      expect(picker.floatingPicker.current && picker.floatingPicker.current.isSuggestionsShown).toBeTruthy();
    });

    it('Completes the suggestion', () => {
      jest.useFakeTimers();
      const pickerRef: React.RefObject<TypedBaseExtendedPicker> = React.createRef();
      create(
        <BaseExtendedPickerWithType
          ref={pickerRef}
          floatingPickerProps={floatingPickerProps}
          selectedItemsListProps={selectedItemsListProps}
          onRenderSelectedItems={basicRenderSelectedItemsList}
          onRenderFloatingPicker={basicRenderFloatingPicker}
        />,
      );

      expect(pickerRef.current).not.toBeFalsy();
      const picker = pickerRef.current!;

      // setup
      if (picker.inputElement) {
        picker.inputElement.value = 'bl';
        ReactTestUtils.Simulate.input(picker.inputElement);
        ReactTestUtils.Simulate.keyDown(picker.inputElement, { which: KeyCodes.down });
        ReactTestUtils.act(() => {
          jest.runAllTimers();
        });
      }

      // precondition check
      expect(picker.floatingPicker.current).toBeTruthy();
      expect(picker.floatingPicker.current!.suggestions).toMatchObject([
        {
          item: {
            name: 'black',
            key: 'black',
          },
        },
        {
          item: {
            name: 'blue',
            key: 'blue',
          },
        },
      ]);

      // act
      picker.floatingPicker.current && picker.floatingPicker.current.completeSuggestion();

      // assert
      expect(picker.items).toEqual([
        {
          name: 'black',
          key: 'black',
        },
      ]);
    });

    describe('aria-owns', () => {
      it('does not render an aria-owns when the floating picker has not been opened', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        const pickerRef = React.createRef<TypedBaseExtendedPicker>();

        ReactDOM.render(
          <BaseExtendedPickerWithType
            ref={pickerRef}
            floatingPickerProps={floatingPickerProps}
            selectedItemsListProps={selectedItemsListProps}
            onRenderSelectedItems={basicRenderSelectedItemsList}
            onRenderFloatingPicker={basicRenderFloatingPicker}
          />,
          root,
        );

        expect(document.querySelector('[aria-owns="suggestion-list"]')).not.toBeTruthy();
        expect(document.querySelector('#suggestion-list')).not.toBeTruthy();

        ReactDOM.unmountComponentAtNode(root);
      });

      it('renders an aria-owns when the floating picker is open', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        const pickerRef = React.createRef<TypedBaseExtendedPicker>();

        ReactDOM.render(
          <BaseExtendedPickerWithType
            ref={pickerRef}
            floatingPickerProps={floatingPickerProps}
            selectedItemsListProps={selectedItemsListProps}
            onRenderSelectedItems={basicRenderSelectedItemsList}
            onRenderFloatingPicker={basicRenderFloatingPicker}
          />,
          root,
        );

        pickerRef.current!.floatingPicker.current!.showPicker();

        expect(document.querySelector('[aria-owns="suggestion-list"]')).toBeTruthy();
        expect(document.querySelector('#suggestion-list')).toBeTruthy();

        ReactDOM.unmountComponentAtNode(root);
      });

      it('does not render an aria-owns when the floating picker has been opened and closed', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);

        const pickerRef = React.createRef<TypedBaseExtendedPicker>();

        ReactDOM.render(
          <BaseExtendedPickerWithType
            ref={pickerRef}
            floatingPickerProps={floatingPickerProps}
            selectedItemsListProps={selectedItemsListProps}
            onRenderSelectedItems={basicRenderSelectedItemsList}
            onRenderFloatingPicker={basicRenderFloatingPicker}
          />,
          root,
        );

        pickerRef.current!.floatingPicker.current!.showPicker();

        pickerRef.current!.floatingPicker.current!.hidePicker();

        expect(document.querySelector('[aria-owns="suggestion-list"]')).not.toBeTruthy();
        expect(document.querySelector('#suggestion-list')).not.toBeTruthy();

        ReactDOM.unmountComponentAtNode(root);
      });
    });
  });
});
