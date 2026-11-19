import plugin = require('@fluentui/postcss-tailwind-css-modules');
import type { Plugin, PluginCreator } from 'postcss';

const options: plugin.Options = { include: true };
const result: Plugin = plugin(options);
const creator: PluginCreator<plugin.Options> = plugin;
const namedResult = plugin.globalizeGroupMarkers(options);
const marker: RegExp = plugin.GROUP_OR_PEER_MARKER;
const rewritten: string = plugin.globalizeSelector('.group\\/example').selector;

void [result, creator, namedResult, marker, rewritten];
