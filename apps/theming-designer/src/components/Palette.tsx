import * as React from 'react';
import { Card } from '@uifabric/react-cards';
import {
  ThemeGenerator,
  themeRulesStandardCreator,
  BaseSlots,
  FabricSlots,
  IThemeSlotRule,
  IThemeRules
} from 'office-ui-fabric-react/lib/ThemeGenerator';

export interface IPalette {
  themeRules: IThemeRules;
}

export class Palette extends React.Component<{}, IPalette> {
  render() {
    return (
      <Card styles={{ root: { width: '800px', height: 'auto' } }}>
        <h1>Fabric Palette</h1>
        <table>
          <tr>
            <th text-align="left">PRIMARY</th>
            <th>HEX</th>
            <th>FOREGROUND</th>
            <th>HEX</th>
            <th>BACKGROUND</th>
            <th>HEX</th>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themeDarker)}</td>
            <td>{'#004578'}</td>
            <td>{this._fabricSlotWidget(FabricSlots.black)}</td>
            <td>{'#000000'}</td>
            <td>{this._fabricSlotWidget(FabricSlots.neutralTertiaryAlt)}</td>
            <td>{'#C8C6C4'}</td>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themeDark)}</td>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themeDarkAlt)}</td>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themePrimary)}</td>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themeSecondary)}</td>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themeTertiary)}</td>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themeLight)}</td>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themeLighter)}</td>
          </tr>
          <tr>
            <td>{this._fabricSlotWidget(FabricSlots.themeLighterAlt)}</td>
          </tr>
        </table>
      </Card>
    );
  }

  constructor(props: {}) {
    super(props);
    const themeRules = themeRulesStandardCreator();
    // ThemeGenerator.insureSlots(themeRules, isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!));
    this.state = {
      themeRules: themeRules
    };
  }

  private _slotWidget = (slotRule: IThemeSlotRule): JSX.Element => {
    //console.log('HIIIIII + ', slotRule);
    return (
      <div key={slotRule.name} className="ms-themer-slot">
        {this._colorSquareSwatchWidget(slotRule)}
        <div>
          <div>{slotRule.name}</div>
          {!slotRule.isCustomized ? <div>Inherits from: {slotRule.inherits!.name}</div> : <div>Customized</div>}
        </div>
      </div>
    );
  };

  private _fabricSlotWidget = (fabricSlot: FabricSlots): JSX.Element => {
    return this._slotWidget(this.state.themeRules[FabricSlots[fabricSlot]]);
  };

  private _colorSquareSwatchWidget(slotRule: IThemeSlotRule): JSX.Element {
    //console.log('HIIIIII222222 + ', slotRule);
    if (slotRule.color) {
      return <div key={slotRule.name} className="ms-themer-swatch" style={{ backgroundColor: slotRule.color.str }} />;
    } else {
      return <div className="Element" />;
    }
  }
}
