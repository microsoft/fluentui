
import * as React from 'react';
import { IPortalId, IPortal, PortalStatus } from '../../utilities/portal/IPortal';
import { IPortalNexus } from '../../utilities/portal/PortalNexus';

export interface IPortalProps<TOptions> extends React.Props<Portal<TOptions>> {
  options: TOptions;
  nexus: IPortalNexus<TOptions>;
}

export interface IPortalState<TOptions> {
  portal: IPortal<TOptions>;
  nexus: IPortalNexus<TOptions>;
}

export default class Portal<TOptions> extends React.Component<IPortalProps<TOptions>, IPortalState<TOptions>> {
  private static _nextPortalId: number;

  constructor(props: IPortalProps<TOptions>) {
    super(props);

    let id: IPortalId<TOptions> = {
      id: `${++Portal._nextPortalId}`
    } as IPortalId<TOptions>;

    let portal: IPortal<TOptions> = {
      id: id,
      children: this.props.children,
      options: this.props.options,
      status: PortalStatus.initialized
    };

    let {
      nexus
    } = this.props;

    this.setState({
      portal: portal,
      nexus: nexus
    });
  }

  public render(): JSX.Element {
    return (
      <div className='ms-Portal' />
    );
  }

  public componentWillReceiveProps(props: IPortalProps<TOptions>) {
    let {
      nexus,
      children,
      options
    } = props;

    this.setState((previousState: IPortalState<TOptions>) => {
      let {
        portal
      } = previousState;

      portal = this._updatePortal(portal, {
        children: children,
        options: options
      });

      return {
        portal: portal,
        nexus: nexus
      };
    });
  }

  public componentDidUpdate(previousProps: IPortalProps<TOptions>, previousState: IPortalState<TOptions>) {
    let {
      nexus: previousNexus
    } = previousState;

    let {
      portal,
      nexus
    } = this.state;

    if (nexus !== previousNexus) {
      // If the portal is being opened on a new nexus,
      // close the portal via the previous nexus.
      let {
        portal: previousPortal
      } = previousState;

      previousPortal = this._updatePortal(portal, {
        status: PortalStatus.closed
      });

      previousNexus.update(previousPortal);
    }

    nexus.update(portal);
  }

  public componentDidMount() {
    this.setState((previousState: IPortalState<TOptions>) => {
      let {
        portal,
        nexus
      } = previousState;

      portal = this._updatePortal(portal, {
        status: PortalStatus.opened
      });

      return {
        portal: portal,
        nexus: nexus
      };
    });
  }

  public componentWillUnmount() {
    let {
      portal,
      nexus
    } = this.state;

    portal = this._updatePortal(portal, {
      status: PortalStatus.closed
    });

    nexus.update(portal);
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
}
