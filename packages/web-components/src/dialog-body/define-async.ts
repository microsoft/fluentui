import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './dialog-body.definition-async.js';
import { DialogBody } from './dialog-body.js';

RenderableFASTElement(DialogBody).defineAsync(definition);
