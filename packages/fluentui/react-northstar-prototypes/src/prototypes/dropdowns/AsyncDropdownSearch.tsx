import { CodeSnippet } from '@fluentui/docs-components';
import { Dropdown, DropdownProps, Flex, Label, Loader } from '@fluentui/react-northstar';
import * as faker from 'faker';
import * as _ from 'lodash';
import * as React from 'react';

// ----------------------------------------
// Types
// ----------------------------------------
type Entry = {
  header: string;
  image: string;
  content: string;
};

interface SearchPageState {
  loading: boolean;
  items: Entry[];
  searchQuery: string;
  value: Entry[];
}

// ----------------------------------------
// Mock Data
// ----------------------------------------
const createEntry = (): Entry => ({
  image: faker.internet.avatar(),
  header: `${faker.name.firstName()} ${faker.name.lastName()}`,
  content: faker.commerce.department(),
});

// ----------------------------------------
// Prototype Search Page View
// ----------------------------------------
class AsyncDropdownSearch extends React.Component<{}, SearchPageState> {
  state = {
    loading: false,
    searchQuery: '',
    items: [],
    value: [],
  };

  searchTimer: number;

  handleChange = (e: React.SyntheticEvent, { searchQuery, value }: DropdownProps) => {
    this.setState({ value: value as Entry[], searchQuery });
  };

  handleSearchQueryChange = (e: React.SyntheticEvent, { searchQuery }: DropdownProps) => {
    this.setState({ searchQuery });
    this.fetchItems();
  };

  fetchItems = () => {
    clearTimeout(this.searchTimer);
    if (this.state.items.length > 10) return;

    this.setState({ loading: true });
    this.searchTimer = window.setTimeout(() => {
      this.setState(prevState => ({
        loading: false,
        items: [...prevState.items, ..._.times<Entry>(2, createEntry)],
      }));
    }, 2000);
  };

  render() {
    const { items, loading, searchQuery, value } = this.state;

    return (
      <Flex gap="gap.medium">
        <Flex.Item size="size.quarter">
          <Dropdown
            fluid
            items={items}
            loading={loading}
            loadingMessage={<Loader label="Loading..." labelPosition="end" />}
            multiple
            onSearchQueryChange={this.handleSearchQueryChange}
            onChange={this.handleChange}
            placeholder="Try to enter something..."
            search
            searchQuery={searchQuery}
            toggleIndicator={false}
            value={value}
            noResultsMessage="We couldn't find any matches"
          />
        </Flex.Item>
        <Flex.Item grow>
          <div>
            <Label color="black">Dropdown State</Label>
            <CodeSnippet mode="json" value={this.state} />
          </div>
        </Flex.Item>
      </Flex>
    );
  }
}

export default AsyncDropdownSearch;
