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
   * Data to render in a hidden div for measurement
   */
  dataToMeasure?: any;

  /**
   * Set to true when the content container might have new dimensions and should
   * be remeasured.
   */
  measureContainer?: boolean;

  /**
   * Are we resizing to accommodate having more or less available space?
   * The 'grow' direction is when the container may have more room than the last render,
   * such as when a window resize occurs. This means we will try to fit more content in the window.
   * The 'shrink' direction is when the contents don't fit in the container and we need
   * to find a transformation of the data that makes everything fit.
   */
  resizeDirection?: 'grow' | 'shrink';
}

/**
 * Returns a simple object is able to store measurements with a given key.
 */
export const getMeasurementCache = () => {
  const measurementsCache: { [key: string]: number } = {};

  return {
    /**
     * Checks if the provided data has a cacheKey. If it has a cacheKey and there is a
     * corresponding entry in the measurementsCache, then it will return that value.
     * Returns undefined otherwise.
     */
    getCachedMeasurement: (data: any): number | undefined => {
      if (data && data.cacheKey && measurementsCache.hasOwnProperty(data.cacheKey)) {
        return measurementsCache[data.cacheKey];
      }

      return undefined;
    },
    /**
     * Should be called whenever there is a new measurement associated with a given data object.
     * If the data has a cacheKey, store that measurement in the measurementsCache.
     */
    addMeasurementToCache: (data: any, measurement: number): void => {
      if (data.cacheKey) {
        measurementsCache[data.cacheKey] = measurement;
      }
    }
  };
};

/**
 * Returns a function that is able to compute the next state for the ResizeGroup given the current
 * state and any measurement updates.
 */
export const getNextResizeGroupStateProvider = (measurementCache = getMeasurementCache()) => {
  const _measurementCache = measurementCache;
  let _containerWidth: number | undefined;

  /**
   * Gets the width of the data rendered in a hidden div.
   * @param measuredData - The data corresponding to the measurement we wish to take.
   * @param getElementToMeasureWidth - A function that returns the measurement of the rendered data. Only called when the measurement
   * is not in the cache.
   */
  function _getMeasuredWidth(measuredData: any, getElementToMeasureWidth: () => number): number {
    let cachedWidth = _measurementCache.getCachedMeasurement(measuredData);
    if (cachedWidth !== undefined) {
      return cachedWidth;
    }

    let measuredWidth = getElementToMeasureWidth();
    _measurementCache.addMeasurementToCache(measuredData, measuredWidth);
    return measuredWidth;
  }

  /**
   * Will get the next IResizeGroupState based on the current data while trying to shrink contents
   * to fit in the container.
   * @param data - The initial data point to start measuring.
   * @param onReduceData - Function that transforms the data into something that should render with less width.
   * @param getElementToMeasureWidth - A function that returns the measurement of the rendered data. Only called when the measurement
   * is not in the cache.
   */
  function _shrinkContentsUntilTheyFit(data: any,
    onReduceData: (prevData: any) => any,
    getElementToMeasureWidth: () => number): IResizeGroupState {
    let dataToMeasure = data;
    let measuredWidth: number | undefined = _getMeasuredWidth(data, getElementToMeasureWidth);

    while (measuredWidth > _containerWidth!) {
      let nextMeasuredData = onReduceData(dataToMeasure);

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onReduceData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        return {
          renderedData: dataToMeasure,
          resizeDirection: undefined,
          dataToMeasure: undefined
        };
      }

      measuredWidth = _measurementCache.getCachedMeasurement(nextMeasuredData);

      // If the measurement isn't in the cache, we need to rerender with some data in a hidden div
      if (measuredWidth === undefined) {
        return {
          dataToMeasure: nextMeasuredData,
          resizeDirection: 'shrink'
        };
      }

      dataToMeasure = nextMeasuredData;
    }

    return {
      renderedData: dataToMeasure,
      resizeDirection: undefined,
      dataToMeasure: undefined
    };
  }

  /**
   * This function should be called when the state changes in a manner that might allow for more content to fit
   * on the screen, such as the window width growing.
   * @param data - The initial data point to start measuring.
   * @param onGrowData - Function that transforms the data into something that may take up more space when rendering.
   * @param getElementToMeasureWidth - A function that returns the measurement of the rendered data. Only called when the measurement
   * is not in the cache.
   */
  function _growDataUntilItDoesNotFit(data: any,
    onGrowData: (prevData: any) => any,
    getElementToMeasureWidth: () => number): IResizeGroupState {
    let dataToMeasure = data;
    let measuredWidth: number | undefined = _getMeasuredWidth(data, getElementToMeasureWidth);

    while (measuredWidth < _containerWidth!) {
      let nextMeasuredData = onGrowData(dataToMeasure);

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onGrowData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        return {
          renderedData: dataToMeasure,
          resizeDirection: undefined,
          dataToMeasure: undefined
        };
      }

      measuredWidth = _measurementCache.getCachedMeasurement(nextMeasuredData);
      // If the measurement isn't in the cache, we need to rerender with some data in a hidden div
      if (measuredWidth === undefined) {
        return {
          dataToMeasure: nextMeasuredData
        };
      }

      dataToMeasure = nextMeasuredData;
    }

    // Once the loop is done, we should now shrink until the contents fit.
    return {
      dataToMeasure,
      resizeDirection: 'shrink'
    };
  }

  /**
   * Handles an update to the container width. Should only be called when we knew the previous container width.
   * @param newWidth - The new width of the container.
   * @param fullWidthData - The initial data passed in as a prop to resizeGroup.
   * @param renderedData - The data that was rendered prior to the container size changing.
   * @param onGrowData - Set to true if the Resize group has an onGrowData function.
   */
  function _updateContainerWidth(newWidth: number, fullWidthData: any, renderedData: any, onGrowData?: (prevData: any) => any): IResizeGroupState {
    let nextState: IResizeGroupState;
    if (newWidth > _containerWidth!) {
      if (onGrowData) {
        nextState = {
          resizeDirection: 'grow',
          dataToMeasure: onGrowData(renderedData)
        };
      } else {
        nextState = {
          resizeDirection: 'shrink',
          dataToMeasure: fullWidthData
        };
      }
    } else {
      nextState = {
        resizeDirection: 'shrink',
        dataToMeasure: renderedData
      };
    }
    _containerWidth = newWidth;
    return { ...nextState, measureContainer: false };
  }

  return (props: IResizeGroupProps,
    currentState: IResizeGroupState,
    getElementToMeasureWidth: () => number,
    newContainerWidth?: number): IResizeGroupState | undefined => {
    // If there is no new container width or data to measure, there is no need for a new state update
    if (newContainerWidth === undefined && currentState.dataToMeasure === undefined) {
      return undefined;
    }

    if (newContainerWidth) {
      // If we know what the last container size was and we rendered data at that width, we can do an optimized render
      if (_containerWidth && currentState.renderedData && !currentState.dataToMeasure) {
        return { ...currentState, ..._updateContainerWidth(newContainerWidth, props.data, currentState.renderedData, props.onGrowData) };
      }

      // If we are just setting the container width for the first time, we can't do any optimizations
      _containerWidth = newContainerWidth;
    }

    let nextState: IResizeGroupState = {
      ...currentState,
      measureContainer: false
    };

    if (currentState.dataToMeasure) {
      if (currentState.resizeDirection === 'grow' && props.onGrowData) {
        nextState = {
          ...nextState,
          ..._growDataUntilItDoesNotFit(currentState.dataToMeasure, props.onGrowData, getElementToMeasureWidth)
        };
      } else {
        nextState = {
          ...nextState,
          ..._shrinkContentsUntilTheyFit(currentState.dataToMeasure, props.onReduceData, getElementToMeasureWidth)
        };
      }
    }

    return nextState;
  };
};

