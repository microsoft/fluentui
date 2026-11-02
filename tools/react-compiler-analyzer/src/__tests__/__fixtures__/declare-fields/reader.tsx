import * as React from 'react';

declare const store: { getState(): { value: string } };

export class LegacyLabel extends React.Component<{ label: string }> {
  declare context: unknown;

  render() {
    return <span>{this.props.label}</span>;
  }
}

export function readValue(): string {
  return store.getState().value;
}
