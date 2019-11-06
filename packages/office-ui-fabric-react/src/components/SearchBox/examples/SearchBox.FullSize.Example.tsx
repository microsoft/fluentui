import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { mergeStyleSets } from '@uifabric/styling';

const styles = mergeStyleSets({
  searchBox: {
    margin: '0 0 10px 0'
  }
});

// tslint:disable:jsx-no-lambda

export class SearchBoxFullSizeExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={styles.searchBox}>
        <SearchBox
          placeholder="Search"
          onSearch={newValue => console.log('value is ' + newValue)}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={() => console.log('onChange called')}
        />
        <SearchBox
          placeholder="Search with no animation"
          onSearch={newValue => console.log('value is ' + newValue)}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={() => console.log('onChange called')}
          disableAnimation
        />
      </div>
    );
  }
}
