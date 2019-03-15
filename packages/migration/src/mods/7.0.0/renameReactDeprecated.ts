import { mod } from 'riceburn';
import ts from 'typescript';

mod('**/*.ts?(x)').asTypescript((node, modder) => {
  // componentWill* -> UNSAFE_componentWill*
  if (ts.isClassDeclaration(node)) {
    for (const member of node.members) {
      if (member.name && member.name.getText() === 'componentWillReceiveProps') {
        return modder.replace(member.name, 'UNSAFE_componentWillReceiveProps');
      }
    }
  }
});
