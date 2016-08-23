
import * as React from 'react';
import { IPortalId, IPortal, PortalStatus } from '../../utilities/Portal/IPortal';
import { PortalNexusKey } from '../../utilities/Portal/PortalNexusKey';
import { getPortalNexus, IPortalContext, PORTAL_CONTEXT_PROP_TYPES } from '../../utilities/Portal/IPortalContext';

export interface IPortalProps<TOptions> extends React.Props<Portal<TOptions>> {
  options: TOptions;
  nexusKey: PortalNexusKey<TOptions>;
}

export interface IPortalState<TOptions> {
  status: PortalStatus;
}

let nextPortalId: number = 0;

/**
 * Component which projects content through a 'portal' opened via a 'nexus'.
 * This component takes child `React` elements and attempts to render them
 * elsewhere in the DOM, assisted via a `PortalNexus` implementation accessed
 * via a `PortalNexusKey`.
 *
 * @export
 * @class Portal
 * @extends {React.Component<IPortalProps<TOptions>, IPortalState<TOptions>>}
 * @template TOptions
 */
export class Portal<TOptions> extends React.Component<IPortalProps<TOptions>, IPortalState<TOptions>> {
  public static contextTypes = PORTAL_CONTEXT_PROP_TYPES;

  public context: IPortalContext;

  private _id: IPortalId<TOptions>;

  constructor(props: IPortalProps<TOptions>, context: any) {
    super(props, context);

    this._id = {
      id: `${++nextPortalId}`
    } as IPortalId<TOptions>;
  }

  public render(): JSX.Element {
    return (
      <div className='ms-Portal' />
    );
  }

  public componentDidUpdate(previousProps: IPortalProps<TOptions>, previousState: IPortalState<TOptions>) {
    let {
      nexusKey: previousNexusKey
    } = previousProps;

    let {
      children,
      options,
      nexusKey
    } = this.props;

    let {
      status = PortalStatus.initialized
    } = this.state;

    let nexus = getPortalNexus(nexusKey, this.context);

    let {
      nexus: previousNexus
    } = previousNexusKey;

    let portal: IPortal<TOptions> = {
      id: this._id,
      children: children,
      options: options,
      status: status
    };

    if (previousNexus && nexus !== previousNexus) {
      let previousPortal = this._updatePortal(portal, {
        status: PortalStatus.closed
      });

      previousNexus.update(previousPortal);
    }

    nexus.update(portal);
  }

  public componentDidMount() {
    this.setState({
      status: PortalStatus.opened
    });
  }

  public componentWillUnmount() {
    let {
      children,
      options,
      nexusKey
    } = this.props;

    let nexus = getPortalNexus(nexusKey, this.context);

    let portal: IPortal<TOptions> = {
      id: this._id,
      children: children,
      options: options,
      status: PortalStatus.closed
    };

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
