import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './accordion-item.definition-async.js';
import { AccordionItem } from './accordion-item.js';

RenderableFASTElement(AccordionItem).defineAsync(definition);
