import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';
export class ToggleBasicExample extends React.Component {
  public render(): JSX.Element {
    // tslint:disable:jsx-no-lambda
    return (
      <div style={{ padding: '2px' }}>
        <Toggle
          defaultChecked={true}
          label="Enabled and checked"
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={this._onChange}
        />
        <Toggle
          defaultChecked={false}
          label="Enabled and unchecked"
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={this._onChange}
        />
        <Toggle
          defaultChecked={true}
          disabled={true}
          label="Disabled and checked"
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
        />
        <Toggle
          defaultChecked={false}
          disabled={true}
          label="Disabled and unchecked"
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
        />
        <Toggle
          defaultChecked={true}
          label="With inline label"
          inlineLabel={true}
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={this._onChange}
        />
        <Toggle
          defaultChecked={true}
          label={
            <div>
              <Link href="https://bing.com" target="_blank">
                Learn More
              </Link>
              <TooltipHost content="JSX Element Label">
                <Icon iconName="Info" />
              </TooltipHost>
            </div>
          }
          inlineLabel={true}
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={this._onChange}
        />
        <Toggle
          defaultChecked={true}
          disabled={true}
          label="Disabled with inline label"
          inlineLabel={true}
          onText="On"
          offText="Off"
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
        />
        <Toggle
          defaultChecked={true}
          label="With inline label and without onText and offText"
          inlineLabel={true}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={this._onChange}
        />
        <Toggle
          defaultChecked={true}
          label={
            <div>
              <Link href="https://bing.com" target="_blank">
                Learn More
              </Link>
              <TooltipHost content="JSX Element Label">
                <Icon iconName="Info" />
              </TooltipHost>
            </div>
          }
          inlineLabel={true}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
          onChange={this._onChange}
        />
        <Toggle
          defaultChecked={true}
          disabled={true}
          label="Disabled with inline label and without onText and offText"
          inlineLabel={true}
          onFocus={() => console.log('onFocus called')}
          onBlur={() => console.log('onBlur called')}
        />
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}
