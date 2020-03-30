import { Toolbar, toggleButtonBehavior } from '@fluentui/react-northstar';
import * as React from 'react';

const stateReducer: React.Reducer<
  { bold: boolean; italic: boolean; underline: boolean; more: boolean },
  'bold' | 'italic' | 'underline' | 'more'
> = (prevState, action) => ({ ...prevState, [action]: !prevState[action] });

const ToolbarExample = () => {
  const [state, dispatch] = React.useReducer(stateReducer, {
    bold: false,
    italic: false,
    more: false,
    underline: false,
  });

  return (
    <Toolbar aria-label="Text editor">
      <Toolbar.Item
        accessibility={toggleButtonBehavior}
        active={state.bold}
        icon={{ name: 'bold', outline: true }}
        title="Toggle bold"
        onClick={() => dispatch('bold')}
      />
      <Toolbar.Item
        accessibility={toggleButtonBehavior}
        active={state.italic}
        icon={{ name: 'italic', outline: true }}
        title="Toggle italic"
        onClick={() => dispatch('italic')}
      />
      <Toolbar.Item
        accessibility={toggleButtonBehavior}
        active={state.underline}
        icon={{ name: 'underline', outline: true }}
        title="Toggle underline"
        onClick={() => dispatch('underline')}
      />
      <Toolbar.Divider />

      <Toolbar.Item icon={{ name: 'font-size', outline: true }} title="Font size" />
      <Toolbar.Item icon={{ name: 'remove-format', outline: true }} title="Remove formatting" />
      <Toolbar.Divider />

      <Toolbar.Item icon={{ name: 'outdent', outline: true }} title="Outdent" />
      <Toolbar.Item icon={{ name: 'indent', outline: true }} title="Indent" />
      <Toolbar.Divider />

      <Toolbar.Item
        icon={{ name: 'more', outline: true }}
        active={state.more}
        title="More"
        menu={[
          { key: 'quote', content: 'Quote', icon: 'quote' },
          { key: 'link', content: 'Link', icon: 'link', disabled: true },
          { key: 'code', content: 'Code snippet', icon: 'code-snippet' },
        ]}
        menuOpen={state.more}
        onMenuOpenChange={() => dispatch('more')}
      />
    </Toolbar>
  );
};

export default ToolbarExample;
