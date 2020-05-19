import { IFabricConfig } from './IFabricConfig';
import { getWindow } from './dom/getWindow';

/**
 * Used to determine if a portion of code should run.
 * See https://github.com/microsoft/fluentui/wiki/enabledFeatures-Switches for more details.
 * @param name - globally unique name associated with this switch
 * @param owner - alias or name of the owner of this switch.
 * @param date - date this switch was created, preferably MM/DD/YY e.g. 12/31/20, or longform e.g. Dec 31, 2020
 */
export function isFeatureEnabled(name: string, owner: string, date: string) {
  if (!owner || !date) {
    throw 'isFeatureEnabled() requires an owner and a date';
  }

  const fabricConfig: IFabricConfig = (getWindow() as any)?.FabricConfig; // tslint:disable-line:no-any
  if (fabricConfig?.enabledFeatures) {
    return fabricConfig.enabledFeatures[name.toUpperCase()];
  }
  return false;
}
