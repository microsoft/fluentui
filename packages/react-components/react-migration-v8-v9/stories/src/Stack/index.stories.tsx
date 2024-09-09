import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Checkbox, Dropdown, DropdownMenuItemType, Stack, TextField } from '@fluentui/react';
import type { IDropdownOption } from '@fluentui/react';
import { StackShim, StackItemShim } from '@fluentui/react-migration-v8-v9';

import descriptionMd from './Description.md';

const horizontalAlignOptions: IDropdownOption[] = [
  {
    key: 'HorizontalAlignOptions',
    text: 'Horizontal Align Options',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'horizontalAlign-baseline', text: 'baseline' },
  { key: 'horizontalAlign-center', text: 'center' },
  { key: 'horizontalAlign-start', text: 'start' },
  { key: 'horizontalAlign-end', text: 'end' },
  { key: 'horizontalAlign-stretch', text: 'stretch' },
  { key: 'horizontalAlign-space-between', text: 'space-between' },
  { key: 'horizontalAlign-space-around', text: 'space-around' },
  { key: 'horizontalAlign-space-evenly', text: 'space-evenly' },
];

const verticalAlignOptions: IDropdownOption[] = [
  {
    key: 'VerticalAlignOptions',
    text: 'VerticalAlignOptions Align Options',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'verticalAlign-baseline', text: 'baseline' },
  { key: 'verticalAlign-center', text: 'center' },
  { key: 'verticalAlign-start', text: 'start' },
  { key: 'verticalAlign-end', text: 'end' },
  { key: 'verticalAlign-stretch', text: 'stretch' },
  { key: 'verticalAlign-space-between', text: 'space-between' },
  { key: 'verticalAlign-space-around', text: 'space-around' },
  { key: 'verticalAlign-space-evenly', text: 'space-evenly' },
];

const styles = {
  root: {
    maxWidth: '200px',
  },
};

const useCustomStyles = makeStyles({
  stackWrapper: {
    width: '100%',
  },
  stack: {
    backgroundColor: 'pink',
    minHeight: '200px',
  },
  stackItem: {
    backgroundColor: 'lightblue',
  },
});

export const Playground = () => {
  const [state, setState] = React.useState({
    verticalFill: false,
    horizontal: false,
    reversed: false,
    wrap: false,
    disableShrink: false,

    horizontalAlign: undefined,
    verticalAlign: undefined,
    grow: false,
  });
  const [childrenGapToken, setChildrenGapToken] = React.useState<number | string>('10');
  const [paddingToken, setPaddingToken] = React.useState<number | string>('10px');

  const onCheckboxChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    const { name } = ev?.target as HTMLInputElement;

    setState({ ...state, [name]: checked });
  };

  const onDropdownChange = (ev: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
    const name = option!.key.toString().split('-')[0];
    const value = option!.text;
    setState({
      ...state,
      [name]: value,
    });
  };

  const onChildrenGapTokenChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setChildrenGapToken(newValue!);
  };

  const onPaddingTokenChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    setPaddingToken(newValue!);
  };
  const shimStyles = useCustomStyles();
  const stackShimStyles = shimStyles.stack;
  const stackStyles = {
    root: { backgroundColor: 'pink', minHeight: '200px' },
  };
  const stackItemStyles = { root: { backgroundColor: 'lightblue' } };
  const stackItemShimStyles = shimStyles.stackItem;
  return (
    <Stack styles={{ root: { width: '100%' } }}>
      <h1>Stack Playground</h1>
      <Stack horizontal>
        <Stack tokens={{ childrenGap: 10, padding: 20 }}>
          <Checkbox name="verticalFill" checked={state.verticalFill} label="verticalFill" onChange={onCheckboxChange} />
          <Checkbox name="horizontal" checked={state.horizontal} label="horizontal" onChange={onCheckboxChange} />
          <Checkbox name="reversed" checked={state.reversed} label="reversed" onChange={onCheckboxChange} />
          <Checkbox name="wrap" checked={state.wrap} label="wrap" onChange={onCheckboxChange} />
          <Checkbox
            name="disableShrink"
            checked={state.disableShrink}
            label="disableShrink"
            onChange={onCheckboxChange}
          />
          <Dropdown
            placeholder="Select an option"
            label={'horizontalAlign'}
            options={horizontalAlignOptions}
            onChange={onDropdownChange}
            styles={styles}
          />
          <Dropdown
            placeholder="Select an option"
            label={'verticalAlign'}
            options={verticalAlignOptions}
            onChange={onDropdownChange}
            styles={styles}
          />
        </Stack>
        <Stack tokens={{ childrenGap: 10 }}>
          <TextField
            label="children gap token"
            onChange={onChildrenGapTokenChange}
            styles={styles}
            value={childrenGapToken as string}
          />
          <TextField
            label="padding token"
            onChange={onPaddingTokenChange}
            value={paddingToken as string}
            styles={styles}
          />
        </Stack>
      </Stack>
      <Stack horizontal horizontalAlign={'space-evenly'}>
        <div className={shimStyles.stackWrapper}>
          <h2>v8</h2>
          <Stack
            as={'span'}
            verticalFill={state.verticalFill}
            horizontal={state.horizontal}
            reversed={state.reversed}
            wrap={state.wrap}
            disableShrink={state.disableShrink}
            horizontalAlign={state.horizontalAlign}
            verticalAlign={state.verticalAlign}
            tokens={{
              childrenGap: childrenGapToken,
              padding: paddingToken,
              maxHeight: '500px',
              maxWidth: '500px',
            }}
            styles={stackStyles}
          >
            <Stack.Item styles={stackItemStyles}>Stack Item </Stack.Item>
            <Stack.Item align={'end'} styles={stackItemStyles}>
              Stack Item Self Aligned
            </Stack.Item>
            <Stack.Item grow={1} styles={stackItemStyles}>
              Stack Item Grow
            </Stack.Item>
            <Checkbox label="checkbox 1" styles={stackItemStyles} />
            <Checkbox label="checkbox 2" styles={stackItemStyles} />
          </Stack>
        </div>
        <div className={shimStyles.stackWrapper}>
          <h2>StackShim</h2>
          <StackShim
            as={'span'}
            verticalFill={state.verticalFill}
            horizontal={state.horizontal}
            reversed={state.reversed}
            wrap={state.wrap}
            disableShrink={state.disableShrink}
            horizontalAlign={state.horizontalAlign}
            verticalAlign={state.verticalAlign}
            tokens={{
              childrenGap: childrenGapToken,
              padding: paddingToken,
              maxHeight: '500px',
              maxWidth: '500px',
            }}
            className={stackShimStyles}
          >
            <StackItemShim className={stackItemShimStyles}>Stack Item </StackItemShim>
            <StackItemShim align={'end'} className={stackItemShimStyles}>
              Stack Item Self Aligned
            </StackItemShim>
            <StackItemShim grow={1} className={stackItemShimStyles}>
              Stack Item Grow
            </StackItemShim>
            <Checkbox label="checkbox 1" className={stackItemShimStyles} />
            <Checkbox label="checkbox 2" className={stackItemShimStyles} />
          </StackShim>
        </div>
      </Stack>
    </Stack>
  );
};

export default {
  title: 'Migration Shims/V8/StackShim',
  component: StackShim,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
