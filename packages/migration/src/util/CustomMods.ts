import os from 'os';
import ts from 'typescript';
import { Modder, TypescriptMod } from 'riceburn/lib/interfaces';
import { generateImport } from './MoveImports';

export function renameJsxNodeIfHasProp(
  nodePrevName: string,
  nodeNewName: string,
  prop: string
): (node: ts.Node, modder: Modder) => TypescriptMod | TypescriptMod[] | undefined {
  return (node: ts.Node, modder: Modder) => {
    let nodeHasImport: boolean = false;
    let nodeHasProp: boolean = false;

    // Append new node name in imports.
    if (
      ts.isImportDeclaration(node) &&
      node.importClause &&
      node.importClause.namedBindings &&
      ts.isNamedImports(node.importClause.namedBindings)
    ) {
      let importPackage = node.moduleSpecifier.getText();
      importPackage = importPackage.substr(1, importPackage.length - 2);
      const namedBindings = node.importClause.namedBindings;
      const imports: string[] = [];
      namedBindings.forEachChild(binding => {
        if (binding.getText() === nodePrevName) {
          nodeHasImport = true;
          imports.push(binding.getText());
        }
      });
      if (nodeHasImport) {
        return modder.replace(
          node,
          [generateImport(importPackage, imports), generateImport(importPackage, [nodeNewName])].filter(s => s !== undefined).join(os.EOL)
        );
      }
    }

    // Replace the previous node name with the new one.
    if (ts.isJsxOpeningLikeElement(node)) {
      if (node.tagName.getText() === nodePrevName && node.attributes && node.attributes.properties) {
        for (const p of node.attributes.properties) {
          if (p && ts.isJsxAttribute(p) && p.name && p.name.getText() === prop) {
            nodeHasProp = true;
            break;
          }
        }

        if (nodeHasProp) {
          return modder.replace(node.tagName, nodeNewName);
        }
      }
    }
  };
}

export function removeProp(nodeName: string, prop: string): (node: ts.Node, modder: Modder) => TypescriptMod | undefined {
  return (node: ts.Node, modder: Modder) => {
    // Replace the previous node name with the new one.
    if (ts.isJsxOpeningLikeElement(node)) {
      if (node.tagName.getText() === nodeName && node.attributes && node.attributes.properties) {
        for (const p of node.attributes.properties) {
          if (p && ts.isJsxAttribute(p) && p.name && p.name.getText() === prop) {
            return modder.removeFull(p);
          }
        }
      }
    }
  };
}
