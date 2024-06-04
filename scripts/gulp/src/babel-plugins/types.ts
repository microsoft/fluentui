import { NodePath } from '@babel/traverse';
import * as T from '@babel/types';

export type BabelPluginArguments = {
  types: typeof T;
};

type BabelPluginVisitorFunction<T> = (path: NodePath<T>) => void;
type BabelPluginVisitor<T> =
  | BabelPluginVisitorFunction<T>
  | {
      exit: BabelPluginVisitorFunction<T>;
    };

export type BabelPlugin = (options: BabelPluginArguments) => {
  visitor: {
    // This type is extendable, feel to add own visitor types.
    ImportDeclaration: BabelPluginVisitor<T.ImportDeclaration>;
  };
};
