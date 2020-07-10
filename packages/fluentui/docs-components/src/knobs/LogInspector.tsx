import * as React from 'react';
import { KnobContext, LogContextFunctions, LogContextItems } from './KnobContexts';

type LogInspectorProps = {
  /** Will be hidden if is empty. */
  silent?: boolean;
};

export const LogInspector: React.FunctionComponent<LogInspectorProps> = props => {
  const { components } = React.useContext(KnobContext);

  const { clearLog } = React.useContext(LogContextFunctions);
  const items = React.useContext(LogContextItems);

  const visible = props.silent ? items.length > 0 : true;

  return visible ? React.createElement(components.LogInspector, { clearLog, items }) : null;
};
