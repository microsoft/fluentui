jest.mock('react-dom');
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount, ReactWrapper } from 'enzyme';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { HorizontalBarChartWithAxis, IHorizontalBarChartWithAxisProps } from '../../index';
import { IHorizontalBarChartWithAxisState, HorizontalBarChartWithAxisBase } from './HorizontalBarChartWithAxis.base';
import { resetIds } from '@fluentui/react';
const rendererAct = renderer.act;
import { act as domAct } from 'react-dom/test-utils';
import { points_HBCWA } from '../../utilities/data';

let wrapper:
  | ReactWrapper<IHorizontalBarChartWithAxisProps, IHorizontalBarChartWithAxisState, HorizontalBarChartWithAxisBase>
  | undefined;

function sharedBeforeEach() {
  resetIds();
}

function sharedAfterEach() {
  if (wrapper) {
    wrapper.unmount();
    wrapper = undefined;
  }

  // Do this after unmounting the wrapper to make sure if any timers cleaned up on unmount are
  // cleaned up in fake timers world
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((global.setTimeout as any).mock) {
    jest.useRealTimers();
  }
}

const points_HBCWAForWrapLabels = [
  {
    y: 'String One',
    x: 1000,
    color: DefaultPalette.accent,
  },
  {
    y: 'String Two',
    x: 5000,
    color: DefaultPalette.blueDark,
  },
  {
    y: 'String Three',
    x: 3000,
    color: DefaultPalette.blueMid,
  },
  {
    y: 'String Four',
    x: 2000,
    color: DefaultPalette.blue,
  },
];

describe('HorizontalBarChartWithAxis snapShot testing', () => {
  it('renders HorizontalBarChartWithAxis correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<HorizontalBarChartWithAxis data={points_HBCWA} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders hideLegend correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(<HorizontalBarChartWithAxis data={points_HBCWA} hideLegend={true} />);
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showToolTipForYAxisLabels correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(
        <HorizontalBarChartWithAxis data={points_HBCWAForWrapLabels} showYAxisLablesTooltip={true} />,
      );
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders showYAxisLables correctly', () => {
    let component;
    rendererAct(() => {
      component = renderer.create(
        <HorizontalBarChartWithAxis
          data={points_HBCWAForWrapLabels}
          showYAxisLables={true}
          showYAxisLablesTooltip={false}
        />,
      );
    });
    const tree = component!.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('HorizontalBarChartWithAxis - basic props', () => {
  beforeEach(sharedBeforeEach);
  afterEach(sharedAfterEach);

  it('Should not mount legend when hideLegend true ', () => {
    domAct(() => {
      wrapper = mount(<HorizontalBarChartWithAxis data={points_HBCWA} hideLegend={true} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM!.length).toBe(0);
  });

  it('Should mount legend when hideLegend false ', () => {
    domAct(() => {
      wrapper = mount(<HorizontalBarChartWithAxis data={points_HBCWA} />);
    });
    const hideLegendDOM = wrapper!.getDOMNode().querySelectorAll('[class^="legendContainer"]');
    expect(hideLegendDOM).toBeDefined();
  });

  it('Should mount callout when hideTootip false ', () => {
    domAct(() => {
      wrapper = mount(<HorizontalBarChartWithAxis data={points_HBCWA} />);
    });
    const calloutDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(calloutDOM).toBeDefined();
  });

  it('Should not mount callout when hideTootip true ', () => {
    domAct(() => {
      wrapper = mount(<HorizontalBarChartWithAxis data={points_HBCWA} hideTooltip={true} />);
    });
    const calloutDOM = wrapper!.getDOMNode().querySelectorAll('[class^="ms-Layer"]');
    expect(calloutDOM!.length).toBe(0);
  });
});
describe('Render calling with respective to props', () => {
  it('No prop changes', () => {
    const renderMock = jest.spyOn(HorizontalBarChartWithAxisBase.prototype, 'render');
    const props = {
      data: points_HBCWA,
      height: 300,
      width: 600,
    };
    domAct(() => {
      mount(<HorizontalBarChartWithAxis {...props} />);
    });
    expect(renderMock).toHaveBeenCalledTimes(1);
    renderMock.mockRestore();
  });

  it('prop changes', () => {
    const renderMock = jest.spyOn(HorizontalBarChartWithAxisBase.prototype, 'render');
    const props = {
      data: points_HBCWA,
      height: 300,
      width: 600,
      hideLegend: true,
    };
    domAct(() => {
      const component = mount(<HorizontalBarChartWithAxis {...props} />);
      component.setProps({ ...props, hideTooltip: true });
    });
    expect(renderMock).toHaveBeenCalledTimes(2);
    renderMock.mockRestore();
  });
});
