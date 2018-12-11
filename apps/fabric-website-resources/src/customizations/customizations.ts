import { IExampleCardCustomizations, IAppCustomizations } from '@uifabric/example-app-base';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { IbizaCustomizationsLight, IbizaCustomizationsDark } from '@uifabric/ibiza-themes';
import { DefaultCustomizations, TeamsCustomizations, WordCustomizations } from '@uifabric/theme-samples';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: DefaultCustomizations },
  { title: 'Fluent', customizations: FluentCustomizations },
  { title: 'Word', customizations: WordCustomizations },
  { title: 'Teams', customizations: TeamsCustomizations },
  { title: 'Ibiza-Dark', customizations: IbizaCustomizationsDark },
  { title: 'Ibiza-Light', customizations: IbizaCustomizationsLight }
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations
};
