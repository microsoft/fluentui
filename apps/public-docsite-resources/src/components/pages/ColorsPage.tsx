import * as React from 'react';
import './ColorsPage.global.scss';

import { Async } from '@fluentui/react/lib/Utilities';
import { loadTheme } from '@fluentui/react/lib/Styling';
import { CodepenComponent } from '@fluentui/react-docsite-components';
import { IColor, getContrastRatio, isDark } from '@fluentui/react/lib/Color';

import {
  ThemeGenerator,
  themeRulesStandardCreator,
  BaseSlots,
  FabricSlots,
  IThemeSlotRule,
  IThemeRules,
} from '@fluentui/react/lib/ThemeGenerator';

import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Callout } from '@fluentui/react/lib/Callout';
import { ColorPicker } from '@fluentui/react/lib/ColorPicker';

import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup';
import { Pivot, PivotItem } from '@fluentui/react/lib/Pivot';
import { TeachingBubbleBasicExample } from '@fluentui/react-examples/lib/react/TeachingBubble/TeachingBubble.Basic.Example';
import { TextFieldBasicExample } from '@fluentui/react-examples/lib/react/TextField/TextField.Basic.Example';
import { ToggleBasicExample } from '@fluentui/react-examples/lib/react/Toggle/Toggle.Basic.Example';
import { ProgressIndicatorBasicExample } from '@fluentui/react-examples/lib/react/ProgressIndicator/ProgressIndicator.Basic.Example';

export interface IColorsPageState {
  themeRules: IThemeRules;
  colorPickerSlotRule: IThemeSlotRule | null;
  colorPickerElement: HTMLElement | null;
  colorPickerVisible: boolean;
}

const codeHeader = "import { loadTheme } from '@fluentui/react';\n\n";
const codepenHeader = 'const { loadTheme, DefaultButton, PrimaryButton, Toggle, TooltipHost } = FluentUIReact;\n\n';
const codepenSamples = `

class Content extends React.Component {
  public render() {
    return <div>
      <DefaultButton text="DefaultButton"/>
      <PrimaryButton text="PrimaryButton"/>
      <Toggle label="Enabled"/>
      <Toggle label="Disabled" disabled={true}/>
    </div>;
  }
}

ReactDOM.render(<Content />,document.getElementById('content'));`;

export class ColorsPage extends React.Component<{}, IColorsPageState> {
  private _semanticSlotColorChangeTimeout: number;
  private _async: Async;

  constructor(props: {}) {
    super(props);

    this._async = new Async(this);

    const themeRules = themeRulesStandardCreator();
    ThemeGenerator.insureSlots(themeRules, isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!));

