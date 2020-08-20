# jsx-no-untranslated-string-literals

In apps supporting multiple languages, it's recommended that all static strings use translated strings instead.

This rule is almost a direct copy of [the eslint-plugin-react/jsx-no-literals](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-literals.md) rule. All of the rule options apply. Below are some LifeOmic-specific examples/suggestions:

## Examples

We can accomplish this by converting the following:

```javascript
import * as React from "react";

const MyComponent = () => {
  return <p>Some untranslated text!</p>;
};
```

To use a library such as `react-intl`:

```javascript
import * as React from "react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  foo: {
    id: "translated",
    defaultMessage: "Some *translated* text!",
  },
});

const MyComponent = () => {
  const { formatMessage } = useIntl();

  return <p>{formatMessage(messages.foo)}</p>;
};
```

## Notes

- To get around this rule, you can also wrap the string in a JSX container (not recommended)

An example of that would be:

```javascript
import * as React from "react";

const MyComponent = () => {
  return <p>{"Some untranslated text!"}</p>;
};
```
