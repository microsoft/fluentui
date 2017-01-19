import * as React from 'react';
import './ThemerPage.scss';

import { loadTheme } from '@microsoft/load-themed-styles';
import { IColor } from '../../../utilities/Color/IColor';
import { getContrastRatio } from '../../../utilities/Color/Shades';

import { IThemeSlotRule } from '../../../components/ThemeGenerator/IThemeSlotRule';
import { ThemeGenerator } from '../../../components/ThemeGenerator/ThemeGenerator';
import {
  ThemeRulesStandardCreator,
  BaseSlots,
  SemanticColorSlots
} from '../../../components/ThemeGenerator/ThemeRulesStandard';

import { Callout } from '../../../index';
import { ColorPicker } from '../../../components/ColorPicker/index';

import { Button } from '../../../components/Button/Button';
import { ButtonType } from '../../../components/Button/Button.Props';
import { Toggle } from '../../../components/Toggle/Toggle';
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
      colorPickerSlotRule: null,
      colorPickerElement: null,
      colorPickerVisible: false
    };
  }

  public render() {
    let { colorPickerVisible, colorPickerSlotRule, colorPickerElement } = this.state;

    /*let slotsList = mapEnumByName(SemanticSlot, (x, slot) => {
      return this._semanticSlotWidget(slot);
    });*/

    let basicSlots = [this._semanticSlotWidget(SemanticColorSlots.bodyBackground),
    this._semanticSlotWidget(SemanticColorSlots.bodyText)]; // todo

    let controlSlots = [this._semanticSlotWidget(SemanticColorSlots.controlBackground),
    this._semanticSlotWidget(SemanticColorSlots.controlFilled)]; // todo

    return (
      <div className='ms-themer'>

        {/* the shared popup color picker for semantic slots */ }
        { colorPickerVisible && colorPickerSlotRule !== null && colorPickerSlotRule !== undefined && colorPickerElement &&
          <Callout
            key={ colorPickerSlotRule.name }
            gapSpace={ 10 }
            targetElement={ colorPickerElement }
            setInitialFocus={ true }
            onDismiss={ this._colorPickerOnDismiss.bind(this) }>
            <ColorPicker
              color={ colorPickerSlotRule.value.str }
              onColorChanged={ this._semanticSlotRuleChanged.bind(this, colorPickerSlotRule) } />
          </Callout>
        }

        {/* the three base slots, prominently displayed at the top of the page */ }
        <div style={ { display: 'flex' } }>
          { [this._baseColorSlotPicker(BaseSlots.primaryColor), this._baseColorSlotPicker(BaseSlots.backgroundColor), this._baseColorSlotPicker(BaseSlots.foregroundColor)] }
        </div>
        <br />

        { this._exampleSection('Basic Slots',
          'Basic theme slots for page background and default text colors.',
          basicSlots) }
        { this._exampleSection('Control Slots',
          'These slots TODO TODO',
          controlSlots,
          [<div>
            <Toggle
              defaultChecked={ true }
              label=''
              onText='On'
              offText='Off' />
            <Toggle
              defaultChecked={ false }
              label=''
              onText='On'
              offText='Off' />
            <Toggle
              defaultChecked={ true }
              disabled={ true }
              label=''
              onText='Diabled on' />
            <Toggle
              defaultChecked={ false }
              disabled={ true }
              label=''
              offText='Disabled off' />
          </div>,
          <Button>Default</Button>,
          <Button buttonType={ ButtonType.primary }>Primary</Button>,
          <Button disabled={ true }>Disabled</Button>]) }

        <h3>todo</h3>
        { [this._semanticSlotWidget(SemanticColorSlots.errorText),
        this._semanticSlotWidget(SemanticColorSlots.bodyTextStrong)] }

        <div style={ { display: 'flex', flexDirection: 'row' } }>
          <div className='ms-themer-example'><TextFieldBasicExample /></div>
          <div className='ms-themer-example'><ToggleBasicExample /></div>
          <div className='ms-themer-example'><TeachingBubbleBasicExample /></div>
        </div>

        <h3>Accessibility</h3>
        <p>Each pair of colors below should produce legible text and have a minimum contrast ratio of 4.5 [TBD verify formula].</p>
        <table className='ms-themer-accessibilityTable'>
          { [this._accessibilityRow(SemanticColorSlots.bodyTextDisabled, SemanticColorSlots.bodyBackground),
          this._accessibilityRow(SemanticColorSlots.bodyText, SemanticColorSlots.bodyBackground),
          this._accessibilityRow(SemanticColorSlots.controlText, SemanticColorSlots.bodyBackground),
          this._accessibilityRow(SemanticColorSlots.controlText, SemanticColorSlots.controlBackground)] }
        </table>

        { this._outputSection() }
      </div>
    );
  }

  private _exampleSection(
    sectionName: string,
    description: string,
    slots: Array<JSX.Element>,
    examples?: Array<JSX.Element>
  ) {
    return (
      <div className='ms-themer-exampleSection'>
        <h3>{ sectionName }</h3>
        <p>{ description }</p>
        <div className='ms-themer-exampleTable'>
          <div className='ms-themer-slotsList'>
            { slots }
          </div>
          <div className='ms-themer-exampleList'>
            { examples }
          </div>
        </div>
        <br />
      </div>
    );
  }

  private _colorPickerOnDismiss(ev: React.MouseEvent<HTMLElement>) {
    this.setState({ colorPickerVisible: false });
  }

  private _semanticSlotRuleChanged(slotRule: IThemeSlotRule, color: string) {
    let { themeRules } = this.state;

    console.log("dbg: _semanticSlotRuleChanged called on " + JSON.stringify(slotRule));
    console.log("dbg: new color is " + color);

    ThemeGenerator.setSlot(slotRule, color, themeRules);
    this.setState({ themeRules: themeRules }, this._makeNewTheme);
  }

  private _onSwatchClick(slotRule: IThemeSlotRule, ev: React.MouseEvent<HTMLElement>) {
    let { colorPickerSlotRule, colorPickerElement } = this.state;

    if (colorPickerSlotRule !== null && colorPickerSlotRule !== undefined && !!colorPickerElement && colorPickerSlotRule === slotRule && colorPickerElement === ev.target) { // same one, close it
      this.setState({ colorPickerVisible: false, colorPickerSlotRule: null, colorPickerElement: null });
    } else { // new one, open it
      this.setState({ colorPickerVisible: true, colorPickerSlotRule: slotRule, colorPickerElement: ev.target });
    }
  }

  private _semanticSlotWidget(semanticSlot: SemanticColorSlots) {
    let themeRules = this.state.themeRules;
    let thisSlotRule = themeRules[SemanticColorSlots[semanticSlot]];

    return (
      <div key={ semanticSlot } className='ms-themer-slot'>
        { this._colorSquareSwatchWidget(thisSlotRule) }
        <div>
          <div>{ SemanticColorSlots[semanticSlot] }</div>
          { !thisSlotRule.isCustomized ?
            <div>Inherits from: { thisSlotRule.inherits.name }</div>
            : <div>Custom value</div> }
        </div>
      </div>
    );
  }

  private _colorSquareSwatchWidget(slotRule: IThemeSlotRule) {
    return (
      <div
        key={ slotRule.name }
        className='ms-themer-swatch'
        style={ { backgroundColor: slotRule.value.str } }
        onClick={ this._onSwatchClick.bind(this, slotRule) }>
      </div>
    );
  }

  private _accessibilityRow(foreground: SemanticColorSlots, background: SemanticColorSlots) {
    let themeRules = this.state.themeRules;
    let bgc: IColor = themeRules[SemanticColorSlots[background]].value;
    let fgc: IColor = themeRules[SemanticColorSlots[foreground]].value;

    let contrastRatio = getContrastRatio(bgc, fgc);
    let contrastRatioString = String(contrastRatio);
    contrastRatioString = contrastRatioString.substr(0, contrastRatioString.indexOf('.') + 3);
    if (contrastRatio < 4.5) {
      contrastRatioString = '**' + contrastRatioString + '**';
    }

    return (
      <tr key={ String(foreground) + String(background) }>
        <td style={ { backgroundColor: bgc.str, color: fgc.str } }>The quick brown fox jumps over the lazy dog.</td>
        <td>{ contrastRatioString }</td>
        <td>{ SemanticColorSlots[foreground] + ' + ' + SemanticColorSlots[background] }</td>
      </tr>
    );
  }

  private _outputSection() {
    return (
      <div>
        <h2>Output</h2>
        <textarea readOnly={ true } style={ { height: '300px', width: '300px' } } spellCheck={ false }
          value={ JSON.stringify(ThemeGenerator.getThemeAsJson(this.state.themeRules), void 0, 2) }>
        </textarea>
        <textarea readOnly={ true } style={ { height: '300px', width: '800px' } } spellCheck={ false }
          value={ ThemeGenerator.getThemeAsSass(this.state.themeRules) }>
        </textarea>
      </div>
    );
  }

  private _makeNewTheme() {
    console.log('New theme', ThemeGenerator.getThemeAsJson(this.state.themeRules));
    loadTheme(ThemeGenerator.getThemeAsJson(this.state.themeRules));
  }

  private _baseColorSlotPicker(baseSlot: BaseSlots) {
    function _onColorChanged(newColor: string) {
      let themeRules = this.state.themeRules;
      ThemeGenerator.setSlot(themeRules[BaseSlots[baseSlot]], newColor, themeRules);
      this.setState({ themeRules: themeRules }, this._makeNewTheme);
    }

    return (
      <div className='ms-themer-paletteSlot' key={ baseSlot }>
        <h3>{ BaseSlots[baseSlot] }</h3>
        <ColorPicker
          key={ "baseslotcolorpicker" + baseSlot }
          color={ this.state.themeRules[BaseSlots[baseSlot]].value.str }
          onColorChanged={ _onColorChanged.bind(this) } />
        <div className='ms-themer-swatchBg' style={ { backgroundColor: this.state.themeRules[BaseSlots[baseSlot]].value.str } }>
          <div className='ms-themer-swatch' style={ { backgroundColor: this.state.themeRules[BaseSlots[baseSlot]].value.str } }></div>
          { [this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Lightest']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Lighter']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Medium']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Darker']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Darkest'])] }
        </div>
      </div>
    );
  }
}