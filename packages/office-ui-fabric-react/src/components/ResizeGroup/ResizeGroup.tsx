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
   * Are we resizing to accomodate having more or less available space?
   * The 'grow' direction is when the container may have more room than the last render,
   * such as when a window resize occurs. This means we will try to fit more content in the window.
   * The 'shrink' direction is when the contents don't fit in the container and we need
   * to find a transformation of the data that makes everything fit.
   */
  resizeDirection?: 'grow' | 'shrink';

  /**
   * Set to true when the content container might have new dimensions and should
   * be remeasured.
   */
  measureContainer?: boolean;
}

const getMeasurementCache = () => {
  const measurementsCache: { [key: string]: number } = {};

  return {
    getCachedMeasurement: (data: any): number | undefined => {
      if (data && data.cacheKey && measurementsCache.hasOwnProperty(data.cacheKey)) {
        return measurementsCache[data.cacheKey];
      }

      return undefined;
    },
    addMeasurementToCache: (data: any, measurement: number): void => {
      if (data.cacheKey) {
        measurementsCache[data.cacheKey] = measurement;
      }
    }
  };
};

export const getNextResizeGroupStateProvider = () => {
  const _measurementCache = getMeasurementCache();
  let _containerWidth: number | undefined;

  const _getMeasuredWidth = (measuredData: any, getElementToMeasureWidth: () => number): number => {
    let cachedWidth = _measurementCache.getCachedMeasurement(measuredData);
    if (cachedWidth !== undefined) {
      return cachedWidth;
    }

    let measuredWidth = getElementToMeasureWidth();
    _measurementCache.addMeasurementToCache(measuredData, measuredWidth);
    return measuredWidth;
  };

  const _shrinkContentsUntilTheyFit = (data: any,
    onReduceData: (prevData: any) => any,
    getElementToMeasureWidth: () => number): IResizeGroupState => {
    let dataToMeasure = data;
    let measuredWidth = _getMeasuredWidth(data, getElementToMeasureWidth);

    while (measuredWidth > _containerWidth) {
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
          dataToMeasure: nextMeasuredData
        };
      }

      dataToMeasure = nextMeasuredData;
    }

    return {
      renderedData: dataToMeasure,
      resizeDirection: undefined,
      dataToMeasure: undefined
    };
  };

  const _growDataUntilItDoesNotFit = (data: any,
    onGrowData: (prevData: any) => any,
    getElementToMeasureWidth: () => number): IResizeGroupState => {
    let dataToMeasure = data;
    let measuredWidth = _getMeasuredWidth(data, getElementToMeasureWidth);

    while (measuredWidth < _containerWidth) {
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
  };

  const _updateContainerWidth = (newWidth: number, fullWidthData: any, renderedData: any, hasOnGrowData: boolean): IResizeGroupState => {
    let nextState: IResizeGroupState;
    if (newWidth > _containerWidth) {
      if (hasOnGrowData) {
        nextState = {
          resizeDirection: 'grow',
          dataToMeasure: renderedData
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
  };

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
      if (_containerWidth && currentState.renderedData) {
        return _updateContainerWidth(newContainerWidth, props.data, currentState.renderedData, !!props.onGrowData);
      }

      // If we are just setting the container width for the first time, we can't do any optimizations
      _containerWidth = newContainerWidth;
    }

    let nextState: IResizeGroupState = {
      measureContainer: false
    };

    if (currentState.resizeDirection === 'grow') {
      nextState = { ...nextState, ..._growDataUntilItDoesNotFit(currentState.dataToMeasure, props.onGrowData, getElementToMeasureWidth) };
    } else {
      nextState = { ...nextState, ..._shrinkContentsUntilTheyFit(currentState.dataToMeasure, props.onReduceData, getElementToMeasureWidth) };
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
      resizeDirection: 'shrink',
      measureContainer: true,
    };
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

  public componentDidMount() {
    this._afterComponentRendered();
    this._events.on(window, 'resize', this._async.debounce(this._onResize, RESIZE_DELAY, { leading: true }));
  }

  public componentWillReceiveProps(nextProps: IResizeGroupProps) {
    this.setState({
      resizeDirection: 'shrink',
      dataToMeasure: { ...nextProps.data },
      renderedData: undefined,
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
    let containerWidth = undefined;
    if (this.state.measureContainer) {
      containerWidth = this._root.getBoundingClientRect().width;
    }
    let nextState = this._getNextResizeGroupState(this.props, this.state, () => this._measured.getBoundingClientRect().width, containerWidth);
    if (nextState) {
      this.setState(nextState);
    }
  }

  private _onResize() {
    if (this._root) {
      this.setState({ measureContainer: true });
    }
  }
}