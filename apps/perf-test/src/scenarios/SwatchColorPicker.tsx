import * as React from 'react';
import { SwatchColorPicker } from '@fluentui/react';

const colorCells = [
  { id: 'a', label: 'orange', color: '#ca5010' },
  { id: 'b', label: 'cyan', color: '#038387' },
  { id: 'c', label: 'blueMagenta', color: '#8764b8' },
];

const Scenario = () => <SwatchColorPicker columnCount={3} cellShape={'circle'} colorCells={colorCells} />;

export default Scenario;
