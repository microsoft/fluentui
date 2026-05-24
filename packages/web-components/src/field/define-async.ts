import { RenderableFASTElement } from '@microsoft/fast-html';
import { definition } from './field.definition-async.js';
import { Field } from './field.js';

RenderableFASTElement(Field).defineAsync(definition);
