import * as React from 'react';
import { Divider, RadioGroup, Input } from '@fluentui/react-northstar';

class RadioGroupCustomVerticalExample extends React.Component {
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
      {
        name: 'pizza',
        key: 'Custom',
        label: 'Choose your own',
        children: (Component, { key, ...props }) => {
          return (
            <div
              key={key}
              style={{
                display: 'inline-flex',
              }}
            >
              <Component {...props} />
              <Input
                onFocus={() => {
                  this.setState({ selectedValue: 'custom' });
                }}
                input={{ tabIndex: this.state.inputTabIndex }}
                inline
                placeholder="flavour"
              />
            </div>
          );
        },
        value: 'custom',
        'aria-label': 'Press Tab to change flavour',
      },
    ];
  }

  handleChange = (e, props) =>
    this.setState({ selectedValue: props.value, inputTabIndex: props.value === 'custom' ? '0' : '-1' });
}

export default RadioGroupCustomVerticalExample;
