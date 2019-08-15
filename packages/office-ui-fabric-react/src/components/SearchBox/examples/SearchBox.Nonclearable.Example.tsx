import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import './SearchBox.Examples.scss';

// tslint:disable:jsx-no-lambda

export class SearchBoxNonclearableExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="ms-SearchBoxExample">
        <SearchBox
          clearable={false}
          placeholder="Search"
          onSearch={newValue => console.log('value is ' + newValue)}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={() => console.log('onChange called')}
        />
      </div>
    );
  }
}
