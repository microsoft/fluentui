import * as React from 'react';
import { render } from '@testing-library/react';

import { styled } from '../../../Utilities';
import { Suggestions } from './Suggestions';
import { getStyles as suggestionsStyles } from './Suggestions.styles';
import { isConformant } from '../../../common/isConformant';
import type {
  ISuggestionModel,
  ISuggestionsProps,
  ISuggestionsStyleProps,
  ISuggestionsStyles,
  ISuggestions,
} from './Suggestions.types';

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
    const { container } = render(
      <Suggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions()}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('scrolls to selected index properly', () => {
    const { container, rerender } = render(
      <Suggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions()}
      />,
    );

    rerender(
      <Suggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions(8)}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders a list properly with CSS-in-JS styles', () => {
    const StyledSuggestions = styled<ISuggestionsProps<ISimple>, ISuggestionsStyleProps, ISuggestionsStyles>(
      Suggestions,
      suggestionsStyles,
    );
    const { container } = render(
      <StyledSuggestions
        onRenderSuggestion={basicSuggestionRenderer}
        onSuggestionClick={mockOnClick}
        suggestions={generateSimpleSuggestions()}
      />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  isConformant({
    Component: Suggestions,
    displayName: 'Suggestions',
    requiredProps: {
      onRenderSuggestion: basicSuggestionRenderer,
      onSuggestionClick: mockOnClick,
      suggestions: generateSimpleSuggestions(),
    },
    // Problem: Ref is not applied to the root DOM node.
    // Solution: Ensure ref is passed correctly to the root element.
    disabledTests: ['has-top-level-file', 'component-has-root-ref', 'component-handles-ref'],
  });

  it('hasSuggestedAction is true when action provided', () => {
    const compRef = React.createRef<ISuggestions<ISimple>>();
    const StyledSuggestions = styled<ISuggestionsProps<ISimple>, ISuggestionsStyleProps, ISuggestionsStyles>(
      Suggestions,
      suggestionsStyles,
    );

    render(
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

    render(
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
