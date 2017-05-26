import * as React from 'react';
import {
  css,
  BaseComponent
} from '../../Utilities';
import { IResizeGroupProps } from './ResizeGroup.Props';
import styles = require('./ResizeGroup.scss');

const RESIZE_DELAY = 16;

export interface IResizeGroupState {

  /**
   * Current set of data being measured to determine fit
  */
  measuredData: any;

  /**
   * Final data used to render proper sized component
  */
  renderedData?: any;

  /**
   * A flag to determine if a new measurement should be made upon state change
  */
  shouldMeasure?: boolean;
}

export class ResizeGroup extends BaseComponent<IResizeGroupProps, IResizeGroupState> {

  public static defaultProps = {
    data: {}
  };

  private _root: HTMLElement;
  private _measured: HTMLElement;
  private _lastKnownRootWidth: number | undefined = undefined;
  private _lastKnownMeasuredWidth: number | undefined = undefined;

  constructor(props: IResizeGroupProps) {
    super(props);
    this.state = {
      shouldMeasure: true,
      renderedData: null,
      measuredData: { ...this.props.data },
    };
  }

  public componentWillReceiveProps(nextProps: IResizeGroupProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        shouldMeasure: true,
        renderedData: null,
        measuredData: { ...nextProps.data }
      });
    }
  }

  public componentDidMount() {
    this._measureItems();
    this._events.on(window, 'resize', this._async.debounce(this._onResize, RESIZE_DELAY, { leading: true }));
  }

  public componentWillUnmount() {
    this._lastKnownRootWidth = undefined;
    this._lastKnownMeasuredWidth = undefined;
  }

  public render() {
    const { onRenderData, data } = this.props;
    const { shouldMeasure, renderedData, measuredData } = this.state;

    if (Object.keys(data).length === 0) {
      return null;
    }

    return (
      <div className={ css('ms-ResizeGroup') } ref={ this._resolveRef('_root') }>
        { shouldMeasure && (
          <div className={ css(styles.measured) } ref={ this._resolveRef('_measured') }>
            { onRenderData(measuredData) }
          </div>
        ) }

        { renderedData && onRenderData(renderedData) }
      </div>
    );
  }

  public componentDidUpdate(prevProps: IResizeGroupProps) {
    this._measureItems();
  }

  private _onResize() {
    // If we have some cached measurements, let's see if we can skip rendering
    if (this._root && this._lastKnownRootWidth && this._lastKnownMeasuredWidth) {
      let containerWidth = this._root.getBoundingClientRect().width;

      // If the container didn't grow and the component still fits, don't trigger a remeasure.
      // If the container grew, we want to trigger a remeasure since we might be able to fit more content.
      if (containerWidth <= this._lastKnownRootWidth && this._lastKnownMeasuredWidth <= containerWidth) {
        this._lastKnownRootWidth = containerWidth;
        return;
      }
    }

    this.setState({ shouldMeasure: true });
  }

  private _measureItems() {
    const { data, onReduceData } = this.props;
    const { shouldMeasure } = this.state;

    if (shouldMeasure && Object.keys(data).length !== 0 && this._root && this._measured) {
      const containerWidth = this._lastKnownRootWidth = this._root.getBoundingClientRect().width;
      const measuredWidth = this._lastKnownMeasuredWidth = this._measured.getBoundingClientRect().width;
      if ((measuredWidth > containerWidth)) {
        let nextMeasuredData = onReduceData(this.state.measuredData);

        // We don't want to get stuck in an infinite render loop when there are no more
        // scaling steps, so implementations of onReduceData should return undefined when
        // there are no more scaling states to apply.
        if (nextMeasuredData !== undefined) {
          this.setState({
            measuredData: nextMeasuredData,
          });
        } else {
          this.setState({
            shouldMeasure: false
          });
        }

      } else {
        this.setState((prevState, props) => {
          return {
            renderedData: prevState.measuredData,
            measuredData: { ...this.props.data },
            shouldMeasure: false
          };
        });
      }
    }
  }
}
