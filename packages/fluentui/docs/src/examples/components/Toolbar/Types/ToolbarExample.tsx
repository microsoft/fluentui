import { Toolbar, toggleButtonBehavior } from '@fluentui/react-northstar';
import * as React from 'react';
import {
  CodeSnippetIcon,
  LinkIcon,
  QuoteIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  FontSizeIcon,
  RemoveFormatIcon,
  OutdentIcon,
  IndentIcon,
  MoreIcon,
} from '@fluentui/react-icons-northstar';

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
    <Toolbar aria-label="Default">
      <Toolbar.Item
        accessibility={toggleButtonBehavior}
        active={state.bold}
        icon={<BoldIcon {...{ outline: true }} />}
        title="Toggle bold"
        onClick={() => dispatch('bold')}
      />
      <Toolbar.Item
        accessibility={toggleButtonBehavior}
        active={state.italic}
        icon={<ItalicIcon {...{ outline: true }} />}
        title="Toggle italic"
        onClick={() => dispatch('italic')}
      />
      <Toolbar.Item
        accessibility={toggleButtonBehavior}
        active={state.underline}
        icon={<UnderlineIcon {...{ outline: true }} />}
        title="Toggle underline"
        onClick={() => dispatch('underline')}
      />
      <Toolbar.Divider />

      <Toolbar.Item icon={<FontSizeIcon {...{ outline: true }} />} title="Font size" />
      <Toolbar.Item icon={<RemoveFormatIcon {...{ outline: true }} />} title="Remove formatting" />
      <Toolbar.Divider />

      <Toolbar.Item icon={<OutdentIcon {...{ outline: true }} />} title="Outdent" />
      <Toolbar.Item icon={<IndentIcon {...{ outline: true }} />} title="Indent" />
      <Toolbar.Divider />

      <Toolbar.Item
        icon={<MoreIcon {...{ outline: true }} />}
        active={state.more}
        title="More"
        menu={[
          { key: 'quote', content: 'Quote', icon: <QuoteIcon /> },
          { key: 'link', content: 'Link', icon: <LinkIcon />, disabled: true },
          { key: 'code', content: 'Code snippet', icon: <CodeSnippetIcon /> },
        ]}
        menuOpen={state.more}
        onMenuOpenChange={() => dispatch('more')}
      />
    </Toolbar>
  );
};

export default ToolbarExample;
