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
   * Final data used to render proper sized component
  */
  renderedData?: any;

  /**
   * A flag to determine if a new measurement should be made upon state change
  */
  shouldMeasure?: boolean;

  /**
   * Data to render in a hidden div for measurement
   */
  dataToMeasure?: any;
}

export class ResizeGroup extends BaseComponent<IResizeGroupProps, IResizeGroupState> {

  public static defaultProps = {
    data: {}
  };

  private _root: HTMLElement;
  private _measured: HTMLElement;
  private _lastKnownRootWidth: number | undefined = undefined;
  private _lastKnownMeasuredWidth: number | undefined = undefined;
  private _measurementsCache: { [key: string]: number } = {};

  private _measuredData: any;

  constructor(props: IResizeGroupProps) {
    super(props);
    this._measuredData = { ...this.props.data };
    this.state = {
      dataToMeasure: this._measuredData,
      renderedData: null
    };
  }

  public componentWillReceiveProps(nextProps: IResizeGroupProps) {
    // Receiving new props means the parent might rerender and the root width might change
    this._lastKnownRootWidth = undefined;
    this._measuredData = { ...nextProps.data };

    if (this.props.data !== nextProps.data) {
      this.setState({
        dataToMeasure: { ...nextProps.data }
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
    const { dataToMeasure, renderedData } = this.state;

    if (Object.keys(data).length === 0) {
      return null;
    }

    return (
      <div className={ css('ms-ResizeGroup') } ref={ this._resolveRef('_root') }>
        { dataToMeasure && (
          <div className={ css(styles.measured) } ref={ this._resolveRef('_measured') }>
            { onRenderData(dataToMeasure) }
          </div>
        ) }

        { renderedData && onRenderData(renderedData) }
      </div>
    );
  }

  public componentDidUpdate(prevProps: IResizeGroupProps) {
    if (this._measuredData) {
      this._measureItems();
    }

    if (this.state.renderedData) {
      if (this.props.dataDidRender) {
        this.props.dataDidRender(this.state.renderedData);
      }
    }
  }

  private _onResize() {
    this._lastKnownRootWidth = undefined;
    this._measuredData = { ... this.props.data };
    this.setState({
      dataToMeasure: this._measuredData
    });
  }

  private _getCachedMeasurementForData(data: any): number | undefined {
    if (data && data.cacheKey && this._measurementsCache.hasOwnProperty(data.cacheKey)) {
      return this._measurementsCache[data.cacheKey];
    }

    return undefined;
  }

  private _getMeasuredWidth(measuredData: any): number {
    let cachedWidth = this._getCachedMeasurementForData(measuredData);
    if (cachedWidth !== undefined) {
      return cachedWidth;
    }

    let measuredWidth = this._measured.getBoundingClientRect().width;
    if (measuredData.cacheKey) {
      this._measurementsCache[measuredData.cacheKey] = measuredWidth;
    }
    return measuredWidth;
  }

  /**
   * Gets the width of the root container. Should only be used when it is
   * safe to reuse the last known root contianer width.
   */
  private _getRootWidth(): number {
    if (this._lastKnownRootWidth !== undefined) {
      return this._lastKnownRootWidth;
    }
    return this._root.getBoundingClientRect().width;
  }

  private _measureItems() {
    const { data, onReduceData } = this.props;

    const containerWidth = this._lastKnownRootWidth = this._getRootWidth();
    let measuredWidth = this._lastKnownMeasuredWidth = this._getMeasuredWidth(this._measuredData);

    while (measuredWidth > containerWidth) {
      let nextMeasuredData = onReduceData(this._measuredData);

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onReduceData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        this.setState({
          renderedData: this._measuredData
        });
        this._measuredData = undefined;
        return;
      }

      this._measuredData = nextMeasuredData;

      let cachedWidth = this._getCachedMeasurementForData(nextMeasuredData);

      // If the measurement isn't in the cache, we need to rerender
      if (cachedWidth === undefined) {
        this.setState({
          dataToMeasure: nextMeasuredData
        });
        return;
      }

      measuredWidth = cachedWidth;
    }

    this.setState({
      renderedData: this._measuredData,
      dataToMeasure: undefined
    });
    this._measuredData = undefined;
  }
}