import { extname } from 'node:path';

import { parseSync } from 'oxc-parser';
import type { EcmaScriptModule, OxcError, ParserOptions, Program, Comment } from 'oxc-parser';

import { SourceLocations } from './loc';
import { AstParents } from './traverse';

export interface ParsedSource {
  filePath: string;
  source: string;
  program: Program;
  module: EcmaScriptModule;
  comments: Comment[];
  diagnostics: OxcError[];
  locations: SourceLocations;
  parents: AstParents;
}

export class SourceParseError extends Error {
  public readonly code = 'RCA_PARSE_ERROR';

  public constructor(public readonly filePath: string, public readonly diagnostics: OxcError[]) {
    super(diagnostics.map(diagnostic => diagnostic.message).join('\n'));
    this.name = 'SourceParseError';
  }
}

function languageForFile(filePath: string): NonNullable<ParserOptions['lang']> {
  const lower = filePath.toLowerCase();
  if (lower.endsWith('.d.ts') || lower.endsWith('.d.mts') || lower.endsWith('.d.cts')) {
    return 'dts';
  }
  switch (extname(filePath).toLowerCase()) {
    case '.tsx':
      return 'tsx';
    case '.jsx':
      return 'jsx';
    case '.ts':
    case '.mts':
    case '.cts':
      return 'ts';
    default:
      return 'js';
  }
}

export function parseSource(source: string, filePath: string): ParsedSource {
  const result = parseSync(filePath, source, {
    lang: languageForFile(filePath),
    sourceType: 'unambiguous',
    showSemanticErrors: true,
  });
  const errors = result.errors.filter(diagnostic => diagnostic.severity === 'Error');
  if (errors.length > 0) {
    throw new SourceParseError(filePath, errors);
  }

  return {
    filePath,
    source,
    program: result.program,
    module: result.module,
    comments: result.comments,
    diagnostics: result.errors,
    locations: new SourceLocations(source),
    parents: new AstParents(result.program),
  };
}
