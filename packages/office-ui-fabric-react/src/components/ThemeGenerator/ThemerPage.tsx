import * as React from 'react';
import './ThemerPage.scss';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

import { loadTheme } from 'office-ui-fabric-react/lib/Styling';
import {
  IColor,
  getContrastRatio,
  updateA
} from 'office-ui-fabric-react/lib/utilities/color/index';

import {
  ThemeGenerator,
  themeRulesStandardCreator,
  BaseSlots,
  FabricSlots,
  SemanticColorSlots,
  IThemeSlotRule,
  IThemeRules
} from 'office-ui-fabric-react/lib/ThemeGenerator';

import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';

// import { Button } from '../../../components/Button/Button';
// import { ButtonType } from '../../../components/Button/Button.Props';
// import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
// import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TeachingBubbleBasicExample } from '../../components/TeachingBubble/examples/TeachingBubble.Basic.Example';
import { TextFieldBasicExample } from '../TextField/examples/TextField.Basic.Example';
import { ToggleBasicExample } from '../../components/Toggle/examples/Toggle.Basic.Example';
// import { ProgressIndicatorBasicExample } from '../ProgressIndicator/examples/ProgressIndicator.Basic.Example';

export interface IThemeGeneratorPageState {
  themeRules: IThemeRules;
  colorPickerSlotRule: IThemeSlotRule | null;
  colorPickerElement: HTMLElement | null;
  colorPickerVisible: boolean;
}

export class ThemerPage extends React.Component<any, IThemeGeneratorPageState> {
  private _imgUrl: string;

  constructor() {
    super();

    let themeRules = themeRulesStandardCreator();
    ThemeGenerator.insureSlots(themeRules);

    this.state = {
      themeRules: themeRules,
      colorPickerSlotRule: null,
      colorPickerElement: null,
      colorPickerVisible: false
    };
  }

  public componentDidUpdate() {

    // todo: cleanup
    if (this._imgUrl) {
      const outputElem = (document.getElementById('jsonOutput') as HTMLTextAreaElement);
      let jsonOutput = outputElem.value;
      let newOutput = JSON.parse(jsonOutput);
      newOutput.backgroundImageUri = 'url("' + this._imgUrl + '")';

      let tr = this.state.themeRules as IThemeRules;
      newOutput.backgroundOverlay = updateA((tr[BaseSlots[BaseSlots.backgroundColor]] as IThemeSlotRule).value!, 50).str;

      outputElem.value = JSON.stringify(newOutput);
    }
  }

