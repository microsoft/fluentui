import { IBaseProps } from './IBaseProps';
import { appendFunction } from './appendFunction';

export function initializeComponentRef<TProps, TState>(obj: React.Component<TProps, TState>): void {
  obj.componentDidUpdate = appendFunction(this.componentDidUpdate, _updateComponentRef);
  obj.componentDidMount = appendFunction(this.componentDidMount, _setComponentRef);
  obj.componentWillUnmount = appendFunction(this.componentWillUnmount, _clearComponentRef);
}

// tslint:disable-next-line:no-any
const _updateComponentRef = (newProps: { componentRef: (ref: any) => void }) => {
  const { componentRef } = this.props;
  if (componentRef !== newProps.componentRef) {
    componentRef(null);
    newProps.componentRef(this);
  }
};

const _setComponentRef = () => {
  const { componentRef } = this.props;
  componentRef && componentRef(this);
};

const _clearComponentRef = () => {
  const { componentRef } = this.props;
  componentRef && componentRef(null);
};
