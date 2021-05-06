import * as React from 'react';

export const DebugLine: React.FC<{
  [key: string]: any;
  children: React.ReactNode;
  active?: boolean;
  indent?: number;
  style?: React.CSSProperties;
  badge?: string;
  actionable?: boolean;
}> = ({ active, indent = 0, actionable, children, style, badge, ...rest }) => (
  <a
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: `${indent * 2}ch`,
      outline: 0,
      ...(actionable && {
        color: 'cornflowerblue',
        cursor: 'pointer',
      }),
      ...(active && {
        background: 'rgba(255, 255, 255, 0.1)',
      }),
      ...style,
    }}
    {...rest}
  >
    {children}
    {badge && <span style={{ padding: '0 4px', fontSize: 10, opacity: 0.75 }}>{badge}</span>}
  </a>
);
