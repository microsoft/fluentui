import * as React from 'react';
import { Page, IPageProps } from '@uifabric/example-app-base/lib/index2';

import { ITheme, IPalette, createTheme, IPartialTheme } from 'office-ui-fabric-react/lib/Styling';
import { CodepenComponent } from '@uifabric/example-app-base';
import { IColor } from 'office-ui-fabric-react/lib/utilities/color/interfaces';
import { getContrastRatio, isDark } from 'office-ui-fabric-react/lib/utilities/color/shades';

import {
  ThemeGenerator,
  themeRulesStandardCreator,
  BaseSlots,
  FabricSlots,
  IThemeSlotRule,
  IThemeRules
} from 'office-ui-fabric-react/lib/ThemeGenerator';

import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { Async, CustomizerContext } from 'office-ui-fabric-react/lib/Utilities';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { TeachingBubbleBasicExample } from 'office-ui-fabric-react/lib/components/TeachingBubble/examples/TeachingBubble.Basic.Example';
import { TextFieldBasicExample } from 'office-ui-fabric-react/lib/components/TextField/examples/TextField.Basic.Example';
import { ToggleBasicExample } from 'office-ui-fabric-react/lib/components/Toggle/examples/Toggle.Basic.Example';
import { ProgressIndicatorBasicExample } from 'office-ui-fabric-react/lib/components/ProgressIndicator/examples/ProgressIndicator.Basic.Example';

import * as styles from './LegacyThemePage.module.scss';

const overview = require('!raw-loader!@uifabric/fabric-website/src/pages/Styles/LegacyThemePage/docs/web/LegacyThemePageOverview.md') as string;

export interface ILegacyThemePageState {
  themeRules: IThemeRules;
  colorPickerSlotRule: IThemeSlotRule | null;
  colorPickerElement: HTMLElement | null;
  colorPickerVisible: boolean;
  theme: ITheme;
}

const pageContentSelector = '.Page-content';
const codeHeader = "import { loadTheme } from 'office-ui-fabric-react';\n\n";
const codepenHeader = 'const { loadTheme, DefaultButton, PrimaryButton, Toggle, TooltipHost } = Fabric;\n\n';
const codepenSamples = `

const Content = () => {
  return (
    <div>
      <DefaultButton text="DefaultButton"/>
      <PrimaryButton text="PrimaryButton"/>
      <Toggle label="Enabled"/>
      <Toggle label="Disabled" disabled={true}/>
    </div>
  );
};

ReactDOM.render(<Content />,document.getElementById('content'));
`;

export class LegacyThemePage extends React.Component<IPageProps, ILegacyThemePageState> {
  private _semanticSlotColorChangeTimeout: number;
  private _async: Async;

  constructor(props: IPageProps) {
    super(props);

    this._async = new Async(this);

    const themeRules = themeRulesStandardCreator();
    ThemeGenerator.insureSlots(themeRules, isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!));

