import * as React from 'react';
import * as palette from './palette';

export default {
  title: 'Fluent UI/Theme/Palette',
};

const ColorTile = (props) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1em',
      background: props.value,
      color: '#fff',
      textShadow: '1px 0 0 #000, -1px 0 0 #000',
      width: 250,
    }}
  >
    <span>{props.name}</span>
    <span>{props.value}</span>
  </div>
);

const ColorRamp = (props) => (
  <div>
    <h2>{props.name}</h2>
    {Object.entries(props.ramp).map(([name, value]) => {
      return <ColorTile key={name + ':' + value} name={name} value={value} />;
    })}
  </div>
);

export const Palette = (props) => {
  const entries = Object.entries(props.palette);
  console.log(entries);
  entries.forEach(([name, value]) => console.log({ name, value }));
  return (
    <div style={{ display: 'flex' }}>
      {entries.map(([name, ramp]) => {
        return <ColorRamp key={name} name={name} ramp={ramp} />;
      })}
    </div>
  );
};
Palette.args = {
  palette,
};
