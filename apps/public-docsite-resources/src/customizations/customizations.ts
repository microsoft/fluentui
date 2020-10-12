import { IExampleCardCustomizations, IAppCustomizations } from '@uifabric/example-app-base';
import { MDL2Customizations } from '@uifabric/mdl2-theme';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '@fluentui/azure-themes';
import {
  TeamsCustomizations,
  WordCustomizations,
  DefaultCustomizations,
  DarkCustomizations,
} from '@fluentui/theme-samples';

const exampleCardCustomizations: IExampleCardCustomizations[] = [
  { title: 'Default', customizations: DefaultCustomizations },
  { title: 'Dark', customizations: DarkCustomizations },
  { title: 'Word', customizations: WordCustomizations },
  { title: 'Teams', customizations: TeamsCustomizations },
  { title: 'Azure', customizations: AzureCustomizationsLight },
  { title: 'Azure Dark', customizations: AzureCustomizationsDark },
  { title: 'MDL2', customizations: MDL2Customizations },
];

export const AppCustomizations: IAppCustomizations = {
  exampleCardCustomizations,
};
