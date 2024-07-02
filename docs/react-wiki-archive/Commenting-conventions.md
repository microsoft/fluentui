We use tooling to convert comments in code to documentation. Please follow the conventions below when writing public facing API comments.

First take a look here on general guidance in tone, inclusion, etc:

https://docs.microsoft.com/en-us/style-guide/welcome/

# General strategy

When writing public facing comments, think like the consumer, not like the developer writing code. Ask yourself, why would I use this property/method?

Don't be too verbose. Try to convey purpose in the a single sentence, and only use multiple sentences if you need to.

When referring to other types in comments, use cross-linking:

> Defines the {@link #Foo | \`Foo\`} component to use in the slot.

> Defines the uncontrolled default value to use. See {@link #value | \`value\`} for providing a controlled value.

When cross-linking isn't available but you are still referencing a code construct, use backticks to format the construct using monospace formatting, which helps communicate the differentiation.

# Input prop comments

Props should start with a verb of what they do. Typically props "define" a value, but they can also "disable" a feature or

Good:

> Defines the horizontal alignment for immediately descending child elements.

Bad:

> Horizontal alignment.

> Horizontal alignment of children.

# Imperative setter/getter properties

Read-only getter property comments start with "Gets":

> Gets the current value of the input element.

While properties with getters and setters start with "Gets/sets":

> Gets/sets the current value of the input element.

# Imperative methods

Methods typically do things. Start the comment with a verb, indicating what it does. If it "does its best to do a thing in the current context", it "Attempts" to do something.

Examples:

> Attempts to force capture of the mouse to this element.

> Attempts to set focus to this element.

> Scrolls content by one logical unit to the left.

> Defines the parent-child relationship between two visuals.
