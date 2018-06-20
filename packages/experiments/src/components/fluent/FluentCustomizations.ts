import { FluentTheme } from './FluentTheme';
import { FluentStyles } from './FluentStyles';
import { ICustomizerProps } from 'office-ui-fabric-react/lib/Utilities';

// export interface IFluentCustomizations {
//   settings:
// }

export const FluentCustomizations: ICustomizerProps = {
  settings: {
    theme: { ...FluentTheme }
  },
  scopedSettings: { ...FluentStyles }
};
