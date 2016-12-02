/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { Callout } from './Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Async } from '../../utilities/Async/Async';

let { expect } = chai;

describe('Callout', () => {

  it('target id strings does not throw exception', () => {

    let threwException: boolean = false;
    let exception;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <button id='target' style={ { top: '10px', left: '10px', height: '0', width: '0px' } }> target </button>
          <Callout
            target='#target'
            directionalHint={ DirectionalHint.topLeftEdge }
            >
            <div>
              Content
                        </div>
          </Callout>
        </div>
      );
    } catch (e) {
      exception = e;
      threwException = true;
    }

    expect(threwException).to.be.false;
  });

  it('target MouseEvents does not throw exception', () => {
    let mouseEvent = document.createEvent('MouseEvent');
    let eventTarget = document.createElement('div');
    mouseEvent.initMouseEvent('click', false, false, window, 0, 0, 0, 0, 0, false, false, false, false, 1, eventTarget);
    let threwException: boolean = false;
    try {

      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout
            target={ eventTarget }
            directionalHint={ DirectionalHint.topLeftEdge }
            >
            <div>
              Content
                        </div>
          </Callout>
        </div>
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).to.be.false;
  });

  it('target HTMLElements does not throw exception', () => {
    let targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    let threwException: boolean = false;
    try {

      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout
            target={ targetElement }
            directionalHint={ DirectionalHint.topLeftEdge }
            >
            <div>
              Content
                        </div>
          </Callout>
        </div>
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).to.be.false;
  });

  // Once this has been deprecated completely in v1.0 this is no longer needed.
  it('targetElement  HTMLElements does not throw exception', () => {
    let targetElement = document.createElement('div');
    document.body.appendChild(targetElement);
    let threwException: boolean = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout
            targetElement={ targetElement }
            directionalHint={ DirectionalHint.topLeftEdge }
            >
            <div>
              Content
                        </div>
          </Callout>
        </div>
      );
    } catch (e) {
      threwException = true;
    }

    expect(threwException).to.be.false;
  });

  it('without target does not throw exception', () => {
    let threwException: boolean = false;
    try {
      ReactTestUtils.renderIntoDocument<HTMLDivElement>(
        <div>
          <Callout
            directionalHint={ DirectionalHint.topLeftEdge }
            >
            <div>
              Content
                        </div>
          </Callout>
        </div>
      );
    } catch (e) {
      threwException = true;
    }
    expect(threwException).to.be.false;
  });

  it('passes event to onDismiss prop', () => {
    let threwException: boolean = false;
    let gotEvent: boolean = false;
    let onDismiss = (ev?: any) => {
      if (ev) {
        gotEvent = true;
      }
    };
    let async = new Async(this);
    // In order to have eventlisteners that have been added to the window to be called the JSX needs
    // to be rendered into the real dom rather than the testutil simulated dom.
    let root = document.createElement('div');
    document.body.appendChild(root);
    try {
      ReactDOM.render<HTMLDivElement>(
        <div>
          <button id='focustarget'> button </button>
          <button id='target' style={ { top: '10px', left: '10px', height: '0', width: '0px' } }> target </button>
          <Callout
            target='#target'
            directionalHint={ DirectionalHint.topRightEdge }
            onDismiss={ onDismiss }
            >
            <div>
              Content
            </div>
          </Callout>
        </div>, root
      );
    } catch (e) {
      threwException = true;
    }
    expect(threwException).to.be.false;

    let focusTarget = document.querySelector('#focustarget') as HTMLButtonElement;

    focusTarget.focus();
    async.setTimeout(() => {
      expect(gotEvent).to.be.eq(true, 'Event did not get passed to dismiss event');
    }, 20);
  });

});
