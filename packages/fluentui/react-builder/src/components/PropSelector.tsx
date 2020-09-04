import * as React from 'react';
import { Dialog, Flex, RadioGroup, Divider, Text, Input } from '@fluentui/react-northstar';

export const PropSelector: React.FunctionComponent<{ components: any; onConfirm: any; onCancel: () => void }> = ({
  components,
  onConfirm,
  onCancel,
}) => {
  console.log(JSON.parse(JSON.stringify(components)));
  components;
  const propItems = components.parent.props
    ? Object.keys(components.parent.props).map(prop => {
        return { name: 'prop', key: prop, label: prop, value: prop };
      })
    : [
        {
          name: 'prop',
          key: 'children',
          label: 'Children',
          value: 'children',
        },
      ];
  const optionsItems = [
    {
      name: 'options',
      key: 'add',
      label: 'Add component',
      value: 'add',
    },
    {
      name: 'options',
      key: 'replace',
      label: 'Replace component',
      value: 'replace',
    },
  ];
  const [selectedProp, setSelectedProp] = React.useState(false);
  const handlePropChange = (e, props) => {
    setSelectedProp(props.value);
  };

  const [operation, setOperation] = React.useState('add');
  const handleOperationChange = (e, props) => {
    setOperation(props.value);
  };

  const [index, setIndex] = React.useState(0);
  const handleIndexChange = (e, props) => {
    setIndex(props.value);
    return false;
  };

  return (
    <Dialog
      cancelButton="Cancel"
      confirmButton={{ content: 'Insert', disabled: !selectedProp }}
      onConfirm={() => onConfirm(selectedProp, operation, index)}
      onCancel={onCancel}
      header={`Inserting ${components.element.displayName} into ${components.parent.displayName}`}
      open
      content={
        <>
          <Flex fill style={{ margin: '2rem 0rem' }}>
            <Flex fill column>
              <Text content="Select the prop" />
              <Divider />
              <RadioGroup
                vertical
                defaultCheckedValue="children"
                items={propItems}
                onCheckedValueChange={handlePropChange}
              />
            </Flex>
            <Divider vertical />
            {Array.isArray(components.parent.props[selectedProp]) && (
              <>
                <Flex fill column>
                  <Text content="Select the operation" />
                  <Divider />
                  <RadioGroup
                    vertical
                    defaultCheckedValue="add"
                    items={optionsItems}
                    onCheckedValueChange={handleOperationChange}
                  />
                </Flex>
                <Divider vertical />
                <Flex fill column>
                  <Text content="Select the index" />
                  <Divider />
                  <Input onChange={handleIndexChange} defaultValue="0" type="number" />
                </Flex>
              </>
            )}
          </Flex>
          <Divider />
          <Text
            content={`${selectedProp}: ${JSON.stringify(
              components.parent.props[selectedProp] &&
                (Array.isArray(components.parent.props[selectedProp])
                  ? components.parent.props[selectedProp].map(x => {
                      if (typeof x === 'object') {
                        return x.displayName || x;
                      }
                      return x;
                    })
                  : components.parent.props[selectedProp]),
            )}`}
          />
        </>
      }
    />
  );
};
