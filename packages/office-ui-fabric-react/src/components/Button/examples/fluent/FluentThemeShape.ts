import { IBaseThemeShape } from '../ThemeShape';

export class ColorRamp {
  constructor(public colors: string[] = []) {}
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
