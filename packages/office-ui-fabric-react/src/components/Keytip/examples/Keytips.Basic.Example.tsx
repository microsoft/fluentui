import * as React from 'react';
import { keytipMap } from './KeytipSetup';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

export class KeytipsBasicExample extends React.Component<{}> {
  private _sampleOptions = [{ key: 'A', text: 'Option 1' }, { key: 'B', text: 'Option 2' }, { key: 'C', text: 'Option 3' }];

  /* tslint:disable:jsx-ban-props jsx-no-lambda */
  public render(): JSX.Element {
    return (
      <div>
        <p>For Pivots, keytips will first show for each of the pivots. After selecting a pivot, the Keytips for its content are shown.</p>
        <Pivot>
          <PivotItem headerText="Pivot 1" keytipProps={keytipMap.Pivot1Keytip} style={{ width: 500, paddingTop: 20 }}>
            <SpinButton className="u-marginBottom" label={'Spin Button'} keytipProps={keytipMap.SpinButtonKeytip} />
            <Toggle className="u-marginBottom" keytipProps={keytipMap.ToggleKeytip} onText={'Yes'} offText={'No'} />
            <p>
              Go to{' '}
              <Link keytipProps={keytipMap.LinkKeytip} href={'http://www.bing.com'} target="_blank">
                Bing
              </Link>
            </p>
          </PivotItem>
          <PivotItem headerText="Pivot 2" keytipProps={keytipMap.Pivot2Keytip} style={{ width: 500, paddingTop: 20 }}>
            <Checkbox className="u-marginBottom" keytipProps={keytipMap.CheckboxKeytip} label={'Checkbox'} />
            <Dropdown label={'Dropdown'} keytipProps={keytipMap.DropdownKeytip} options={this._sampleOptions} />
          </PivotItem>
          <PivotItem headerText="Pivot 3" keytipProps={keytipMap.Pivot3Keytip} style={{ width: 500, paddingTop: 20 }}>
            <ComboBox label={'Combo Box'} options={this._sampleOptions} keytipProps={keytipMap.ComboBoxKeytip} />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
