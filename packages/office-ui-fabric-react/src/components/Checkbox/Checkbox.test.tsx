import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { CheckboxBase } from './Checkbox.base';
import { Checkbox } from './Checkbox';

interface IExampleState {
  indeterminateState: boolean;
  indeterminateState2: boolean;
  checkedState: boolean;
  checkedState2: boolean;
}
class ExampleComponent extends React.Component {
  public state: IExampleState = {
    indeterminateState: true,
    indeterminateState2: true,
    checkedState: false,
    checkedState2: false
  };

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Checkbox indeterminate={this.state.indeterminateState} checked={this.state.checkedState} onChange={this._onControlledChange} />
        <Checkbox indeterminate={this.state.indeterminateState2} checked={this.state.checkedState2} />
      </React.Fragment>
    );
  }

  private _onControlledChange = (ev: React.FormEvent<HTMLElement>, checked: boolean): void => {
    if (this.state.indeterminateState) {
      this.setState({ indeterminateState: false });
    } else {
      this.setState({ checkedState: checked! });
    }
  };
}

describe('Checkbox', () => {
  it('renders Checkbox correctly', () => {
    const component = renderer.create(<Checkbox label="Standard checkbox" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders Checkbox with id correctly', () => {
    const component = mount(<Checkbox label="Standard checkbox" ariaDescribedBy={'descriptionID'} id="my-checkbox" />);
    expect(component.find('input').prop('id')).toEqual('my-checkbox');
  });
  it('renders Checkbox with Uncontrolled indeterminate correctly', () => {
    const component = mount(<Checkbox label="Uncontrolled Indeterminate checkbox" defaultIndeterminate />);
    expect(component.find(CheckboxBase).state('isIndeterminate')).toEqual(true);
  });
  it('removes Uncontrolled indeterminate state correctly', () => {
    const component = mount(<Checkbox label="Uncontrolled Indeterminate checkbox" defaultIndeterminate />);
    expect(component.find(CheckboxBase).state('isIndeterminate')).toEqual(true);
    component.find('input').simulate('change');
    expect(component.find(CheckboxBase).state('isIndeterminate')).toEqual(false);
  });
  it('renders Checkbox with Controlled indeterminate correctly', () => {
    const component = mount(<ExampleComponent />);
    expect(
      component
        .find(CheckboxBase)
        .first()
        .state('isIndeterminate')
    ).toEqual(true);
    component
      .find('input')
      .first()
      .simulate('change');
    expect(
      component
        .find(CheckboxBase)
        .first()
        .state('isIndeterminate')
    ).toEqual(false);
  });
  it('removes Controlled indeterminate correctly', () => {
    const component = mount(<ExampleComponent />);
    expect(
      component
        .find(CheckboxBase)
        .first()
        .state('isIndeterminate')
    ).toEqual(true);
    expect(
      component
        .find(CheckboxBase)
        .first()
        .prop('indeterminate')
    ).toEqual(true);
    component
      .find('input')
      .first()
      .simulate('change');
    expect(
      component
        .find(CheckboxBase)
        .first()
        .state('isIndeterminate')
    ).toEqual(false);
    expect(
      component
        .find(CheckboxBase)
        .first()
        .prop('indeterminate')
    ).toEqual(false);
  });
  it('removes Controlled indeterminate correctly unaffecting checked state', () => {
    const component = mount(<ExampleComponent />);
    expect(
      component
        .find(CheckboxBase)
        .first()
        .state('isChecked')
    ).toEqual(false);
    expect(
      component
        .find(CheckboxBase)
        .first()
        .prop('checked')
    ).toEqual(false);
    component
      .find('input')
      .first()
      .simulate('change');
    expect(
      component
        .find(CheckboxBase)
        .first()
        .state('isChecked')
    ).toEqual(false);
    expect(
      component
        .find(CheckboxBase)
        .first()
        .prop('checked')
    ).toEqual(false);
  });
  it("doesn't remove Controlled indeterminate correctly because no onChange provided", () => {
    const component = mount(<ExampleComponent />);

    expect(
      component
        .find(CheckboxBase)
        .last()
        .state('isIndeterminate')
    ).toEqual(true);
    expect(
      component
        .find(CheckboxBase)
        .last()
        .prop('indeterminate')
    ).toEqual(true);

    component
      .find('input')
      .last()
      .simulate('change');

    expect(
      component
        .find(CheckboxBase)
        .last()
        .state('isIndeterminate')
    ).toEqual(true);
    expect(
      component
        .find(CheckboxBase)
        .last()
        .prop('indeterminate')
    ).toEqual(true);
  });
});
