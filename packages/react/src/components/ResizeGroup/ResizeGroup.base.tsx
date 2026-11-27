import * as React from 'react';
import { Async, divProperties, getNativeProps } from '../../Utilities';
import { ResizeGroupDirection } from './ResizeGroup.types';
import { useConst, useMergedRefs, useAsync, useOnEvent, useWarnings } from '@fluentui/react-hooks';
import { useWindow } from '../../WindowProvider';
import type { IResizeGroupProps } from './ResizeGroup.types';

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
export const getMeasurementCache = (): {
  getCachedMeasurement: (data: any) => number | undefined;
  addMeasurementToCache: (data: any, measurement: number) => void;
} => {
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
    },
  };
};

/**
 * Returns a function that is able to compute the next state for the ResizeGroup given the current
 * state and any measurement updates.
 */
export const getNextResizeGroupStateProvider = (
  measurementCache = getMeasurementCache(),
): {
  getNextState: (
    props: IResizeGroupProps,
    currentState: IResizeGroupState,
    getElementToMeasureDimension: () => number,
    newContainerDimension?: number,
  ) => IResizeGroupState | undefined;
  shouldRenderDataForMeasurement: (dataToMeasure: any | undefined) => boolean;
  getInitialResizeGroupState: (data: any) => IResizeGroupState;
} => {
  const _measurementCache = measurementCache;
  let _containerDimension: number | undefined;

  /**
   * Gets the width/height of the data rendered in a hidden div.
   * @param measuredData - The data corresponding to the measurement we wish to take.
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data.
   * Only called when the measurement is not in the cache.
   */
  function _getMeasuredDimension(measuredData: any, getElementToMeasureDimension: () => number): number {
    const cachedDimension = _measurementCache.getCachedMeasurement(measuredData);
    if (cachedDimension !== undefined) {
      return cachedDimension;
    }

    const measuredDimension = getElementToMeasureDimension();
    _measurementCache.addMeasurementToCache(measuredData, measuredDimension);
    return measuredDimension;
  }

  /**
   * Will get the next IResizeGroupState based on the current data while trying to shrink contents
   * to fit in the container.
   * @param data - The initial data point to start measuring.
   * @param onReduceData - Function that transforms the data into something that should render with less width/height.
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data.
   * Only called when the measurement is not in the cache.
   */
  function _shrinkContentsUntilTheyFit(
    data: any,
    onReduceData: (prevData: any) => any,
    getElementToMeasureDimension: () => number,
  ): IResizeGroupState {
    let dataToMeasure = data;
    let measuredDimension: number | undefined = _getMeasuredDimension(data, getElementToMeasureDimension);

    while (measuredDimension > _containerDimension!) {
      const nextMeasuredData = onReduceData(dataToMeasure);

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onReduceData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        return {
          renderedData: dataToMeasure,
          resizeDirection: undefined,
          dataToMeasure: undefined,
        };
      }

      measuredDimension = _measurementCache.getCachedMeasurement(nextMeasuredData);

      // If the measurement isn't in the cache, we need to re-render with some data in a hidden div
      if (measuredDimension === undefined) {
        return {
          dataToMeasure: nextMeasuredData,
          resizeDirection: 'shrink',
        };
      }

      dataToMeasure = nextMeasuredData;
    }

    return {
      renderedData: dataToMeasure,
      resizeDirection: undefined,
      dataToMeasure: undefined,
    };
  }

  /**
   * This function should be called when the state changes in a manner that might allow for more content to fit
   * on the screen, such as the window width/height growing.
   * @param data - The initial data point to start measuring.
   * @param onGrowData - Function that transforms the data into something that may take up more space when rendering.
   * @param getElementToMeasureDimension - A function that returns the measurement of the rendered data.
   * Only called when the measurement is not in the cache.
   */
  function _growDataUntilItDoesNotFit(
    data: any,
    onGrowData: (prevData: any) => any,
    getElementToMeasureDimension: () => number,
    onReduceData: (prevData: any) => any,
  ): IResizeGroupState {
    let dataToMeasure = data;
    let measuredDimension: number | undefined = _getMeasuredDimension(data, getElementToMeasureDimension);

    while (measuredDimension < _containerDimension!) {
      const nextMeasuredData = onGrowData(dataToMeasure);

      // We don't want to get stuck in an infinite render loop when there are no more
      // scaling steps, so implementations of onGrowData should return undefined when
      // there are no more scaling states to apply.
      if (nextMeasuredData === undefined) {
        return {
          renderedData: dataToMeasure,
          resizeDirection: undefined,
          dataToMeasure: undefined,
        };
      }

      measuredDimension = _measurementCache.getCachedMeasurement(nextMeasuredData);
      // If the measurement isn't in the cache, we need to re-render with some data in a hidden div
      if (measuredDimension === undefined) {
        return {
          dataToMeasure: nextMeasuredData,
        };
      }

      dataToMeasure = nextMeasuredData;
    }

    // Once the loop is done, we should now shrink until the contents fit.
    return {
      resizeDirection: 'shrink',
      ..._shrinkContentsUntilTheyFit(dataToMeasure, onReduceData, getElementToMeasureDimension),
    };
  }

  /**
   * Handles an update to the container width/height.
   * Should only be called when we knew the previous container width/height.
   * @param newDimension - The new width/height of the container.
   * @param fullDimensionData - The initial data passed in as a prop to resizeGroup.
   * @param renderedData - The data that was rendered prior to the container size changing.
   * @param onGrowData - Set to true if the Resize group has an onGrowData function.
   */
  function _updateContainerDimension(
    newDimension: number,
    fullDimensionData: any,
    renderedData: any,
    onGrowData?: (prevData: any) => any,
  ): IResizeGroupState {
    let nextState: IResizeGroupState;
    if (newDimension > _containerDimension!) {
      if (onGrowData) {
        nextState = {
          resizeDirection: 'grow',
          dataToMeasure: onGrowData(renderedData),
        };
      } else {
        nextState = {
          resizeDirection: 'shrink',
          dataToMeasure: fullDimensionData,
        };
      }
    } else {
      nextState = {
        resizeDirection: 'shrink',
        dataToMeasure: renderedData,
      };
    }
    _containerDimension = newDimension;
    return { ...nextState, measureContainer: false };
  }

  function getNextState(
    props: IResizeGroupProps,
    currentState: IResizeGroupState,
    getElementToMeasureDimension: () => number,
    newContainerDimension?: number,
  ): IResizeGroupState | undefined {
    // If there is no new container width/height or data to measure, there is no need for a new state update
    if (newContainerDimension === undefined && currentState.dataToMeasure === undefined) {
      return undefined;
    }

    if (newContainerDimension) {
      // If we know the last container size and we rendered data at that width/height, we can do an optimized render
      if (_containerDimension && currentState.renderedData && !currentState.dataToMeasure) {
        return {
          ...currentState,
          ..._updateContainerDimension(newContainerDimension, props.data, currentState.renderedData, props.onGrowData),
        };
      }

      // If we are just setting the container width/height for the first time, we can't do any optimizations
      _containerDimension = newContainerDimension;
    }

    let nextState: IResizeGroupState = {
      ...currentState,
      measureContainer: false,
    };

    if (currentState.dataToMeasure) {
      if (currentState.resizeDirection === 'grow' && props.onGrowData) {
        nextState = {
          ...nextState,
          ..._growDataUntilItDoesNotFit(
            currentState.dataToMeasure,
            props.onGrowData,
            getElementToMeasureDimension,
            props.onReduceData,
          ),
        };
      } else {
        nextState = {
          ...nextState,
          ..._shrinkContentsUntilTheyFit(currentState.dataToMeasure, props.onReduceData, getElementToMeasureDimension),
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
      measureContainer: true,
    };
  }

  return {
    getNextState,
    shouldRenderDataForMeasurement,
    getInitialResizeGroupState,
  };
};

// Provides a context property that (if true) tells any child components that
// they are only being used for measurement purposes and will not be visible.
export const MeasuredContext = React.createContext({ isMeasured: false });

// Styles for the hidden div used for measurement
const hiddenDivStyles: React.CSSProperties = { position: 'fixed', visibility: 'hidden' };
const hiddenParentStyles: React.CSSProperties = { position: 'relative' };
const COMPONENT_NAME = 'ResizeGroup';

// How many ResizeGroups are working out their next state at the moment. onGrowData and onReduceData run in that
// time, and so do the callbacks that a parent such as CommandBar calls from them.
let groupsInNextState = 0;

type ResizeDataAction =
  | {
      type: 'resizeData' | keyof IResizeGroupState;
      value: IResizeGroupState[keyof IResizeGroupState] | IResizeGroupState;
    }
  | {
      type: 'fitAgain';
      value: { fullData: any; canGrow: boolean };
    };

/**
 * Use useReducer instead of userState because React is not batching the state updates
 * when state is set in callbacks of setTimeout or requestAnimationFrame.
 * See issue: https://github.com/facebook/react/issues/14259
 */
function resizeDataReducer(state: IResizeGroupState, action: ResizeDataAction): IResizeGroupState {
  switch (action.type) {
    case 'resizeData':
      return { ...action.value };
    case 'dataToMeasure':
      return { ...state, dataToMeasure: action.value, resizeDirection: 'grow', measureContainer: true };
    case 'fitAgain': {
      // With onGrowData, go on from the data that is being measured or that is rendered, and grow it first, so
      // that every step goes through onGrowData or onReduceData. Without onGrowData the data can only get
      // larger again by starting from the full data.
      const { fullData, canGrow } = action.value;
      const dataToMeasure = canGrow ? state.dataToMeasure ?? state.renderedData ?? fullData : fullData;
      return { ...state, dataToMeasure, resizeDirection: 'grow', measureContainer: true };
    }
    default:
      return { ...state, [action.type]: action.value };
  }
}

function useResizeState(
  props: IResizeGroupProps,
  nextResizeGroupStateProvider: ReturnType<typeof getNextResizeGroupStateProvider>,
  rootRef: React.RefObject<HTMLDivElement | null>,
) {
  const initialStateData = useConst(() => nextResizeGroupStateProvider.getInitialResizeGroupState(props.data));
  const [resizeData, dispatchResizeDataAction] = React.useReducer(resizeDataReducer, initialStateData);

  // Reset state when new data is provided
  React.useEffect(() => {
    dispatchResizeDataAction({
      type: 'dataToMeasure',
      value: props.data,
    });
  }, [props.data]);

  // Because it's possible that we may force more than one re-render per animation frame, we
  // want to make sure that the RAF request is using the most recent data.
  const stateRef = React.useRef<IResizeGroupState>(initialStateData);
  stateRef.current = { ...resizeData };

  // The data of the latest render, for remeasure, which runs outside of a render.
  const dataRef = React.useRef(props.data);
  dataRef.current = props.data;

  const updateResizeState = React.useCallback((nextState?: IResizeGroupState) => {
    if (nextState) {
      dispatchResizeDataAction({
        type: 'resizeData',
        value: nextState,
      });
    }
  }, []);

  const remeasureContainer: () => void = React.useCallback(() => {
    if (rootRef.current) {
      dispatchResizeDataAction({
        type: 'measureContainer',
        value: true,
      });
    }
  }, [rootRef]);

  // Fits the data again after its cached measurements have been dropped.
  const fitDataAgain: (canGrow: boolean) => void = React.useCallback((canGrow: boolean) => {
    dispatchResizeDataAction({
      type: 'fitAgain',
      value: { fullData: dataRef.current, canGrow },
    });
  }, []);

  return [stateRef, dataRef, updateResizeState, remeasureContainer, fitDataAgain] as const;
}

function useResizingBehavior(props: IResizeGroupProps, rootRef: React.RefObject<HTMLDivElement | null>) {
  // The cache is held in an object so that remeasure can replace it with an empty one.
  const measurementCache = useConst(() => ({ current: getMeasurementCache() }));
  const nextResizeGroupStateProvider = useConst(() =>
    getNextResizeGroupStateProvider({
      getCachedMeasurement: data => measurementCache.current.getCachedMeasurement(data),
      addMeasurementToCache: (data, measurement) => measurementCache.current.addMeasurementToCache(data, measurement),
    }),
  );
  // True from a remeasure call until the frame that drops the cached measurements.
  const isFitAgainPendingRef = React.useRef(false);
  // True from that drop until the pass that it starts ends.
  const isFitAgainRunningRef = React.useRef(false);
  // True when remeasure was called while that pass was running.
  const isFitAgainQueuedRef = React.useRef(false);

  // A div that can be used for the initial measurement so that we can avoid mounting a second instance
  // of the component being measured for the initial render.
  const initialHiddenDiv = React.useRef<HTMLDivElement | null>(null);
  // A hidden div that is used for mounting a new instance of the component for measurement in a hidden
  // div without unmounting the currently visible content.
  const updateHiddenDiv = React.useRef<HTMLDivElement | null>(null);

  // Tracks if any content has been rendered to the user. This enables us to do some performance optimizations
  // for the initial render.
  const hasRenderedContent = React.useRef(false);
  // Whether the latest render used the initial div to measure dataToMeasure.
  const isInitialMeasureRef = React.useRef(false);

  const async: Async = useAsync();

  const [stateRef, dataRef, updateResizeState, remeasureContainer, fitDataAgain] = useResizeState(
    props,
    nextResizeGroupStateProvider,
    rootRef,
  );

  React.useEffect(() => {
    if (stateRef.current.renderedData) {
      hasRenderedContent.current = true;
      props.dataDidRender?.(stateRef.current.renderedData);
    }
  });

  // The cached measurements that this render is based on. The data that it puts in the measuring div, if any, is
  // the data that is not cached at this moment.
  const renderedWithCache = measurementCache.current;

  React.useEffect((): void => {
    async.requestAnimationFrame(() => {
      // A remeasure call has dropped the cached measurements since this render, so the measuring div may not hold
      // the data that the next state would measure. The render that follows the drop runs its own frame.
      if (measurementCache.current !== renderedWithCache) {
        return;
      }
      let containerDimension = undefined;
      // A remeasure call asks for the size of the container. Read it while that call is pending too, because a
      // state update from an earlier frame can clear measureContainer before the call is handled.
      if ((stateRef.current.measureContainer || isFitAgainPendingRef.current) && rootRef.current) {
        const boundingRect = rootRef.current.getBoundingClientRect();
        containerDimension =
          props.direction === ResizeGroupDirection.vertical ? boundingRect.height : boundingRect.width;
      }
      const refToMeasure = isInitialMeasureRef.current ? initialHiddenDiv : updateHiddenDiv;
      const getElementToMeasureDimension = (): number => {
        if (!refToMeasure.current) {
          return 0;
        }
        const measuredBoundingRect = refToMeasure.current.getBoundingClientRect();
        return props.direction === ResizeGroupDirection.vertical
          ? measuredBoundingRect.height
          : measuredBoundingRect.width;
      };

      // After a remeasure call, drop all cached measurements and fit the data again, so that the layout uses new
      // measurements only. Something other than the data, for example a style sheet or a font, can have changed
      // the size of the content, and then none of the cached measurements can be trusted.
      if (isFitAgainPendingRef.current) {
        isFitAgainPendingRef.current = false;
        // A container without a size is not laid out, for example inside display: none. Content measures 0 there
        // too, which says nothing about its size, so the cached measurements are kept.
        if (containerDimension) {
          measurementCache.current = getMeasurementCache();
          isFitAgainRunningRef.current = true;
          fitDataAgain(!!props.onGrowData);
          return;
        }
      }

      let nextState: IResizeGroupState | undefined;
      groupsInNextState++;
      try {
        nextState = nextResizeGroupStateProvider.getNextState(
          props,
          stateRef.current,
          getElementToMeasureDimension,
          containerDimension,
        );
      } finally {
        groupsInNextState--;
      }
      // A pass ends when no data is left to measure.
      const hasFitAgainEnded = isFitAgainRunningRef.current && !(nextState ?? stateRef.current).dataToMeasure;

      updateResizeState(nextState);

      if (hasFitAgainEnded) {
        isFitAgainRunningRef.current = false;
        // A remeasure call came while that pass was running, so fit the data again now.
        if (isFitAgainQueuedRef.current) {
          isFitAgainQueuedRef.current = false;
          isFitAgainPendingRef.current = true;
          remeasureContainer();
        }
      }
    }, rootRef.current);
  });

  const win = useWindow();
  // A window resize usually changes only the available space, so it keeps using the cached measurements.
  useOnEvent(win, 'resize', async.debounce(remeasureContainer, RESIZE_DELAY, { leading: true }));

  const remeasure: () => void = React.useCallback(() => {
    if (!rootRef.current) {
      return;
    }
    // For data without a cacheKey, remeasure measures the container only, as it did before, and nothing is cached
    // for such data. So does a call from onGrowData, onReduceData or a callback that a parent calls from them, of
    // this group or of another one. The fit that such a call starts would run those callbacks again, and they
    // would call remeasure again, without end.
    if (dataRef.current?.cacheKey && groupsInNextState === 0) {
      if (isFitAgainRunningRef.current) {
        // Dropping the cache now would start that pass over, and calls in every frame, for example from a
        // ResizeObserver, would keep it from ever ending. So the pass ends first, and then the data is fit again.
        isFitAgainQueuedRef.current = true;
      } else {
        isFitAgainPendingRef.current = true;
      }
    }
    remeasureContainer();
  }, [rootRef, dataRef, remeasureContainer]);

  const dataNeedsMeasuring = nextResizeGroupStateProvider.shouldRenderDataForMeasurement(
    stateRef.current.dataToMeasure,
  );

  const isInitialMeasure = !hasRenderedContent.current && dataNeedsMeasuring;
  isInitialMeasureRef.current = isInitialMeasure;

  return [
    stateRef.current.dataToMeasure,
    stateRef.current.renderedData,
    remeasure,
    initialHiddenDiv,
    updateHiddenDiv,
    dataNeedsMeasuring,
    isInitialMeasure,
  ] as const;
}

function useDebugWarnings(props: IResizeGroupProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      deprecations: { styles: 'className' },
    });
  }
}

