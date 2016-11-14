/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
    BaseComponent,
    Button,
    Dropdown,
    IDropdownOption,
    Pane,
    PaneContent,
    PaneMode,
    PaneType,
    WrappedContent,
    autobind
} from '../../../../index';

import './Pane.Example.scss';

export interface IPaneSmallRightExampleState {
    showPane: boolean;
    paneMode: PaneMode;
    paneType: PaneType;
}

export class PaneBasicExample extends BaseComponent<any, IPaneSmallRightExampleState> {

    public constructor() {
        super();

        this.state = {
            showPane: false,
            paneType: PaneType.small,
            paneMode: PaneMode.push
        };
    }

    public render() {
        return (
            <div className='PaneExample'>
                <div className='PaneExample-configArea'>
                    <Dropdown
                        label='Overlay Mode'
                        selectedKey={ this.state.paneMode }
                        options={ [
                            { key: PaneMode.overlay, text: 'Overlay' },
                            { key: PaneMode.push, text: 'Push' }
                        ] }
                        onChanged={ this._changePaneMode } />
                    <Dropdown
                        label='Size'
                        selectedKey={ this.state.paneType }
                        options={ [
                            { key: PaneType.small, text: 'Small' },
                            { key: PaneType.medium, text: 'Medium' }
                        ] }
                        onChanged={ this._changePaneSize } />
                </div>
                <div className='PaneExample-buttonArea'>
                    <Button description='Opens the Sample Pane' onClick={ this._showPane.bind(this) }>Open Pane</Button>
                </div>
                <Pane
                    hidden={ !this.state.showPane }
                    paneMode={ this.state.paneMode }
                    type={ this.state.paneType }
                    onDismiss={ this._closePane.bind(this) }
                    headerText='Pane - Right-aligned'
                    >
                    <WrappedContent className='PaneExample-content'>
                        [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block] [Main content block][Main content block] [Main content block]  [Main content block] [Main content block]
                    </WrappedContent>
                    <PaneContent className='ms-font-m'>
                        Pane content goes here.
                    </PaneContent>
                </Pane>
            </div>
        );
    }

    @autobind
    private _showPane() {
        this.setState((prevState: IPaneSmallRightExampleState) => {
            prevState.showPane = true;
            return prevState;
        });
    }

    @autobind
    private _closePane() {
        this.setState((prevState: IPaneSmallRightExampleState) => {
            prevState.showPane = false;
            return prevState;
        });
    }

    @autobind
    private _changePaneMode(option: IDropdownOption) {
        this.setState((prevState: IPaneSmallRightExampleState) => {
            prevState.showPane = false;
            prevState.paneMode = option.key as PaneMode;
            return prevState;
        });
    }

    @autobind
    private _changePaneSize(option: IDropdownOption) {
        this.setState((prevState: IPaneSmallRightExampleState) => {
            prevState.showPane = false;
            prevState.paneType = option.key as PaneType;
            return prevState;
        });
    }
}