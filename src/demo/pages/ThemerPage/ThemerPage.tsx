import * as React from 'react';
import './ThemerPage.scss';

// import { loadTheme } from '@microsoft/load-themed-styles';

// import { IThemeSlotRule } from '../../../components/ThemeGenerator/IThemeSlotRule';
import { ThemeGenerator } from '../../../components/ThemeGenerator/ThemeGenerator';
import { ThemeRulesStandardCreator, PaletteName } from '../../../components/ThemeGenerator/ThemeRulesStandard';

import { ColorPicker } from '../../../components/ColorPicker/index';

import { ExampleCard } from '../../components/index';
import { ToggleBasicExample } from '../TogglePage/examples/Toggle.Basic.Example';

const ToggleBasicExampleCode = require('../TogglePage/examples/Toggle.Basic.Example.tsx');

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
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>

        { [this._oneColor('Primary'), this._oneColor('Neutral'), this._oneColor('Secondary')] }

        <ExampleCard title='Toggle' code={ ToggleBasicExampleCode }>
          <ToggleBasicExample />
        </ExampleCard>
      </div>
    );
  }

  private _oneColor(paletteSlot: string) {
    function _onColorChanged(newColor: string) {
      let themeRules = this.state.themeRules;
      ThemeGenerator.setSlot(themeRules[paletteSlot + PaletteName], newColor, themeRules);
      this.setState({themeRules: themeRules});
      this._makeNewTheme();
    }

    return (
      <div className='ms-themer-paletteSlot' key={ paletteSlot }>
        <ColorPicker
          color={ this.state.themeRules[paletteSlot + PaletteName].value.str }
          onColorChanged={ _onColorChanged.bind(this) } />
        <div className='ms-themer-swatchBg' style={{ backgroundColor: this.state.themeRules[paletteSlot + PaletteName].value.str }}>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[paletteSlot + PaletteName].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[paletteSlot + 'Lightest'].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[paletteSlot + 'Lighter'].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[paletteSlot + 'Medium'].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[paletteSlot + 'Darker'].value.str }}></div>
          <div className='ms-themer-swatch' style={{ backgroundColor: this.state.themeRules[paletteSlot + 'Darkest'].value.str }}></div>
        </div>
      </div>
    );
  }

  private _makeNewTheme() {
    console.log('New theme', ThemeGenerator.getTheme(this.state.themeRules));
    // loadTheme(ThemeGenerator.getTheme(this.state.themeRules));
  }
}