const measuredContextValue = { isMeasured: true };

export const ResizeGroupBase: React.FunctionComponent<IResizeGroupProps> = React.forwardRef<
  HTMLDivElement,
  IResizeGroupProps
>((props, forwardedRef) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  // The root div which is the container inside of which we are trying to fit content.
  const mergedRootRef = useMergedRefs(rootRef, forwardedRef);

  const [
    dataToMeasure,
    renderedData,
    remeasure,
    initialHiddenDiv,
    updateHiddenDiv,
    dataNeedsMeasuring,
    isInitialMeasure,
  ] = useResizingBehavior(props, rootRef);

  React.useImperativeHandle(props.componentRef, () => ({ remeasure }), [remeasure]);

  useDebugWarnings(props);

  const { className, onRenderData } = props;
  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, ['data']);

  // We only ever render the final content to the user. All measurements are done in a hidden div.
  // For the initial render, we want this to be as fast as possible, so we need to make sure that we only mount one
  // version of the component for measurement and the final render. For renders that update what is on screen, we
  // want to make sure that there are no jarring effects such as the screen flashing as we apply scaling steps for
  // measurement. In the update case, we mount a second version of the component just for measurement purposes and
  // leave the rendered content untouched until we know the next state to show to the user.
  return (
    <div {...divProps} className={className} ref={mergedRootRef}>
      <div style={hiddenParentStyles}>
        {dataNeedsMeasuring && !isInitialMeasure && (
          <div style={hiddenDivStyles} ref={updateHiddenDiv}>
            <MeasuredContext.Provider value={measuredContextValue}>
              {onRenderData(dataToMeasure)}
            </MeasuredContext.Provider>
          </div>
        )}

        <div
          ref={initialHiddenDiv}
          style={isInitialMeasure ? hiddenDivStyles : undefined}
          data-automation-id="visibleContent"
        >
          {isInitialMeasure ? onRenderData(dataToMeasure) : renderedData && onRenderData(renderedData)}
        </div>
      </div>
    </div>
  );
});
ResizeGroupBase.displayName = 'ResizeGroupBase';
