import * as React from 'react';

declare const prefix: string;

export class LegacyLabel extends React.Component<{ label: string }> {
  declare context: unknown;

  render() {
    return <span>{this.props.label}</span>;
  }
}

export function Label({ label }: { label: string }) {
  return (
    <span>
      {prefix}
      {label}
    </span>
  );
}
