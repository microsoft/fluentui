import * as React from 'react';
import {
  TextField,
  IconButton
} from '../../../lib/';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import {
  IStepper,
  IStepperProps
} from './Stepper.Props';
import './Stepper.scss';

export interface IStepperState {
  value?: number;
}

export class Stepper extends React.Component<IStepperProps, IStepperState> implements IStepper {
  public static defaultProps: IStepperProps = {
    step: 1,
    min: 0,
    max: 10,
    disabled: false,
  };

  constructor(props?: IStepperProps) {
    super(props);

    let value = props.value || props.defaultValue || props.min
    this.state = {
      value: value,
    };
  }

  /**
  * Invoked when a component is receiving new props. This method is not called for the initial render.
  */
  public componentWillReceiveProps(newProps: IStepperProps): void {

    if (newProps.value !== undefined) {
      let value = Math.max(newProps.min, Math.min(newProps.max, newProps.value));

      this.setState({
        value: value,
      });
    }
  }

  public render() {
    const {
      className,
      disabled,
      min,
      max
    } = this.props;

    const {
      value,
    } = this.state;

    return (
      <div style={ { width: '70px' } } >
        < TextField value={ String(value) } resizable={ false } validateOnFocusOut={ true } style={ { width: '48px' } } className="textField" />
        < span className='arrowBox' >
          <IconButton
            className='upButton'
            disabled={ disabled }
            icon='CaretUpSolid8'
            title='CaretUpSolid8' />
          <IconButton
            className='downButton'
            disabled={ disabled }
            icon='CaretDownSolid8'
            title='CaretDownSolid8' />
        </span >
      </ div >
    ) as React.ReactElement<{}>;
  }
}