  public render() {
    let { colorPickerVisible, colorPickerSlotRule, colorPickerElement } = this.state;

    let fabricThemeSlots =
      [this._fabricSlotWidget(FabricSlots.themeDarker),
      this._fabricSlotWidget(FabricSlots.themeDark),
      this._fabricSlotWidget(FabricSlots.themeDarkAlt),
      this._fabricSlotWidget(FabricSlots.themePrimary),
      this._fabricSlotWidget(FabricSlots.themeSecondary),
      this._fabricSlotWidget(FabricSlots.themeTertiary),
      this._fabricSlotWidget(FabricSlots.themeLight),
      this._fabricSlotWidget(FabricSlots.themeLighter),
      this._fabricSlotWidget(FabricSlots.themeLighterAlt)];
    let fabricNeutralForegroundSlots =
      [this._fabricSlotWidget(FabricSlots.black),
      this._fabricSlotWidget(FabricSlots.neutralDark),
      this._fabricSlotWidget(FabricSlots.neutralPrimary),
      this._fabricSlotWidget(FabricSlots.neutralSecondary),
      this._fabricSlotWidget(FabricSlots.neutralSecondaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralTertiary)
      ];
    let fabricNeutralBackgroundSlots =
      [this._fabricSlotWidget(FabricSlots.neutralTertiaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralQuaternary),
      this._fabricSlotWidget(FabricSlots.neutralQuaternaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralLight),
      this._fabricSlotWidget(FabricSlots.neutralLighter),
      this._fabricSlotWidget(FabricSlots.neutralLighterAlt),
      this._fabricSlotWidget(FabricSlots.white)];

    return (
      <div className='ms-themer'>

        {/* Hello! You've found hidden functionality for generating a theme from an image. This uses Microsoft's
          * Cognitive Vision API, documented here:
          * https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts/javascript
          * We use that API to identify the most prominent background and foreground colors, and the accent color,
          * and generate a theme based off of those.
          * Since this API requires a personal subscription key, you'll have to enlist and insert your subscription
          * key in _makeThemeFromImg() below. Then, just uncomment this section. *//*
        <div style={ { display: 'flex' } }>
          <div>URL to image:&nbsp;</div>
          <input type='text' id='imageUrl' />
          <button onClick={ this._makeThemeFromImg.bind(this) }>Create theme from image</button>
        </div>
        <div id='imageDescription' />
        <div><img id='imagePreview' style={ { maxHeight: '500px', maxWidth: '800px' } } /></div>
      */}

        {/* the shared popup color picker for slots */ }
        { colorPickerVisible && colorPickerSlotRule !== null && colorPickerSlotRule !== undefined && colorPickerElement &&
          <Callout
            key={ colorPickerSlotRule.name }
            gapSpace={ 10 }
            targetElement={ colorPickerElement }
            setInitialFocus={ true }
            onDismiss={ this._colorPickerOnDismiss }
          >
            <ColorPicker
              color={ colorPickerSlotRule.value!.str }
              onColorChanged={ this._semanticSlotRuleChanged.bind(this, colorPickerSlotRule) }
            />
          </Callout>
        }

        {/* the three base slots, prominently displayed at the top of the page */ }
        <div style={ { display: 'flex' } }>
          { [this._baseColorSlotPicker(BaseSlots.primaryColor),
          this._baseColorSlotPicker(BaseSlots.foregroundColor),
          this._baseColorSlotPicker(BaseSlots.backgroundColor)] }
        </div>
        <br />

        {/* this._exampleSection('Basic Slots',
          'Basic theme slots for page background and default text colors.',
          basicSlots) */}
        <h3>Fabric Palette</h3>
        <p>The original Fabric palette variables.</p>
        <table><tr>
          <td>{ fabricThemeSlots }</td>
          <td>{ fabricNeutralForegroundSlots }</td>
          <td>{ fabricNeutralBackgroundSlots }</td>
        </tr></table>
        {/* this._exampleSection('Input controls',
          These slots TODO TODO',
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
          <ChoiceGroup
            options={ [
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                checked: true
              }] }
            label='Pick one'
            required={ true }
          />,
          <ChoiceGroup
            options={ [
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              },
              {
                key: 'D',
                text: 'Option D',
                checked: true,
                disabled: true
              }] }
            label='Pick one'
            required={ true }
          />, <ProgressIndicatorBasicExample />]) */}

        <h3>todo</h3>
        { [this._semanticSlotWidget(SemanticColorSlots.errorText)] }

        { <div style={ { display: 'flex', flexDirection: 'row' } }>
          <div className='ms-themer-example'><TextFieldBasicExample /></div>
          <div className='ms-themer-example'><ToggleBasicExample /></div>
          <div className='ms-themer-example'><TeachingBubbleBasicExample /></div>
        </div> }

        <h3>Accessibility</h3>
        <p>Each pair of colors below should produce legible text and have a minimum contrast ratio of 4.5 [TBD verify formula].</p>
        <table className='ms-themer-accessibilityTable'>
          { [this._accessibilityRow(SemanticColorSlots.bodyTextDisabled, SemanticColorSlots.bodyBackground),
          this._accessibilityRow(SemanticColorSlots.bodyText, SemanticColorSlots.bodyBackground)] }
        </table>

        { this._outputSection() }
      </div>
    );
  }

