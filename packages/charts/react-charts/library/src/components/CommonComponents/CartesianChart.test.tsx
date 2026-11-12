import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { ChartTypes, createNumericYAxis, createStringYAxis, XAxisTypes } from '../../utilities/index';
import { CartesianChart } from './CartesianChart';
import type { ModifiedCartesianChartProps } from './CartesianChart.types';

describe('CartesianChart events', () => {
  it('separates keyboard blur from mouse leave', () => {
    const onChartBlur = jest.fn();
    const onChartMouseLeave = jest.fn();
    const { container } = render(
      <CartesianChart
        points={[]}
        chartType={ChartTypes.LineChart}
        xAxisType={XAxisTypes.NumericAxis}
        width={300}
        height={200}
        legendBars={null}
        hideLegend
        hideTooltip
        tickParams={{}}
        getDomainNRangeValues={() => ({ dStartValue: 0, dEndValue: 1, rStartValue: 0, rEndValue: 100 })}
        getMinMaxOfYAxis={() => ({ startValue: 0, endValue: 1 })}
        createYAxis={createNumericYAxis}
        createStringYAxis={createStringYAxis}
        onChartBlur={onChartBlur}
        onChartMouseLeave={onChartMouseLeave}
      >
        {() => null}
      </CartesianChart>,
    );
    const chart = container.querySelector<HTMLDivElement>('[role="presentation"]');

    expect(chart).not.toBeNull();
    fireEvent.blur(chart!);
    expect(onChartBlur).toHaveBeenCalledTimes(1);
    expect(onChartMouseLeave).not.toHaveBeenCalled();

    fireEvent.mouseLeave(chart!);
    expect(onChartMouseLeave).toHaveBeenCalledTimes(1);
    expect(onChartBlur).toHaveBeenCalledTimes(1);
  });
});

describe('CartesianChart child keys', () => {
  type ElementWithChildren = React.ReactElement<{ children: React.ReactNode }>;
  const chartProps: Omit<ModifiedCartesianChartProps, 'children'> = {
    points: [],
    chartType: ChartTypes.LineChart,
    xAxisType: XAxisTypes.NumericAxis,
    width: 300,
    height: 200,
    legendBars: null,
    hideLegend: true,
    hideTooltip: true,
    tickParams: {},
    getDomainNRangeValues: () => ({ dStartValue: 0, dEndValue: 1, rStartValue: 0, rEndValue: 100 }),
    getMinMaxOfYAxis: () => ({ startValue: 0, endValue: 1 }),
    createYAxis: createNumericYAxis,
    createStringYAxis,
  };

  // Inspect the actual element keys: React 18 does not report every React 19 list warning.
  // Passing children as a prop also avoids JSX validating the fixture before CartesianChart keys it.
  function inspectChildren(children: React.ReactNode) {
    const inspect = jest.fn(({ children: content }: { children?: React.ReactNode }) => <g children={content} />);
    render(<CartesianChart {...chartProps}>{() => React.createElement(inspect, { children })}</CartesianChart>);
    return inspect.mock.calls[inspect.mock.calls.length - 1][0].children;
  }

  it('keys scatter point fragments from their keyed marks, including labels', () => {
    const point = (
      <>
        <circle key="point-a" id="point-a" />
        <text key="point-a-label">A</text>
      </>
    );
    const otherPoint = (
      <>
        <circle key="point-b" id="point-b" />
        {false}
      </>
    );
    const children = inspectChildren([point, otherPoint]) as ElementWithChildren[];

    expect(children.map(child => child.key)).toEqual(['point-a', 'point-b']);
    expect(children[0].type).toBe(React.Fragment);
    expect(children[0].props.children).toBe(point.props.children);
    expect(children[1].props.children).toBe(otherPoint.props.children);
    expect(point.key).toBeNull();
  });

  it('keys nested line point fragments without replacing their keyed marks', () => {
    const mark = <circle key="line-point" id="line-point" />;
    const point = (
      <>
        <React.Fragment>{mark}</React.Fragment>
      </>
    );
    const children = inspectChildren([point]) as React.ReactElement<{ children: ElementWithChildren }>[];

    expect(children[0].key).toBe('line-point');
    expect(children[0].props.children).toBe(point.props.children);
    expect(children[0].props.children.props.children).toBe(mark);
  });

  it('keys nested group arrays and leaves existing keys, arrays and non-elements intact', () => {
    const keyedMark = <rect key="bar" />;
    const keyedMarks = [keyedMark];
    const keyedGroup = <g key="series" children={keyedMarks} />;
    const namedGroup = <g id="bars" children={keyedMarks} />;
    const positionalGroup = <g children={keyedMarks} />;
    const nested = [namedGroup, positionalGroup, null, false, 'label'];
    const children = inspectChildren([keyedGroup, nested]) as [ElementWithChildren, React.ReactNode[]];

    expect(children[0]).toBe(keyedGroup);
    expect(children[0].props.children).toBe(keyedMarks);
    expect((children[1][0] as React.ReactElement).key).toBe('bars');
    expect((children[1][1] as React.ReactElement).key).toBe('1');
    expect((children[1][0] as ElementWithChildren).props.children).toBe(keyedMarks);
    expect(children[1].slice(2)).toEqual([null, false, 'label']);
  });

  it('does not collide with existing sibling keys or keys reused inside separate fragments', () => {
    const keyedGroup = <g key="shared" />;
    const point = (
      <>
        <circle key="shared" />
      </>
    );
    const numericKeyGroup = <g key="4" />;
    const positionalGroup = <g />;
    const children = inspectChildren([
      point,
      point,
      keyedGroup,
      numericKeyGroup,
      positionalGroup,
    ]) as React.ReactElement[];

    expect(children.map(child => child.key)).toEqual(['shared:0', 'shared:1', 'shared', '4', '4:4']);
    expect(children[2]).toBe(keyedGroup);
  });

  it('keeps keyed point DOM identity, refs and handlers when points reorder or are filtered', () => {
    const onMouseOver = jest.fn();
    const onFocus = jest.fn();
    const pointRef = React.createRef<SVGCircleElement>();
    const points = ['a', 'b', 'c'].map(id => (
      <>
        <circle
          key={id}
          id={id}
          ref={id === 'b' ? pointRef : undefined}
          onMouseOver={onMouseOver}
          onFocus={onFocus}
          tabIndex={0}
        />
      </>
    ));
    const renderPoints = (items: React.ReactNode[]) => (
      <CartesianChart {...chartProps}>{() => <g children={items} />}</CartesianChart>
    );
    const { container, rerender } = render(renderPoints(points));
    const original = pointRef.current;
    expect(original).toBe(container.querySelector('#b'));

    rerender(renderPoints([points[2], points[1], points[0]]));
    expect(pointRef.current).toBe(original);
    expect(Array.from(container.querySelectorAll('circle'), circle => circle.id)).toEqual(['c', 'b', 'a']);

    rerender(renderPoints([points[1]]));
    expect(pointRef.current).toBe(original);
    fireEvent.mouseOver(original!);
    fireEvent.focus(original!);
    expect(onMouseOver).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(points[1].key).toBeNull();
  });
});
