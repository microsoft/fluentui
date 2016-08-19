
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

export class PortalNexus<TOptions> implements IPortalNexus<TOptions>, IDisposable {
  private _state: IPortalNexusState<TOptions>;
  private _eventGroup: EventGroup;

  constructor() {
    this._eventGroup = new EventGroup(this);

    this._eventGroup.declare(PORTALS_CHANGE_EVENT_NAME);

    this._setState({
      portals: []
    });
  }

  public dispose() {
    this._eventGroup.dispose();
  }

  public update(portal: IPortal<TOptions>): void {
    let {
      id: {
        id
      },
      children,
      options,
      status
    } = portal;

    this._setState((previousState: IPortalNexusState<TOptions>) => {
      let {
        portals: previousPortals
      } = previousState;

      let portals: IPortal<TOptions>[];

      for (let previousPortal of previousPortals) {
        if (previousPortal.id.id === id) {
          if (status !== PortalStatus.closed) {
            // Update the portal with new data.
            portals.push(this._updatePortal(previousPortal, {
              children: children,
              options: options,
              status: status
            }));
          }

          // If a portal has been closed, it should not be in the updated state.
        } else {
          portals.push(previousPortal);
        }
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

  private _setState(state: IPortalNexusState<TOptions>): void;
  private _setState(getState: (previousState: IPortalNexusState<TOptions>) => IPortalNexusState<TOptions>, callback?: (state: IPortalNexusState<TOptions>) => void): void;
  private _setState(getState: IPortalNexusState<TOptions> | ((previousState: IPortalNexusState<TOptions>) => IPortalNexusState<TOptions>), callback?: (state: IPortalNexusState<TOptions>) => void) {
    let newState: IPortalNexusState<TOptions>;

    if (isStateSetter(getState)) {
      let previousState = this._state;

      newState = getState(previousState);
    }

    this._state = newState;

    if (callback) {
      callback(this._state);
    }
  }
}

function isStateSetter<TOptions>(getState: IPortalNexusState<TOptions> | ((previousState: IPortalNexusState<TOptions>) => IPortalNexusState<TOptions>)): getState is ((previousState: IPortalNexusState<TOptions>) => IPortalNexusState<TOptions>) {
  return typeof getState === 'function';
}