    this.state = {
      themeRules: themeRules,
      colorPickerSlotRule: null,
      colorPickerElement: null,
      colorPickerVisible: false,
    };
  }

  public componentWillUnmount(): void {
    // remove temp styles
    const root = document.querySelector('.App-content') as HTMLElement;
    if (root) {
      root.style.backgroundColor = '';
      root.style.color = '';
    }
    document.body.style.backgroundColor = '';
    document.body.style.color = '';

    // and apply the default theme to overwrite any existing custom theme
    loadTheme({});

    this._async.dispose();
  }

  public render(): JSX.Element {
    const { colorPickerVisible, colorPickerSlotRule, colorPickerElement } = this.state;

    const fabricThemeSlots = [
      this._fabricSlotWidget(FabricSlots.themeDarker),
      this._fabricSlotWidget(FabricSlots.themeDark),
      this._fabricSlotWidget(FabricSlots.themeDarkAlt),
      this._fabricSlotWidget(FabricSlots.themePrimary),
      this._fabricSlotWidget(FabricSlots.themeSecondary),
      this._fabricSlotWidget(FabricSlots.themeTertiary),
      this._fabricSlotWidget(FabricSlots.themeLight),
      this._fabricSlotWidget(FabricSlots.themeLighter),
      this._fabricSlotWidget(FabricSlots.themeLighterAlt),
    ];
    const fabricNeutralForegroundSlots = [
      this._fabricSlotWidget(FabricSlots.black),
      this._fabricSlotWidget(FabricSlots.neutralDark),
      this._fabricSlotWidget(FabricSlots.neutralPrimary),
      this._fabricSlotWidget(FabricSlots.neutralPrimaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralSecondary),
      this._fabricSlotWidget(FabricSlots.neutralTertiary),
    ];
    const fabricNeutralBackgroundSlots = [
      this._fabricSlotWidget(FabricSlots.neutralTertiaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralQuaternary),
      this._fabricSlotWidget(FabricSlots.neutralQuaternaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralLight),
      this._fabricSlotWidget(FabricSlots.neutralLighter),
      this._fabricSlotWidget(FabricSlots.neutralLighterAlt),
      this._fabricSlotWidget(FabricSlots.white),
    ];

    const stylingUrl = 'https://github.com/microsoft/fluentui/tree/master/packages/style-utilities';

    return (
      <div className="ms-themer">
        <div className="overview">
          <h2 id="Overview">Overview</h2>
          <p>
            This tool helps you easily create all the shades and slots for a custom theme. The theme can be used by
            Fabric React's styling package, see the{' '}
            <a className={'themeGeneratorPageLink'} href={stylingUrl}>
              documentation
            </a>
            .<br />
            As you modify one of the three base colors, the theme will update automatically based on predefined rules.
            You can modify each individual slot below as well.
          </p>
        </div>
        {/* Hello! You've found hidden functionality for generating a theme from an image. This uses Microsoft's
         * Cognitive Vision API, documented here:
         * https://docs.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts/javascript
         * We use that API to identify the most prominent background and foreground colors, and the accent color,
         * and generate a theme based off of those.
         * Since this API requires a personal subscription key, you'll have to enlist and insert your subscription
         * key in _makeThemeFromImg() @ https://raw.githubusercontent.com/cliffkoh/office-ui-fabric-react/9c95e9b92f8caa1fe5ffb9da769ce0921a5272ed/packages/office-ui-fabric-react/src/components/ThemeGenerator/ThemeGeneratorPage.tsx
         * Then, just uncomment this section. */}
        {/*}
        <div style={ { display: 'flex' } }>
          <div>URL to image:&nbsp;</div>
          <input type='text' id='imageUrl' />
          <button onClick={ this._makeThemeFromImg }>Create theme from image</button>
        </div>
        <div id='imageDescription' />
        <div><img id='imagePreview' style={ { maxHeight: '500px', maxWidth: '800px' } } /></div>
        {*/}

        {/* the shared popup color picker for slots */}
        {colorPickerVisible && colorPickerSlotRule && colorPickerElement && (
          <Callout
            key={colorPickerSlotRule.name}
            gapSpace={10}
            target={colorPickerElement}
            setInitialFocus={true}
            onDismiss={this._colorPickerOnDismiss}
          >
            <ColorPicker
              color={colorPickerSlotRule.color!.str}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={this._semanticSlotRuleChanged.bind(this, colorPickerSlotRule)}
            />
          </Callout>
        )}

        {/* the three base slots, prominently displayed at the top of the page */}
        <div style={{ display: 'flex' }}>
          {[
            this._baseColorSlotPicker(BaseSlots.primaryColor, 'Primary Theme Color'),
            this._baseColorSlotPicker(BaseSlots.foregroundColor, 'Body Text Color'),
            this._baseColorSlotPicker(BaseSlots.backgroundColor, 'Body Background Color'),
          ]}
        </div>
        <br />

        {this._outputSection()}
        <br />

        <h2 id="Fabric palette">Fabric palette</h2>
        <p>
          The original Fabric palette slots. These are raw colors with no prescriptive uses. Each one is a shade or tint
          of a base color.
        </p>
        <div className={'ms-themer-fabricPalette-root'}>
          <div>{fabricThemeSlots}</div>
          <div>
            <p>generally used for text and foregrounds</p>
            {fabricNeutralForegroundSlots}
          </div>
          <div>
            <p>generally used for backgrounds</p>
            {fabricNeutralBackgroundSlots}
          </div>
        </div>
        <br />

        <h2 id="Samples">Samples</h2>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="ms-themer-example">
            <TextFieldBasicExample />
          </div>
          <div className="ms-themer-example">
            <ToggleBasicExample />
            <ChoiceGroup
              defaultSelectedKey="B"
              options={[
                { key: 'A', text: 'Option A' },
                { key: 'B', text: 'Option B' },
              ]}
              label="Pick one"
              required
            />
            <ChoiceGroup
              defaultSelectedKey="D"
              options={[
                { key: 'C', text: 'Option C', disabled: true },
                { key: 'D', text: 'Option D', disabled: true },
              ]}
              label="Pick one"
              required
            />
          </div>
          <div className="ms-themer-example">
            <TeachingBubbleBasicExample />
            <br />
            <ProgressIndicatorBasicExample />
          </div>
        </div>

        <h2 id="Accessibility">Accessibility</h2>
        <p>Each pair of colors below should produce legible text and have a minimum contrast ratio of 4.5.</p>
        <table className="ms-themer-accessibilityTable">
          <thead>
            <td>Sample text</td>
            <td>Contrast ratio</td>
            <td>Slot pair</td>
          </thead>
          {this._accessibilityTableBody()}
        </table>
      </div>
    );
  }

  private _colorPickerOnDismiss = (): void => {
    this.setState({ colorPickerVisible: false });
  };

  private _semanticSlotRuleChanged = (
    slotRule: IThemeSlotRule,
    ev: React.MouseEvent<HTMLElement>,
    color: IColor,
  ): void => {
    if (this._semanticSlotColorChangeTimeout) {
      clearTimeout(this._semanticSlotColorChangeTimeout);
    }
    this._semanticSlotColorChangeTimeout = this._async.setTimeout(() => {
      const { themeRules } = this.state;

      ThemeGenerator.setSlot(
        slotRule,
        color.str,
        isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!),
        true,
        true,
      );
      this.setState({ themeRules: themeRules }, this._makeNewTheme);
    }, 20);
    // 20ms is low enough that you can slowly drag to change color and see that theme,
    // but high enough that quick changes don't get bogged down by a million changes inbetween
  };

  private _onSwatchClick = (slotRule: IThemeSlotRule, ev: React.MouseEvent<HTMLElement>): void => {
    const { colorPickerSlotRule, colorPickerElement } = this.state;

    if (
      colorPickerSlotRule !== null &&
      colorPickerSlotRule !== undefined &&
      !!colorPickerElement &&
      colorPickerSlotRule === slotRule &&
      colorPickerElement === ev.target
    ) {
      // same one, close it
      this.setState({ colorPickerVisible: false, colorPickerSlotRule: null, colorPickerElement: null });
    } else {
      // new one, open it
      this.setState({
        colorPickerVisible: true,
        colorPickerSlotRule: slotRule,
        colorPickerElement: ev.target as HTMLElement,
      });
    }
  };

  private _slotWidget = (slotRule: IThemeSlotRule): JSX.Element => {
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
    return (
      <div
        key={slotRule.name}
        className="ms-themer-swatch"
        style={{ backgroundColor: slotRule.color!.str }}
        onClick={this._onSwatchClick.bind(this, slotRule)}
      />
    );
  }

  private _accessibilityRow = (foreground: FabricSlots, background: FabricSlots): JSX.Element => {
    const themeRules = this.state.themeRules;
    const bgc: IColor = themeRules[FabricSlots[background]].color!;
    const fgc: IColor = themeRules[FabricSlots[foreground]].color!;

    const contrastRatio = getContrastRatio(bgc, fgc);
    let contrastRatioString = String(contrastRatio);
    contrastRatioString = contrastRatioString.substr(0, contrastRatioString.indexOf('.') + 3);
    if (contrastRatio < 4.5) {
      contrastRatioString = '**' + contrastRatioString + '**';
    }

    return (
      <tr key={String(foreground) + String(background)}>
        <td style={{ backgroundColor: bgc.str, color: fgc.str }}>How vexingly quick daft zebras jump.</td>
        <td>{contrastRatioString}</td>
        <td>{FabricSlots[foreground] + ' + ' + FabricSlots[background]}</td>
      </tr>
    );
  };

  private _accessibilityTableBody = (): JSX.Element => {
    const accessibilityRows: JSX.Element[] = [
      this._accessibilityRow(FabricSlots.neutralPrimary, FabricSlots.white), // default
      // primary color also needs to be accessible, this is also strong variant default
      this._accessibilityRow(FabricSlots.white, FabricSlots.themePrimary),
      this._accessibilityRow(FabricSlots.neutralPrimary, FabricSlots.neutralLighter), // neutral variant default
      this._accessibilityRow(FabricSlots.themeDark, FabricSlots.neutralLighter),
      this._accessibilityRow(FabricSlots.neutralPrimary, FabricSlots.themeLighter),
    ]; // neutral variant with primary color

    // these are the text and primary colors on top of the soft variant, whose bg depends on invertedness of
    // the original theme
    if (!isDark(this.state.themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)) {
      // is not inverted
      accessibilityRows.push(
        this._accessibilityRow(FabricSlots.neutralPrimary, FabricSlots.themeLighterAlt),
        this._accessibilityRow(FabricSlots.themeDarkAlt, FabricSlots.themeLighterAlt),
      );
    } else {
      // is inverted
      accessibilityRows.push(
        this._accessibilityRow(FabricSlots.neutralPrimary, FabricSlots.themeLight),
        this._accessibilityRow(FabricSlots.themeDarkAlt, FabricSlots.themeLight),
      );
    }

    return <tbody>{accessibilityRows}</tbody>;
  };

  private _outputSection = (): JSX.Element => {
    const themeRules = this.state.themeRules;

    // strip out the unnecessary shade slots from the final output theme
    const abridgedTheme: IThemeRules = {};
    for (const ruleName in themeRules) {
      if (themeRules.hasOwnProperty(ruleName)) {
        if (
          ruleName.indexOf('ColorShade') === -1 &&
          ruleName !== 'primaryColor' &&
          ruleName !== 'backgroundColor' &&
          ruleName !== 'foregroundColor'
        ) {
          abridgedTheme[ruleName] = themeRules[ruleName];
        }
      }
    }

    const themeAsCode = ThemeGenerator.getThemeAsCode(abridgedTheme);

    return (
      <div>
        <h2 id="Output">Output</h2>
        <div className={'ms-themer-output-root'}>
          <Pivot styles={{ root: { padding: 10 } }}>
            <PivotItem headerText="Code">
              <textarea readOnly={true} spellCheck={false} value={codeHeader + themeAsCode} style={{ width: 350 }} />
              <p>
                This code block initializes the theme you have configured above and loads it using the loadTheme utility
                function. Calling loadTheme will automatically apply the configured theming to any Fabric controls used
                within the same app. You can also export this example to CodePen with a few component examples below.
              </p>
              <CodepenComponent jsContent={codepenHeader + themeAsCode + codepenSamples} buttonAs={PrimaryButton} />
            </PivotItem>
            <PivotItem headerText="JSON">
              <textarea
                readOnly={true}
                spellCheck={false}
                value={JSON.stringify(ThemeGenerator.getThemeAsJson(abridgedTheme), undefined, 2)}
                style={{ width: 350 }}
              />
            </PivotItem>
            <PivotItem headerText="PowerShell">
              <textarea
                readOnly={true}
                spellCheck={false}
                value={ThemeGenerator.getThemeForPowerShell(abridgedTheme)}
                style={{ width: 350 }}
              />
            </PivotItem>
          </Pivot>
        </div>
      </div>
    );
  };

  private _makeNewTheme = (): void => {
    const themeAsJson: { [key: string]: string } = ThemeGenerator.getThemeAsJson(this.state.themeRules);
    // eslint-disable-next-line no-console
    console.log('New theme...', themeAsJson);

    const finalTheme = loadTheme({
      ...{ palette: themeAsJson },
      isInverted: isDark(this.state.themeRules[BaseSlots[BaseSlots.backgroundColor]].color!),
    });

    const root = document.querySelector('.App-content') as HTMLElement;
    if (root) {
      root.style.backgroundColor = finalTheme.semanticColors.bodyBackground;
      root.style.color = finalTheme.semanticColors.bodyText;
    }

    document.body.style.backgroundColor = finalTheme.semanticColors.bodyBackground;
    document.body.style.color = finalTheme.semanticColors.bodyText;
    // eslint-disable-next-line no-console
    console.log('New theme:', finalTheme);
  };

  private _baseColorSlotPicker = (baseSlot: BaseSlots, title: string): JSX.Element => {
    let colorChangeTimeout: number;

    const onChange = (ev: React.MouseEvent<HTMLElement>, newColor: IColor): void => {
      if (colorChangeTimeout) {
        clearTimeout(colorChangeTimeout);
      }
      colorChangeTimeout = this._async.setTimeout(() => {
        const themeRules = this.state.themeRules;
        const currentIsDark = isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!);
        ThemeGenerator.setSlot(themeRules[BaseSlots[baseSlot]], newColor.str, currentIsDark, true, true);
        if (currentIsDark !== isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)) {
          // isInverted got swapped, so need to refresh slots with new shading rules
          ThemeGenerator.insureSlots(themeRules, !currentIsDark);
        }
        this.setState({ themeRules: themeRules }, this._makeNewTheme);
      }, 20);
      // 20ms is low enough that you can slowly drag to change color and see that theme,
      // but high enough that quick changes don't get bogged down by a million changes inbetween
    };

    return (
      <div className="ms-themer-paletteSlot" key={baseSlot}>
        <h3>{title}</h3>
        <div>
          <ColorPicker
            key={'baseslotcolorpicker' + baseSlot}
            color={this.state.themeRules[BaseSlots[baseSlot]].color!.str}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={onChange}
          />
        </div>
        <div
          className="ms-themer-swatchBg"
          style={{ backgroundColor: this.state.themeRules[BaseSlots[baseSlot]].color!.str }}
        >
          <div
            className="ms-themer-swatch"
            style={{ backgroundColor: this.state.themeRules[BaseSlots[baseSlot]].color!.str }}
          />
          {[
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade1']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade2']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade3']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade4']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade5']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade6']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade7']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade8']),
          ]}
        </div>
      </div>
    );
  };
}
