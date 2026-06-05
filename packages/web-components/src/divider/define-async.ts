import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './divider.definition-async.js';
import { Divider } from './divider.js';

RenderableFASTElement(Divider).defineAsync(definition);
