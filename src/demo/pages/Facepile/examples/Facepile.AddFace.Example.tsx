import * as React from 'react';
import {
  ButtonType,
  Facepile,
  IFacepileProps
} from '../../../../index';
import { facepilePersonas } from './FacepileExampleData';

export interface IFacepileAddFaceExampleState {
  numberOfFaces: number;
}

export class FacepileAddFaceExample extends React.Component<any, IFacepileAddFaceExampleState> {
  public constructor() {
    super();

    this.state = {
      numberOfFaces: 0
    };
  }

  public render() {
    let { numberOfFaces } = this.state;
    let facepileProps: IFacepileProps = {
      personas: facepilePersonas.slice(0, numberOfFaces),
      showAddButton: true,
      addButtonProps: {
        buttonType: ButtonType.icon,
        icon: 'AddFriend',
        title: 'Add Face',
        onClick: (ev) => this.setState({
          numberOfFaces: this.state.numberOfFaces + 1
        })
      }
    };

    return (
      <Facepile {...facepileProps} />
    );
  }
}