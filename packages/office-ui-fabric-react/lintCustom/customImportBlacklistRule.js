'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
exports.__esModule = true;
var Lint = require('tslint');
var ts = require('typescript');
var Rule = /** @class */ (function(_super) {
  __extends(Rule, _super);
  function Rule() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Rule.prototype.isEnabled = function() {
    return _super.prototype.isEnabled.call(this) && this.ruleArguments.length > 0;
  };
  Rule.prototype.apply = function(sourceFile) {
    return this.applyWithWalker(
      new CustomImportBlacklistWalker(sourceFile, this.ruleName, {
        modulesWithBannedImports: this.ruleArguments[0].modulesWithBannedImports
      })
    );
  };
  Rule.metadata = {
    ruleName: 'custom-import-blacklist',
    description: 'Disallows imports that were blacklisted from specific modules.',
    optionsDescription: Lint.Utils.dedent(
      templateObject_1 ||
        (templateObject_1 = __makeTemplateObject(
          [
            "\n        'modulesWithBannedImports': a list of arrays where in each array the first item is a regex pattern\n        for the module that is imported from and the rest of the elements are regex patterns of the imports\n        to forbid importing from the matched module. If only the module element is provided, then the whole\n        import statement is disallowed."
          ],
          [
            "\n        'modulesWithBannedImports': a list of arrays where in each array the first item is a regex pattern\n        for the module that is imported from and the rest of the elements are regex patterns of the imports\n        to forbid importing from the matched module. If only the module element is provided, then the whole\n        import statement is disallowed."
          ]
        ))
    ),
    options: {
      type: 'object',
      properties: {
        modulesWithBannedImports: {
          type: 'array',
          items: {
            type: 'array',
            items: {
              type: 'string'
            },
            minLength: 1
          },
          minLength: 1
        }
      },
      additionalProperties: false
    },
    optionExamples: [[true, { modulesWithBannedImports: [['lodash', 'pull'], ['lodash', 'pullAll']] }]],
    type: 'functionality',
    typescriptOnly: true
  };
  Rule.FAILURE_STRING = 'Import statement forbidden';
  return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
// The walker takes care of all the work.
var CustomImportBlacklistWalker = /** @class */ (function(_super) {
  __extends(CustomImportBlacklistWalker, _super);
  function CustomImportBlacklistWalker() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  CustomImportBlacklistWalker.prototype.walk = function(sourceFile) {
    var _this = this;
    // create a failure at the current position
    var cb = function(node) {
      if (node.kind === ts.SyntaxKind.ImportDeclaration) {
        var bannedModuleIndex = _this._bannedModuleIndex(node);
        if (bannedModuleIndex !== undefined) {
          var options = _this.options.modulesWithBannedImports;
          var bannedModule = options && options[bannedModuleIndex];
          if (bannedModule && bannedModule.length > 1) {
            var namedBindings = node.importClause && node.importClause.namedBindings;
            var bannedImportsOfBannedModule = _this._bannedImportsOfBannedModule(namedBindings, bannedModuleIndex);
            if (bannedImportsOfBannedModule.length) {
              _this.addFailureAtNode(node, Rule.FAILURE_STRING + ': ' + bannedImportsOfBannedModule.join(', '));
            }
          } else {
            _this.addFailureAtNode(node, Rule.FAILURE_STRING + ' from ' + node.moduleSpecifier.getText() + '.');
          }
        }
      } else {
        // Continue rescursion: call function `cb` for all children of the current node.
        return ts.forEachChild(node, cb);
      }
    };
    return ts.forEachChild(sourceFile, cb); // start recursion with children of sourceFile
  };
  CustomImportBlacklistWalker.prototype._bannedModuleIndex = function(node) {
    var options = this.options.modulesWithBannedImports;
    if (!options) {
      return;
    }
    var nodeText = node.moduleSpecifier.getText();
    for (var i = 0, l = options.length; i < l; i++) {
      var option = options[i];
      if (RegExp(option[0], 'gi').test(nodeText)) {
        return i;
      }
    }
  };
  CustomImportBlacklistWalker.prototype._bannedImportsOfBannedModule = function(namedImports, bannedModuleIndex) {
    var _this = this;
    var bannedImports = [];
    namedImports.elements.forEach(function(element) {
      var importText = element.name.text;
      if (_this._checkImport(importText, bannedModuleIndex)) {
        bannedImports.push(importText);
      }
    });
    return bannedImports;
  };
  CustomImportBlacklistWalker.prototype._checkImport = function(importText, bannedModuleIndex) {
    var options = this.options.modulesWithBannedImports;
    var bannedModule = options[bannedModuleIndex];
    for (var i = 1, l = bannedModule.length; i < l; i++) {
      var importPattern = bannedModule[i];
      if (RegExp(importPattern, 'gi').test(importText)) {
        return true;
      }
    }
    return false;
  };
  return CustomImportBlacklistWalker;
})(Lint.AbstractWalker);
var templateObject_1;
