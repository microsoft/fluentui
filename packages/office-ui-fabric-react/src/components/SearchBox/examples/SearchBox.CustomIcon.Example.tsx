import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { mergeStyleSets } from '@uifabric/styling';

const styles = mergeStyleSets({
  searchBox: {
    margin: '0 0 10px 0'
  }
});

// tslint:disable:jsx-no-lambda
export class SearchBoxCustomIconExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className={styles.searchBox}>
        <SearchBox
          placeholder="Filter"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          iconProps={{ iconName: 'Filter' }}
        />
      </div>
    );
  }
}
