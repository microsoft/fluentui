/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { mount } from 'enzyme';
import { BaseState } from './BaseState';
import { IBaseProps } from './BaseComponentMin';

interface ITestComponentProps extends IBaseProps {
  propControlled?: string;
  propUncontrolled?: string;
}

interface ITestViewProps extends ITestComponentProps {
  stateVar: string;
}

type ITestViewState = ITestViewProps;

class TestBaseState extends BaseState<ITestComponentProps, ITestViewProps, ITestViewState> {
  constructor(props: TestBaseState['props']) {
    super(props, {
      controlledProps: ['propControlled']
    });

    this.state = {
      propControlled: 'stateControlledValue',
      propUncontrolled: 'stateUncontrolledValue',
      stateVar: 'stateVarValue'
    };
  }
}

describe('BaseState', () => {
  it('passes state to renderView', done => {
    const renderView = (viewProps: ITestViewProps) => {
      expect(viewProps.propControlled).toEqual('stateControlledValue');
      expect(viewProps.propUncontrolled).toEqual('stateUncontrolledValue');
      expect(viewProps.stateVar).toEqual('stateVarValue');
      done();
      return <div />;
    };

    mount(<TestBaseState renderView={renderView} />);
  });

  it('prioritizes controlled component prop over state', done => {
    const testProps: ITestComponentProps = {
      propControlled: 'propControlledValue'
    };

    const renderView = (viewProps: ITestViewProps) => {
      expect(viewProps.propControlled).toEqual('propControlledValue');
      done();
      return <div />;
    };

    mount(<TestBaseState {...testProps} renderView={renderView} />);
  });

  it('prioritizes uncontrolled state over component prop', done => {
    const testProps: ITestComponentProps = {
      propUncontrolled: 'propUncontrolledValue'
    };

    const renderView = (viewProps: ITestViewProps) => {
      expect(viewProps.propUncontrolled).toEqual('stateUncontrolledValue');
      done();
      return <div />;
    };

    mount(<TestBaseState {...testProps} renderView={renderView} />);
  });
});
