import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import './SearchBox.Small.Example.scss';

// tslint:disable:jsx-no-lambda
export class SearchBoxSmallExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="ms-SearchBoxSmallExample">
        <SearchBox
          placeholder="Search"
          onEscape={(ev: any) => {
            console.log('Custom onEscape Called');
          }}
          onClear={(ev: any) => {
            console.log('Custom onClear Called');
          }}
          onChange={(newValue: any) => console.log('SearchBox onChange fired: ' + newValue)}
          onSearch={(newValue: any) => console.log('SearchBox onSearch fired: ' + newValue)}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
        />
      </div>
    );
  }
}
