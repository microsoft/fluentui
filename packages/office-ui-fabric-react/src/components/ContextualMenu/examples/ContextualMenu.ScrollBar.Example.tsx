import * as React from 'react';
import { DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import './ContextualMenuExample.scss';

export class ContextualMenuWithScrollBarExample extends React.Component<{}, {
  showCallout: boolean;
}> {

  constructor(props: {}) {
    super(props);
    this.state = {
      showCallout: false
    };
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton
          id='ContextualMenuButton1'
          text='Click for ContextualMenu'
          menuProps={ {
            shouldFocusOnMount: true,
            directionalHint: DirectionalHint.bottomRightEdge,
            directionalHintFixed: true,
            items: [
              {
                key: 'newItem',
                name: 'New'
              },
              {
                key: 'item 2',
                name: 'Item with a very long label text'
              },
              {
                key: 'edit',
                name: 'Edit'
              },
              {
                key: 'properties',
                name: 'Properties'
              },
              {
                key: 'disabled',
                name: 'Disabled item',
                disabled: true
              }
            ],
            calloutProps: {
              calloutMaxHeight: 65
            }
          } }
        />
      </div>
    );
  }
}
