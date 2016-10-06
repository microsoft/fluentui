import * as React from 'react';
import './ThemerPage.scss';

import { loadTheme } from '@microsoft/load-themed-styles';
import { IColor } from '../../../utilities/Color/IColor';
import { getContrastRatio } from '../../../utilities/Color/Shades';
import { mapEnumByName } from '../../../utilities/object';

import { ThemeGenerator } from '../../../components/ThemeGenerator/ThemeGenerator';
import {
  ThemeRulesStandardCreator,
  PaletteSlot,
  PaletteName,
  SemanticSlot
} from '../../../components/ThemeGenerator/ThemeRulesStandard';

import { ColorPicker } from '../../../components/ColorPicker/index';

import { ExampleCard } from '../../components/index';
import { TeachingBubbleBasicExample } from '../TeachingBubblePage/examples/TeachingBubble.Basic.Example';
import { TextFieldBasicExample } from '../TextFieldPage/examples/TextField.Basic.Example';
import { ToggleBasicExample } from '../TogglePage/examples/Toggle.Basic.Example';

const TeachingBubbleBasicExampleCode = require('../TeachingBubblePage/examples/TeachingBubble.Basic.Example.tsx');
const TextFieldBasicExampleCode = require('../TextFieldPage/examples/TextField.Basic.Example.tsx');
const ToggleBasicExampleCode = require('../TogglePage/examples/Toggle.Basic.Example.tsx');

let hsv2hsl = require('color-functions/lib/hsv2hsl');
let hsl2rgb = require('color-functions/lib/hsl2rgb');

export class ThemerPage extends React.Component<any, any> {
  constructor() {
    super();

    let themeRules = ThemeRulesStandardCreator();
    ThemeGenerator.insureSlots(themeRules);

    this.state = {
      themeRules: themeRules
    };
  }

  public render() {
    let slotsList = mapEnumByName(SemanticSlot, (x, slot) => {
      return this._semanticSlotWidget(slot);
    });

    return (
      <div className='ms-themer'>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          { [this._oneColor(PaletteSlot.Primary), this._oneColor(PaletteSlot.Neutral)] }
        </div>

        { slotsList }

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className='ms-themer-example'><TextFieldBasicExample /></div>
          <div className='ms-themer-example'><ToggleBasicExample /></div>
          <div className='ms-themer-example'><TeachingBubbleBasicExample /></div>
        </div>

        <h3>Accessibility</h3>
        <p>Each pair of colors below should produce legible text and have a minimum contrast ratio of 4.5 [TBD].</p>
        <table className='ms-themer-accessibilityTable'>
           { [this._accessibilityRow(SemanticSlot.DisabledForeground, SemanticSlot.DisabledBackground),
              this._accessibilityRow(SemanticSlot.CounteraccentForeground, SemanticSlot.AccentBackground),
              this._accessibilityRow(SemanticSlot.Foreground, SemanticSlot.NeutralBackground),
              this._accessibilityRow(SemanticSlot.NeutralForeground, SemanticSlot.NeutralBackground),
              this._accessibilityRow(SemanticSlot.AccentBackground, SemanticSlot.NeutralBackground)
            ] }
        </table>
      </div>
    );
  }

  private _semanticSlotWidget(semanticSlot: SemanticSlot) {
    let themeRules = this.state.themeRules;
    return (
      <div key={semanticSlot} className='ms-themer-slot'>
        <div className='ms-themer-swatch' style={{ backgroundColor: themeRules[SemanticSlot[semanticSlot]].value.str }}></div>
        <div>
          <div>{ SemanticSlot[semanticSlot] }</div>
          <div>Inherits from: { themeRules[SemanticSlot[semanticSlot]].inherits.name }</div>
        </div>
      </div>
    );
  }

  private _accessibilityRow(foreground: SemanticSlot, background: SemanticSlot) {
    let themeRules = this.state.themeRules;
    let bgc: IColor = themeRules[SemanticSlot[background]].value;
    let fgc: IColor = themeRules[SemanticSlot[foreground]].value;

    let contrastRatio = getContrastRatio(bgc, fgc);
    let contrastRatioString = String(contrastRatio);
    contrastRatioString = contrastRatioString.substr(0, contrastRatioString.indexOf('.') + 3);
    if (contrastRatio < 4.5) {
      contrastRatioString = '**' + contrastRatioString + '**';
    }

    return (
      <tr key={ String(foreground) + String(background) }>
        <td style={{ backgroundColor: bgc.str, color: fgc.str }}>The quick brown fox jumps over the lazy dog.</td>
        <td>{ contrastRatioString }</td>
        <td>{ SemanticSlot[foreground] + ' + ' + SemanticSlot[background] }</td>
      </tr>
    );
  }

  private _makeNewTheme() {
    console.log('New theme', ThemeGenerator.getTheme(this.state.themeRules));
    loadTheme(ThemeGenerator.getTheme(this.state.themeRules));
  }

  private _oneColor(paletteSlot: PaletteSlot) {
    function _onColorChanged(newColor: string) {
      let themeRules = this.state.themeRules;
      ThemeGenerator.setSlot(themeRules[PaletteSlot[paletteSlot] + PaletteName], newColor, themeRules);
      this.setState({themeRules: themeRules});
      this._makeNewTheme();
    }

    return (
      <div className='ms-themer-paletteSlot' key={ paletteSlot }>
        <h3>{ PaletteSlot[paletteSlot] }</h3>
        <ColorPicker
          color={ this.state.themeRules[PaletteSlot[paletteSlot] + PaletteName].value.str }
          onColorChanged={ _onColorChanged.bind(this) } />
        <div className='ms-themer-swatchBg' style={{ backgroundColor: this.state.themeRules[PaletteSlot[paletteSlot] + PaletteName].value.str }}>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[PaletteSlot[paletteSlot] + PaletteName].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[PaletteSlot[paletteSlot] + 'Lightest'].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[PaletteSlot[paletteSlot] + 'Lighter'].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[PaletteSlot[paletteSlot] + 'Medium'].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[PaletteSlot[paletteSlot] + 'Darker'].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[PaletteSlot[paletteSlot] + 'Darkest'].value.str }}></div>
        </div>
      </div>
    );
  }
}
