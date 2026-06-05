import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './dialog.definition-async.js';
import { Dialog } from './dialog.js';

RenderableFASTElement(Dialog).defineAsync(definition);
