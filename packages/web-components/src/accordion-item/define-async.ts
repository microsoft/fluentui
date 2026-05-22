import { RenderableFASTElement } from '@microsoft/fast-html';
import { AccordionItem } from './accordion-item.js';
import { definition } from './accordion-item.definition-async.js';

RenderableFASTElement(AccordionItem).defineAsync(definition);
