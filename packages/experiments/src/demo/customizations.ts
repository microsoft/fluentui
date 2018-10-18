import { IExampleCardCustomizations, IAppCustomizations } from '@uifabric/example-app-base';
import { DefaultCustomizations, FluentCustomizations, TeamsCustomizations, WordCustomizations } from '@uifabric/theme-samples';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: DefaultCustomizations },
  { title: 'Fluent', customizations: FluentCustomizations },
  { title: 'Word', customizations: WordCustomizations },
  { title: 'Teams', customizations: TeamsCustomizations }
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations
};
