import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { Callout } from './Callout';
import { ICalloutProps } from './Callout.types';
import { CalloutContent } from './CalloutContent';
import { DirectionalHint } from '../../common/DirectionalHint';

class CalloutContentWrapper extends React.Component<ICalloutProps, {}> {
  public render(): JSX.Element {
    return <CalloutContent {...this.props} />;
  }
}

describe('Callout', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders Callout correctly', () => {
    const component = renderer.create(<CalloutContentWrapper>Content</CalloutContentWrapper>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('target id strings does not throw exception', () => {
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
            {' '}
            target{' '}
          </button>
          <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('target MouseEvents does not throw exception', () => {
    const mouseEvent = document.createEvent('MouseEvent');
    const eventTarget = document.createElement('div');
    mouseEvent.initMouseEvent('click', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 1, eventTarget);
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout target={eventTarget} directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('target Elements does not throw exception', () => {
    const targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout target={targetElement} directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).toEqual(false);
  });

  it('without target does not throw exception', () => {
    let threwException = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout directionalHint={DirectionalHint.topLeftEdge}>
            <div>Content</div>
          </Callout>
        </div>
      );
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);
  });

  it('passes event to onDismiss prop', () => {
    jest.useFakeTimers();
    let threwException = false;
    let gotEvent = false;
    const onDismiss = (ev?: any) => {
      if (ev) {
        gotEvent = true;
      }
    };

    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.
    const root = document.createElement('div');
    document.body.appendChild(root);
    try {
      ReactDOM.render<HTMLDivElement>(
        <div>
          <button id="focustarget"> button </button>
          <button id="target" style={{ top: '10px', left: '10px', height: '0', width: '0px' }}>
            {' '}
            target{' '}
          </button>
          <Callout target="#target" directionalHint={DirectionalHint.topLeftEdge} onDismiss={onDismiss}>
            <div>Content</div>
          </Callout>
        </div>,
        root
      );
    } catch (e) {
      threwException = true;
    }
    expect(threwException).toEqual(false);

    const focusTarget = document.querySelector('#focustarget') as HTMLButtonElement;

    // Move focus
    jest.runAllTimers();
    focusTarget.focus();
    expect(gotEvent).toEqual(true);
  });
});
