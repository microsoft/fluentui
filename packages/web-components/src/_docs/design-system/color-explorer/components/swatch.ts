import { contrastRatio, parseColor } from '@microsoft/fast-colors';
import { attr, css, customElement, html, observable } from '@microsoft/fast-element';
import { DesignToken, FoundationElement } from '@microsoft/fast-foundation';
import { elevation, fillColor, neutralForegroundHint, Swatch } from '../../../../index-rollup';

export enum SwatchTypes {
  fill = 'fill',
  foreground = 'foreground',
  outline = 'outline',
}

const template = html<AppSwatch>`
  <template class="${x => x.type}">
    <div class="icon" style="${x => x.iconStyle}" title="${x => x.contrastMessage}"></div>
    <code class="recipe-name"> ${x => x.recipeName} </code>
    <code class="hex-code"> ${x => x.colorValue} </code>
  </template>
`;

const styles = css`
  :host {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: auto;
    align-items: center;
    width: 100%;
    padding: 4px 0;
    box-sizing: border-box;
    color: ${neutralForegroundHint};
    font-size: 12px;
    grid-column-gap: 16px;
    justify-items: start;
  }
  :host(.foreground) .icon {
    border: 1px solid black;
  }
  :host(.foreground) .icon::before {
    font-size: 13px;
    content: 'A';
    font-weight: 400;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    box-sizing: border-box;
    --elevation: 4;
    ${elevation}
  }
  .recipe-name {
    grid-column: 2;
    grid-row: 1;
  }
  .hex-code {
    grid-column: 3;
    grid-row: 1;
  }
`;

@customElement({
  name: 'app-swatch',
  template,
  styles,
})
export class AppSwatch extends FoundationElement {
  @attr
  public type: SwatchTypes;

  @attr({ attribute: 'recipe-name' })
  public recipeName: string;

  @observable
  public foregroundRecipe?: DesignToken<Swatch>;
  public foregroundRecipeChanged() {
    this.updateObservables();
  }

  @observable
  public fillRecipe?: DesignToken<Swatch>;
  public fillRecipeChanged() {
    this.updateObservables();
  }

  @observable
  public outlineRecipe?: DesignToken<Swatch>;
  public outlineRecipeChanged() {
    this.updateObservables();
  }

  @observable
  public iconStyle: string;

  @observable
  public contrastMessage: string;

  @observable
  public colorValue: string;

  public connectedCallback() {
    super.connectedCallback();

    this.updateObservables();
  }

  private updateObservables() {
    this.updateIconStyle();
    this.updateContrastMessage();
    this.updateColorValue();
  }

  private tokenCSS(token?: DesignToken<Swatch>): string {
    return token && typeof (token as any).createCSS === 'function' ? (token as any).createCSS() : '';
  }

  private evaluateToken(token?: DesignToken<Swatch>): string {
    return token?.getValueFor(this).toColorString() || '';
  }

  private updateIconStyle(): void {
    const background = `background-color: ${this.tokenCSS(this.fillRecipe)}`;
    this.iconStyle =
      this.type === SwatchTypes.outline
        ? `border: 4px solid ${this.tokenCSS(this.outlineRecipe)}; ${background}`
        : this.type === SwatchTypes.foreground
        ? `color: ${this.tokenCSS(this.foregroundRecipe)}; ${background}`
        : background;
  }

  private formatContrast(a?: DesignToken<Swatch>, b?: DesignToken<Swatch>): string {
    return a && b
      ? contrastRatio(parseColor(this.evaluateToken(a))!, parseColor(this.evaluateToken(b))!).toFixed(2)
      : '';
  }

  private formatBackgroundContrast(a?: DesignToken<Swatch>, b?: DesignToken<Swatch>): string {
    return `BG contrast: ${this.formatContrast(a, b)} : 1`;
  }

  private formatForegroundContrast(a?: DesignToken<Swatch>, b?: DesignToken<Swatch>): string {
    return `Text contrast: ${this.formatContrast(a, b)} : 1`;
  }

  private updateContrastMessage(): void {
    const backgroundContrastMessage: string = this.formatBackgroundContrast(
      this.type === SwatchTypes.foreground
        ? this.foregroundRecipe
        : this.type === SwatchTypes.outline
        ? this.outlineRecipe
        : this.fillRecipe,
      this.type === SwatchTypes.foreground || this.type === SwatchTypes.outline ? this.fillRecipe : fillColor,
    );

    this.contrastMessage =
      this.type === SwatchTypes.fill
        ? backgroundContrastMessage.concat('\n', this.formatForegroundContrast(this.fillRecipe, this.foregroundRecipe))
        : backgroundContrastMessage;
  }

  private updateColorValue(): void {
    const recipe =
      this.type === SwatchTypes.outline
        ? this.outlineRecipe
        : this.type === SwatchTypes.foreground
        ? this.foregroundRecipe
        : this.fillRecipe;
    this.colorValue = this.evaluateToken(recipe).toUpperCase();
  }
}
