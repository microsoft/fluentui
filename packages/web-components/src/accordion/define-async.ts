import { RenderableFASTElement } from '@microsoft/fast-html';
import { declarativeDefinition } from './accordion.definition-async.js';
import { Accordion } from './accordion.js';

RenderableFASTElement(Accordion).defineAsync(declarativeDefinition);
