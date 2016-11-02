import * as React from 'react';
import {
    Button,
    Pane,
    PaneContent,
    PaneType,
    WrappedContent
} from '../../../../index';

export class PaneSmallRightExample extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {
            showPane: false
        };
    }

    // First one is content, second is pane content - TODO: make this design better
    // Can I use htmlFor or refs to point the control to the content it should attach to?
    public render() {
        return (
            <div>

                <Button description='Opens the Sample Pane' onClick={ this._showPane.bind(this) }>Open Pane</Button>
            </div>
        );
    }

    private _showPane() {
        this.setState({ showPane: true });
    }
    private _closePane() {
        this.setState({ showPane: false });
    }
}
