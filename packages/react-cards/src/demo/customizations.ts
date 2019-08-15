import { IExampleCardCustomizations, IAppCustomizations } from '@uifabric/example-app-base';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '@uifabric/azure-themes';
import { DefaultCustomizations, TeamsCustomizations, WordCustomizations } from '@uifabric/theme-samples';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: DefaultCustomizations },
  { title: 'Word', customizations: WordCustomizations },
  { title: 'Teams', customizations: TeamsCustomizations },
  { title: 'Azure', customizations: AzureCustomizationsLight },
  { title: 'Azure Dark', customizations: AzureCustomizationsDark }
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations
};
