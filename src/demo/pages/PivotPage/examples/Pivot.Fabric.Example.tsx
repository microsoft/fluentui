import * as React from 'react';
import {
  Label,
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from '../../../../index';

import CalloutExample from '../../CalloutPage/examples/Callout.Basic.Example';
import SpinnerExample from '../../SpinnerPage/examples/Spinner.Basic.Example';
import PersonaExample from '../../PersonaPage/examples/Persona.Basic.Example';

export default class PivotFabricExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot linkFormat={ PivotLinkFormat.links} linkSize={ PivotLinkSize.normal }>
            <PivotItem linkText='Callout'>
              <Label>Callout Example</Label>
              <CalloutExample/>
            </PivotItem>
            <PivotItem linkText='Spinner'>
              <Label>Spinner Example</Label>
              <SpinnerExample/>
            </PivotItem>
            <PivotItem linkText='PersonaCard'>
              <Label>Persona Card Example</Label>
              <PersonaExample/>
            </PivotItem>
        </Pivot>
      </div>
    );
  }

}
