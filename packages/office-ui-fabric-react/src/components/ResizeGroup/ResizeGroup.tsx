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

const getCachedMeasurementProvider = () => {
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

const getCachedContentMeasurer = () => {
  const _cachedMeasurementProvider = getCachedMeasurementProvider();
  let _containerWidth: number | undefined;

  const _getMeasuredWidth = (measuredData: any, elementToMeasure: HTMLElement | null): number => {
    let cachedWidth = _cachedMeasurementProvider.getCachedMeasurement(measuredData);
    if (cachedWidth !== undefined) {
      return cachedWidth;
    }

    let measuredWidth = elementToMeasure.getBoundingClientRect().width;
    _cachedMeasurementProvider.addMeasurementToCache(measuredData, measuredWidth);
    return measuredWidth;
  };

  const _shrinkContentsUntilTheyFit = (data: any,
    onReduceData: (prevData: any) => any,
    elementToMeasure: HTMLElement | null): IResizeGroupState => {

    let dataToMeasure = data;
    let measuredWidth = _getMeasuredWidth(data, elementToMeasure);
    while (measuredWidth > _containerWidth) {
      let nextMeasuredData = onReduceData(dataToMeasure);

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onReduceData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        return {
          renderedData: dataToMeasure
        };
      }

      let cachedWidth = _cachedMeasurementProvider.getCachedMeasurement(nextMeasuredData);

      // If the measurement isn't in the cache, we need to rerender with some data in a hidden div
      if (cachedWidth === undefined) {
        return {
          dataToMeasure: nextMeasuredData
        };
      }

      measuredWidth = cachedWidth;
      dataToMeasure = nextMeasuredData;
    }

    return {
      renderedData: dataToMeasure,
      dataToMeasure: undefined
    };
  };

  const _growDataUntilItDoesNotFit = (data: any,
    onGrowData: (prevData: any) => any,
    elementToMeasure: HTMLElement | null): IResizeGroupState => {

    let dataToMeasure = data;
    let measuredWidth = _getMeasuredWidth(data, elementToMeasure);

    while (measuredWidth < _containerWidth) {
      let nextMeasuredData = onGrowData(dataToMeasure);

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onReduceData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        return {
          renderedData: dataToMeasure
        };
      }

      let cachedWidth = _cachedMeasurementProvider.getCachedMeasurement(nextMeasuredData);

      // If the measurement isn't in the cache, we need to rerender with some data in a hidden div
      if (cachedWidth === undefined) {
        return {
          dataToMeasure: nextMeasuredData
        };
      }

      measuredWidth = cachedWidth;
      dataToMeasure = nextMeasuredData;
    }

    return {
      dataToMeasure,
      resizeDirection: 'shrink'
    };
  };

  return {
    getNextResizeGroupState: (data: any,
      onReduceData: (prevData: any) => any,
      onGrowData: (prevData: any) => any | undefined,
      elementToMeasure: HTMLElement | null,
      direction: 'grow' | 'shrink'): IResizeGroupState => {

      if (direction === 'grow') {
        return _growDataUntilItDoesNotFit(data, onGrowData, elementToMeasure);
      } else {
        return _shrinkContentsUntilTheyFit(data, onReduceData, elementToMeasure);
      }
    },
    updateContainerWidth: (newWidth: number, fullWidthData: any, renderedData: any, hasOnGrowData: boolean): IResizeGroupState => {
      let nextState: IResizeGroupState;
      if (_containerWidth && newWidth > _containerWidth) {
        if (hasOnGrowData && renderedData) {
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
          dataToMeasure: renderedData || fullWidthData
        };
      }
      _containerWidth = newWidth;
      return { ...nextState, measureContainer: false };
    }
  };
};

export class ResizeGroup extends BaseComponent<IResizeGroupProps, IResizeGroupState> {
  private _measurementProvider = getCachedContentMeasurer();
  private _root: HTMLElement;
  private _measured: HTMLElement;

  constructor(props: IResizeGroupProps) {
    super(props);
    this.state = {
      dataToMeasure: { ...this.props.data },
      resizeDirection: 'shrink',
      measureContainer: true,
      renderedData: null
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
    if (this.state.measureContainer) {
      this.setState(
        this._measurementProvider.updateContainerWidth(this._root.getBoundingClientRect().width,
          this.props.data,
          this.state.renderedData,
          !!this.props.onGrowData));
    } else if (this.state.dataToMeasure) {
      this.setState(this._measurementProvider.getNextResizeGroupState(this.state.dataToMeasure,
        this.props.onReduceData,
        this.props.onGrowData,
        this._measured,
        this.state.resizeDirection));
    }
  }

  private _onResize() {
    if (this._root) {
      this.setState({ measureContainer: true });
    }
  }
}