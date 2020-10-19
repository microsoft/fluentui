import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { styled } from '../../../Utilities';
import { Suggestions } from './Suggestions';
import { getStyles as suggestionsStyles } from './Suggestions.styles';
import {
  ISuggestionModel,
  ISuggestionsProps,
  ISuggestionsStyleProps,
  ISuggestionsStyles,
  ISuggestions,
} from './Suggestions.types';
import { isConformant } from '../../../common/isConformant';

const suggestions = [
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
];

function generateSimpleSuggestions(selectedIndex: number = 0) {
  return suggestions.map<ISuggestionModel<ISimple>>((value, index) => {
    return {
      item: {
        key: value,
        name: value,
      },
      selected: index === selectedIndex,
    };
  });
}

const basicSuggestionRenderer = (props: ISimple) => {
  return <div> {props.name} </div>;
};

export interface ISimple {
  key: string;
  name: string;
}

function mockOnClick() {
  console.log('clicked');
}

describe('Suggestions', () => {
  it('renders a list properly', () => {
    const component = renderer.create(
      <Suggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions()}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('scrolls to selected index properly', () => {
    const component = renderer.create(
      <Suggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions()}
      />,
    );

    component.update(
      <Suggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions(8)}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a list properly with CSS-in-JS styles', () => {
    const StyledSuggestions = styled<ISuggestionsProps<ISimple>, ISuggestionsStyleProps, ISuggestionsStyles>(
      Suggestions,
      suggestionsStyles,
    );
    const component = renderer.create(
      <StyledSuggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions()}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  isConformant({
    Component: Suggestions,
    displayName: 'Suggestions',
    requiredProps: {
      onRenderSuggestion: basicSuggestionRenderer,
      onSuggestionClick: mockOnClick,
      suggestions: generateSimpleSuggestions(),
    },
    disabledTests: ['has-top-level-file'],
  });

  it('hasSuggestedAction is true when action provided', () => {
    const compRef = React.createRef<ISuggestions<ISimple>>();
    const StyledSuggestions = styled<ISuggestionsProps<ISimple>, ISuggestionsStyleProps, ISuggestionsStyles>(
      Suggestions,
      suggestionsStyles,
    );

    renderer.create(
      <StyledSuggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions()}
        searchForMoreText={'foo'}
        moreSuggestionsAvailable={true}
        componentRef={compRef}
      />,
    );

    expect(compRef.current).toBeTruthy();
    expect(compRef.current!.hasSuggestedAction()).toEqual(true);
  });

  it('hasSuggestedAction is false when no action provided', () => {
    const compRef = React.createRef<ISuggestions<ISimple>>();
    const StyledSuggestions = styled<ISuggestionsProps<ISimple>, ISuggestionsStyleProps, ISuggestionsStyles>(
      Suggestions,
      suggestionsStyles,
    );

    renderer.create(
      <StyledSuggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions()}
        componentRef={compRef}
      />,
    );

    expect(compRef.current).toBeTruthy();
    expect(compRef.current!.hasSuggestedAction()).toEqual(false);
  });
});
