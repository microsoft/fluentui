import * as React from 'react';
import { LexicalEditor } from './LexicalEditor';
import { Prototype } from './utils/stories';

export const LexicalPicker: React.FC = () => {
  return (
    <Prototype pageTitle="Lexical">
      <h1>Lexical picker</h1>
      <LexicalEditor />
    </Prototype>
  );
};
