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

  constructor(props: {}) {
    super(props);
  }

  /* tslint:disable:jsx-ban-props jsx-no-lambda */
  public render(): JSX.Element {
    return (
      <div>
        <p>Press Alt-Win to enable keytips, Esc to return up a level, and Alt-Win to exit keytip mode</p>
        <Pivot>
          <PivotItem linkText='Tab A' keytipProps={ keytipMap.Pivot1Keytip } style={ { height: 500 } }>
            <Checkbox
              keytipProps={ keytipMap.Checkbox1Pivot1Keytip }
              label={ 'Check Box' }
            />
            <Toggle keytipProps={ keytipMap.Toggle1Pivot1Keytip } onText={ 'Toggle On' } offText={ 'Toggle Off' } />
            <Link keytipProps={ keytipMap.Link1Pivot1Keytip } href={ 'http://www.bing.com' }>This is a link</Link>
            <ComboBox
              label={ 'Combo Box' }
              options={ this._sampleOptions }
              keytipProps={ keytipMap.ComboBox1Pivot1Keytip }
            />
            <Dropdown
              label={ 'Dropdown' }
              keytipProps={ keytipMap.Dropdown1Pivot1Keytip }
              options={ this._sampleOptions }
            />
            <SpinButton label={ 'Spin Button' } keytipProps={ keytipMap.SpinButton1Pivot1Keytip } />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}

/*
  <PivotItem linkText='Tab B' keytipProps={ keytipMap.Pivot2Keytip } style={ { height: 500 } }>
  </PivotItem>
  <PivotItem linkText='Tab C' keytipProps={ keytipMap.Pivot3Keytip } style={ { height: 500 } }>
  </PivotItem>
*/