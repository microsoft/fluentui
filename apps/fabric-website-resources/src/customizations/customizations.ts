import { IExampleCardCustomizations, IAppCustomizations } from '@uifabric/example-app-base';
import { FluentCustomizations } from '@uifabric/fluent-theme';
import { MDL2Customizations } from '@uifabric/mdl2-theme';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '@uifabric/azure-themes';
import { TeamsCustomizations, WordCustomizations } from '@uifabric/theme-samples';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: FluentCustomizations },
  { title: 'Word', customizations: WordCustomizations },
  { title: 'Teams', customizations: TeamsCustomizations },
  { title: 'Azure', customizations: AzureCustomizationsLight },
  { title: 'Azure Dark', customizations: AzureCustomizationsDark },
  { title: 'MDL2', customizations: MDL2Customizations }
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations
};
