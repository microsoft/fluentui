import { IKeySequence } from '../../Utilities';
import { addKeytipSequence } from './KeytipUtils';
import { IKeytipProps } from '../../Keytip';

export interface IKeytipConfig {
  keytips: IKeytipConfigItem[];
}

export interface IKeytipConfigItem {
  /**
   * Key Sequence for this keytip only
   * If sequence is not defined it will be derived from the content string
   */
  sequence?: string[];

  /**
   * Content for the keytip
   */
  content: string;

  /**
   * Identifier for the keytip, to be used to access in the configMap
   */
  id: string;

  /**
   * Optional props in IKeytipProps
   */
  optionalProps?: Partial<IKeytipProps>;

  /**
   * Children keytips of this keytip
   */
  children?: IKeytipConfigItem[];
}

export interface IKeytipConfigMap {
  [id: string]: IKeytipProps;
}

/**
 * Builds a map of ID -> IKeytipProps
 *
 * @param config - IKeytipConfig object
 * @returns {IKeytipConfigMap} - Config map
 */
export function buildKeytipConfigMap(config: IKeytipConfig): IKeytipConfigMap {
  const configMap: IKeytipConfigMap = {};

  for (const keytip of config.keytips) {
    constructKeytip(configMap, [], keytip);
  }

  return configMap;
}

/**
 * Constructs a keytip from an IKeytipConfigItem and puts it in the configMap
 *
 * @param configMap - IKeytipConfigMap to store the keytip in
 * @param parentSequence - IKeySequence of the parent keytip
 * @param keytip - IKeytipConfigItem data
 */
export function constructKeytip(configMap: IKeytipConfigMap, parentSequence: IKeySequence[], keytip: IKeytipConfigItem): void {
  // Compute full key sequence
  const sequence = keytip.sequence ? { keys: keytip.sequence } : getKeytipSequenceFromContent(keytip.content);
  const keytipSequence = addKeytipSequence(parentSequence, sequence);

  // Save props in configMap
  const keytipProps: IKeytipProps = { ...keytip.optionalProps, keySequences: keytipSequence, content: keytip.content };
  configMap[keytip.id] = keytipProps;

  if (keytip.children) {
    for (const child of keytip.children) {
      // Create keytips for all children
      constructKeytip(configMap, keytipSequence, child);
    }
  }
}

/**
 * Gets a keytip sequence based off its content
 * Will be all characters to localized lowercase
 *
 * @param keytipContent - Content for this keytip
 * @returns {IKeySequence} - The calculated key sequence for this keytip
 */
export function getKeytipSequenceFromContent(keytipContent: string): IKeySequence {
  return {
    keys: keytipContent.split('').map((char: string): string => {
      return char.toLocaleLowerCase();
    })
  } as IKeySequence;
}