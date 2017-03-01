/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import * as ReactDOM from 'react-dom';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { FocusTrapZone } from 'office-ui-fabric-react/lib/FocusTrapZone';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import './FocusTrapZone.Box.Example.scss';

interface IFocusTrapComponentProps {
  register: (index: number, component: FocusTrapComponent) => void;
  unregister: (index: number) => void;
}

interface IFocusTrapComponentState {
  isActive: boolean;
}

class FocusTrapComponent extends React.Component<IFocusTrapComponentProps, IFocusTrapComponentState> {
  private static _strings: string[] = [
    'I call on these prayers to the sun',
    'heavy with thought',
    'see your face',
    'I carry these memories inside',
    'thoughts of us all, colored by love',
    'see me grow wings and fly high',
    'passions will die',
    'down below',
    'I burn in the basin of fire',
    'watch as we fall',
    'as they dance',
    'in the mist in the sun',
    'watching me',
    'watching you'
  ];

  private static _nextIndex: number = 0;

  public refs: {
    [key: string]: React.ReactInstance;
    toggle: HTMLElement;
  };

  private _index: number;
  private _myString: string;

  constructor() {
    super();

    this._index = FocusTrapComponent._nextIndex;
    FocusTrapComponent._nextIndex += 1;
    this._myString = FocusTrapComponent._strings[this._index % FocusTrapComponent._strings.length];
    this._onStringButtonClicked = this._onStringButtonClicked.bind(this);
    this.state = { isActive: true };
  }

  componentWillMount() {
    this.props.register(this._index, this);
  }

  componentWillUnmount() {
    this.props.unregister(this._index);
  }

  render() {

    let contents = (
      <div className='bestDivStyle'>
        <Button onClick={ this._onStringButtonClicked } >
          {
            this._myString
          }
        </Button>
        <Toggle
          ref='toggle'
          checked={ this.state.isActive }
          onChanged={ this._onFocusTrapZoneToggleChanged.bind(this) }
          label='Focus Trap Zone'
          onText='On'
          offText='Off' />
        {
          this.props.children
        }
      </div>
    );

    if (this.state.isActive) {
      return (
        <FocusTrapZone>
        {
          contents
        }
        </FocusTrapZone>
      );
    }
    return contents;
  }

  private _onStringButtonClicked() {
    console.log(this._myString);
  }

  private _onFocusTrapZoneToggleChanged(isChecked: boolean) {
    this.setState({
      isActive: isChecked
    }, () => {
      let toggle = ReactDOM.findDOMNode(this.refs.toggle) as HTMLElement;

      if (toggle) {
        toggle.focus();
      }
    });
  }

}

export default class FocusTrapZoneBestClickExample extends React.Component<React.HTMLProps<HTMLDivElement>, {}> {

  private _registry: any = {};

  constructor() {
    super();
  }

  public render() {
    return (
      <div>
        <FocusTrapComponent register={ this._register } unregister={ this._unregister } >
          <FocusTrapComponent register={ this._register } unregister={ this._unregister } >
            <FocusTrapComponent register={ this._register } unregister={ this._unregister } >
              <Button onClick={ this._randomize }>Randomize</Button>
            </FocusTrapComponent>
            <FocusTrapComponent register={ this._register } unregister={ this._unregister } >
              <Button onClick={ this._randomize }>Randomize</Button>
            </FocusTrapComponent>
          </FocusTrapComponent>
          <FocusTrapComponent register={ this._register } unregister={ this._unregister } >
            <Button onClick={ this._randomize }>Randomize</Button>
          </FocusTrapComponent>
        </FocusTrapComponent>
        <Button onClick={ this._randomize }>Randomize</Button>
      </div>
    );
  }

  @autobind
  private _randomize() {

    for (let index in this._registry) {
      let newVal: boolean = Math.random() < .5 ? false : true;
      this._registry[index].setState({
        isActive: newVal
      });
    }

  }

  @autobind
  private _register(index: number, component: FocusTrapComponent): void {
    this._registry[index.toString()] = component;
  }

  @autobind
  private _unregister(index: number): void {
    delete this._registry[index.toString()];
  }

}


