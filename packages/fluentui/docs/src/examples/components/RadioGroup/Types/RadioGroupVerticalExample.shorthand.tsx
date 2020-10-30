import * as React from 'react';
import { Divider, RadioGroup } from '@fluentui/react-northstar';

class RadioGroupVerticalExample extends React.Component {
  state = { selectedValue: '', inputTabIndex: '-1' };

  render() {
    const { selectedValue } = this.state;
    return (
      <div style={{ maxWidth: '400px' }}>
        The selected value is: {selectedValue}
        <Divider />
        <RadioGroup
          vertical
          defaultCheckedValue="prosciutto"
          items={this.getItems()}
          onCheckedValueChange={this.handleChange}
        />
      </div>
    );
  }

  getItems() {
    return [
      {
        name: 'pizza',
        key: 'Capricciosa',
        label: 'Capricciosa',
        value: 'capricciosa',
      },
      {
        name: 'pizza',
        key: 'Prosciutto',
        label: 'Prosciutto',
        value: 'prosciutto',
        disabled: true,
      },
      {
        name: 'pizza',
        key: 'Pepperoni',
        label: 'Pepperoni',
        value: 'pepperoni',
      },
    ];
  }

  handleChange = (e, props) =>
    this.setState({ selectedValue: props.value, inputTabIndex: props.value === 'custom' ? '0' : '-1' });
}

export default RadioGroupVerticalExample;
