import { Toolbar } from '@fluentui/react-northstar';
import * as React from 'react';

const stateReducer: React.Reducer<
  { bold: boolean; italic: boolean; underline: boolean; more: boolean },
  'bold' | 'italic' | 'underline' | 'more'
> = (prevState, action) => ({ ...prevState, [action]: !prevState[action] });

const ToolbarExampleShorthand = () => {
  const [state, dispatch] = React.useReducer(stateReducer, {
    bold: false,
    italic: false,
    more: false,
    underline: false,
  });

  return (
    <Toolbar
      aria-label="Text editor"
      items={[
        {
          key: 'bold',
          kind: 'toggle',
          active: state.bold,
          icon: { name: 'bold', outline: true },
          title: 'Toggle bold',
          onClick: () => dispatch('bold'),
        },
        {
          key: 'italic',
          kind: 'toggle',
          active: state.italic,
          icon: { name: 'italic', outline: true },
          title: 'Toggle italic',
          onClick: () => dispatch('italic'),
        },
        {
          key: 'underline',
          kind: 'toggle',
          active: state.underline,
          icon: { name: 'underline', outline: true },
          title: 'Toggle underline',
          onClick: () => dispatch('underline'),
        },
        { key: 'divider-1', kind: 'divider' },
        { key: 'font-size', icon: { name: 'font-size', outline: true }, title: 'Font size' },
        {
          key: 'remove-format',
          icon: { name: 'remove-format', outline: true },
          title: 'Remove formatting',
        },
        { key: 'divider-2', kind: 'divider' },
        { key: 'outdent', icon: { name: 'outdent', outline: true }, title: 'Outdent' },
        { key: 'indent', icon: { name: 'indent', outline: true }, title: 'Indent' },
        { key: 'divider-3', kind: 'divider' },
        {
          key: 'more',
          icon: { name: 'more', outline: true },
          active: state.more,
          title: 'More',
          menu: [
            { key: 'quote', content: 'Quote', icon: 'quote' },
            { key: 'link', content: 'Link', icon: 'link', disabled: true },
            { key: 'code', content: 'Code snippet', icon: 'code-snippet' },
          ],
          menuOpen: state.more,
          onMenuOpenChange: () => dispatch('more'),
        },
      ]}
    />
  );
};

export default ToolbarExampleShorthand;
