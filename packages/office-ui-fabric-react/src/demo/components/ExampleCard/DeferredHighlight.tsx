import * as React from 'react';
import { BaseComponent } from '../../../Utilities';

export interface IDeferredHighlightState {
  Highlight: any;
}

export class DeferredHighlight extends BaseComponent<React.HTMLAttributes<HTMLDivElement>, IDeferredHighlightState> {
  private _isMounted;

  constructor() {
    super();
    this.state = {
      Highlight: null
    }
  }

  public render() {
    let { Highlight } = this.state;

    if (Highlight) {
      return <Highlight { ...this.props } />;
    }

    return null;
  }

  public componentDidMount() {
    this._isMounted = true;

    require.ensure([], () => {
      const Highlight = require('react-highlight') as any;

      if (this._isMounted) {
        this.setState({ Highlight });
      }
    });
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }
}