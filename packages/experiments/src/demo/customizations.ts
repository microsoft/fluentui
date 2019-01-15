import { IExampleCardCustomizations, IAppCustomizations } from '@uifabric/example-app-base';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { DefaultCustomizations, TeamsCustomizations, WordCustomizations } from '@uifabric/theme-samples';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: DefaultCustomizations },
  { title: 'Teams', customizations: TeamsCustomizations },
  { title: 'Fluent', customizations: FluentCustomizations },
  { title: 'Word', customizations: WordCustomizations },
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations
};
