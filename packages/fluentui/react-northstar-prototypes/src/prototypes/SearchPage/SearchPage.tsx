import * as faker from 'faker';
import * as _ from 'lodash';
import * as React from 'react';
import { Avatar, Header, Input, List, Segment, Loader } from '@fluentui/react-northstar';
import { SearchIcon } from '@fluentui/react-icons-northstar';

// ----------------------------------------
// Types
// ----------------------------------------
interface DataRecord {
  avatar: string;
  firstName: string;
  lastName: string;
  timestamp: string;
}

interface SearchPageState {
  loading: boolean;
  query: string;
  results: DataRecord[];
}

// ----------------------------------------
// Mock Data
// ----------------------------------------
const DATA_RECORDS = _.times(100, () => ({
  id: Math.random().toString(36).slice(2), // random string like "7llt1t638ni"
  avatar: faker.internet.avatar(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  quote: faker.hacker.phrase(),
  timestamp: faker.date.recent().toLocaleString(),
}));

// Converts a data record to a <ListItem />'s props object
const dataRecordToListItem = record => ({
  key: record.id,
  media: <Avatar name={`${record.firstName} ${record.lastName}`} image={record.avatar} />,
  header: `${record.firstName} ${record.lastName}`,
  content: record.quote,
  endMedia: record.timestamp,
});

// ----------------------------------------
// Prototype Search Page View
// ----------------------------------------
class SearchPage extends React.Component<any, SearchPageState> {
  state = { loading: false, query: '', results: [] };
  searchTimer: any;

  handleSearchChange = e => {
    const query = e.target.value;
    this.setState({ query });
    if (query) this.filterResults(query);
  };

  filterResults = _.debounce(query => {
    clearTimeout(this.searchTimer);

    const regExp = new RegExp(_.escapeRegExp(query), 'gi');

    this.setState({ loading: true });

    // mock async search query, such as against an API
    this.searchTimer = setTimeout(() => {
      const results = DATA_RECORDS.filter(record => _.some(record, value => regExp.test(value)));

      this.setState({ loading: false, results });
    }, 500);
  }, 500);

  render() {
    const { loading, results, query } = this.state;

    return (
      <Segment>
        <Header content="Search Page Prototype" />
        <p>Use the input field to perform a simulated search.</p>

        <p>
          <Input
            value={query}
            placeholder={`Try "${_.sample(DATA_RECORDS).firstName}"`}
            icon={loading ? <Loader size="small" /> : <SearchIcon />}
            onChange={this.handleSearchChange}
          />
        </p>

        {_.isEmpty(results) ? (
          <p>No results.</p>
        ) : (
          <div>
            <p>
              <small>
                Results <strong>{results.length}</strong> of <strong>{DATA_RECORDS.length}</strong>
              </small>
            </p>
            <List selectable items={results.map(dataRecordToListItem)} />
          </div>
        )}
      </Segment>
    );
  }
}

export default SearchPage;
