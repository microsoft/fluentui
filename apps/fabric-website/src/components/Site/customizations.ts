import { DefaultCustomizations, DarkCustomizations } from '@uifabric/theme-samples';
import { IAppCustomizations, IExampleCardCustomizations } from '@uifabric/example-app-base';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: DefaultCustomizations },
  { title: 'Dark', customizations: DarkCustomizations },
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations,
  hideSchemes: true,
};
