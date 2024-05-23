import * as React from 'react';
import { DecoratorNode, NodeKey, LexicalNode } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';

const NamePillComponent = ({ node, id }) => {
  // const [editor] = useLexicalComposerContext();
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(node.__key);

  React.useEffect(() => {
    console.log('selected', isSelected);
  }, [isSelected]);

  return (
    <span
      style={{
        color: isSelected ? 'red' : 'blue',
        padding: '1px 2px',
        margin: '0 2px',
        background: 'lightBlue',
        userSelect: 'none',
        display: 'inline-block',
      }}
    >
      {id}
    </span>
  );
};

export class NamePillNode extends DecoratorNode<React.ReactNode> {
  __id: string;

  public static getType(): string {
    return 'name-pill';
  }

  static clone(node: NamePillNode): NamePillNode {
    return new NamePillNode(node.__id, node.__key);
  }

  constructor(id: string, key?: NodeKey) {
    super(key);
    this.__id = id;
  }

  createDOM(): HTMLElement {
    const el = document.createElement('span');
    el.ariaLabel = this.__id;
    return el;
  }

  updateDOM(): false {
    return true;
  }

  decorate(): React.ReactNode {
    return <NamePillComponent id={this.__id} node={this} />;
  }
}

export function $createNamePillNode(id: string): NamePillNode {
  return new NamePillNode(id);
}

export function $isNamePillNode(node: LexicalNode | null | undefined): node is NamePillNode {
  return node instanceof NamePillNode;
}
