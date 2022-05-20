import { parseColorHexRGB } from '@microsoft/fast-colors';
import { attr, css, customElement, FASTElement, html, observable, ref, repeat, when } from '@microsoft/fast-element';
import { DesignToken } from '@microsoft/fast-foundation';
import {
  accentBaseColor,
  baseLayerLuminance,
  ColorRecipe,
  neutralBaseColor,
  neutralLayer1Recipe,
  neutralLayer2Recipe,
  neutralLayer3Recipe,
  neutralLayer4Recipe,
  neutralLayerCardContainerRecipe,
  neutralLayerFloatingRecipe,
  PaletteRGB,
  StandardLuminance,
  Swatch,
  SwatchRGB,
} from '../../../index-rollup';
import { ComponentTypes } from './component-types';
import { AppColorBlock } from './components/color-block';
import { AppControlPane } from './components/control-pane';
import { AppGradient } from './components/gradient';
import { AppSampleApp } from './components/sample-app';

AppColorBlock;
AppControlPane;
AppGradient;
AppSampleApp;

const sampleTemplate = html<App>`
  <fluent-design-system-provider
    neutral-color="${x => x.neutralColor}"
    accent-color="${x => x.accentColor}"
    style="display: flex; align-items: stretch; align-content: stretch; justify-content: center; flex-grow: 1;"
  >
    <app-layer-background
      id="light-mode"
      base-layer-luminance="${StandardLuminance.LightMode}"
      background-layer-recipe="L4"
      style="flex-grow: 1; padding: 100px;"
    >
      <app-sample-app></app-sample-app>
    </app-layer-background>
    <app-layer-background
      id="dark-mode"
      base-layer-luminance="${StandardLuminance.DarkMode}"
      background-layer-recipe="L4"
      style="flex-grow: 1; padding: 100px;"
    >
      <app-sample-app></app-sample-app>
    </app-layer-background>
  </fluent-design-system-provider>
`;

const colorBlockTemplate = html<App>`
  ${repeat(
    x => x.backgrounds(),
    html<SwatchInfo, App>`
      <app-color-block
        id="${x => x.color.toUpperCase().replace('#', '')}"
        index="${(x, c) => x.index}"
        component="${(x, c) => c.parent.componentType}"
        color="${x => x.color}"
        layer-name="${x => x.title}"
      ></app-color-block>
    `,
  )}
`;

const template = html<App>`
  <div class="container fill">
    <div class="row fill">
      <div class="canvas" ${ref('canvasElement')}>
        <div class="container fill">
          <div class="row gradient">
            <app-gradient :colors="${x => x.neutralPalette}" :markedColor="${x => x.neutralColor}"></app-gradient>
          </div>
          <div class="row gradient">
            <app-gradient :colors="${x => x.accentPalette}" :markedColor="${x => x.accentColor}"></app-gradient>
          </div>
          <div class="row fill">
            <div style="display: flex; overflow: auto;">
              ${when(x => x.componentType === ComponentTypes.sample, sampleTemplate)}
              ${when(x => x.componentType !== ComponentTypes.sample, colorBlockTemplate)}
            </div>
          </div>
        </div>
      </div>
      <div>
        <app-layer-background
          id="control-pane"
          class="control-pane-container"
          base-layer-luminance="${StandardLuminance.DarkMode}"
          background-layer-recipe="L2"
        >
          <app-control-pane
            :componentType="${x => x.componentType}"
            :neutralColor="${x => x.neutralColor}"
            :accentColor="${x => x.accentColor}"
            :showOnlyLayerBackgrounds="${x => x.showOnlyLayerBackgrounds}"
            @formvaluechange="${(x, c) => x.controlPaneHandler(c.event as CustomEvent)}"
          ></app-control-pane>
        </app-layer-background>
      </div>
    </div>
  </div>
`;

const styles = css`
  :host {
  }

  .container {
    display: flex;
    flex-direction: column;
  }

  .container.fill {
    width: 100%;
    height: 1200px;
  }

  .row {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-basis: auto;
  }

  .row.fill {
    flex: 1;
    overflow: hidden;
  }

  .canvas {
    min-width: 300px;
    flex-grow: 1;
  }

  .gradient {
    height: 20px;
  }

  .control-pane-container {
    height: 100%;
    z-index: 1;
    padding: 40px;
    position: relative;
    overflow: auto;
    width: 310px;
    box-sizing: border-box;
  }

  app-color-block {
    min-width: 400px;
  }
`;

