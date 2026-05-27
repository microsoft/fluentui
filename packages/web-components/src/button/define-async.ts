import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './button.definition-async.js';
import { Button } from './button.js';

RenderableFASTElement(Button).defineAsync(definition);
