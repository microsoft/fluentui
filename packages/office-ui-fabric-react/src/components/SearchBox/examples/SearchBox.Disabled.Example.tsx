import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export class SearchBoxDisabledExample extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <SearchBox
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          disabled
        />

        <SearchBox
          onFocus={ () => console.log('onFocus called') }
          onBlur={ () => console.log('onBlur called') }
          inline={ true }
          disabled
        />
      </div>
    );
  }

}