import * as React from 'react';
import { create } from 'react-test-renderer';
import { mru } from '@uifabric/example-data';
import { BaseFloatingSuggestions } from './FloatingSuggestions';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { IFloatingSuggestionItem } from './FloatingSuggestionsItem/FloatingSuggestionsItem.types';

export interface ISimple {
  key: string;
  name: string;
}

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
    const _suggestions = [
      {
        key: '1',
        id: '1',
        displayText: 'Suggestion 1',
        item: mru[0],
        isSelected: true,
        showRemoveButton: true,
      },
    ] as IFloatingSuggestionItem<IPersonaProps>[];
    const component = create(
      <BaseFloatingSuggestions
        onRenderNoResultFound={renderNothing}
        isSuggestionsVisible={isSuggestionsVisible}
        suggestions={_suggestions}
        targetElement={null}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
