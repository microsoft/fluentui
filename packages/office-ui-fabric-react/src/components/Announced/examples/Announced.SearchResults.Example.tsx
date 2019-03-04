import * as React from 'react';
import { Announced } from '../Announced';
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Async } from 'office-ui-fabric-react/lib/Utilities';

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
  emptyInput: boolean;
}

export interface IAnnouncedSearchResultsExampleProps {}

export class AnnouncedSearchResultsExample extends React.Component<
  IAnnouncedSearchResultsExampleProps,
  IAnnouncedSearchResultsExampleState
> {
  private timer: number;
  private _async: Async;

  constructor(props: {}) {
    super(props);

    this._async = new Async(this);

    this.state = {
      seconds: 0,
      numberOfSuggestions: 0,
      emptyInput: true
    };

    this.timer = this._async.setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  public render(): JSX.Element {
    return (
      <Stack gap={10}>
        <Text>
          Turn on Narrator and type a letter or two into the TagPicker. This picker will filter added items from the search suggestions.
        </Text>
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
      </Stack>
    );
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
  }

  private _renderAnnounced(): JSX.Element | undefined {
    const { numberOfSuggestions, emptyInput } = this.state;

    if (!emptyInput) {
      return (
        <Announced
          message={numberOfSuggestions === 1 ? `${numberOfSuggestions} Color Tag Found` : `${numberOfSuggestions} Color Tags Found`}
        />
      );
    }
  }

  // tslint:disable-next-line:no-any
  private _getTextFromItem(item: any): any {
    return item.name;
  }

  private _onFilterChanged = (filterText: string, tagList: { key: string; name: string }[]): { key: string; name: string }[] => {
    if (filterText && this.state.emptyInput) {
      this.setState({ emptyInput: false });
    } else if (!filterText && !this.state.emptyInput) {
      this.setState({ emptyInput: true });
    }

    const filteredTags = filterText
      ? _testTags
          .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
          .filter(tag => !this._listContainsDocument(tag, tagList))
      : [];

    if (filteredTags.length !== this.state.numberOfSuggestions) {
      this.setState({ numberOfSuggestions: filteredTags.length });
    }

    return filteredTags;
  };

  private _listContainsDocument(tag: { key: string; name: string }, tagList: { key: string; name: string }[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
  }
}
