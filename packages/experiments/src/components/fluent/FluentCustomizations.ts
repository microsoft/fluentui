import { FluentTheme } from './FluentTheme';
import { FluentStyles } from './FluentStyles';

export const FluentCustomizations = {
  settings: {
    theme: { ...FluentTheme }
  },
  scopedSettings: { ...FluentStyles }
};

export default FluentCustomizations;
