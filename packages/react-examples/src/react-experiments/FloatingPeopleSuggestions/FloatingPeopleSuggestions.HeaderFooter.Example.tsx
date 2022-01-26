import * as React from 'react';
import {
  IFloatingSuggestionItemProps,
  FloatingPeopleSuggestions,
  IFloatingSuggestionItem,
} from '@fluentui/react-experiments/lib/FloatingPeopleSuggestionsComposite';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { mru } from '@fluentui/example-data';
import { useConst } from '@fluentui/react-hooks';
import { Autofill } from '@fluentui/react';
import { KeyCodes } from '@fluentui/react-experiments/lib/Utilities';

const _suggestions = [
  {
    key: '1',
    id: '1',
    displayText: 'Suggestion 1',
    item: mru[0],
    isSelected: true,
    showRemoveButton: true,
  },
  {
    key: '2',
    id: '2',
    displayText: 'Suggestion 2',
    item: mru[1],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '3',
    id: '3',
    displayText: 'Suggestion 3',
    item: mru[2],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '4',
    id: '4',
    displayText: 'Suggestion 4',
    item: mru[3],
    isSelected: false,
    showRemoveButton: true,
  },
  {
    key: '5',
    id: '5',
    displayText: 'Suggestion 5',
    item: mru[4],
    isSelected: false,
    showRemoveButton: true,
  },
] as IFloatingSuggestionItem<IPersonaProps>[];

export const FloatingPeopleSuggestionsHeaderFooterExample = (): JSX.Element => {
  const [peopleSuggestions, setPeopleSuggestions] = React.useState<IFloatingSuggestionItemProps<IPersonaProps>[]>([
    ..._suggestions,
  ]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState<number>(0);
  const [selectedFooterIndex, setSelectedFooterIndex] = React.useState<number>(-1);
  const selectedHeaderIndex = -1;

  const input = React.useRef<Autofill>(null);

  const suggestionProps = useConst(() => {
    return {
      headerItemsProps: [
        {
          renderItem: () => {
            return <>People Suggestions</>;
          },
          shouldShow: () => {
            return peopleSuggestions.length > 0;
          },
          ariaLabel: 'People suggestions header',
        },
      ],
      footerItemsProps: [
        {
          renderItem: () => {
            return <>Showing {peopleSuggestions.length} results</>;
          },
          shouldShow: () => {
            return peopleSuggestions.length > 0;
          },
          onExecute: () => {
            alert('You selected people suggestions');
          },
          ariaLabel: 'Showing results',
        },
        {
          renderItem: () => {
            return <>Select to log out to console</>;
          },
          shouldShow: () => {
            return peopleSuggestions.length > 0;
          },
          onExecute: () => {
            console.log(peopleSuggestions);
          },
          ariaLabel: 'Select to log out to console',
        },
      ],
      suggestionsFooterContainerAriaLabel: 'Footer container',
      suggestionsHeaderContainerAriaLabel: 'Header container',
    };
  });

  const _onSuggestionSelected = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    item: IFloatingSuggestionItemProps<IPersonaProps>,
  ) => {
    _markSuggestionSelected(item);
  };

  const _onSuggestionRemoved = (
    ev: React.MouseEvent<HTMLElement, MouseEvent>,
    suggestionToRemove: IFloatingSuggestionItemProps<IPersonaProps>,
  ) => {
    setPeopleSuggestions(suggestions => {
      const modifiedSuggestions = suggestions.filter(item => item.id !== suggestionToRemove.id);
      return modifiedSuggestions;
    });
  };

  const _markSuggestionSelected = (selectedSuggestion: IFloatingSuggestionItemProps<IPersonaProps>) => {
    setPeopleSuggestions(suggestions => {
      const modifiedSuggestions = suggestions.map(suggestion =>
        suggestion.id === selectedSuggestion.id
          ? { ...suggestion, isSelected: true }
          : { ...suggestion, isSelected: false },
      );
      return modifiedSuggestions;
    });
  };

  const selectPreviousItem = () => {
    // Headers are not selectable in this example
    // Suggestions
    if (selectedSuggestionIndex > -1) {
      if (selectedSuggestionIndex === 0) {
        setSelectedSuggestionIndex(-1);
      }
      // otherwise, move up one
      else {
        setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
      }
    }
    // footers
    else if (selectedFooterIndex > -1) {
      if (selectedFooterIndex === 0) {
        // move to suggestions
        setSelectedFooterIndex(-1);
        setSelectedSuggestionIndex(peopleSuggestions.length - 1);
      } else {
        setSelectedFooterIndex(selectedFooterIndex - 1);
      }
    }
  };

  const selectNextItem = () => {
    // Headers are not selectable in this example
    // Suggestions
    if (selectedSuggestionIndex === -1 && selectedFooterIndex === -1) {
      setSelectedSuggestionIndex(0);
    } else if (selectedSuggestionIndex > -1) {
      // if we're at the end of the suggestions, move to the footer
      if (selectedSuggestionIndex === peopleSuggestions.length - 1) {
        setSelectedSuggestionIndex(-1);
        setSelectedFooterIndex(0);
      }
      // otherwise, move down one
      else {
        setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
      }
    }
    // footers
    else if (selectedFooterIndex > -1) {
      if (selectedFooterIndex === suggestionProps.footerItemsProps!.length - 1) {
        // if we're at the end, stay there
      } else {
        setSelectedFooterIndex(selectedFooterIndex + 1);
      }
    }
  };

  const _onInputKeyDown = (ev: React.KeyboardEvent<Autofill | HTMLElement>) => {
    // eslint-disable-next-line deprecation/deprecation
    const keyCode = ev.which;
    switch (keyCode) {
      case KeyCodes.enter:
      case KeyCodes.tab:
        if (selectedSuggestionIndex > -1) {
          alert('an item was selected');
        }
        if (selectedFooterIndex > -1) {
          suggestionProps.footerItemsProps![selectedFooterIndex]!.onExecute!();
        }
        break;
      case KeyCodes.up:
        ev.preventDefault();
        ev.stopPropagation();
        selectPreviousItem();
        break;
      case KeyCodes.down:
        ev.preventDefault();
        ev.stopPropagation();
        selectNextItem();
        break;
    }
  };

  const _renderFloatingSuggestions = () => {
    return (
      <>
        <FloatingPeopleSuggestions
          suggestions={[...peopleSuggestions]}
          isSuggestionsVisible={true}
          targetElement={input.current?.inputElement}
          /* eslint-disable react/jsx-no-bind */
          onSuggestionSelected={_onSuggestionSelected}
          onRemoveSuggestion={_onSuggestionRemoved}
          /* eslint-enable react/jsx-no-bind */
          noResultsFoundText={'No suggestions'}
          onFloatingSuggestionsDismiss={undefined}
          showSuggestionRemoveButton={true}
          pickerSuggestionsProps={suggestionProps}
          selectedSuggestionIndex={selectedSuggestionIndex}
          selectedFooterIndex={selectedFooterIndex}
          selectedHeaderIndex={selectedHeaderIndex}
          gapSpace={20}
        />
      </>
    );
  };

  return (
    <div className={'ms-BasePicker-text'}>
      <Autofill
        ref={input}
        aria-label={'input'}
        style={{
          display: 'flex',
          flex: '1 1 auto',
          height: '34px',
          border: 'none',
          outline: 'none',
          padding: '0 6px 0px',
          margin: '1px',
        }}
        // eslint-disable-next-line react/jsx-no-bind
        onKeyDown={_onInputKeyDown}
      />
      {_renderFloatingSuggestions()}
    </div>
  );
};
