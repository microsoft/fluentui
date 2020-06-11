# Conformance tests rules

---

1a- Component file exports a valid React element type

1b- Component file exports a valid React element type

2- Constructor/component is a named function (or has displayName)

3- Has a docblock, 5 to 25 words

4- Constructor/component name matches filename

5- Is exported at top level (unless opted out)

6- For sub-component, is a static property of its parent component. This ensures CardBody is exposed as Card.Body.

7- “Spreads user props” This pattern will move to the v7 pattern of plucking native props instead of spreading all unknown props. Data and aria props are always applied.

8- If it has as prop - “Renders the component as HTML tags”

9- If it has as prop - Renders as a functional component or passes as to the next component"

10- If it has as prop - Renders as a ReactClass or passes as to the next component

11- If it has as prop - If the component does not render any DOM, ensure it passes the as value to the next component.

12- If it has as prop - Passes extra props to the component it renders as.

14- Handles events transparently

13- Controlled props work properly
(v0) 13- Ensure auto controlled props behave as expected (should work like a vanilla React `<input />` value and defaultValue).
(v7,vnext) Same test but use list of props passed into test, not autoControlledProps

15- Default className handling for all components:

- Is applied to the root element
- Also applies user-provided `className` to root element
- User-provided `className` does not override default

16- Has static displayName matching constructor name

17- Reports telemetry to its Provider

18- Composed components - Overrides default displayName

19- Composed components - Overrides default debug name for accessibility

20- Composed components - Overrides default name for telemetry

21- Composed components - Overrides default className

22- Composed components - Allows definining additional style props

23- Composed components - Passes a ref to root element

25- Applies provided className to root

26- Has a corresponding top-level file(`src/<components>`) (option)

27- Top-level file imports the package version file

28- Aria attributes should be kebab-cased and not camelCased

29- Ensure custom callback names are consistent (e.g. `on[Part][Event]` == onItemClick, onChanged vs onChange, etc).

30- Opt-in if component is controlled: has symmetrical `<value>` and `default<Value>` with matching name for `<value>`, and does not have a prop `initial<Value>` (bad pattern in some components)

31- onChange handler signature

34- Most components will receive children and render them, but some might not, test but allow opt out. (composed: doesNotAllowChildren)

33- Validate that the component uses compose correctly

35- If the component has slots, validate that slots can take in string, jsx, objects, children functions
