import plugin, { globalizeGroupMarkers, globalizeSelector } from '@fluentui/postcss-tailwind-css-modules';
import type { Options } from '@fluentui/postcss-tailwind-css-modules';
import type { Plugin } from 'postcss';

const options: Options = { include: file => file.endsWith('.module.css') };
const result: Plugin = plugin(options);
const namedResult = globalizeGroupMarkers(options);
const rewritten: string = globalizeSelector('.peer\\/example').selector;

void [result, namedResult, rewritten];
