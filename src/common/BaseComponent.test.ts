import { BaseComponent } from './BaseComponent';

let { assert } = chai;

class TestComponent extends BaseComponent<{}, {}> {

  public componentWillMount(): void {
    this._createNullRef();
  }

  public componentDidMount(): void {
    this._createNullRef();
  }

  public shouldComponentUpdate(): void {
    this._createNullRef();
  }

  public componentWillUpdate(): void {
    this._createNullRef();
  }

  public componentWillReceiveProps(): void {
    this._createNullRef();
  }

  public render(): JSX.Element {
    this._createNullRef();
    return null;
  }

  public componentDidUpdate(): void {
    this._createNullRef();
  }

  public componentWillUnmount(): void {
    this._createNullRef();
  }

  private _createNullRef() {
    let foo: () => void = null;

    // Calling a null
    foo();
  }
}

describe('BaseComponent', () => {
  _buildTestFor('componentWillMount');
  _buildTestFor('componentDidMount');
  _buildTestFor('shouldComponentUpdate');
  _buildTestFor('componentWillUpdate');
  _buildTestFor('componentWillReceiveProps');
  _buildTestFor('render');
  _buildTestFor('componentDidUpdate');
  _buildTestFor('componentWillUnmount');
});

function _buildTestFor(methodName) {
  it(`calls the error logger on ${ methodName } exception`, () => {
    let lastErrorMessage = null;

    BaseComponent.onError = (errorMessage, ex) => lastErrorMessage = errorMessage;

    let c = new TestComponent();

    c[methodName]();

    assert(lastErrorMessage !== null, 'Error callback not called');
  });
}