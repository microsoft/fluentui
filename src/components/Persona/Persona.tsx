import * as React from 'react';

export interface IPersonaProps {
}

export default class Persona extends React.Component<IPersonaProps, any> {
  render() {
    let rootClass = 'ms-Persona';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}