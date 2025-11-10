import * as React from 'react';

export const DOMFunction: React.FunctionComponent<{ isButton?: boolean; id?: string }> = props => {
  const { id = 'node', isButton, ...rest } = props;

  return isButton ? <button {...rest} id={id} /> : <div {...rest} id={id} />;
};

export const CompositeFunction: React.FunctionComponent = props => <DOMFunction {...props} />;

export class DOMClass extends React.Component {
  render() {
    return <div {...this.props} id="node" />;
  }
}

export class CompositeClass extends React.Component {
  render() {
    return <DOMClass {...this.props} />;
  }
}

export const ForwardedRef = React.forwardRef<HTMLButtonElement>((props, ref) => (
  <div>
    <button {...props} ref={ref} />
  </div>
));
