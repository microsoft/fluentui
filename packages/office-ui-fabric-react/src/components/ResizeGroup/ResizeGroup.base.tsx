import * as React from 'react';
import * as PropTypes from 'prop-types';
import { BaseComponent, divProperties, getNativeProps, provideContext, createRef } from '../../Utilities';
import { IResizeGroupProps } from './ResizeGroup.types';

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
    const cachedWidth = _measurementCache.getCachedMeasurement(measuredData);
    if (cachedWidth !== undefined) {
      return cachedWidth;
    }

    const measuredWidth = getElementToMeasureWidth();
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
  function _shrinkContentsUntilTheyFit(
    data: any,
    onReduceData: (prevData: any) => any,
    getElementToMeasureWidth: () => number
  ): IResizeGroupState {
    let dataToMeasure = data;
    let measuredWidth: number | undefined = _getMeasuredWidth(data, getElementToMeasureWidth);

    while (measuredWidth > _containerWidth!) {
      const nextMeasuredData = onReduceData(dataToMeasure);

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
  function _growDataUntilItDoesNotFit(
    data: any,
    onGrowData: (prevData: any) => any,
    getElementToMeasureWidth: () => number,
    onReduceData: (prevData: any) => any
  ): IResizeGroupState {
    let dataToMeasure = data;
    let measuredWidth: number | undefined = _getMeasuredWidth(data, getElementToMeasureWidth);

    while (measuredWidth < _containerWidth!) {
      const nextMeasuredData = onGrowData(dataToMeasure);

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
      resizeDirection: 'shrink',
      ..._shrinkContentsUntilTheyFit(dataToMeasure, onReduceData, getElementToMeasureWidth)
    };
  }

  /**
   * Handles an update to the container width. Should only be called when we knew the previous container width.
   * @param newWidth - The new width of the container.
   * @param fullWidthData - The initial data passed in as a prop to resizeGroup.
   * @param renderedData - The data that was rendered prior to the container size changing.
   * @param onGrowData - Set to true if the Resize group has an onGrowData function.
   */
  function _updateContainerWidth(
    newWidth: number,
    fullWidthData: any,
    renderedData: any,
    onGrowData?: (prevData: any) => any
  ): IResizeGroupState {
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

  function getNextState(
    props: IResizeGroupProps,
    currentState: IResizeGroupState,
    getElementToMeasureWidth: () => number,
    newContainerWidth?: number
  ): IResizeGroupState | undefined {
    // If there is no new container width or data to measure, there is no need for a new state update
    if (newContainerWidth === undefined && currentState.dataToMeasure === undefined) {
      return undefined;
    }

    if (newContainerWidth) {
      // If we know what the last container size was and we rendered data at that width, we can do an optimized render
      if (_containerWidth && currentState.renderedData && !currentState.dataToMeasure) {
        return {
          ...currentState,
          ..._updateContainerWidth(newContainerWidth, props.data, currentState.renderedData, props.onGrowData)
        };
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
          ..._growDataUntilItDoesNotFit(currentState.dataToMeasure, props.onGrowData, getElementToMeasureWidth, props.onReduceData)
        };
      } else {
        nextState = {
          ...nextState,
          ..._shrinkContentsUntilTheyFit(currentState.dataToMeasure, props.onReduceData, getElementToMeasureWidth)
        };
      }
    }

    return nextState;
  }

  /** Function that determines if we need to render content for measurement based on the measurement cache contents. */
  function shouldRenderDataForMeasurement(dataToMeasure: any | undefined): boolean {
    if (!dataToMeasure || _measurementCache.getCachedMeasurement(dataToMeasure) !== undefined) {
      return false;
    }

    return true;
  }

  function getInitialResizeGroupState(data: any): IResizeGroupState {
    return {
      dataToMeasure: { ...data },
      resizeDirection: 'grow',
      measureContainer: true
    };
  }

  return {
    getNextState,
    shouldRenderDataForMeasurement,
    getInitialResizeGroupState
  };
};

// Provides a context property that (if true) tells any child components that
// they are only being used for measurement purposes and will not be visible.
const MeasuredContext = provideContext(
  {
    isMeasured: PropTypes.bool
  },
  () => {
    return { isMeasured: true };
  }
);

// Styles for the hidden div used for measurement
const hiddenDivStyles: React.CSSProperties = { position: 'fixed', visibility: 'hidden' };
const hiddenParentStyles: React.CSSProperties = { position: 'relative' };

export class ResizeGroupBase extends BaseComponent<IResizeGroupProps, IResizeGroupState> {
  private _nextResizeGroupStateProvider = getNextResizeGroupStateProvider();
  // The root div which is the container inside of which we are trying to fit content.
  private _root = createRef<HTMLDivElement>();
  // A div that can be used for the initial measurement so that we can avoid mounting a second instance
  // of the component being measured for the initial render.
  private _initialHiddenDiv = createRef<HTMLDivElement>();
  // A hidden div that is used for mounting a new instance of the component for measurement in a hidden
  // div without unmounting the currently visible content.
  private _updateHiddenDiv = createRef<HTMLDivElement>();
  // Tracks if any content has been rendered to the user. This enables us to do some performance optimizations
  // for the initial render.
  private _hasRenderedContent = false;

  constructor(props: IResizeGroupProps) {
    super(props);
    this.state = this._nextResizeGroupStateProvider.getInitialResizeGroupState(this.props.data);

    this._warnDeprecations({
      styles: 'className'
    });
  }

  public render(): JSX.Element {
    const { className, onRenderData } = this.props;
    const { dataToMeasure, renderedData } = this.state;
    const divProps = getNativeProps(this.props, divProperties, ['data']);

    const dataNeedsMeasuring = this._nextResizeGroupStateProvider.shouldRenderDataForMeasurement(dataToMeasure);

    const isInitialMeasure = !this._hasRenderedContent && dataNeedsMeasuring;

    // We only ever render the final content to the user. All measurements are done in a hidden div.
    // For the initial render, we want this to be as fast as possible, so we need to make sure that we only mount one version of the
    // component for measurement and the final render. For renders that update what is on screen, we want to make sure that
    // there are no jarring effects such as the screen flashing as we apply scaling steps for meassurement. In the update case,
    // we mount a second version of the component just for measurement purposes and leave the rendered content untouched until we know the
    // next state sto show to the user.
    return (
      <div {...divProps} className={className} ref={this._root}>
        <div style={hiddenParentStyles}>
          {dataNeedsMeasuring &&
            !isInitialMeasure && (
              <div style={hiddenDivStyles} ref={this._updateHiddenDiv}>
                <MeasuredContext>{onRenderData(dataToMeasure)}</MeasuredContext>
              </div>
            )}

          <div ref={this._initialHiddenDiv} style={isInitialMeasure ? hiddenDivStyles : undefined} data-automation-id="visibleContent">
            {isInitialMeasure ? onRenderData(dataToMeasure) : renderedData && onRenderData(renderedData)}
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount(): void {
    this._afterComponentRendered();
    this._events.on(window, 'resize', this._async.debounce(this._onResize, RESIZE_DELAY, { leading: true }));
  }

  public componentWillReceiveProps(nextProps: IResizeGroupProps): void {
    this.setState({
      dataToMeasure: { ...nextProps.data },
      resizeDirection: 'grow',
      measureContainer: true // Receiving new props means the parent might rerender and the root width might change
    });
  }

  public componentDidUpdate(prevProps: IResizeGroupProps) {
    if (this.state.renderedData) {
      this._hasRenderedContent = true;
      if (this.props.dataDidRender) {
        this.props.dataDidRender(this.state.renderedData);
      }
    }
    this._afterComponentRendered();
  }

  public remeasure(): void {
    if (this._root.current) {
      this.setState({ measureContainer: true });
    }
  }

  private _afterComponentRendered(): void {
    this._async.requestAnimationFrame(() => {
      let containerWidth = undefined;
      if (this.state.measureContainer && this._root.current) {
        containerWidth = this._root.current.getBoundingClientRect().width;
      }
      const nextState = this._nextResizeGroupStateProvider.getNextState(
        this.props,
        this.state,
        () => {
          const refToMeasure = !this._hasRenderedContent ? this._initialHiddenDiv : this._updateHiddenDiv;
          return refToMeasure.current ? refToMeasure.current.scrollWidth : 0;
        },
        containerWidth
      );

      if (nextState) {
        this.setState(nextState);
      }
    });
  }

  private _onResize(): void {
    if (this._root.current) {
      this.setState({ measureContainer: true });
    }
  }
}
