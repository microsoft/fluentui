import ts from 'typescript';
import { migration, warn } from '../../migration';
import { mod } from 'riceburn';

const typeName = 'ValuePosition';

export default migration('warn Slider.ValuePosition removed', () => {
  mod('**/*.ts?(x)').asTypescript((node, modder) => {
    if (ts.isTypeNode(node) && node.getFullText().indexOf(typeName) >= 0) {
      const sourceFile = node.getSourceFile();
      const sourceFileName = sourceFile.fileName;
      const lineAndCharacter = sourceFile.getLineAndCharacterOfPosition(node.getStart());
      warn(`${sourceFileName}:${lineAndCharacter.line}:${lineAndCharacter.character} - ${typeName} no longer available`);
    }
    return undefined;
  });
});
