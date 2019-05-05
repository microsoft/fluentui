import { DefaultCustomizations } from '@uifabric/theme-samples';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { IAppCustomizations, IExampleCardCustomizations } from '@uifabric/example-app-base';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Fluent', customizations: FluentCustomizations },
  { title: 'Default', customizations: DefaultCustomizations }
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations,
  hideSchemes: true
};
