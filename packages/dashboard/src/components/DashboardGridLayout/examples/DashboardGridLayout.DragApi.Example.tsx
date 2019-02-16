import * as React from 'react';
import Draggable, { DraggableData, ControlPosition } from 'react-draggable';
import { createDragApiRef, Layout } from 'react-grid-layout-fabric';
import { CardSize, DashboardGridLayout } from '@uifabric/dashboard';
import * as exampleStyles from './DashboardGridLayout.Example.scss';
import { DefaultButton } from 'office-ui-fabric-react/lib//Button';

export class DashboardGridLayoutDragApiExample extends React.PureComponent<
  {},
  {
    items: Layout[];
    position: ControlPosition;
    counter: number;
  }
> {
  private dragApi = createDragApiRef();

  constructor(props: {}) {
    super(props);
    this.dragPlaceholder.bind(this);
    this.stopPlaceholder.bind(this);
    this.state = {
      items: [0, 1, 2].map((i: number) => {
        return {
          i: i.toString(),
          y: i,
          x: i,
          w: 1,
          h: 1,
          size: CardSize.small
        };
      }),
      position: {
        x: 0,
        y: 0
      },
      counter: 0
    };
  }

  public render(): JSX.Element {
    return (
      <table className={exampleStyles.table} id="dragapiexample12">
        <tr>
          <td>
            <DashboardGridLayout isDraggable={true} dragApi={this.dragApi}>
              {this.state.items.map((item: Layout) => {
                return this.createItem(item);
              })}
            </DashboardGridLayout>
          </td>
          <td>
            <Draggable onDrag={this.dragPlaceholder} onStop={this.stopPlaceholder} position={this.state.position}>
              <DefaultButton>Drag me inside</DefaultButton>
            </Draggable>
          </td>
        </tr>
      </table>
    );
  }

  private addItem = () => {
    console.log('adding', 'n' + this.state.counter);
    const i = this.state.items.length;
    this.state.items.push({
      i: 'n' + this.state.counter,
      y: i,
      x: i,
      w: 1,
      h: 1
    });
    this.setState({
      items: this.state.items,
      counter: this.state.counter + 1
    });
    this.forceUpdate();
  };

  private createItem = (item: Layout) => {
    return (
      <div key={item.i} className={exampleStyles.card}>
        <div>Card {item.i}</div>
      </div>
    );
  };

  private getNewCard = () => {
    const newCard: HTMLElement = document.createElement('div');
    newCard.className += exampleStyles.card;
    return newCard;
  };

  private dragPlaceholder = (event: MouseEvent) => {
    console.log('drag placeholder', this.dragApi);
    if (this.dragApi && this.dragApi.value) {
      const containerRect = document.getElementById('dragapiexample12');
      if (containerRect !== null) {
        const boundingRect = containerRect.getBoundingClientRect();
        console.log('bounding rect left', boundingRect.left);
        console.log('bounding rect top', boundingRect.top);

        const left = event.clientX - boundingRect.left;
        const top = event.clientY - boundingRect.top;
        if (left < 0 || top < 0) {
          console.log('drag out 0');
          this.dragApi.value.dragOut({
            event,
            position: {
              left,
              top
            }
          });
        } else {
          console.log('drag in 0');
          this.dragApi.value.dragIn({
            i: 'n' + this.state.counter,
            w: 1,
            h: 1,
            event,
            node: this.getNewCard(),
            position: {
              left,
              top
            }
          });
        }
      }
    }
  };

  private stopPlaceholder = (event: MouseEvent, data: DraggableData) => {
    if (this.dragApi && this.dragApi.value) {
      const containerRect = document.getElementById('dragapiexample12');

      if (containerRect !== null) {
        const boundingRect = containerRect.getBoundingClientRect();
        console.log('bounding rect left', boundingRect.left);
        console.log('bounding rect top', boundingRect.top);

        this.dragApi.value.stop({
          event,
          position: {
            left: event.clientX - boundingRect.left,
            top: event.clientY - boundingRect.top
          }
        });
        this.addItem();
      }
    }
  };
}
