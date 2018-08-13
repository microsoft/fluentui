import * as React from 'react';

import * as ReactDOM from 'react-dom';

import { PanelBase } from './Panel.base';
import { PanelType } from './Panel.types';
import { Panel } from './Panel';
import * as renderer from 'react-test-renderer';
let div: HTMLElement;

// Mock Layer since it otherwise shows nothing in snapshot tests
jest.mock('../../Layer', () => {
  return {
    Layer: jest.fn().mockImplementation(props => {
      return props.children;
    })
  };
});

describe('Panel', () => {
  it('Renders Panel correctly', () => {
    const component = renderer.create(
      <Panel isOpen={true} type={PanelType.large} headerText="Large Panel">
        <span>Content goes here.</span>
        />
      </Panel>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('fires the correct events when closing', done => {
    let dismissedCalled = false;
    let dismissCalled = false;
    const setDismissTrue = (): void => {
      dismissCalled = true;
    };
    const setDismissedTrue = (): void => {
      dismissedCalled = true;
    };

    const panel: PanelBase = ReactDOM.render(
      <PanelBase isOpen={true} onDismiss={setDismissTrue} onDismissed={setDismissedTrue} />,
      div
    ) as any;

    panel.dismiss();

    expect(dismissCalled).toEqual(true);
    expect(dismissedCalled).toEqual(false);

    setTimeout(() => {
      try {
        expect(dismissedCalled).toEqual(true);
        done();
      } catch (e) {
        done(e);
      }
    }, 250);
  });
});
