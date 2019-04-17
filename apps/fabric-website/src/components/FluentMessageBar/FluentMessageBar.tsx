import { Link } from 'office-ui-fabric-react/lib/Link';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';

export interface IFluentMessageBarProps {}

export interface IFluentMessageBarState {
  isVisible: boolean;
}

export default class IFluentMessageBar extends React.Component<IFluentMessageBarProps, IFluentMessageBarState> {
  constructor(props: IFluentMessageBarProps) {
    super(props);

    this.state = {
      isVisible: true
    };

    this._onClose = this._onClose.bind(this);
  }

  public render() {
    const { isVisible } = this.state;

    return (
      isVisible && (
        <MessageBar onDismiss={this._onClose} dismissButtonAriaLabel="Close" className="ms-App-fluentMessageBar">
          Get an early look at the latest Fluent updates coming to Fabric. <Link href="https://aka.ms/fabric-preview">Learn more</Link>
        </MessageBar>
      )
    );
  }

  private _onClose() {
    this.setState({
      isVisible: false
    });
  }
}
