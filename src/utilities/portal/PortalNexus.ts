
import * as React from 'react';

import { IDisposable } from '../../common/IDisposable';
import { IPortal, PortalStatus } from './IPortal';
import { EventGroup } from '../eventGroup/EventGroup';

export interface IPortalNexus<TOptions> {
  update(portal: IPortal<TOptions>): void;
  getPortals(): IPortal<TOptions>[];
}

export interface IPortalNexusState<TOptions> {
  portals: IPortal<TOptions>[];
}

export interface IOnPortalsChangeEventArgs<TOptions> {
  portals: IPortal<TOptions>[];
}

export const PORTALS_CHANGE_EVENT_NAME = 'portalsChange';

/**
 * Component which manages a set of opened portals which can be used for content projection.
 *
 * @export
 * @class PortalNexus
 * @implements {IPortalNexus<TOptions>}
 * @implements {IDisposable}
 * @template TOptions
 */
export class PortalNexus<TOptions> implements IPortalNexus<TOptions>, IDisposable {
  private _state: IPortalNexusState<TOptions>;
  private _eventGroup: EventGroup;

  constructor() {
    this._eventGroup = new EventGroup(this);

    this._eventGroup.declare(PORTALS_CHANGE_EVENT_NAME);

    this._state = {
      portals: []
    };
  }

  /**
   * Stops this portal nexus from firing change events.
   */
  public dispose() {
    this._eventGroup.dispose();
  }

  /**
   * Updates the state of a specific portal which should be managed by this nexus.
   * If the portal is new, the nexus adds it as the last opened portal.
   * If the portal is closed, the nexus removed it from its list of portals.
   * For other updates, the nexus modifies its tracked state for the portal.
   *
   * This method must be called for any state update to a portal.
   *
   * @param {IPortal<TOptions>} portal
   */
  public update(portal: IPortal<TOptions>): void {
    let {
      id: {
        id: portalId
      },
      children,
      options,
      status
    } = portal;

    this._setState((previousState: IPortalNexusState<TOptions>) => {
      let {
        portals: previousPortals
      } = previousState;

      let portals: IPortal<TOptions>[] = [];

      let isNewPortal = true;

      for (let previousPortal of previousPortals) {
        let {
          id: {
            id: previousPortalId
          }
        } = previousPortal;

        if (previousPortalId === portalId) {
          if (status !== PortalStatus.closed) {
            // Update the portal with new data.
            portals.push(this._updatePortal(previousPortal, {
              children: children,
              options: options,
              status: status
            }));
          }

          isNewPortal = false;

          // If a portal has been closed, it should not be in the updated state.
        } else {
          portals.push(previousPortal);
        }
      }

      if (isNewPortal) {
        portals.push(this._updatePortal(portal));
      }

      return {
        portals: portals
      };
    }, (state: IPortalNexusState<TOptions>) => {
      let onPortalsChangeEventArgs: IOnPortalsChangeEventArgs<TOptions> = {
        portals: state.portals
      };

      this._eventGroup.raise(PORTALS_CHANGE_EVENT_NAME, onPortalsChangeEventArgs);
    });
  }

  /**
   * Gets the current list of portals opened through this nexus.
   *
   * @returns {IPortal<TOptions>[]}
   */
  public getPortals(): IPortal<TOptions>[] {
    return this._state.portals;
  }

  private _updatePortal(portal: IPortal<TOptions>, updates: {
    children?: React.ReactNode;
    options?: TOptions;
    status?: PortalStatus;
  } = {}): IPortal<TOptions> {
    let {
      id,
      children,
      options,
      status
    } = portal;

    ({
      children = children,
      options = options,
      status = status
    } = updates);

    return {
      id: id,
      children: children,
      options: options,
      status: status
    };
  }

  private _setState(getState: (previousState: IPortalNexusState<TOptions>) => IPortalNexusState<TOptions>, callback?: (state: IPortalNexusState<TOptions>) => void): void {
    let previousState = this._state;

    let newState = getState(previousState);

    this._state = newState;

    if (callback) {
      callback(this._state);
    }
  }
}
