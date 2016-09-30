import * as React from 'react';
import './ThemerPage.scss';

import { loadTheme } from '@microsoft/load-themed-styles';

import { IThemeSlotRule } from '../../../components/ThemeGenerator/IThemeSlotRule';
import { ThemeGenerator } from '../../../components/ThemeGenerator/ThemeGenerator';
import { ThemeRulesStandardCreator, ThemeSlotsStandard } from '../../../components/ThemeGenerator/ThemeRulesStandard';

import { ColorPicker } from '../../../components/ColorPicker/index';
import { Shades, getShade } from '../../../utilities/Color/Shades';
import { getColorFromString } from '../../../utilities/Color/Colors';

import { ExampleCard } from '../../components/index';
import { ToggleBasicExample } from '../TogglePage/examples/Toggle.Basic.Example';

const ToggleBasicExampleCode = require('../TogglePage/examples/Toggle.Basic.Example.tsx');

export class ThemerPage extends React.Component<any, any> {
  private _themeRules: Array<IThemeSlotRule>

  constructor() {
    super();

    this._themeRules = ThemeRulesStandardCreator();
  }

  public render() {
    return (
      <div>
        <ColorPicker
          color={ '#0078d7' }
          onColorChanged={ this._onColorChanged.bind(this) } />

        <div className='ms-themer-swatchBg' id='swatchBg'>
          <div className='ms-themer-swatch' id='shadeOriginal'></div>
          <div className='ms-themer-swatch' id='shadeLightest'></div>
          <div className='ms-themer-swatch' id='shadeLighter'></div>
          <div className='ms-themer-swatch' id='shadeMedium'></div>
          <div className='ms-themer-swatch' id='shadeDarker'></div>
          <div className='ms-themer-swatch' id='shadeDarkest'></div>
        </div>

        <ExampleCard title='Toggle' code={ ToggleBasicExampleCode }>
          <ToggleBasicExample />
        </ExampleCard>
      </div>
    );
  }

  public componentDidMount() {
    this._onColorChanged('#0078d7');
    ThemeGenerator.setSlot(this._themeRules[ThemeSlotsStandard.primaryPalette], "#0078d7", this._themeRules);
    ThemeGenerator.insureSlots(this._themeRules);
  }

  private _onColorChanged(newColor: string) {
    ThemeGenerator.setSlot(this._themeRules[ThemeSlotsStandard.primaryPalette], newColor, this._themeRules);
    console.log("New theme", ThemeGenerator.getTheme(this._themeRules));
    loadTheme(ThemeGenerator.getTheme(this._themeRules));

    document.getElementById('swatchBg').style.backgroundColor = this._themeRules[ThemeSlotsStandard.primaryPalette].value.str;
    document.getElementById('shadeOriginal').style.backgroundColor = this._themeRules[ThemeSlotsStandard.primaryPalette].value.str;
    document.getElementById('shadeLightest').style.backgroundColor = this._themeRules[ThemeSlotsStandard.primaryLightest].value.str;
    document.getElementById('shadeLighter').style.backgroundColor = this._themeRules[ThemeSlotsStandard.primaryLighter].value.str;
    document.getElementById('shadeMedium').style.backgroundColor = this._themeRules[ThemeSlotsStandard.primaryMedium].value.str;
    document.getElementById('shadeDarker').style.backgroundColor = this._themeRules[ThemeSlotsStandard.primaryDarker].value.str;
    document.getElementById('shadeDarkest').style.backgroundColor = this._themeRules[ThemeSlotsStandard.primaryDarkest].value.str;

  }
}
