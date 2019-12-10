import { IFluentThemeShape, ColorRamp } from './FluentThemeShape';

export const FluentTheme: IFluentThemeShape = {
  colors: {
    brand: new ColorRamp(['#00f9ff', '#008e91', '#003233']),
    neutral: new ColorRamp(['#dedede', '#7c7c7c', '#292929'])
  },
  typography: {
    ramp: [8, 10, 12, 16, 24, 36, 48, 128],
    fontFace: 'Futura'
  }
};
