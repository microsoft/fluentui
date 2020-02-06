import * as React from 'react'
import { KnobContext, LogContext } from './KnobContexts'

type LogInspectorProps = {
  /** Will be hidden if is empty. */
  silent?: boolean
}

const LogInspector: React.FunctionComponent<LogInspectorProps> = props => {
  const { components } = React.useContext(KnobContext)
  const { clearLog, items } = React.useContext(LogContext)

  const visible = props.silent ? items.length > 0 : true

  return visible ? React.createElement(components.LogInspector, { clearLog, items }) : null
}

export default LogInspector
