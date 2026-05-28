import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './label.definition-async.js';
import { Label } from './label.js';

RenderableFASTElement(Label).defineAsync(definition);
