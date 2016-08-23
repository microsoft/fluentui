
import * as React from 'react';

/**
 * Possible status values for a portal.
 * Do not use directly.
 *
 * @export
 * @enum {number}
 */
export enum PortalStatus {
  initialized,
  opened,
  closed
}

/**
 * Represents a unique id for a portal.
 * Do not use directly.
 *
 * @export
 * @interface IPortalId
 * @template TOptions
 */
export interface IPortalId<TOptions> {
  _PortalId_Brand: boolean;
  id: string;
}

/**
 * Represents the state of a portal.
 * Do not use directly.
 *
 * @export
 * @interface IPortal
 * @template TOptions
 */
export interface IPortal<TOptions> {
  /**
   * The id for the portal.
   *
   * @type {IPortalId<TOptions>}
   */
  id: IPortalId<TOptions>;
  /**
   * The child elements to be projected through the portal.
   *
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
  /**
   * Options specific to the rendering of this portal.
   *
   * @type {TOptions}
   */
  options: TOptions;
  /**
   * The status of this portal.
   *
   * @type {PortalStatus}
   */
  status: PortalStatus;
}
