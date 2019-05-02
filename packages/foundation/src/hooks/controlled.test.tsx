/* tslint:disable:no-unused-variable */
// import * as React from 'react';
/* tslint:enable:no-unused-variable */

// Use any new Testing libraries?
// Can't test hooks as standalone JS functions because they depend on magic in created React elements.
// They either need to be wrapped with a component or tested with a library like react-hooks-testing-library.
// https://github.com/mpeyper/react-hooks-testing-library
// https://github.com/testing-library/react-testing-library

// TODO: tests for controlled hooks
// import { mount } from 'enzyme';
// import { BaseState } from './BaseState';
// import { IBaseProps } from './BaseComponentMin';

// interface ITestComponentProps extends IBaseProps {
//   propControlled?: string;
//   propUncontrolled?: string;
// }

// interface ITestViewProps extends ITestComponentProps {
//   stateVar: string;
// }

// type ITestViewState = ITestViewProps;

// class TestBaseState extends BaseState<ITestComponentProps, ITestViewProps, ITestViewState> {
//   constructor(props: TestBaseState['props']) {
//     super(props, {
//       controlledProps: ['propControlled']
//     });

//     this.state = {
//       propControlled: 'stateControlledValue',
//       propUncontrolled: 'stateUncontrolledValue',
//       stateVar: 'stateVarValue'
//     };
//   }
// }

describe('controlled hooks', () => {
  it('dummy test', () => {
    expect.assertions(0);
  });
  // it('passes state to renderView', done => {
  //   const renderView = (viewProps: ITestViewProps) => {
  //     expect(viewProps.propControlled).toEqual('stateControlledValue');
  //     expect(viewProps.propUncontrolled).toEqual('stateUncontrolledValue');
  //     expect(viewProps.stateVar).toEqual('stateVarValue');
  //     done();
  //     return <div />;
  //   };

  //   mount(<TestBaseState renderView={renderView} />);
  // });

  // it('prioritizes controlled component prop over state', done => {
  //   const testProps: ITestComponentProps = {
  //     propControlled: 'propControlledValue'
  //   };

  //   const renderView = (viewProps: ITestViewProps) => {
  //     expect(viewProps.propControlled).toEqual('propControlledValue');
  //     done();
  //     return <div />;
  //   };

  //   mount(<TestBaseState {...testProps} renderView={renderView} />);
  // });

  // it('prioritizes uncontrolled state over component prop', done => {
  //   const testProps: ITestComponentProps = {
  //     propUncontrolled: 'propUncontrolledValue'
  //   };

  //   const renderView = (viewProps: ITestViewProps) => {
  //     expect(viewProps.propUncontrolled).toEqual('stateUncontrolledValue');
  //     done();
  //     return <div />;
  //   };

  //   mount(<TestBaseState {...testProps} renderView={renderView} />);
  // });
});
