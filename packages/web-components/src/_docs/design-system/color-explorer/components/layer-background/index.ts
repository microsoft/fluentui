import { attr, css, html, nullableNumberConverter } from '@microsoft/fast-element';
import { DesignToken, DesignTokenChangeRecord, display, FoundationElement } from '@microsoft/fast-foundation';
import {
  baseLayerLuminance,
  fillColor,
  neutralForegroundRest,
  neutralLayer1,
  neutralLayer2,
  neutralLayer3,
  neutralLayer4,
  neutralPalette,
  Swatch,
} from '../../../../../index-rollup';

export class LayerBackground extends FoundationElement {
  @attr({ attribute: 'base-layer-luminance', converter: nullableNumberConverter })
  public baseLayerLuminance: number;
  private baseLayerLuminanceChanged(prev: number, next: number): void {
    baseLayerLuminance.setValueFor(this, this.baseLayerLuminance);
    this.updateBackgroundColor();
  }

  @attr({ attribute: 'background-layer-recipe' })
  public backgroundLayerRecipe: string = 'L1';
  private backgroundLayerRecipeChanged(prev: string, next: string): void {
    this.updateBackgroundColor();
  }

  private updateBackgroundColor(): void {
    if (!this.$fastController.isConnected) {
      return;
    }

    if (this.backgroundLayerRecipe !== undefined) {
      let swatch: Swatch | null = null;
      switch (this.backgroundLayerRecipe) {
        case 'L1':
          swatch = neutralLayer1.getValueFor(this);
          break;
        case 'L2':
          swatch = neutralLayer2.getValueFor(this);
          break;
        case 'L3':
          swatch = neutralLayer3.getValueFor(this);
          break;
        case 'L4':
          swatch = neutralLayer4.getValueFor(this);
          break;
      }

      if (swatch !== null) {
        fillColor.setValueFor(this, swatch);
      }
    }
  }

  public handleChange(record: DesignTokenChangeRecord<DesignToken<any>>): void {
    if (record.token === neutralPalette) {
      this.updateBackgroundColor();
    }
  }

  public connectedCallback(): void {
    super.connectedCallback();

    neutralPalette.subscribe(this);

    this.updateBackgroundColor();
  }
}

export const layerBackgroundTemplate = html` <slot></slot> `;

export const layerBackgroundStyles = css`
  ${display('block')} :host {
    background: ${fillColor};
    color: ${neutralForegroundRest};
  }
`;

export const layerBackground = LayerBackground.compose({
  baseName: 'layer-background',
  template: layerBackgroundTemplate,
  styles: layerBackgroundStyles,
});
