import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './tree.definition-async.js';
import { Tree } from './tree.js';

RenderableFASTElement(Tree).defineAsync(definition);
