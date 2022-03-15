# require-react-intl-format-message-param

In apps using `react-intl`, we want to ensure that the `MessageDescriptor` parameter is defined when being passed
into `formatMessage`.

## Examples
# Invalid
```javascript
import * as React from "react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  foo: { defaultMessage: "foo" }, // Missing id
  bar: { id: "bar" }, // Missing defaultMessage
  baz: {}, // Missing id and defaultMessage
});

const MyComponent = () => {
  const { formatMessage } = useIntl();
  return (
    <>
      <div>{formatMessage(messages.foo)}</div>
      <div>{formatMessage(messages.bar)}</div>
      <div>{formatMessage(messages.baz)}</div>
      <div>{formatMessage(undefined)}</div>
    <>
  )
}
```

# Valid
```javascript
import * as React from "react";
import { defineMessages, useIntl } from "react-intl";

const messages = defineMessages({
  foo: {
    id: "foo",
    defaultMessage: "foo",
  },
});

const MyComponent = () => {
  const { formatMessage } = useIntl();
  return <div>{formatMessage(messages.foo)}</div>
}
```

## Notes

- This plugin only checks for parameters passed into functions named `formatMessage`.
