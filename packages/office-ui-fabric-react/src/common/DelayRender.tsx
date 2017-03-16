import * as React from 'react';
import { getNativeProps, divProperties } from '../Utilities';

export interface ILiveRegionProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * priority of update announcement to live region.
   * Possible values: assertive, polite, off, rude
   *
   * @default polite
   */
  announcementPriority?: string,
}

export interface ILiveRegionState {
  showContent: boolean;
}

/**
 * A live region div that can be added dynamically to the DOM
 */
export class LiveRegion extends React.Component<ILiveRegionProps, ILiveRegionState> {
  public static defaultProps: ILiveRegionProps = {
    announcementPriority: 'polite',
  };

  private renderTimeOut: number;

  constructor(props: ILiveRegionProps) {
    super(props);
    this.state = { showContent: false };
  }

  public componentDidMount(): void {
    /**
     * Live regions need an update to announce content.
     */
    this.renderTimeOut = setTimeout(() => {
      this.setState({ showContent: true });
    }, 10);
  }

  public componentWillUnmount(): void {
    if (this.renderTimeOut) {
      clearTimeout(this.renderTimeOut);
    }
  }

  public render(): JSX.Element {
    const nativeProps = getNativeProps(this.props, divProperties);

    return (
      <span {...nativeProps } aria-live={ this.props.announcementPriority }>
        { this.state.showContent && this.props.children }
      </span>
    );
  }
}