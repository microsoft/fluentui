import { ITheme } from './theme.types';

type TokenDict = { [name: string]: IToken };

interface IToken {
  resolve(theme: any): void;
  value: any;
  isResolvable: boolean;
  isResolved: boolean;
}

class LiteralToken implements IToken {
  public isResolvable = true;
  public isResolved = true;

  constructor(public name: string, public value: string | number) {}
  resolve(theme: any): void {}
}

class FunctionToken implements IToken {
  private _isResolved: boolean = false;

  static fromFunction(tokens: TokenDict, name: string, rawToken: any): IToken {
    return new FunctionToken(tokens, name, rawToken, []);
  }

  static fromObject(tokens: TokenDict, name: string, rawToken: any): IToken {
    return new FunctionToken(tokens, name, rawToken.resolve, rawToken.dependsOn);
  }

  constructor(
    private tokens: TokenDict,
    public name: string,
    public valueFn: (tokenVals: any[], theme: any) => any,
    public deps: string | string[],
  ) {}

  public value: any;

  resolve(theme: any): void {
    const deps = Array.isArray(this.deps) ? this.deps : [this.deps];
    const resolvedDeps = deps.map(d => this.tokens[d].value);
    this.value = this.valueFn ? this.valueFn(resolvedDeps, theme) : resolvedDeps[0];
    this._isResolved = true;
  }

  get isResolvable(): boolean {
    return Array.isArray(this.deps)
      ? this.deps.every(e => this.tokens[e].isResolved)
      : this.tokens[this.deps].isResolved;
  }

  get isResolved(): boolean {
    return this._isResolved;
  }
}

class TokenFactory {
  static from(tokens: TokenDict, rawToken: any, name: string): IToken {
    switch (typeof rawToken) {
      case 'string':
      case 'number':
        return new LiteralToken(name, rawToken);
      case 'function':
        return FunctionToken.fromFunction(tokens, name, rawToken);
      case 'object':
        return FunctionToken.fromObject(tokens, name, rawToken);
      default:
        throw new Error('Unknown token type');
    }
  }
}

/**
 * resolveTokens
 * takes a set of tokens and resolves all references
 * @param name name of component, used to look up overrides in token
 * @param theme theme to resolve
 * @param sourceTokensSet
 * @internal
 */
export const resolveTokens = (name: string | undefined, theme: ITheme, sourceTokensSet: any[]) => {
  const tokens: TokenDict = {};

  sourceTokensSet.forEach(sourceTokens => {
    for (const tokenName in sourceTokens) {
      tokens[tokenName] = TokenFactory.from(tokens, sourceTokens[tokenName], tokenName);
    }
  });

  if (name && theme.components[name] && theme.components[name].tokens) {
    const sourceTokens = theme.components[name].tokens;
    for (const tokenName in sourceTokens) {
      tokens[tokenName] = TokenFactory.from(tokens, sourceTokens[tokenName], tokenName);
    }
  }

  let allResolved: boolean;
  do {
    allResolved = true;
    let progressed = false;

    for (const tokenName in tokens) {
      const token = tokens[tokenName];
      if (token.isResolved) {
        continue;
      }
      allResolved = false;
      if (!token.isResolvable) {
        continue;
      }
      token.resolve(theme);
      progressed = true;
    }
    if (!allResolved && !progressed) {
      throw new Error('Token deadlock');
    }
  } while (!allResolved);

  const result: any = {};
  for (const tokenName in tokens) {
    result[tokenName] = tokens[tokenName].value;
  }

  return result;
};
