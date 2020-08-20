"use strict";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce intl strings be wrapped in defineMessages",
      category: "intl",
      recommended: false,
      url:
        "https://github.com/lifeomic/eslint-plugin-frontend/tree/master/docs/rules/require-react-intl-define-messages.md",
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const message =
      'Intl message objects should be wrapped in react-intl\'s "defineMessages".';

    return {
      VariableDeclaration: (node) => {
        let shouldWarnAboutObject = false;

        const variableDelcarations = node.declarations;

        if (!variableDelcarations) {
          return;
        }

        variableDelcarations.forEach((variable) => {
          // Our variable is not named "messages"
          if (variable.id.name !== "messages") {
            return;
          }

          // The variable "messages" is not defined as an object
          if (variable.init.type !== "ObjectExpression") {
            return;
          }

          // The object has no keys
          if (variable.init.properties && variable.init.properties.length > 0) {
            variable.init.properties.forEach((objectKey) => {
              // A key of the "messages" object is not an object
              // We expect:
              // { id: 'foo', defaultMessage: 'foo' }
              if (objectKey.type !== "Property") {
                return;
              }

              // Here we check the values of the object keys
              if (
                objectKey.value &&
                objectKey.value.properties &&
                objectKey.value.properties.length > 0
              ) {
                // objectKey.value allows us to target the
                // object above, which should contain the "id" and "defaultMessage"
                // props.
                objectKey.value.properties.forEach((supposedToBeIntlObject) => {
                  // Double check this is an object...
                  if (supposedToBeIntlObject.type !== "Property") {
                    return;
                  }

                  // The object key name is "defaultMessage",
                  // thus we can assume that an intl thing is defined
                  if (
                    supposedToBeIntlObject.key &&
                    supposedToBeIntlObject.key.name === "defaultMessage"
                  ) {
                    shouldWarnAboutObject = true;
                  }
                });
              }
            });
          }

          if (shouldWarnAboutObject) {
            context.report({
              node,
              message,
            });
          }
        });
      },
    };
  },
};
