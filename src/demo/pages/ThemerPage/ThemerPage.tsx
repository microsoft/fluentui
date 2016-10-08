import * as React from 'react';
import './ThemerPage.scss';

import { loadTheme } from '@microsoft/load-themed-styles';
import { IColor } from '../../../utilities/Color/IColor';
import { getContrastRatio } from '../../../utilities/Color/Shades';
import { mapEnumByName } from '../../../utilities/object';

import { ThemeGenerator } from '../../../components/ThemeGenerator/ThemeGenerator';
import { IThemeSlotRule } from '../../../components/ThemeGenerator/IThemeSlotRule';
import {
  ThemeRulesStandardCreator,
  PaletteSlot,
  PaletteName,
  SemanticSlot
} from '../../../components/ThemeGenerator/ThemeRulesStandard';

import { Callout } from '../../../index';
import { ColorPicker } from '../../../components/ColorPicker/index';

import { TeachingBubbleBasicExample } from '../TeachingBubblePage/examples/TeachingBubble.Basic.Example';
import { TextFieldBasicExample } from '../TextFieldPage/examples/TextField.Basic.Example';
import { ToggleBasicExample } from '../TogglePage/examples/Toggle.Basic.Example';

export class ThemerPage extends React.Component<any, any> {
  constructor() {
    super();

    let themeRules = ThemeRulesStandardCreator();
    ThemeGenerator.insureSlots(themeRules);

    this.state = {
      themeRules: themeRules,
      colorPickerSlot: null,
      colorPickerElement: null,
      colorPickerVisible: false
    };
  }

  public render() {
    let { themeRules, colorPickerVisible, colorPickerSlot, colorPickerElement } = this.state;

    let slotsList = mapEnumByName(SemanticSlot, (x, slot) => {
      return this._semanticSlotWidget(slot);
    });

    return (
      <div className='ms-themer'>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          { [this._oneColor(PaletteSlot.Primary), this._oneColor(PaletteSlot.Neutral)] }
        </div>

        { slotsList }
        { colorPickerVisible && colorPickerSlot && colorPickerElement &&
          <Callout
            key={ colorPickerSlot }
            gapSpace={ 10 }
            targetElement={ colorPickerElement }
            setInitialFocus={ true }
            onDismiss={ this._colorPickerOnDismiss.bind(this) }>
            <ColorPicker
              color={ themeRules[SemanticSlot[colorPickerSlot]].value.str }
              onColorChanged={ this._semanticSlotChanged.bind(this, colorPickerSlot) }/>
          </Callout>
        }

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

  private _colorPickerOnDismiss(ev: React.MouseEvent) {
    this.setState({ colorPickerVisible: false });
  }

  private _semanticSlotChanged(slot: SemanticSlot, color: string) {
    let { themeRules } = this.state;

    ThemeGenerator.setSlot(themeRules[SemanticSlot[slot]], color, themeRules);
    this.setState({ themeRules: themeRules }, this._makeNewTheme);
  }

  private _onSwatchClick(slot: SemanticSlot, ev: React.MouseEvent) {
    let { colorPickerSlot, colorPickerElement } = this.state;

    if (!!colorPickerSlot && !!colorPickerElement && colorPickerSlot === slot && colorPickerElement === ev.target) { // same one, close it
      this.setState({ colorPickerVisible: false, colorPickerSlot: null, colorPickerElement: null });
    } else { // new one, open it
      this.setState({ colorPickerVisible: true, colorPickerSlot: slot, colorPickerElement: ev.target });
    }
  }

  private _semanticSlotWidget(semanticSlot: SemanticSlot) {
    let themeRules = this.state.themeRules;
    let thisSlot = themeRules[SemanticSlot[semanticSlot]];

    return (
      <div key={semanticSlot} className='ms-themer-slot'>
        <div
          className='ms-themer-swatch'
          style={{ backgroundColor: thisSlot.value.str }}
          onClick={ this._onSwatchClick.bind(this, semanticSlot) }>
        </div>
        <div>
          <div>{ SemanticSlot[semanticSlot] }</div>
          { !thisSlot.isCustomized ?
            <div>Inherits from: { thisSlot.inherits.name }</div>
          : <div>Custom value</div> }
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
      this.setState({themeRules: themeRules}, this._makeNewTheme);
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