export interface SwatchInfo {
  index: number;
  color: string;
  title?: string;
}

@customElement({
  name: 'app-main',
  template,
  styles,
})
export class App extends FASTElement {
  canvasElement: HTMLDivElement;

  @attr({ attribute: 'component-type' })
  componentType: ComponentTypes = ComponentTypes.backplate;

  @attr({ attribute: 'neutral-color' })
  neutralColor: string;
  private neutralColorChanged(prev: string | undefined, next: string) {
    if (this.canvasElement && next) {
      const swatch: Swatch = SwatchRGB.from(parseColorHexRGB(next)!);
      neutralBaseColor.setValueFor(this.canvasElement, swatch);

      this.neutralPalette = PaletteRGB.from(swatch as SwatchRGB).swatches.map((x: SwatchRGB) => x.toColorString());
    }
  }

  @observable
  neutralPalette: string[] = [];

  @attr({ attribute: 'accent-color' })
  accentColor: string;
  private accentColorChanged(prev: string | undefined, next: string) {
    if (this.canvasElement && next) {
      const swatch: Swatch = SwatchRGB.from(parseColorHexRGB(next)!);
      accentBaseColor.setValueFor(this.canvasElement, swatch);

      this.accentPalette = PaletteRGB.from(swatch as SwatchRGB).swatches.map((x: SwatchRGB) => x.toColorString());
    }
  }

  @observable
  accentPalette: string[] = [];

  @observable
  showOnlyLayerBackgrounds: boolean = true;

  connectedCallback() {
    super.connectedCallback();
    this.neutralColorChanged(undefined, this.neutralColor);
    this.accentColorChanged(undefined, this.accentColor);
  }

  backgrounds(): Array<SwatchInfo> {
    const neutralLayers: Array<SwatchInfo> = this.lightModeLayers.concat(this.darkModeLayers);

    return this.showOnlyLayerBackgrounds
      ? neutralLayers
      : this.neutralPalette.map(
          (color: string, index: number): SwatchInfo => {
            const neutralLayerIndex: number = neutralLayers.findIndex(
              (config: SwatchInfo): boolean => config.color === color,
            );

            return {
              index,
              color,
              title: neutralLayerIndex !== -1 ? neutralLayers[neutralLayerIndex].title : undefined,
            };
          },
        );
  }

  private layerRecipes: Array<[DesignToken<ColorRecipe>, string]> = [
    [neutralLayerFloatingRecipe, 'neutralLayerFloating'],
    [neutralLayerCardContainerRecipe, 'neutralLayerCardContainer'],
    [neutralLayer1Recipe, 'neutralLayer1'],
    [neutralLayer2Recipe, 'neutralLayer2'],
    [neutralLayer3Recipe, 'neutralLayer3'],
    [neutralLayer4Recipe, 'neutralLayer4'],
  ];

  private resolveLayerRecipes = (luminance: number): Array<SwatchInfo> => {
    const designSystemElement = document.createElement('div');
    this.canvasElement.appendChild(designSystemElement);
    baseLayerLuminance.setValueFor(designSystemElement, luminance);

    return this.layerRecipes
      .map(
        (conf: [DesignToken<ColorRecipe>, string]): SwatchInfo => {
          const color = conf[0].getValueFor(document.body).evaluate(designSystemElement).toColorString();
          return {
            index: this.neutralPalette.indexOf(color),
            color: color,
            title: conf[1],
          };
        },
      )
      .reduce((accum: Array<SwatchInfo>, value: SwatchInfo): Array<SwatchInfo> => {
        const colorIndex: number = accum.findIndex((config: SwatchInfo): boolean => config.color === value.color);

        return colorIndex === -1
          ? accum.concat(value)
          : accum.map(
              (config: SwatchInfo, index: number): SwatchInfo =>
                index === colorIndex
                  ? {
                      index: this.neutralPalette.indexOf(value.color),
                      color: value.color,
                      title: value.title!.concat(', ', config.title!),
                    }
                  : config,
            );
      }, [])
      .sort((a: SwatchInfo, b: SwatchInfo): number => a.index - b.index);
  };

  private get lightModeLayers(): Array<SwatchInfo> {
    return this.resolveLayerRecipes(StandardLuminance.LightMode);
  }

  private get darkModeLayers(): Array<SwatchInfo> {
    return this.resolveLayerRecipes(StandardLuminance.DarkMode);
  }

  controlPaneHandler(e: CustomEvent) {
    const detail: { field: string; value: any } = e.detail;
    this[detail.field] = detail.value;
  }
}
