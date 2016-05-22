import * as React from 'react';
import {
  Label,
  Pivot,
  PivotItem,
  PivotLinkFormat,
  PivotLinkSize
} from '../../../../index';

import { CalloutBasicExample } from '../../CalloutPage/examples/Callout.Basic.Example';
import { SpinnerBasicExample } from '../../SpinnerPage/examples/Spinner.Basic.Example';
import { PersonaBasicExample } from '../../PersonaPage/examples/Persona.Basic.Example';

export class PivotFabricExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot linkFormat={ PivotLinkFormat.links} linkSize={ PivotLinkSize.normal }>
            <PivotItem linkText='Callout'>
              <Label>Callout Example</Label>
              <CalloutBasicExample/>
            </PivotItem>
            <PivotItem linkText='Spinner'>
              <Label>Spinner Example</Label>
              <SpinnerBasicExample/>
            </PivotItem>
            <PivotItem linkText='PersonaCard'>
              <Label>Persona Card Example</Label>
              <PersonaBasicExample/>
            </PivotItem>
        </Pivot>
      </div>
    );
  }

}
