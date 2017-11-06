import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import './SearchBox.Examples.scss';

// tslint:disable:jsx-no-lambda
export class SearchBoxDisabledExample extends React.Component<any, any> {

  public render() {
    return (
      <div className='ms-SearchBoxExample'>
        <SearchBox
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          disabled
        />

        <SearchBox
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          underlined={ true }
          disabled
        />
      </div>
    );
  }

}