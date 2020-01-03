import * as React from 'react';
import { SearchBox, DefaultButton } from 'office-ui-fabric-react';

// tslint:disable:jsx-no-lambda
export class SearchBoxSmallExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <>
        <SearchBox
          styles={{ root: { width: 200 } }}
          placeholder="Search"
          // onEscape={ev => {
          //   console.log('Custom onEscape Called');
          // }}
          // onClear={ev => {
          //   console.log('Custom onClear Called');
          // }}
          // onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
          // onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
          // onFocus={() => console.log('onFocus called')}
          // onBlur={() => console.log('onBlur called')}
        />
        <DefaultButton
          menuProps={{
            items: [
              {
                key: 'emailMessage',
                text: 'Email message',
                iconProps: { iconName: 'Mail' }
              },
              {
                key: 'calendarEvent',
                text: 'Calendar event',
                iconProps: { iconName: 'Calendar' }
              }
            ]
          }}
        >
          Click Me
        </DefaultButton>
      </>
    );
  }
}
