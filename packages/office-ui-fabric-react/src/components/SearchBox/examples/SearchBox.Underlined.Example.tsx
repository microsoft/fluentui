import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export class SearchBoxUnderlinedExample extends React.Component<any, any> {

  public render() {
    return (
      <SearchBox
        onFocus={ () => console.log('onFocus called') }
        onBlur={ () => console.log('onBlur called') }
        underlined={ true }
      />
    );
  }

}