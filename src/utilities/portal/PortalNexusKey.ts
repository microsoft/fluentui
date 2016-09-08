
import { IPortalNexus } from './PortalNexus';

let lastAssignedIdOrdinal: number = 0;

export interface IPortalNexusKeyParams<TOptions> {
  /**
   * A friendly name for this nexus type.
   *
   * @type {string}
   */
  name: string;
  /**
   * A default implementation of the nexus for this key.
   *
   * @type {IPortalNexus<TOptions>}
   */
  nexus?: IPortalNexus<TOptions>;
}

/**
 * Represents a specific family of portal and nexus.
 * Portals discover their current nexus by providing this key.
 * A key may provide a default implementation of a nexus, to be
 * used if no nexus is available via the current context.
 *
 * @export
 * @class PortalNexusKey
 * @template TOptions
 */
export class PortalNexusKey<TOptions> {
  /**
   * The unique id for this key. Do not use this directly.
   *
   * @type {string}
   */
  public id: string;

  /**
   * A friendly name for the nexus key.
   *
   * @type {string}
   */
  public name: string;

  /**
   * A default portal nexus to use for this key.
   *
   * @type {IPortalNexus<TOptions>}
   */
  public nexus: IPortalNexus<TOptions>;

  constructor(params: IPortalNexusKeyParams<TOptions>) {
    let {
      name,
      nexus
    } = params;

    this.id = `${name}_${++lastAssignedIdOrdinal}`;
    this.name = name;
    this.nexus = nexus;
  }
}
