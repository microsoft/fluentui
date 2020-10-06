import * as React from 'react';
import { ThemePageProps } from '@fluentui/react-examples/lib/react/Theme/Theme.doc';
import { IColor } from '@fluentui/react/lib/Color';
import { Callout } from '@fluentui/react/lib/Callout';
import { ColorPicker } from '@fluentui/react/lib/ColorPicker';
import { DetailsList, DetailsListLayoutMode } from '@fluentui/react/lib/DetailsList';
import { SelectionMode } from '@fluentui/react/lib/Selection';
import { IPalette, ISemanticColors, loadTheme, getTheme } from '@fluentui/react/lib/Styling';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { DemoPage } from '../DemoPage';
import { getStyles, IThemePageStyles } from './ThemePage.styles';

const defaultTheme = getTheme(true);

export const defaultPalette = Object.keys(defaultTheme.palette).map(variableName => ({
  key: variableName,
  name: variableName,
  value: (defaultTheme.palette as any)[variableName],
  description: '',
}));

export const defaultSemanticColors = Object.keys(defaultTheme.semanticColors).map(variableName => ({
  key: variableName,
  name: variableName,
  value: (defaultTheme.semanticColors as any)[variableName],
  description: (defaultTheme.semanticColors as any)[variableName].indexOf('@deprecated') >= 0 ? 'Deprecated' : '',
}));

const getClassNames = classNamesFunction<{}, IThemePageStyles>();

export interface IThemePageProps {
  isHeaderVisible?: boolean;
}

export type IThemePagePalette = {
  key: string;
  name: string;
  value: string;
  description: string;
};

export interface IThemePageState {
  palette: IThemePagePalette[];

  semanticColors: IThemePagePalette[];

  colorPickerProps?: {
    targetElement: HTMLElement;
    value: any;
    index: number;
  };

  activeList?: string;
}

export class ThemePage extends React.Component<IThemePageProps, IThemePageState> {
  constructor(props: IThemePageProps) {
    super(props);

    this.state = {
      palette: defaultPalette,
      semanticColors: defaultSemanticColors,
    };
  }

  public render(): JSX.Element {
    // Don't mutate state to display lists
    const palette = [...this.state.palette];
    const semanticColors = [...this.state.semanticColors];
    return (
      <DemoPage
        {...{
          ...ThemePageProps,
          ...this.props,
          otherSections: [
            {
              title: 'Default Palette',
              section: this._colorList(palette, 'palette'),
            },
            {
              title: 'Default Semantic Colors',
              section: this._colorList(semanticColors, 'semanticColors'),
            },
          ],
        }}
      />
    );
  }

  private _colorList = (colors: any, list: 'palette' | 'semanticColors') => {
    const classNames = getClassNames(getStyles);
    const { colorPickerProps } = this.state;
    return (
      <div>
        <DetailsList
          items={colors}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.fixedColumns}
          columns={[
            {
              key: 'name',
              name: 'Name',
              fieldName: 'name',
              minWidth: 150,
              maxWidth: 150,
            },
            {
              key: 'color',
              name: 'Color',
              fieldName: 'value',
              minWidth: 200,
              onRender: (item, index) => (
                <div
                  className={classNames.colorSwatch}
                  data-is-focusable="true"
                  onClick={this._onSwatchClicked.bind(this, item, index, list)}
                >
                  <span className={classNames.swatch} style={{ backgroundColor: item.value }} />
                  <span className={classNames.colorValue}>{item.value}</span>
                </div>
              ),
            },
            {
              key: 'desc',
              name: 'Description',
              fieldName: 'description',
              minWidth: 90,
            },
          ]}
        />

        {colorPickerProps && (
          <Callout
            isBeakVisible={false}
            gapSpace={10}
            target={colorPickerProps.targetElement}
            onDismiss={this._onPickerDismiss}
          >
            <ColorPicker
              color={colorPickerProps.value}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={this._onColorChanged.bind(this, colorPickerProps.index)}
            />
          </Callout>
        )}
      </div>
    );
  };

  private _onSwatchClicked(item: any, index: number, list: string, ev: React.MouseEvent<HTMLElement>): void {
    this.setState({
      colorPickerProps: {
        targetElement: (ev.currentTarget as HTMLElement).children[0] as HTMLElement,
        value: item.value,
        index: index,
      },
      activeList: list,
    });
  }

  private _onColorChanged(index: number, ev: any, newColor: IColor): void {
    const { activeList } = this.state;
    const partialPalette: Partial<IPalette> = {};
    const partialSemanticColors: Partial<ISemanticColors> = {};

    if (activeList === 'palette') {
      const palette = [...this.state.palette];
      const paletteColor = palette[index];
      paletteColor.value = newColor.str;
      palette[index] = paletteColor;
      for (let i = 0; i < palette.length; i++) {
        (palette as any)[palette[i].key] = palette[i].value;
      }
    } else if (activeList === 'semanticColors') {
      const semanticColors = [...this.state.semanticColors];
      const semanticColor = semanticColors[index];
      semanticColor.value = newColor.str;
      semanticColors[index] = semanticColor;
      for (let i = 0; i < semanticColors.length; i++) {
        (semanticColors as any)[semanticColors[i].key] = semanticColors[i].value;
      }
    } else {
      this.setState({ activeList: undefined });
      return undefined;
    }

    this.setState({ activeList: undefined });
    const partialTheme = { ...partialPalette, ...partialSemanticColors };

    loadTheme({ palette: partialTheme });
  }

  private _onPickerDismiss = (): void => {
    this.setState({
      colorPickerProps: undefined,
    });
  };
}
