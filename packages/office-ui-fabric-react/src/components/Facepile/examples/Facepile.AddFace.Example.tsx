import * as React from 'react';
import { Facepile, IFacepileProps, OverflowButtonType } from 'office-ui-fabric-react/lib/Facepile';
import { facepilePersonas } from '@uifabric/example-data';

export interface IFacepileAddFaceExampleState {
  numberOfFaces: number;
}

export class FacepileAddFaceExample extends React.Component<{}, IFacepileAddFaceExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      numberOfFaces: 0
    };
  }

  public render(): JSX.Element {
    const { numberOfFaces } = this.state;
    const facepileProps: IFacepileProps = {
      personas: facepilePersonas.slice(0, numberOfFaces),
      maxDisplayablePersonas: 5,
      overflowButtonProps: {
        ariaLabel: 'More users',
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) => alert('overflow icon clicked')
      },
      overflowButtonType: OverflowButtonType.descriptive,
      showAddButton: true,
      addButtonProps: {
        ariaLabel: 'Add a new person',
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) =>
          this.setState({
            numberOfFaces: this.state.numberOfFaces + 1
          })
      },
      ariaDescription: 'To move through the items use left and right arrow keys.'
    };

    return <Facepile {...facepileProps} />;
  }
}
