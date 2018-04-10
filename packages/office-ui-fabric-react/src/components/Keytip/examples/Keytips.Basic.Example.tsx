import * as React from 'react';
import {
  IKeytipTransitionKey,
  KeytipTransitionModifier,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { keytipMap } from './KeytipSetup';
import { DefaultButton, CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

export interface IKeytipsBasicExampleState {
  showModal: boolean;
  showMessageBar: boolean;
  items: IOverflowSetItemProps[];
  overflowItems: IOverflowSetItemProps[];
}

export class KeytipsBasicExample extends React.Component<{}, IKeytipsBasicExampleState> {
  private _sampleOptions = [
    { key: 'A', text: 'Option 1' },
    { key: 'B', text: 'Option 2' },
    { key: 'C', text: 'Option 3' },
  ];

  /* tslint:disable:jsx-ban-props jsx-no-lambda */
  public render(): JSX.Element {
    return (
      <div>
        <Pivot>
          <PivotItem linkText='Pivot 1' keytipProps={ keytipMap.Pivot1Keytip } style={ { height: 150, width: 500 } }>
            <SpinButton label={ 'Spin Button' } keytipProps={ keytipMap.SpinButtonKeytip } />
            <Toggle keytipProps={ keytipMap.ToggleKeytip } onText={ 'Yes' } offText={ 'No' } />
            <p>Go to <Link keytipProps={ keytipMap.LinkKeytip } href={ 'http://www.bing.com' } target='_blank'>Bing</Link></p>
          </PivotItem>
          <PivotItem linkText='Pivot 2' keytipProps={ keytipMap.Pivot2Keytip } style={ { height: 150, width: 500 } }>
            <Checkbox
              keytipProps={ keytipMap.CheckboxKeytip }
              label={ 'Checkbox' }
            />
            <Dropdown
              label={ 'Dropdown' }
              keytipProps={ keytipMap.DropdownKeytip }
              options={ this._sampleOptions }
            />
          </PivotItem>
          <PivotItem linkText='Pivot 3' keytipProps={ keytipMap.Pivot3Keytip } style={ { height: 150, width: 500 } }>
            <ComboBox
              label={ 'Combo Box' }
              options={ this._sampleOptions }
              keytipProps={ keytipMap.ComboBoxKeytip }
            />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}