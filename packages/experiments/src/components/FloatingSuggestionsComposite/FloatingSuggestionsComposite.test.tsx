import * as React from 'react';
import { create } from 'react-test-renderer';
import { mru } from '@uifabric/example-data';
import { BaseFloatingSuggestions } from './FloatingSuggestions';
import * as ReactDOM from 'react-dom';
import {
  IFloatingSuggestionItem,
  IFloatingSuggestionOnRenderItemProps,
} from './FloatingSuggestionsItem/FloatingSuggestionsItem.types';
import { IBaseFloatingSuggestionsProps } from './FloatingSuggestions.types';

export interface ISimple {
  key: string;
  name: string;
}

function onZeroQuerySuggestion(): ISimple[] {
  return ['black', 'blue', 'brown', 'cyan'].map((item: string) => ({ key: item, name: item }));
}

const basicSuggestionRenderer = (props: IFloatingSuggestionOnRenderItemProps<ISimple>) => {
  return <div key={props.key}> {props.id}</div>;
};

describe('FloatingSuggestions', () => {
  const renderNothing = () => <></>;
  const isSuggestionsVisible = false;

  it('renders FloatingSuggestions correctly', () => {
    const component = create(
      <BaseFloatingSuggestions
        onRenderNoResultFound={renderNothing}
        isSuggestionsVisible={isSuggestionsVisible}
        suggestions={[]}
        targetElement={null}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders FloatingSuggestions with suggestions', () => {
    const testProps = {
      suggestions: [],
      isSuggestionsVisible: true,
      targetElement: null,
    } as IBaseFloatingSuggestionsProps<ISimple>;

    const _suggestions = ([
      {
        key: '3',
        id: '3',
        displayText: 'Suggestion 3',
        item: mru[2],
        isSelected: false,
        showRemoveButton: true,
      },
    ] as unknown) as IFloatingSuggestionItem<ISimple>;
    const root = document.createElement('div');
    const input = document.createElement('input');
    document.body.appendChild(input);
    document.body.appendChild(root);
    const component = ReactDOM.render(
      <BaseFloatingSuggestions
        isSuggestionsVisible={true}
        suggestions={[_suggestions]}
        targetElement={input}
        onRenderSuggestion={basicSuggestionRenderer}
      />,
      root,
    );
    console.log(component);

    ReactDOM.unmountComponentAtNode(root);
  });
});
