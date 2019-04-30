import * as React from 'react';
import { AccessibilityChecker } from './AccessibilityChecker';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { BaseSlots, IThemeRules, ThemeGenerator, themeRulesStandardCreator } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { createTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';
import { FabricPalette } from './FabricPalette';
import { getColorFromString, IColor } from 'office-ui-fabric-react/lib/Color';
import { Header } from './Header';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { isDark } from 'office-ui-fabric-react/lib/utilities/color/shades';
import { mergeStyles } from '@uifabric/merge-styles';
import { Samples } from './Samples';
import { SemanticSlots } from './SemanticSlots';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { ThemeDesignerColorPicker } from './ThemeDesignerColorPicker';
import { ThemeProvider } from 'office-ui-fabric-react/lib/Foundation';

export interface IThemingDesignerState {
  primaryColor: IColor;
  textColor: IColor;
  backgroundColor: IColor;
  theme?: ITheme;
  themeRules?: IThemeRules;
}

const outerMostStack = mergeStyles({
  width: '100%'
});

const sidebarStyles = mergeStyles({
  borderRight: '1px solid #ddd',
  minHeight: '100%',
  paddingRight: '1rem',
  position: 'fixed',
  top: '60px',
  left: '10px'
});

let colorChangeTimeout: number;

let hideSemanticSlots: boolean;
let semanticSlotsCard: JSX.Element;

export class ThemingDesigner extends BaseComponent<{}, IThemingDesignerState> {
  constructor(props: any) {
    super(props);

    this.state = this._buildInitialState();

    this._onPrimaryColorPickerChange = this._onPrimaryColorPickerChange.bind(this);
    this._onTextColorPickerChange = this._onTextColorPickerChange.bind(this);
    this._onBkgColorPickerChange = this._onBkgColorPickerChange.bind(this);

    hideSemanticSlots = true;
    if (!hideSemanticSlots) {
      semanticSlotsCard = <SemanticSlots />;
    } else {
      <div />;
    }
  }

  public render() {
    return (
      <Stack gap={10} className={outerMostStack}>
        <Header themeRules={this.state.themeRules} />
        <Stack horizontal gap={10}>
          <Stack gap={20} className={sidebarStyles}>
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
            {/* the three base slots, prominently displayed at the top of the page */}
            <ThemeDesignerColorPicker
              color={this.state.primaryColor}
              onColorChange={this._onPrimaryColorPickerChange}
              label={'Primary color'}
            />
            <ThemeDesignerColorPicker color={this.state.textColor} onColorChange={this._onTextColorPickerChange} label={'Text color'} />
            <ThemeDesignerColorPicker
              color={this.state.backgroundColor}
              onColorChange={this._onBkgColorPickerChange}
              label={'Background color'}
            />
          </Stack>
          <Stack.Item grow={1}>
            <Stack horizontalAlign={'center'}>
              <ThemeProvider theme={this.state.theme}>
                <Samples />
              </ThemeProvider>
              <AccessibilityChecker theme={this.state.theme} themeRules={this.state.themeRules} />
              <FabricPalette themeRules={this.state.themeRules} />
              {semanticSlotsCard}
            </Stack>
          </Stack.Item>
        </Stack>
      </Stack>
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
      });
      this.setState({ theme: finalTheme });
    }
  };

  private _onColorChange = (colorToChange: IColor, baseSlot: BaseSlots, newColor: IColor | undefined) => {
    if (colorChangeTimeout) {
      clearTimeout(colorChangeTimeout);
    }
    if (newColor) {
      if (colorToChange === this.state.primaryColor) {
        this.setState({ primaryColor: newColor });
      } else if (colorToChange === this.state.textColor) {
        this.setState({ textColor: newColor });
      } else if (colorToChange === this.state.backgroundColor) {
        this.setState({ backgroundColor: newColor });
      } else {
        return;
      }
      colorChangeTimeout = this._async.setTimeout(() => {
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
    }
  };

  private _buildInitialState = (): IThemingDesignerState => {
    const themeRules = themeRulesStandardCreator();
    const colors = {
      primaryColor: getColorFromString('#ffa500')!,
      textColor: getColorFromString('#0078d4')!,
      backgroundColor: getColorFromString('#323130')!
    };
    ThemeGenerator.insureSlots(themeRules, isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color!));
    ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.primaryColor]], colors.primaryColor);
    ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.foregroundColor]], colors.textColor);
    ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.backgroundColor]], colors.backgroundColor);

    const themeAsJson: { [key: string]: string } = ThemeGenerator.getThemeAsJson(themeRules);

    const finalTheme = createTheme({
      ...{ palette: themeAsJson }
    });

    const state = {
      ...colors,
      theme: finalTheme,
      themeRules: themeRules
    };

    return state;
  };
}
