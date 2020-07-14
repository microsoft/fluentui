import * as React from 'react';
import { defaultPerformanceFlags, StylesContextPerformance } from '@fluentui/react-bindings';

import * as styles from './styles';

type TelemetryPerfFlagsProps = {
  flags: StylesContextPerformance;
  onChange: (name: keyof StylesContextPerformance, value: boolean) => void;
};

export const TelemetryPerfFlags: React.FC<TelemetryPerfFlagsProps> = props => (
  <div style={styles.performanceFlags()}>
    {Object.keys(defaultPerformanceFlags).map(flag => (
      <div key={flag} style={styles.performanceFlag()}>
        <input
          checked={props.flags[flag as keyof StylesContextPerformance]}
          name={flag}
          type="checkbox"
          onChange={e => props.onChange(e.target.name as keyof StylesContextPerformance, e.target.checked)}
        />
        <label style={styles.performanceFlagLabel()}>{flag}</label>
      </div>
    ))}
  </div>
);
