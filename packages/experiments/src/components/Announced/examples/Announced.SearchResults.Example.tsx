import * as React from 'react';
import { Announced } from '../Announced';
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';

const _testTags = [
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
].map(item => ({ key: item, name: item }));

export interface IAnnouncedSearchResultsExampleState {
  seconds: number;
  numberOfSuggestions: number;
}

export interface IAnnouncedSearchResultsExampleProps {}

export class AnnouncedSearchResultsExample extends React.Component<
  IAnnouncedSearchResultsExampleProps,
  IAnnouncedSearchResultsExampleState
> {
  private timer: number;

  constructor(props: {}) {
    super(props);
    this.state = {
      seconds: 0,
      numberOfSuggestions: 0
    };

    this.timer = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  public render(): JSX.Element {
    return (
      <>
        <p>
          Turn on Narrator and type a letter or two into the TagPicker. This picker will filter added items from the search suggestions.
        </p>
        <p>The Announced component should announce the number of search results found.</p>
        {this._renderAnnounced()}
        <TagPicker
          onResolveSuggestions={this._onFilterChanged}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found' // this alert handles the case when there are no suggestions available
          }}
          inputProps={{
            'aria-label': 'Tag Picker'
          }}
        />
      </>
    );
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
  }

  public componentDidUpdate(prevProps: IAnnouncedSearchResultsExampleProps, prevState: IAnnouncedSearchResultsExampleState): void {
    const suggestionsContainer = document.getElementsByClassName('ms-Suggestions-container');
    if (suggestionsContainer && suggestionsContainer[0]) {
      const results = suggestionsContainer[0].children;
      if (results.length !== this.state.numberOfSuggestions) {
        this.setState({ numberOfSuggestions: results.length });
      }
    } else if (this.state.numberOfSuggestions !== 0) {
      this.setState({ numberOfSuggestions: 0 });
    }
  }

  private _renderAnnounced(): JSX.Element | undefined {
    const { numberOfSuggestions } = this.state;
    // only render if the suggestions have been rendered
    const suggestions = document.getElementsByClassName('ms-Suggestions');
    if (suggestions && suggestions[0]) {
      return (
        <Announced
          message={numberOfSuggestions === 1 ? `${numberOfSuggestions} Color Tag Found` : `${numberOfSuggestions} Color Tags Found`}
          id={`announced-${numberOfSuggestions}`}
        />
      );
    }
  }

  // tslint:disable-next-line:no-any
  private _getTextFromItem(item: any): any {
    return item.name;
  }

  private _onFilterChanged = (filterText: string, tagList: { key: string; name: string }[]): { key: string; name: string }[] => {
    return filterText
      ? _testTags
          .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
          .filter(tag => !this._listContainsDocument(tag, tagList))
      : [];
  };

  private _listContainsDocument(tag: { key: string; name: string }, tagList: { key: string; name: string }[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }
}
