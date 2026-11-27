import * as React from 'react';
import { ResizeGroup } from './ResizeGroup';
import { getNextResizeGroupStateProvider, getMeasurementCache } from './ResizeGroup.base';
import { act, render } from '@testing-library/react';
import { isConformant } from '../../common/isConformant';
import { getBySelector } from '../../common/testUtilities';
import type { IResizeGroupState } from './ResizeGroup.base';
import type { IResizeGroup, IResizeGroupProps } from './ResizeGroup.types';

interface ITestScalingData {
  scalingIndex: number;
  cacheKey?: string;
}

function onReduceScalingData(data: ITestScalingData): ITestScalingData {
  return {
    scalingIndex: data.scalingIndex - 1,
  };
}

function onGrowScalingData(data: ITestScalingData): ITestScalingData {
  return {
    scalingIndex: data.scalingIndex + 1,
  };
}

function getRequiredResizeGroupProps() {
  return {
    data: {},
    onReduceData: jest.fn(),
    onRenderData: jest.fn(),
  };
}

describe('ResizeGroup', () => {
  it('renders the ResizeGroup correctly', () => {
    const initialData = { content: 5 };
    const renderedDataId = 'onRenderDataId';
    const onRenderData = (data: any) => <div id={renderedDataId}> Rendered data: {data.content}</div>;
    expect(
      render(
        <ResizeGroup
          data={initialData}
          onReduceData={onReduceScalingData}
          onRenderData={onRenderData}
          className={'TestClassName'}
        />,
      ).container.firstChild,
    ).toMatchSnapshot();
  });

  isConformant({
    Component: ResizeGroup,
    displayName: 'ResizeGroup',
    requiredProps: {
      data: { content: 5 },
      onRenderData: () => <div />,
      onReduceData: onReduceScalingData,
    },
  });

  it('renders the result of onRenderData', () => {
    const initialData = { content: 5 };
    const renderedDataId = 'onRenderDataId';
    const onRenderData = (data: any) => <div id={renderedDataId}> Rendered data: {data.content}</div>;

    const { container } = render(
      <ResizeGroup data={initialData} onReduceData={onReduceScalingData} onRenderData={onRenderData} />,
    );

    expect(getBySelector(container, '#' + renderedDataId)).toBeTruthy();
  });

  describe('getNextResizeGroupStateProvider', () => {
    it('does not provide a new state when there is no container width provided or data to measure', () => {
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = {};
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub);

      expect(result).toEqual(undefined);
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('sets the renderedData when the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    });

    it('calls onReduceData and sets the next measuredData when contents do not fit', () => {
      const dataToMeasure = { index: 5 };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      resizeGroupProps.onReduceData.mockReturnValue({ index: 4 });
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 10);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 4 },
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    });

    it('does not call getMeasuredElementBounds when the data has already been cached', () => {
      const dataToMeasure = { index: 5, cacheKey: 'foo' };

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataToMeasure, 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('calls onReduceData multiple times when everything is in the cache', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }, { cacheKey: '3' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 40);
      measurementCache.addMeasurementToCache(dataArray[2], 5);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      let callCount = 0;
      resizeGroupProps.onReduceData = jest.fn(() => {
        callCount++;
        return callCount === 1 ? dataArray[1] : dataArray[2];
      });

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        renderedData: dataArray[2],
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('sets dataToMeasure when the current data is cached but the onReduceData result is not cached', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.mockReturnValueOnce(dataArray[1]);

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: dataArray[1],
        measureContainer: false,
        resizeDirection: 'shrink',
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('renders the last measured data if onReduceData returns undefined', () => {
      const dataToMeasure = { index: 5 };
      const resizeGroupProps = getRequiredResizeGroupProps();

      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'shrink' };
      resizeGroupProps.onReduceData.mockReturnValue(undefined);

      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;

      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: undefined,
        renderedData: dataToMeasure,
        measureContainer: false,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    });

    it('renders the last measured data in the cache if onReduceData returns undefined', () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '4' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const resizeGroupProps = getRequiredResizeGroupProps();
      let callCount = 0;
      resizeGroupProps.onReduceData = jest.fn(() => {
        callCount++;
        return callCount === 1 ? dataArray[1] : undefined;
      });

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'shrink' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 10);

      expect(result).toEqual({
        dataToMeasure: undefined,
        renderedData: dataArray[1],
        measureContainer: false,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('does not crash when the container size is set and there is no dataToMeasure', () => {
      const resizeGroupProps = getRequiredResizeGroupProps();
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, {}, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('makes sure the contents still fit when the container width decreases', () => {
      const initialWidth = 50;
      const reducedWidth = 40;
      const renderedData = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps, {}, jest.fn(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData,
      };

      const result = getNextResizeGroupState(resizeGroupProps, currentState, getMeasuredElementWidthStub, reducedWidth);

      // Important to note that we do not start scaling from the initial data,
      // we continue from the last rendered data.
      expect(result).toEqual({
        renderedData,
        dataToMeasure: renderedData,
        measureContainer: false,
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('starts from the beginning when the container width increases and there is no onGrowData', () => {
      const initialWidth = 50;
      const increasedWidth = 60;
      const renderedData = { foo: 'bar' };
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), data: { foo: 'initialData' } };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps, {}, jest.fn(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData,
      };

      const result = getNextResizeGroupState(
        resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        increasedWidth,
      );

      expect(result).toEqual({
        renderedData,
        dataToMeasure: resizeGroupProps.data,
        resizeDirection: 'shrink',
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('renders contents when the resizeDirection is grow, there is no onGrowData, and the contents fit', () => {
      const dataToMeasure = { foo: 'bar' };
      const resizeGroupProps = getRequiredResizeGroupProps();
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    });

    // eslint-disable-next-line @fluentui/max-len
    it('sets resize direction to shrink when resizeDirection is grow, contents do not fit, and there is no onGrowData', () => {
      const dataToMeasure = { index: 8 };
      const resizeGroupProps = getRequiredResizeGroupProps();
      resizeGroupProps.onReduceData.mockReturnValue({ index: 7 });
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(100);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 72);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 7 },
        resizeDirection: 'shrink',
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
      expect(resizeGroupProps.onReduceData).toHaveBeenCalledTimes(1);
    });

    it('measures the next state when the resizeDirection is grow and the dataToMeasure fits', () => {
      const dataToMeasure = { index: 1 };
      const onGrowData = jest.fn();
      onGrowData.mockReturnValue({ index: 2 });
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 50);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: { index: 2 },
        resizeDirection: 'grow',
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
      expect(onGrowData).toHaveBeenCalledTimes(1);
    });

    it('renders the last measured contents when onGrowData returns undefined', () => {
      const dataToMeasure = { index: 1 };
      const onGrowData = jest.fn();
      onGrowData.mockReturnValue(undefined);
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();
      getMeasuredElementWidthStub.mockReturnValue(25);

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, getMeasuredElementWidthStub, 40);

      expect(result).toEqual({
        measureContainer: false,
        dataToMeasure: undefined,
        renderedData: dataToMeasure,
        resizeDirection: undefined,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
      expect(onGrowData).toHaveBeenCalledTimes(1);
      expect(resizeGroupProps.onReduceData).toHaveBeenCalledTimes(0);
    });

    it('calls onGrowData when the container width increases and onGrowData is provided', () => {
      const initialWidth = 50;
      const increasedWidth = 60;
      const renderedData = { index: 3 };
      const onGrowData = jest.fn();
      onGrowData.mockReturnValue({ index: 4 });
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), data: { foo: 'initialData' }, onGrowData };
      const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
      const getMeasuredElementWidthStub = jest.fn();

      // Set the initial window width
      getNextResizeGroupState(resizeGroupProps, {}, jest.fn(), initialWidth);

      // Pass in a state that reflects some rendered data
      const currentState = {
        renderedData,
      };

      const result = getNextResizeGroupState(
        resizeGroupProps,
        currentState,
        getMeasuredElementWidthStub,
        increasedWidth,
      );

      expect(result).toEqual({
        renderedData,
        dataToMeasure: { index: 4 },
        resizeDirection: 'grow',
        measureContainer: false,
      });
      expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(0);
      expect(onGrowData).toHaveBeenCalledTimes(1);
    });

    it('does not call getMeasuredElementBounds when data has already been cached in the grow resizeDirection', () => {
      const dataToMeasure = { index: 5, cacheKey: 'foo' };

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataToMeasure, 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = jest.fn();
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };
      const resizeGroupState: IResizeGroupState = { dataToMeasure, resizeDirection: 'grow' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        renderedData: dataToMeasure,
        measureContainer: false,
        dataToMeasure: undefined,
        resizeDirection: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it('calls onGrowData multiple times when everything is in the cache in the grow resizeDirection', () => {
      const dataArray: ITestScalingData[] = [
        { scalingIndex: 0, cacheKey: '0' },
        { scalingIndex: 1, cacheKey: '1' },
        { scalingIndex: 2, cacheKey: '2' },
        { scalingIndex: 3, cacheKey: '3' },
      ];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 50);
      measurementCache.addMeasurementToCache(dataArray[1], 70);
      measurementCache.addMeasurementToCache(dataArray[2], 80);
      measurementCache.addMeasurementToCache(dataArray[3], 150);
      const stateProvider = getNextResizeGroupStateProvider(measurementCache);

      const resizeGroupProps = {
        ...getRequiredResizeGroupProps(),
        onGrowData: (data: ITestScalingData) => dataArray[data.scalingIndex + 1],
        onReduceData: (data: ITestScalingData) => dataArray[data.scalingIndex - 1],
      };

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'grow' };
      const measuredElementWidthStub = jest.fn();

      const result = stateProvider.getNextState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        measureContainer: false,
        renderedData: dataArray[2],
        dataToMeasure: undefined,
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });

    it(`sets dataToMeasure when the current data is in the cache but the onGrowData result is not in the cache
      in the grow resizeDirection`, () => {
      const dataArray = [{ cacheKey: '5' }, { cacheKey: '6' }];

      const measurementCache = getMeasurementCache();
      measurementCache.addMeasurementToCache(dataArray[0], 40);
      const getNextResizeGroupState = getNextResizeGroupStateProvider(measurementCache).getNextState;

      const onGrowData = jest.fn();
      onGrowData.mockReturnValueOnce(dataArray[1]);
      const resizeGroupProps = { ...getRequiredResizeGroupProps(), onGrowData };

      const resizeGroupState: IResizeGroupState = { dataToMeasure: dataArray[0], resizeDirection: 'grow' };
      const measuredElementWidthStub = jest.fn();

      const result = getNextResizeGroupState(resizeGroupProps, resizeGroupState, measuredElementWidthStub, 100);

      expect(result).toEqual({
        dataToMeasure: dataArray[1],
        measureContainer: false,
        resizeDirection: 'grow',
      });
      expect(measuredElementWidthStub).toHaveBeenCalledTimes(0);
    });
  });

  it('does not clear out the rendered contents when setting a new dataToMeasure', () => {
    const initialWidth = 50;
    const renderedData = { index: 4 };
    const resizeGroupProps = getRequiredResizeGroupProps();
    const getNextResizeGroupState = getNextResizeGroupStateProvider().getNextState;
    const getMeasuredElementWidthStub = jest.fn();
    getMeasuredElementWidthStub.mockReturnValue(100);

    // Set the initial window width
    getNextResizeGroupState(resizeGroupProps, {}, jest.fn(), initialWidth);

    // Pass in a state that reflects some rendered data
    const currentState: IResizeGroupState = {
      renderedData,
      dataToMeasure: { index: 8 },
      resizeDirection: 'grow',
    };

    resizeGroupProps.onReduceData.mockReturnValue({ index: 7 });

    const result = getNextResizeGroupState(resizeGroupProps, currentState, getMeasuredElementWidthStub, initialWidth);

    // Important to note that we do not start scaling from the initial data,
    // we continue from the last rendered data.
    expect(result).toEqual({
      renderedData,
      dataToMeasure: { index: 7 },
      measureContainer: false,
      resizeDirection: 'shrink',
    });
    expect(getMeasuredElementWidthStub).toHaveBeenCalledTimes(1);
    expect(resizeGroupProps.onReduceData).toHaveBeenCalledTimes(1);
  });

  it('does not render to the hidden div when there is no dataToMeasure', () => {
    const resizeGroupStateProvider = getNextResizeGroupStateProvider();

    const result = resizeGroupStateProvider.shouldRenderDataForMeasurement(undefined);

    expect(result).toEqual(false);
  });

  it('does render to the hidden div when there is dataToMeasure', () => {
    const resizeGroupStateProvider = getNextResizeGroupStateProvider();

    const result = resizeGroupStateProvider.shouldRenderDataForMeasurement({ index: 18 });

    expect(result).toEqual(true);
  });

  it('does not render to the hidden div when there is dataToMeasure that is in the cache', () => {
    const data = { index: 8, cacheKey: 'myCoolCacheKey' };
    const measurementCache = getMeasurementCache();
    measurementCache.addMeasurementToCache(data, 12);
    const resizeGroupStateProvider = getNextResizeGroupStateProvider(measurementCache);

    const result = resizeGroupStateProvider.shouldRenderDataForMeasurement(data);

    expect(result).toEqual(false);
  });

  it('it tries to measure smaller data when contents do not fit on initial measure and onGrowData is provided', () => {
    const props = {
      data: { scalingIndex: 8 },
      onReduceData: onReduceScalingData,
      onGrowData: onGrowScalingData,
      onRenderData: jest.fn(),
    };

    const stateProvider = getNextResizeGroupStateProvider();

    const initialState = stateProvider.getInitialResizeGroupState(props.data);

    const getElementToMeasureWidth = () => 100;
    const containerWidth = 75;

    const nextState = stateProvider.getNextState(props, initialState, getElementToMeasureWidth, containerWidth);

    expect(nextState!.dataToMeasure.scalingIndex).toEqual(7);
  });
});

describe('ResizeGroup remeasure', () => {
  interface IItemsData {
    count: number;
    cacheKey?: string;
  }

  const fullData: IItemsData = { count: 5, cacheKey: 'items5' };
  const onReduceItems = (data: IItemsData): IItemsData | undefined =>
    data.count > 1 ? { count: data.count - 1, cacheKey: data.cacheKey && `items${data.count - 1}` } : undefined;
  const onGrowItems = (data: IItemsData): IItemsData | undefined =>
    data.count < 5 ? { count: data.count + 1, cacheKey: `items${data.count + 1}` } : undefined;
  const onRenderItems = (data: IItemsData) => <div data-item-count={data.count} />;
  const growCases: Array<[string, IResizeGroupProps['onGrowData']]> = [
    ['without onGrowData', undefined],
    ['with onGrowData', onGrowItems],
  ];

  // jsdom has no layout, so each test sets the width of one item and of the container.
  let itemWidth: number;
  let containerWidth: number;
  // How many times the data was measured.
  let measurements: number;
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  beforeEach(() => {
    jest.useFakeTimers();
    itemWidth = 100;
    containerWidth = 500;
    measurements = 0;
    Element.prototype.getBoundingClientRect = function (this: HTMLElement): DOMRect {
      let width = 0;
      if (this.classList.contains('resizeGroupRoot')) {
        width = containerWidth;
      } else if (this.style.visibility === 'hidden') {
        // The div that the ResizeGroup renders data into to measure it. The content can say how wide it is.
        // Without that, every item has the same width.
        const content = this.querySelector('[data-item-count]')!;
        const ownWidth = content.getAttribute('data-width');
        width = ownWidth === null ? Number(content.getAttribute('data-item-count')) * itemWidth : Number(ownWidth);
        measurements++;
      }
      return { width, height: 0, top: 0, right: width, bottom: 0, left: 0, x: 0, y: 0 } as DOMRect;
    };
  });

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    jest.useRealTimers();
  });

  // The number of items in the div that the ResizeGroup measures data in, or null when it measures nothing.
  const getMeasuredCount = () => {
    const item = document.querySelector('[style*="visibility: hidden"] [data-item-count]');
    return item && Number(item.getAttribute('data-item-count'));
  };

  // A measurement pass ends in a render that schedules the next pass, so run the timers until none are left.
  const runAllTimers = () => {
    for (let pass = 0; pass < 20 && jest.getTimerCount() > 0; pass++) {
      act(() => {
        jest.runAllTimers();
      });
    }
    expect(jest.getTimerCount()).toBe(0);
    // No copy is left in a measuring div, and the content is not hidden.
    expect(getMeasuredCount()).toBeNull();
  };

  const renderResizeGroup = (props: Partial<IResizeGroupProps> = {}, settle: boolean = true) => {
    const componentRef = React.createRef<IResizeGroup>();
    const group = (data: IItemsData = fullData) => (
      <ResizeGroup
        className="resizeGroupRoot"
        componentRef={componentRef}
        data={data}
        onReduceData={onReduceItems}
        onRenderData={onRenderItems}
        {...props}
      />
    );
    const { container, rerender } = render(group());
    if (settle) {
      runAllTimers();
    }

    const getRenderedCount = () =>
      Number(
        getBySelector(container, '[data-automation-id="visibleContent"] [data-item-count]')!.getAttribute(
          'data-item-count',
        ),
      );
    const remeasure = () => {
      act(() => {
        componentRef.current!.remeasure();
      });
      runAllTimers();
    };

    return { componentRef, getRenderedCount, remeasure, rerenderWithData: (data: IItemsData) => rerender(group(data)) };
  };

  // Leaves the group in the middle of a measurement: three items are rendered, and two items are in the measuring
  // div, because the window has become narrower than it has been before.
  const renderWithMeasurementUnderWay = (props: Partial<IResizeGroupProps> = {}) => {
    containerWidth = 300;
    const result = renderResizeGroup(props);
    expect(result.getRenderedCount()).toBe(3);

    containerWidth = 200;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    // The resize handler is debounced, so run frames until the pass measures the two items.
    for (let frame = 0; frame < 5 && getMeasuredCount() === null; frame++) {
      act(() => {
        jest.runOnlyPendingTimers();
      });
    }
    expect(getMeasuredCount()).toBe(2);
    return result;
  };

  it.each(growCases)(
    'fits the data again when remeasure is called after the content has become larger (%s)',
    (_name, onGrowData) => {
      const { getRenderedCount, remeasure } = renderResizeGroup({ onGrowData });
      expect(getRenderedCount()).toBe(5);

      // Something other than the data makes every item wider, for example a style sheet.
      itemWidth = 150;
      remeasure();

      expect(getRenderedCount()).toBe(3);
    },
  );

  it.each(growCases)(
    'fits the data again when remeasure is called after the content has become smaller (%s)',
    (_name, onGrowData) => {
      containerWidth = 300;
      const { getRenderedCount, remeasure } = renderResizeGroup({ onGrowData });
      expect(getRenderedCount()).toBe(3);

      itemWidth = 50;
      remeasure();

      expect(getRenderedCount()).toBe(5);
    },
  );

  it('fits the data when remeasure is called after a first layout that had no size', () => {
    // The same as a ResizeGroup inside an element with display: none.
    itemWidth = 0;
    containerWidth = 0;
    const { getRenderedCount, remeasure } = renderResizeGroup();
    expect(getRenderedCount()).toBe(5);

    itemWidth = 100;
    containerWidth = 300;
    remeasure();

    expect(getRenderedCount()).toBe(3);
  });

  it('keeps the cached measurements when remeasure is called while the group has no size', () => {
    containerWidth = 300;
    const { getRenderedCount, remeasure } = renderResizeGroup();
    expect(getRenderedCount()).toBe(3);

    // The same as an ancestor that got display: none after the first layout. Nothing is measured.
    itemWidth = 0;
    containerWidth = 0;
    measurements = 0;
    remeasure();
    expect(getRenderedCount()).toBe(3);
    expect(measurements).toBe(0);

    // Shown again in a wider window. The cached measurements are still the real ones, so the resize needs none.
    itemWidth = 100;
    containerWidth = 400;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    runAllTimers();
    expect(getRenderedCount()).toBe(4);
    expect(measurements).toBe(0);
  });

  it('measures the data again when remeasure is called after only the container has changed', () => {
    containerWidth = 300;
    const { getRenderedCount, remeasure } = renderResizeGroup();
    expect(getRenderedCount()).toBe(3);
    expect(measurements).toBe(3);

    // The cached measurements are dropped, so the new fit measures the five items and then the four items.
    measurements = 0;
    containerWidth = 400;
    remeasure();

    expect(getRenderedCount()).toBe(4);
    expect(measurements).toBe(2);
  });

  it('fits the data when remeasure is called in the frame that first shows the content', () => {
    const { componentRef, getRenderedCount } = renderResizeGroup({}, false);

    act(() => {
      // The first measurement finds that all items fit. The items get wider before that result is rendered,
      // and remeasure lands in the same render.
      jest.runOnlyPendingTimers();
      itemWidth = 150;
      componentRef.current!.remeasure();
    });
    runAllTimers();

    expect(getRenderedCount()).toBe(3);
  });

  it('fits the data again when remeasure is called together with a new data object', () => {
    const { componentRef, getRenderedCount, rerenderWithData } = renderResizeGroup();
    expect(getRenderedCount()).toBe(5);

    // A parent such as CommandBar passes a new data object with the same cacheKey on every render.
    itemWidth = 150;
    act(() => {
      componentRef.current!.remeasure();
      rerenderWithData({ ...fullData });
    });
    runAllTimers();

    expect(getRenderedCount()).toBe(3);
  });

  it('measures only what is rendered when the data has no cacheKey', () => {
    containerWidth = 300;
    const { getRenderedCount, remeasure } = renderResizeGroup({ data: { count: 5 } });
    expect(getRenderedCount()).toBe(3);

    // Nothing is cached for this data, so remeasure shrinks from what is rendered, as it did before.
    measurements = 0;
    itemWidth = 150;
    remeasure();

    expect(getRenderedCount()).toBe(2);
    expect(measurements).toBe(2);
  });

  it('does not measure cached data again when the window is resized', () => {
    containerWidth = 300;
    const { getRenderedCount } = renderResizeGroup();
    expect(getRenderedCount()).toBe(3);

    measurements = 0;
    containerWidth = 400;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    runAllTimers();

    expect(getRenderedCount()).toBe(4);
    expect(measurements).toBe(0);
  });

  it('goes on from the rendered data when remeasure is called after only the container has changed', () => {
    containerWidth = 300;
    const onGrowData = jest.fn(onGrowItems);
    const onReduceData = jest.fn(onReduceItems);
    const { getRenderedCount, remeasure } = renderResizeGroup({ onGrowData, onReduceData });
    expect(getRenderedCount()).toBe(3);

    onGrowData.mockClear();
    onReduceData.mockClear();
    containerWidth = 400;
    remeasure();

    expect(getRenderedCount()).toBe(4);
    // One onGrowData step from the three rendered items, and no new pass from the full data.
    expect(onGrowData.mock.calls.map(([data]) => data.count)).toEqual([3]);
    expect(onReduceData).not.toHaveBeenCalled();
  });

  it('goes through onGrowData from the rendered data when the content has become smaller', () => {
    containerWidth = 300;
    const onGrowData = jest.fn(onGrowItems);
    const onReduceData = jest.fn(onReduceItems);
    const { getRenderedCount, remeasure } = renderResizeGroup({ onGrowData, onReduceData });
    expect(getRenderedCount()).toBe(3);

    onGrowData.mockClear();
    onReduceData.mockClear();
    itemWidth = 50;
    remeasure();

    expect(getRenderedCount()).toBe(5);
    // Every item that comes back is one onGrowData step, so that a caller such as CommandBar can update it.
    // The call with five items returns undefined.
    expect(onGrowData.mock.calls.map(([data]) => data.count)).toEqual([3, 4, 5]);
    expect(onReduceData).not.toHaveBeenCalled();
  });

  it('shows the content when remeasure is called before the frame that ends the first measurement', () => {
    const { componentRef, getRenderedCount } = renderResizeGroup({}, false);

    act(() => {
      // The call lands first. The frame that is already pending then ends the first measurement from the state
      // before the call, in the same batch.
      componentRef.current!.remeasure();
      jest.runOnlyPendingTimers();
    });
    // This also checks that the content is not left hidden.
    runAllTimers();

    expect(getRenderedCount()).toBe(5);
  });

  it('fits the data again when remeasure lands before a frame that an earlier render asked for', () => {
    const { componentRef, getRenderedCount, rerenderWithData } = renderResizeGroup();
    expect(getRenderedCount()).toBe(5);

    // A parent renders the group again with the same data. The frame that this render asks for has not run yet,
    // and its state does not ask for the size of the container.
    rerenderWithData(fullData);
    itemWidth = 150;
    act(() => {
      componentRef.current!.remeasure();
      jest.runOnlyPendingTimers();
    });
    runAllTimers();

    expect(getRenderedCount()).toBe(3);
  });

  it('measures in the right div when remeasure lands in the frame that ends the first measurement', () => {
    const { componentRef, getRenderedCount, rerenderWithData } = renderResizeGroup({}, false);

    // In the frame that ends the first measurement, which finds that all items fit, an application calls
    // remeasure after the items got wider. A parent has rendered the group again before that frame, so one more
    // frame of the group runs after the call. The result of the first measurement and the new fit land in the
    // same render, which measures the full data in the div of the first measurement.
    window.requestAnimationFrame(() => {
      itemWidth = 150;
      componentRef.current!.remeasure();
    });
    rerenderWithData(fullData);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    runAllTimers();

    expect(getRenderedCount()).toBe(3);
  });

  it('fits the data again from the full data when remeasure is called while a measurement is under way', () => {
    const { componentRef, getRenderedCount } = renderWithMeasurementUnderWay();

    measurements = 0;
    act(() => {
      componentRef.current!.remeasure();
    });
    runAllTimers();

    expect(getRenderedCount()).toBe(2);
    // Without onGrowData the new fit starts from the full data: five, four, three and two items.
    expect(measurements).toBe(4);
  });

  it('fits the data again from a measurement that is under way when the content has become smaller', () => {
    const onGrowData = jest.fn(onGrowItems);
    const onReduceData = jest.fn(onReduceItems);
    const { componentRef, getRenderedCount } = renderWithMeasurementUnderWay({ onGrowData, onReduceData });

    onGrowData.mockClear();
    onReduceData.mockClear();
    itemWidth = 50;
    act(() => {
      componentRef.current!.remeasure();
    });
    runAllTimers();

    expect(getRenderedCount()).toBe(4);
    // The new fit starts from the two items that were being measured.
    expect(onGrowData.mock.calls.map(([data]) => data.count)).toEqual([2, 3]);
    expect(onReduceData).not.toHaveBeenCalled();
  });

  // The items get wider, and remeasure fits the data again from the three items that are rendered. That fit
  // stops at two items, so it never measures the full data, and nothing is cached for it.
  const renderAfterFitThatStopsBeforeFullData = (props: Partial<IResizeGroupProps> = {}) => {
    containerWidth = 300;
    const result = renderResizeGroup({ onGrowData: onGrowItems, ...props });
    expect(result.getRenderedCount()).toBe(3);

    itemWidth = 150;
    result.remeasure();
    expect(result.getRenderedCount()).toBe(2);
    return result;
  };

  it('fits the data again when the content is back at an earlier size after another pass measured it', () => {
    const { getRenderedCount, remeasure, rerenderWithData } = renderAfterFitThatStopsBeforeFullData();

    // The items get narrower, and a new data object with the same cacheKey is measured at that size.
    itemWidth = 50;
    rerenderWithData({ ...fullData });
    runAllTimers();
    expect(getRenderedCount()).toBe(5);

    // The items are as wide as at the latest remeasure call again.
    itemWidth = 150;
    remeasure();
    expect(getRenderedCount()).toBe(2);
  });

  it('fits the data again when the group is shown after a pass that measured the data while it had no size', () => {
    const { getRenderedCount, remeasure, rerenderWithData } = renderAfterFitThatStopsBeforeFullData();

    // The same as an ancestor with display: none while a new data object with the same cacheKey is measured.
    itemWidth = 0;
    containerWidth = 0;
    rerenderWithData({ ...fullData });
    runAllTimers();

    // Shown again, with the items as wide as at the latest remeasure call.
    itemWidth = 150;
    containerWidth = 300;
    remeasure();
    expect(getRenderedCount()).toBe(2);
  });

  it('fits the data again when a new data object was measured with no size while remeasure fit the data again', () => {
    containerWidth = 300;
    const { componentRef, getRenderedCount, remeasure, rerenderWithData } = renderResizeGroup({
      onGrowData: onGrowItems,
    });
    expect(getRenderedCount()).toBe(3);

    // The items get wider, and remeasure starts a new fit, which measures the three items first.
    itemWidth = 150;
    act(() => {
      componentRef.current!.remeasure();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(getMeasuredCount()).toBe(3);

    // Before that fit ends, the group loses its size and gets a new data object with the same cacheKey.
    itemWidth = 0;
    containerWidth = 0;
    rerenderWithData({ ...fullData });
    runAllTimers();

    itemWidth = 150;
    containerWidth = 300;
    remeasure();
    expect(getRenderedCount()).toBe(2);
  });

  it('fits the data again when a wider window lets a pass grow to the full data after remeasure', () => {
    containerWidth = 300;
    const { getRenderedCount, remeasure } = renderResizeGroup({ onGrowData: onGrowItems });
    expect(getRenderedCount()).toBe(3);

    // The items get a little narrower. The new fit grows from the three items, finds that four do not fit and
    // stops there, so nothing is cached for the full data.
    itemWidth = 90;
    remeasure();
    expect(getRenderedCount()).toBe(3);

    // The window gets wider while the items are narrower still. The pass that follows grows to the full data
    // and measures it.
    itemWidth = 50;
    containerWidth = 500;
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
    runAllTimers();
    expect(getRenderedCount()).toBe(5);

    // Back to the size of the latest remeasure call, in the first container.
    itemWidth = 90;
    containerWidth = 300;
    remeasure();
    expect(getRenderedCount()).toBe(3);
  });

  it('fits the data again when the group is shown after the fit of remeasure measured the data with no size', () => {
    containerWidth = 300;
    const { componentRef, getRenderedCount, remeasure } = renderResizeGroup({ onGrowData: onGrowItems });
    expect(getRenderedCount()).toBe(3);

    // The items get wider, and remeasure starts a new fit, which measures the three items first.
    itemWidth = 150;
    act(() => {
      componentRef.current!.remeasure();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(getMeasuredCount()).toBe(3);

    // Before that fit ends, the group loses its size. The fit goes on and measures each step as 0.
    itemWidth = 0;
    containerWidth = 0;
    runAllTimers();

    itemWidth = 150;
    containerWidth = 300;
    remeasure();
    expect(getRenderedCount()).toBe(2);
  });

  it('fits the data again when the items get narrower before the fit of remeasure measures them', () => {
    containerWidth = 300;
    const { componentRef, getRenderedCount, remeasure } = renderResizeGroup({ onGrowData: onGrowItems });
    expect(getRenderedCount()).toBe(3);

    // The items get wider, and remeasure starts a new fit, which measures the three items first.
    itemWidth = 150;
    act(() => {
      componentRef.current!.remeasure();
    });
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(getMeasuredCount()).toBe(3);

    // Before that fit measures them, the items get narrower, and nothing calls remeasure for it. The fit grows to
    // the full data at that size.
    itemWidth = 50;
    runAllTimers();
    expect(getRenderedCount()).toBe(5);

    // Back to the size of the earlier remeasure call.
    itemWidth = 150;
    remeasure();
    expect(getRenderedCount()).toBe(2);
    remeasure();
    expect(getRenderedCount()).toBe(2);
  });

  it('follows the container when remeasure is called in every frame while it gets narrower', () => {
    const { componentRef, getRenderedCount } = renderResizeGroup({ onGrowData: onGrowItems });
    expect(getRenderedCount()).toBe(5);

    // Like an application that calls remeasure from a ResizeObserver while the container is dragged narrower.
    const renderedCounts: number[] = [];
    for (let frame = 1; frame <= 12; frame++) {
      containerWidth = 500 - 25 * frame;
      act(() => {
        componentRef.current!.remeasure();
      });
      act(() => {
        jest.runOnlyPendingTimers();
      });
      renderedCounts.push(getRenderedCount());
    }

    // The layout changes while the calls go on, and it ends on what fits.
    expect(Math.min(...renderedCounts)).toBeLessThan(5);
    runAllTimers();
    expect(getRenderedCount()).toBe(2);
  });

  it('fits the data again after the fit of an earlier call when remeasure is called during that fit', () => {
    containerWidth = 300;
    const { componentRef, getRenderedCount } = renderResizeGroup({ onGrowData: onGrowItems });
    expect(getRenderedCount()).toBe(3);

    // The items get narrower, and remeasure starts a new fit. It measures the three items and goes on to four.
    itemWidth = 50;
    act(() => {
      componentRef.current!.remeasure();
    });
    for (let frame = 0; frame < 2; frame++) {
      act(() => {
        jest.runOnlyPendingTimers();
      });
    }
    expect(getMeasuredCount()).toBe(4);

    // While that fit runs, the items get wider again, and the application calls remeasure for it.
    itemWidth = 150;
    act(() => {
      componentRef.current!.remeasure();
    });
    runAllTimers();

    expect(getRenderedCount()).toBe(2);
  });

  describe('content that depends on more than the data', () => {
    // Like a CommandBar item that is drawn smaller while it is in the overflow menu: the caller keeps the number
    // of items that are shown up to date in onReduceData and onGrowData, and an item that is not shown takes
    // 10px in place of the width of an item.
    const renderGroupWithShownCount = () => {
      let shown = fullData.count;
      const onReduceData = jest.fn((data: IItemsData) => {
        const nextData = onReduceItems(data);
        shown = nextData ? nextData.count : shown;
        return nextData;
      });
      const onGrowData = jest.fn((data: IItemsData) => {
        const nextData = onGrowItems(data);
        shown = nextData ? nextData.count : shown;
        return nextData;
      });
      const onRenderData = (data: IItemsData) => (
        <div
          data-item-count={data.count}
          data-width={Math.min(data.count, shown) * itemWidth + Math.max(data.count - shown, 0) * 10}
        />
      );

      containerWidth = 420;
      const result = renderResizeGroup({ onGrowData, onReduceData, onRenderData });
      // Five items are 500px wide, and four items fit.
      expect(result.getRenderedCount()).toBe(4);
      onGrowData.mockClear();
      onReduceData.mockClear();
      measurements = 0;
      return { ...result, onGrowData, onReduceData };
    };

    it('keeps the data that fits, because the new fit goes through onGrowData', () => {
      const { getRenderedCount, remeasure, onGrowData, onReduceData } = renderGroupWithShownCount();

      remeasure();

      expect(getRenderedCount()).toBe(4);
      // The new fit measures every step itself, after onGrowData has updated what is shown: the four items, and
      // then the five items, which do not fit. Measured from the full data while four are shown, the five items
      // would take 410px.
      expect(onGrowData.mock.calls.map(([data]) => data.count)).toEqual([4]);
      expect(onReduceData.mock.calls.map(([data]) => data.count)).toEqual([5]);
      expect(measurements).toBe(2);
    });

    it('takes the same steps and ends on the same layout when remeasure is called again', () => {
      const { getRenderedCount, remeasure, onGrowData, onReduceData } = renderGroupWithShownCount();
      remeasure();
      onGrowData.mockClear();
      onReduceData.mockClear();
      measurements = 0;

      remeasure();

      expect(getRenderedCount()).toBe(4);
      expect(onGrowData.mock.calls.map(([data]) => data.count)).toEqual([4]);
      expect(onReduceData.mock.calls.map(([data]) => data.count)).toEqual([5]);
      expect(measurements).toBe(2);
    });

    it('fits the data again when the items get wider after an earlier call', () => {
      const { getRenderedCount, remeasure } = renderGroupWithShownCount();
      remeasure();
      expect(getRenderedCount()).toBe(4);

      itemWidth = 150;
      remeasure();

      expect(getRenderedCount()).toBe(2);
    });
  });
});