    this.state = {
      themeRules: themeRules,
      colorPickerSlotRule: null,
      colorPickerElement: null,
      colorPickerVisible: false,
      theme: createTheme({})
    };
  }

  public componentWillUnmount(): void {
    // remove temp styles
    const root = document.querySelector(pageContentSelector) as HTMLElement;
    if (root) {
      root.style.backgroundColor = '';
      root.style.color = '';
    }
    this._async.dispose();
  }

  public render(): JSX.Element {
    return (
      <CustomizerContext.Provider
        value={{
          customizations: {
            settings: { theme: this.state.theme || {} },
            scopedSettings: {}
          }
        }}
      >
        <Page
          className={styles.themer}
          title="Legacy Theme Generator"
          overview={overview}
          otherSections={[
            {
              content: this._generatorSection()
            },
            {
              sectionName: 'Output',
              content: this._outputSection()
            },
            {
              sectionName: 'Fabric palette',
              content: this._paletteSection()
            },
            {
              sectionName: 'Samples',
              content: this._samplesSection()
            },
            {
              sectionName: 'Accessibility',
              content: this._accessibilitySection()
            }
          ]}
        />
      </CustomizerContext.Provider>
    );
  }

  private _generatorSection(): JSX.Element {
    const { colorPickerVisible, colorPickerSlotRule, colorPickerElement } = this.state;
    return (
      <>
        {/* the shared popup color picker for slots */}
        {colorPickerVisible && colorPickerSlotRule !== null && colorPickerSlotRule !== undefined && colorPickerElement && (
          <Callout
            key={colorPickerSlotRule.name}
            gapSpace={10}
            target={colorPickerElement}
            setInitialFocus={true}
            onDismiss={this._colorPickerOnDismiss}
          >
            <ColorPicker color={colorPickerSlotRule.color!.str} onChange={this._semanticSlotRuleChanged.bind(this, colorPickerSlotRule)} />
          </Callout>
        )}

        {/* the three base slots, prominently displayed at the top of the page */}
        <div style={{ display: 'flex' }}>
          {[
            this._baseColorSlotPicker(BaseSlots.primaryColor, 'Primary Theme Color'),
            this._baseColorSlotPicker(BaseSlots.foregroundColor, 'Body Text Color'),
            this._baseColorSlotPicker(BaseSlots.backgroundColor, 'Body Background Color')
          ]}
        </div>
      </>
    );
  }

  private _paletteSection(): JSX.Element {
    const fabricThemeSlots = [
      this._fabricSlotWidget(FabricSlots.themeDarker),
      this._fabricSlotWidget(FabricSlots.themeDark),
      this._fabricSlotWidget(FabricSlots.themeDarkAlt),
      this._fabricSlotWidget(FabricSlots.themePrimary),
      this._fabricSlotWidget(FabricSlots.themeSecondary),
      this._fabricSlotWidget(FabricSlots.themeTertiary),
      this._fabricSlotWidget(FabricSlots.themeLight),
      this._fabricSlotWidget(FabricSlots.themeLighter),
      this._fabricSlotWidget(FabricSlots.themeLighterAlt)
    ];
    const fabricNeutralForegroundSlots = [
      this._fabricSlotWidget(FabricSlots.black),
      this._fabricSlotWidget(FabricSlots.neutralDark),
      this._fabricSlotWidget(FabricSlots.neutralPrimary),
      this._fabricSlotWidget(FabricSlots.neutralPrimaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralSecondary),
      this._fabricSlotWidget(FabricSlots.neutralTertiary)
    ];
    const fabricNeutralBackgroundSlots = [
      this._fabricSlotWidget(FabricSlots.neutralTertiaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralQuaternary),
      this._fabricSlotWidget(FabricSlots.neutralQuaternaryAlt),
      this._fabricSlotWidget(FabricSlots.neutralLight),
      this._fabricSlotWidget(FabricSlots.neutralLighter),
      this._fabricSlotWidget(FabricSlots.neutralLighterAlt),
      this._fabricSlotWidget(FabricSlots.white)
    ];
    return (
      <div>
        <p>
          The original Fabric palette slots. These are raw colors with no prescriptive uses. Each one is a shade or tint of a base color.
        </p>
        <Stack horizontal maxWidth="100%">
          <div>{fabricThemeSlots}</div>
          <div>
            <p>generally used for text and foregrounds</p>
            {fabricNeutralForegroundSlots}
          </div>
          <div>
            <p>generally used for backgrounds</p>
            {fabricNeutralBackgroundSlots}
          </div>
        </Stack>
      </div>
    );
  }

  private _samplesSection(): JSX.Element {
    return (
      <Stack gap={20} horizontal maxWidth="100%">
        <Stack.Item shrink>
          <TextFieldBasicExample />
        </Stack.Item>
        <Stack.Item shrink>
          <ToggleBasicExample />
          <ChoiceGroup
            options={[{ key: 'A', text: 'Option A' }, { key: 'B', text: 'Option B', checked: true }]}
            label="Pick one"
            required={true}
          />
          <ChoiceGroup
            options={[{ key: 'C', text: 'Option C', disabled: true }, { key: 'D', text: 'Option D', checked: true, disabled: true }]}
            label="Pick one"
            required={true}
          />
        </Stack.Item>
        <Stack.Item shrink>
          <TeachingBubbleBasicExample />
          <br />
          <ProgressIndicatorBasicExample />
        </Stack.Item>
      </Stack>
    );
  }

  private _accessibilitySection(): JSX.Element {
    return (
      <div>
        <p>Each pair of colors below should produce legible text and have a minimum contrast ratio of 4.5.</p>
        <table className={styles.themerAccessibilityTable}>
          <thead>
            <tr>
              <th>Sample text</th>
              <th>Contrast ratio</th>
              <th>Slot pair</th>
            </tr>
          </thead>
          {this._accessibilityTableBody()}
        </table>
      </div>
    );
  }

  private _colorPickerOnDismiss = (): void => {
    this.setState({ colorPickerVisible: false });
  };

  private _semanticSlotRuleChanged = (slotRule: IThemeSlotRule, ev: React.MouseEvent<HTMLElement>, color: IColor): void => {
    if (this._semanticSlotColorChangeTimeout) {
      clearTimeout(this._semanticSlotColorChangeTimeout);
    }
    this._semanticSlotColorChangeTimeout = this._async.setTimeout(() => {
      const { themeRules } = this.state;

      ThemeGenerator.setSlot(slotRule, color.str, isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!), true, true);
      this.setState({ themeRules: themeRules }, this._makeNewTheme);
    }, 20);
    // 20ms is low enough that you can slowly drag to change color and see that theme,
    // but high enough that quick changes don't get bogged down by a million changes inbetween
  };

  private _onSwatchClick = (slotRule: IThemeSlotRule, ev: React.MouseEvent<HTMLElement>): void => {
    const { colorPickerSlotRule, colorPickerElement } = this.state;

    if (colorPickerSlotRule && colorPickerElement && colorPickerSlotRule === slotRule && colorPickerElement === ev.target) {
      // same one, close it
      this.setState({ colorPickerVisible: false, colorPickerSlotRule: null, colorPickerElement: null });
    } else {
      // new one, open it
      this.setState({
        colorPickerVisible: true,
        colorPickerSlotRule: slotRule,
        colorPickerElement: ev.target as HTMLElement
      });
    }
  };

  private _slotWidget = (slotRule: IThemeSlotRule): JSX.Element => {
    return (
      <div key={slotRule.name} className={styles.themerSlot}>
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
        className={styles.themerSwatch}
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
      this._accessibilityRow(FabricSlots.neutralPrimary, FabricSlots.themeLighter)
    ]; // neutral variant with primary color

    // these are the text and primary colors on top of the soft variant, whose bg depends on invertedness of original theme
    if (!isDark(this.state.themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)) {
      // is not inverted
      accessibilityRows.push(
        this._accessibilityRow(FabricSlots.neutralPrimary, FabricSlots.themeLighterAlt),
        this._accessibilityRow(FabricSlots.themeDarkAlt, FabricSlots.themeLighterAlt)
      );
    } else {
      // is inverted
      accessibilityRows.push(
        this._accessibilityRow(FabricSlots.neutralPrimary, FabricSlots.themeLight),
        this._accessibilityRow(FabricSlots.themeDarkAlt, FabricSlots.themeLight)
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
        <div className={styles.themerOutputRoot}>
          <Pivot styles={{ root: { padding: 10 } }}>
            <PivotItem headerText="Code">
              <textarea readOnly={true} spellCheck={false} value={codeHeader + themeAsCode} className={styles.codeSnippet} />
              <p>
                This code block initializes the theme you have configured above and loads it using the loadTheme utility function. Calling
                loadTheme will automatically apply the configured theming to any Fabric controls used within the same app. You can also
                export this example to CodePen with a few component examples below.
              </p>
              <CodepenComponent jsContent={codepenHeader + themeAsCode + codepenSamples} buttonAs={PrimaryButton} />
            </PivotItem>
            <PivotItem headerText="JSON">
              <textarea
                readOnly={true}
                spellCheck={false}
                value={JSON.stringify(ThemeGenerator.getThemeAsJson(abridgedTheme), void 0, 2)}
                className={styles.codeSnippet}
              />
            </PivotItem>
            <PivotItem headerText="PowerShell">
              <textarea
                readOnly={true}
                spellCheck={false}
                value={ThemeGenerator.getThemeForPowerShell(abridgedTheme)}
                className={styles.codeSnippet}
              />
            </PivotItem>
          </Pivot>
        </div>
      </div>
    );
  };

  private _makeNewTheme = (): void => {
    const themeAsJson: IPalette = ThemeGenerator.getThemeAsJson(this.state.themeRules);
    console.log('New theme...', themeAsJson);

    const finalTheme: IPartialTheme = {
      palette: themeAsJson,
      isInverted: isDark(this.state.themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)
    };
    this.setState({
      theme: createTheme(finalTheme)
    });

    const root = document.querySelector(pageContentSelector) as HTMLElement;
    if (root) {
      root.style.backgroundColor = finalTheme.semanticColors.bodyBackground;
      root.style.color = finalTheme.semanticColors.bodyText;
    }

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
          ThemeGenerator.ensureSlots(themeRules, !currentIsDark);
        }
        this.setState({ themeRules: themeRules }, this._makeNewTheme);
      }, 20);
      // 20ms is low enough that you can slowly drag to change color and see that theme,
      // but high enough that quick changes don't get bogged down by a million changes inbetween
    };

    return (
      <div className={styles.themerPaletteSlot} key={baseSlot}>
        <h3>{title}</h3>
        <div>
          <ColorPicker
            key={'baseslotcolorpicker' + baseSlot}
            color={this.state.themeRules[BaseSlots[baseSlot]].color!.str}
            onChange={onChange}
          />
        </div>
        <div className={styles.themerSwatchBg} style={{ backgroundColor: this.state.themeRules[BaseSlots[baseSlot]].color!.str }}>
          <div className={styles.themerSwatch} style={{ backgroundColor: this.state.themeRules[BaseSlots[baseSlot]].color!.str }} />
          {[
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade1']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade2']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade3']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade4']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade5']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade6']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade7']),
            this._colorSquareSwatchWidget(this.state.themeRules[BaseSlots[baseSlot] + 'Shade8'])
          ]}
        </div>
      </div>
    );
  };
}
