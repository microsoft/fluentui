import { IBaseThemeShape } from '../ThemeShape';

export class ColorRamp {
  constructor(public colors: string[] = []) {}

  public strongest(): string {
    return this.colors[this.colors.length - 1];
  }

  public weakest(): string {
    return this.colors[0];
  }
}

export interface IFluentThemeShape extends IBaseThemeShape {
  colors: {
    brand: ColorRamp;
    neutral: ColorRamp;
  };

  typography: {
    ramp: number[];
    fontFace: string;
  };
}