  @autobind
  /* tslint:disable:no-unused-variable */
  private _makeThemeFromImg() {
    /* tslint:enable:no-unused-variable */
    this._imgUrl = (document.getElementById('imageUrl') as HTMLInputElement).value;
    (document.getElementById('imagePreview') as HTMLImageElement).src = this._imgUrl;

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', this._cognitiveVisionCallback.bind(this));
    xhr.open('POST', 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description%2CColor&details=&language=en');
    xhr.setRequestHeader('Content-Type', 'application/json');
    alert('You forgot to set the subscription key!');
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', '[YOUR SUBSCRIPTION KEY HERE]');
    xhr.send('{ "url": "' + this._imgUrl + '" }');
  }

  @autobind
  private _cognitiveVisionCallback(e: any) {
    const xhr = e.target;
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.response);

      document.getElementById('imageDescription')!.innerHTML = response.description.captions[0].text;

      /* API returns:
       response.color.accentColor
       response.color.dominantColorBackground
       response.color.dominantColorForeground */

      // converts a returned color from a word into a hex value conforming to our palette
      const getHexFromColor = (color: string, isBg: boolean) => {
        // todo: could use more logic based on isInverted
        switch (color.toLowerCase()) {
          case 'black': return '#1f1f1f';
          case 'blue': return '#0078d7';
          case 'brown': return '#754d12';
          case 'gray':
          case 'grey': return isBg ? '#444' : '#ccc';
          case 'green': return '#107c10';
          case 'orange': return '#ff8c00';
          case 'pink': return '#e3008c';
          case 'purple': return '#5c2d91';
          case 'red': return '#e81123';
          case 'teal': return '#008272';
          case 'white': return '#fff';
          case 'yellow': return '#fff100';
        }
        alert('Error: Unexpected color passed to getHexFromColor(): ' + color);
        return '#fff';
      };

      let { themeRules } = this.state;
      console.log(themeRules);
      ThemeGenerator.setSlot(themeRules[BaseSlots.backgroundColor], getHexFromColor(response.color.dominantColorBackground, true), themeRules, true);
      ThemeGenerator.setSlot(themeRules[BaseSlots.primaryColor], '#' + response.color.accentColor, themeRules, true);
      ThemeGenerator.setSlot(themeRules[BaseSlots.foregroundColor], getHexFromColor(response.color.dominantColorForeground, false), themeRules, true);

      this.setState({ themeRules: themeRules }, this._makeNewTheme);

    } else {
      alert('Error ' + xhr.status + ': ' + xhr.statusText);
    }
  }

  /*  private _exampleSection(
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
    } */

  @autobind
  private _colorPickerOnDismiss() {
    this.setState({ colorPickerVisible: false });
  }

  @autobind
  private _semanticSlotRuleChanged(slotRule: IThemeSlotRule, color: string) {
    let { themeRules } = this.state;

    ThemeGenerator.setSlot(slotRule, color, themeRules, true, true);
    this.setState({ themeRules: themeRules }, this._makeNewTheme);
  }

  @autobind
  private _onSwatchClick(slotRule: IThemeSlotRule, ev: React.MouseEvent<HTMLElement>) {
    let { colorPickerSlotRule, colorPickerElement } = this.state;

    if (colorPickerSlotRule !== null && colorPickerSlotRule !== undefined && !!colorPickerElement && colorPickerSlotRule === slotRule && colorPickerElement === ev.target) { // same one, close it
      this.setState({ colorPickerVisible: false, colorPickerSlotRule: null, colorPickerElement: null });
    } else { // new one, open it
      this.setState({ colorPickerVisible: true, colorPickerSlotRule: slotRule, colorPickerElement: ev.target });
    }
  }

  @autobind
  private _semanticSlotWidget(semanticSlot: SemanticColorSlots) {
    let themeRules = this.state.themeRules;
    let thisSlotRule = themeRules[SemanticColorSlots[semanticSlot]];

    return (
      <div key={ semanticSlot } className='ms-themer-slot'>
        { this._colorSquareSwatchWidget(thisSlotRule) }
        <div>
          <div>{ SemanticColorSlots[semanticSlot] }</div>
          { !thisSlotRule.isCustomized ?
            <div>Inherits from: { thisSlotRule.inherits!.name }</div>
            : <div>Custom value</div> }
        </div>
      </div>
    );
  }
  // todo: combine with above
  private _fabricSlotWidget(fabricSlot: FabricSlots) {
    let themeRules = this.state.themeRules;
    let thisSlotRule = themeRules[FabricSlots[fabricSlot]];

    return (
      <div key={ fabricSlot } className='ms-themer-slot'>
        { this._colorSquareSwatchWidget(thisSlotRule) }
        <div>
          <div>{ FabricSlots[fabricSlot] }</div>
          { !thisSlotRule.isCustomized ?
            <div>Inherits from: { thisSlotRule.inherits!.name }</div>
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
        style={ { backgroundColor: slotRule.value!.str } }
        onClick={ this._onSwatchClick.bind(this, slotRule) }
      />
    );
  }

  @autobind
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

  @autobind
  private _outputSection() {
    return (
      <div>
        <h2>Output</h2>
        <textarea
          id='jsonOutput'
          readOnly={ true }
          style={ { height: '300px', width: '300px' } }
          spellCheck={ false }
          value={ JSON.stringify(ThemeGenerator.getThemeAsJson(this.state.themeRules), void 0, 2) }
        />
        <textarea
          readOnly={ true }
          style={ { height: '300px', width: '800px', display: 'none' } }
          spellCheck={ false }
          value={ ThemeGenerator.getThemeAsSass(this.state.themeRules) }
        />
      </div>
    );
  }

  @autobind
  private _makeNewTheme() {
    let themeAsJson: { [key: string]: string } = ThemeGenerator.getThemeAsJson(this.state.themeRules);
    console.log('New theme...', themeAsJson);
    document.body.style.backgroundColor = themeAsJson.backgroundColor; // todo
    document.body.style.color = themeAsJson.bodyText; // todo
    loadTheme({ palette: themeAsJson });
  }

  @autobind
  private _baseColorSlotPicker(baseSlot: BaseSlots) {
    function _onColorChanged(newColor: string) {
      let themeRules = this.state.themeRules;
      ThemeGenerator.setSlot(themeRules[BaseSlots[baseSlot]], newColor, themeRules, true);
      this.setState({ themeRules: themeRules }, this._makeNewTheme);
    }

    return (
      <div className='ms-themer-paletteSlot' key={ baseSlot }>
        <h3>{ BaseSlots[baseSlot] }</h3>
        <ColorPicker
          key={ 'baseslotcolorpicker' + baseSlot }
          color={ this.state.themeRules[BaseSlots[baseSlot]].value!.str }
          /* tslint:disable:jsx-no-bind */
          onColorChanged={ _onColorChanged.bind(this) }
        /* tslint:enable:jsx-no-bind */
        />
        <div className='ms-themer-swatchBg' style={ { backgroundColor: this.state.themeRules[BaseSlots[baseSlot]].value!.str } }>
          <div className='ms-themer-swatch' style={ { backgroundColor: this.state.themeRules[BaseSlots[baseSlot]].value!.str } } />
          { [this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade1']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade2']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade3']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade4']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade5']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade6']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade7']),
          this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade8'])] }
        </div>
      </div>
    );
  }
}