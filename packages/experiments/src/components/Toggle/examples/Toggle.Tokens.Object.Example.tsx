import * as React from 'react';
import { Toggle } from '../index';
import { IToggleTokens } from '../Toggle.types';

const tokens1: IToggleTokens = {
  pillHoveredBackground: 'black',
  textColor: 'red'
};

const tokens2: IToggleTokens = {
  pillBackground: 'orange',
  pillJustifyContent: 'center',
  textColor: 'purple',
  thumbBackground: 'green'
};

const tokens3: IToggleTokens = {
  pillBackground: 'dimgrey',
  pillBorderColor: 'brown',
  textColor: 'darkred'
};

export class ToggleTokensObjectExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    // TODO: Example 1 is flickering when toggling state compared to master. it appears to be flickering non-hovered state
    //        The entire DOM structure seems to be recreated on Toggle, which is probably causing the issue.
    //        This recreation probably causes the non-hover flicker.
    //        This ONLY happens when createElementWrapper is NOT used. Issue with slots implementation? Ideally
    //          slots should work the same with and without createElementWrapper usage.
    // TODO: Also not using creatElementWrapper introduces slots ref on function error with KeytipData's use of Slots.pill:
    //        Warning: Function components cannot be given refs. Attempts to access this ref will fail.
    return (
      <div>
        <Toggle defaultChecked={true} label="Example 1" onText="On" offText="Off" onChange={this._onChange} tokens={tokens1} />
        <Toggle defaultChecked={false} label="Example 2" onText="On" offText="Off" onChange={this._onChange} tokens={tokens2} />
        <Toggle defaultChecked={true} disabled={true} label="Example 3" onText="On - Disabled" offText="Off" tokens={tokens3} />
      </div>
    );
  }

  private _onChange(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
}
