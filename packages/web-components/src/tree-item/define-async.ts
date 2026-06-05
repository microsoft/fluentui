import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './tree-item.definition-async.js';
import { TreeItem } from './tree-item.js';

RenderableFASTElement(TreeItem).defineAsync(definition);
