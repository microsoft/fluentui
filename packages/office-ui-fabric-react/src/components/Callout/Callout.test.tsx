/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { Callout } from './Callout';
import { DirectionalHint } from '../../common/DirectionalHint';

let { expect } = chai;

describe('Callout', () => {

    it('Callout target id strings does not throw exception', () => {

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

    it('Callout target MouseEvents does not throw exception', () => {
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

    it('Callout target HTMLElements does not throw exception', () => {
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
    it('Callout targetElement  HTMLElements does not throw exception', () => {
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

    it('Callout without target does not throw exception', () => {
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

});