export class ResizeGroup extends BaseComponent<IResizeGroupProps, IResizeGroupState> {
  private _getNextResizeGroupState = getNextResizeGroupStateProvider();
  private _root: HTMLElement;
  private _measured: HTMLElement;

  constructor(props: IResizeGroupProps) {
    super(props);
    this.state = {
      dataToMeasure: { ...this.props.data },
      resizeDirection: 'grow',
      measureContainer: true,
    };
  }

  public render() {
    const { onRenderData, data } = this.props;
    const { dataToMeasure, renderedData } = this.state;

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

  public componentDidMount() {
    this._afterComponentRendered();
    this._events.on(window, 'resize', this._async.debounce(this._onResize, RESIZE_DELAY, { leading: true }));
  }

  public componentWillReceiveProps(nextProps: IResizeGroupProps) {
    this.setState({
      dataToMeasure: { ...nextProps.data },
      resizeDirection: 'grow',
      measureContainer: true // Receiving new props means the parent might rerender and the root width might change
    });
  }

  public componentDidUpdate(prevProps: IResizeGroupProps) {
    if (this.state.renderedData) {
      if (this.props.dataDidRender) {
        this.props.dataDidRender(this.state.renderedData);
      }
    }
    this._afterComponentRendered();
  }

  private _afterComponentRendered() {
    this._async.requestAnimationFrame(() => {
      let containerWidth = undefined;
      if (this.state.measureContainer) {
        containerWidth = this._root.getBoundingClientRect().width;
      }
      let nextState = this._getNextResizeGroupState(this.props,
        this.state,
        () => this._measured.scrollWidth,
        containerWidth);

      if (nextState) {
        this.setState(nextState);
      }
    });
  }

  private _onResize() {
    if (this._root) {
      this.setState({ measureContainer: true });
    }
  }
}