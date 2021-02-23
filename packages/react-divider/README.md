# @fluentui/react-divider

**React Divider components for [Fluent UI](https://dev.microsoft.com/fluentui)**

The Divider component represents a visual separator, that may contain content. A Divider can be vertical or horizontal.

## STATUS: WIP 🚧

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## Usage

To import Divider:

```js
import { Divider } from '@fluentui/react-divider';
```

Once the Divider component graduates to a production release, the component will be available at:

```js
import { Divider } from '@fluentui/react';
```

### Examples

Horizontal

```jsx
<Divider />
<Divider>With content</Divider>
<Divider><Icon/></Divider>
```

Vertical

```jsx
<Divider vertical/>
<Divider vertical>With content</Divider>
<Divider vertical height="300px">With content</Divider>
```

Appearances Variations:

```jsx
<Divider appearance="subtle">With content</Divider>
<Divider appearance="strong">With content</Divider>
<Divider appearance="brand">With content</Divider>
```

Inset:

```jsx
<Divider inset/>
<Divider vertical inset/>
```

Important:

```jsx
<Divider important/>
<Divider vertical important/>
```

Alignments:

```jsx
<Divider alignContent="start">With content</Divider>
<Divider alignContent="center">With content</Divider>
<Divider alignContent="end">With content</Divider>
<Divider alignContent="start" vertical>With content</Divider>
<Divider alignContent="center" vertical>With content</Divider>
<Divider alignContent="end" vertical>With content</Divider>
```

Divider color:

```jsx
<Divider color="red"/>
<Divider vertical color="#FF0000"/>
```

Specified Height/Width:

```jsx

<Divider width="200px"/>
<Divider vertical height="200px"/>
```

Overrides:

```jsx

<Divider fontColor="blue">With content</Divider>
<Divider borderStyle="dashed" borderSize={2}/>
<Divider margin="10px 0">With content</Divider>
```
