import * as React from 'react';
import { Divider, RadioGroup, Input, Text } from '@fluentui/react-northstar';

class RadioGroupVerticalExample extends React.Component {
  state = { selectedValue: '', inputTabIndex: '-1' };

  render() {
    const { selectedValue } = this.state;
    return (
      <div>
        The selected value is: {selectedValue}
        <Divider />
        <RadioGroup
          defaultCheckedValue="capricciosa"
          items={this.getItems()}
          onCheckedValueChange={this.handleChange}
        />
      </div>
    );
  }

  getItems() {
    return [
      { name: 'pizza', key: 'Capricciosa', label: 'Capricciosa', value: 'capricciosa' },
      {
        name: 'pizza',
        key: 'Prosciutto',
        label: 'Prosciutto',
        value: 'prosciutto',
        disabled: true,
      },
      {
        name: 'pizza',
        key: 'Custom',
        label: (
          <Text>
            Choose your own <Input input={{ tabIndex: this.state.inputTabIndex }} inline placeholder="flavour" />
          </Text>
        ),
        value: 'custom',
        'aria-label': 'Press Tab to change flavour',
      },
    ];
  }

  handleChange = (e, props) => this.setState({ selectedValue: props.value });
}

export default RadioGroupVerticalExample;
