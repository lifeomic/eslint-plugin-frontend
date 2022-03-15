# require-react-intl-define-messages

In apps using `react-intl`, we want to ensure that the `MessageDescriptor` parameter is defined when being passed
into `formatMessage`.

## Examples

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
