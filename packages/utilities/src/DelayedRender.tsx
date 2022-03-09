import * as React from 'react';
import { getWindow } from './dom/getWindow';

/**
 * DelayedRender component props.
 *
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface IDelayedRenderProps extends React.Props<{}> {
  /**
   * Number of milliseconds to delay rendering children.
   */
  delay?: number;
}

/**
 * DelayedRender component state.
 *
 * @internal
 */
export interface IDelayedRenderState {
  /**
   * Whether the component is rendered or not.
   */
  isRendered: boolean;
}

/**
 * Utility component for delaying the render of a child component after a given delay. This component
 * requires a single child component; don't pass in many components. Wrap multiple components in a DIV
 * if necessary.
 *
 * @public
 * {@docCategory DelayedRender}
 */
export class DelayedRender extends React.Component<IDelayedRenderProps, IDelayedRenderState> {
  public static defaultProps = {
    delay: 0,
  };

  private _timeoutId: number | undefined;

  constructor(props: IDelayedRenderProps) {
    super(props);
    this.state = {
      isRendered: getWindow() === undefined,
    };
  }

  public componentDidMount(): void {
    let { delay } = this.props;
    this._timeoutId = window.setTimeout(() => {
      this.setState({
        isRendered: true,
      });
    }, delay);
  }

  public componentWillUnmount(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }

  public render(): React.ReactElement<{}> | null {
    return this.state.isRendered ? (React.Children.only(this.props.children) as React.ReactElement<{}>) : null;
  }
}
