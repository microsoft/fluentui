import * as React from 'react';

export interface IPersonaCardProps {
}

export default class PersonaCard extends React.Component<IPersonaCardProps, any> {
  public render() {
    let rootClass = 'ms-PersonaCard';

    return (
      <div className={ rootClass }>
      </div>
    );
  }
}
