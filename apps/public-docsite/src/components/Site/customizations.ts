import { DefaultCustomizations, DarkCustomizations } from '@fluentui/theme-samples';
import { IAppCustomizations, IExampleCardCustomizations } from '@fluentui/react-docsite-components';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: DefaultCustomizations },
  { title: 'Dark', customizations: DarkCustomizations },
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations,
  hideSchemes: true,
};
