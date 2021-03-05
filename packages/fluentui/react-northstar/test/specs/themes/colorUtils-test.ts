import { extendColorScheme, pickValuesFromColorScheme } from 'src/themes/colorUtils';
import { ColorSchemeMapping, ComponentAreaName } from 'src/themes/types';

const generateColorSchemeValues = color => ({
  foreground: color,
  background: color,
  border: color,
  shadow: color,
  foregroundHover: color,
  backgroundHover: color,
  borderHover: color,
  shadowHover: color,
  foregroundActive: color,
  backgroundActive: color,
  borderActive: color,
  shadowActive: color,
  foregroundFocus: color,
  backgroundFocus: color,
  borderFocus: color,
  shadowFocus: color,
  foregroundPressed: color,
  backgroundPressed: color,
  borderPressed: color,
  shadowPressed: color,
  foregroundDisabled: color,
  backgroundDisabled: color,
  borderDisabled: color,
  shadowDisabled: color,
});

describe('colorUtils', () => {
  describe('extendColorScheme', () => {
    test('replaced the defined color tokens with the overrides definition', () => {
      const baseColorScheme: ColorSchemeMapping = {
        default: generateColorSchemeValues('grey'),
        primary: generateColorSchemeValues('purple'),
      };

      const overrides = {
        default: {
          foreground: 'black',
        },
        primary: {
          background: 'blue',
        },
      };

      expect(extendColorScheme(baseColorScheme, overrides)).toMatchObject({
        default: {
          ...baseColorScheme.default,
          foreground: 'black',
        },
        primary: {
          ...baseColorScheme.primary,
          background: 'blue',
        },
      });
    });

    test('extends the defined color tokens with new values if provided in the overrides', () => {
      const baseColorScheme: ColorSchemeMapping = {
        default: generateColorSchemeValues('grey'),
        primary: generateColorSchemeValues('primary'),
      };

      const overrides = {
        primary: {
          background1: 'red',
        },
      };

      expect(extendColorScheme(baseColorScheme, overrides)).toMatchObject({
        default: {
          ...baseColorScheme.defualt,
        },
        primary: {
          ...baseColorScheme.primary,
          background1: 'red',
        },
      });
    });
  });
  describe('pickValuesFromColorScheme', () => {
    test('picks the provided values from the color scheme', () => {
      const baseColorScheme: ColorSchemeMapping = {
        default: generateColorSchemeValues('grey'),
        primary: generateColorSchemeValues('purple'),
      };

      const componentAreas: ComponentAreaName[] = ['foreground', 'background'];

      expect(pickValuesFromColorScheme(baseColorScheme, componentAreas)).toMatchObject({
        default: {
          foreground: 'grey',
          background: 'grey',
        },
        primary: {
          foreground: 'purple',
          background: 'purple',
        },
      });
    });
  });
});
