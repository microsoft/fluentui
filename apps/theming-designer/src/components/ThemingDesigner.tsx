import * as React from 'react';
import { FabricPalette } from './FabricPalette';
import { AccessibilityChecker } from './AccessibilityChecker';
import { SemanticSlots } from './SemanticSlots';
import { Header } from './Header';
import { Samples } from './Samples';
import { mergeStyles } from '@uifabric/merge-styles';
import {
  Stack,
  loadTheme,
  ITheme,
  getTheme,
  BaseComponent,
  IColor,
  getColorFromString,
  IconButton,
  ThemeProvider,
  createTheme
} from '../../../../packages/office-ui-fabric-react';
import { ThemeDesignerColorPicker } from './ThemeDesignerColorPicker';

import { ThemeGenerator, themeRulesStandardCreator, BaseSlots, IThemeRules } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { isDark } from 'office-ui-fabric-react/lib/utilities/color/shades';

export interface IThemingDesignerState {
  primaryColor: IColor;
  textColor: IColor;
  backgroundColor: IColor;
  theme?: ITheme;
  themeRules?: IThemeRules;
}

const appClassName = mergeStyles({
  display: 'flex'
});

const sideBarClassName = mergeStyles({
  flex: '0 0 400px',
  background: '#fff'
});

const mainCardsClassName = mergeStyles({
  flexDirection: 'column',
  background: '#fff',
  flex: 1,
  margin: 0,
  padding: 0
});

export class ThemingDesigner extends BaseComponent<{}, IThemingDesignerState> {
  constructor(props: any) {
    super(props);

    const themeRules = themeRulesStandardCreator();
    ThemeGenerator.insureSlots(themeRules, isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!));

    this.state = {
      theme: getTheme(true),
      themeRules: themeRules,
      primaryColor: getColorFromString('#ffa500')!,
      textColor: getColorFromString('#0078d4')!,
      backgroundColor: getColorFromString('#323130')!
    };

    this._onPrimaryColorPickerChange = this._onPrimaryColorPickerChange.bind(this);
    this._onTextColorPickerChange = this._onTextColorPickerChange.bind(this);
    this._onBkgColorPickerChange = this._onBkgColorPickerChange.bind(this);
  }

  public componentWillUnmount(): void {
    // remove temp styles
    const root = document.querySelector('.samples') as HTMLElement;
    if (root) {
      root.style.backgroundColor = '';
      root.style.color = '';
    }
    document.body.style.backgroundColor = '';
    document.body.style.color = '';

    // and apply the default theme to overwrite any existing custom theme
    loadTheme({});
  }

  public render() {
    return (
      <div className={appClassName}>
        <Stack gap={10}>
          <Header themeRules={this.state.themeRules} />
          <Stack horizontal gap={20}>
            <div className={sideBarClassName}>
              <h1>
                <IconButton
                  disabled={false}
                  checked={false}
                  iconProps={{ iconName: 'Color', styles: { root: { fontSize: '20px' } } }}
                  title="Colors"
                  ariaLabel="Colors"
                />
                Color
              </h1>
              <Stack gap={20}>
                {/* This Dropdown will allow the user to switch from light to dark theme on the whole app. */}
                {/* <Dropdown
                placeholder="Select an Option"
                label="Theme dropdown"
                ariaLabel="Theme dropdown"
                options={[{ key: 'light', text: 'Light theme' }, { key:  'dark', text: 'Dark theme' }]}
                /> */}

                {/* the three base slots, prominently displayed at the top of the page */}
                <ThemeDesignerColorPicker
                  color={this.state.primaryColor}
                  onColorChange={this._onPrimaryColorPickerChange}
                  label={'Primary theme color'}
                />
                <ThemeDesignerColorPicker
                  color={this.state.textColor}
                  onColorChange={this._onTextColorPickerChange}
                  label={'Body text color'}
                />
                <ThemeDesignerColorPicker
                  color={this.state.backgroundColor}
                  onColorChange={this._onBkgColorPickerChange}
                  label={'Body background color'}
                />
              </Stack>
            </div>
            <Stack className={mainCardsClassName}>
              <ThemeProvider theme={this.state.theme}>
                <Samples />
              </ThemeProvider>
              <AccessibilityChecker theme={this.state.theme} themeRules={this.state.themeRules} />
              <FabricPalette themeRules={this.state.themeRules} />
              <SemanticSlots />
            </Stack>
          </Stack>
        </Stack>
      </div>
    );
  }

  private _onPrimaryColorPickerChange(newColor: IColor | undefined) {
    this._onColorChange(this.state.primaryColor, BaseSlots.primaryColor, newColor);
  }

  private _onTextColorPickerChange(newColor: IColor | undefined) {
    this._onColorChange(this.state.textColor, BaseSlots.foregroundColor, newColor);
  }

  private _onBkgColorPickerChange(newColor: IColor | undefined) {
    this._onColorChange(this.state.backgroundColor, BaseSlots.backgroundColor, newColor);
  }

  private _makeNewTheme = (): void => {
    if (this.state.themeRules) {
      const themeAsJson: { [key: string]: string } = ThemeGenerator.getThemeAsJson(this.state.themeRules);

      const finalTheme = createTheme({
        ...{ palette: themeAsJson }
        // isInverted: isDark(this.state.themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)
      });
      this.setState({ theme: finalTheme });
      // const root = document.querySelector('.app') as HTMLElement;
      // if (root) {
      //   root.style.backgroundColor = finalTheme.semanticColors.bodyBackground;
      //   root.style.color = finalTheme.semanticColors.bodyText;
      // }

      // document.body.style.backgroundColor = finalTheme.semanticColors.bodyBackground;
      // document.body.style.color = finalTheme.semanticColors.bodyText;
    }
  };

  private _onColorChange = (colorToChange: IColor, baseSlot: BaseSlots, newColor: IColor | undefined) => {
    if (newColor) {
      if (colorToChange === this.state.primaryColor) {
        this.setState({ primaryColor: newColor });
      } else if (colorToChange === this.state.textColor) {
        this.setState({ textColor: newColor });
      } else if (colorToChange === this.state.backgroundColor) {
        // console.log('got to background', colorToChange);
        this.setState({ backgroundColor: newColor });
      } else {
        return;
      }
      this._async.setTimeout(() => {
        const themeRules = this.state.themeRules;
        if (themeRules) {
          const currentIsDark = isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!);
          ThemeGenerator.setSlot(themeRules[BaseSlots[baseSlot]], newColor, currentIsDark, true, true);
          if (currentIsDark !== isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!)) {
            // isInverted got swapped, so need to refresh slots with new shading rules
            ThemeGenerator.insureSlots(themeRules, currentIsDark);
          }
        }
        this.setState({ themeRules: themeRules }, this._makeNewTheme);
      }, 20);
      // 20ms is low enough that you can slowly drag to change color and see that theme,
      // but high enough that quick changes don't get bogged down by a million changes inbetween
      // console.log(this.state.themeRules);
    }
  };
}
