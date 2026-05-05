# Charts Migration Guide

`Fluent Charting` controls are built on fluent v8 stack. But they work across v8 and v9 themes by using the v8ThemeShim.

Currently charts are brand invariant and don't require a BrandVariant palette to render correctly. This would evolve as we onboard new products and their unique theme requirements.

Richer integration with v9 components is WIP and coming soon.

Complete [this](https://aka.ms/chartingv9survey) short survey to share your data viz scenarios for v9.

See below examples for different v9 use cases with charts.

Refer to [Fluent v8 charts](https://aka.ms/fluentCharting) for detailed examples and code snippets of available charts.

You can reach out to the charting team by tagging `@microsoft/charting-team` in [discussion](https://github.com/microsoft/fluentui/discussions) items.

## Examples

### Basic Donut Chart

### Custom styling with color tokens

### Custom jsx control

Wrap any custom jsx element like `HoverCard`, or `Callout` in an explicit `FluentProvider` context.

Refer to the [sample application](https://github.com/microsoft/fluentui-charting-contrib/tree/main/tools/v9-migration) for complete source code to use charts in v9 context.
