
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

export class PortalNexusKey<TOptions> {
  public id: string;

  public name: string;

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
