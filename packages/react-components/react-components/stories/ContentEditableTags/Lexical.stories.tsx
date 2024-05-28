import * as React from 'react';
import { LexicalEditor } from './LexicalEditor';
import { Prototype } from './utils/stories';

export const Lexical: React.FC = () => {
  return (
    <Prototype pageTitle="Lexical">
      <h1>Lexical editor</h1>
      <LexicalEditor />
    </Prototype>
  );
};
