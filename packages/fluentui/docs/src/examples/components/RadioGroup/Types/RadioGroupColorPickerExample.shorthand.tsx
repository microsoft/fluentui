import * as React from 'react';
import { Divider, RadioGroup } from '@fluentui/react-northstar';

class RadioGroupColorPickerExample extends React.Component {
  state = { selectedValue: '' };

  render() {
    const { selectedValue } = this.state;
    return (
      <div>
        The selected value is: {selectedValue}
        <Divider />
        <RadioGroup
          defaultCheckedValue="pink"
          items={['pink', 'blue', 'green', 'red', 'orange'].map(color => ({
            key: color,
            value: color,
            name: color,
            'aria-label': color,
            variables: {
              indicatorColorDefault: color,
              indicatorBackgroundColorChecked: color,
              indicatorBorderColorDefaultHover: color,
            },
          }))}
          onCheckedValueChange={(e, props) => this.setState({ selectedValue: props.value })}
        />
      </div>
    );
  }
}

export default RadioGroupColorPickerExample;
