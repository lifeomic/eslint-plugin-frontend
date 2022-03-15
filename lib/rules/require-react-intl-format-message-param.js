"use strict";

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "enforce intl formatMessage params",
      category: "intl",
      recommended: false,
      url:
        "https://github.com/lifeomic/eslint-plugin-frontend/tree/master/docs/rules/require-react-format-message-param.md",
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const undefinedMessage = 'Undefined message descriptor passed into formatMessage.';
    const undefinedId = 'Message descriptor passed into formatMessage is missing "id".';
    const undefinedDefaultMessage = 'Message descriptor passed into formatMessage is missing "defaultMessage".';
    
    const isIntlFormatMessageCall = (node) =>
      node.callee.type === 'Identifier' &&
      node.callee.name === 'formatMessage';
    
    return {
      CallExpression: (node) => {
        const result = {
          message: {},
          messageNode: undefined,
          messagePropNode: undefined,
          descriptionNode: undefined,
          idValueNode: undefined,
        }

        if (isIntlFormatMessageCall(node)) {
          const arg = node.arguments[0];

          if (!arg.properties) {
            return context.report({ node, message: undefinedMessage });
          }

          for (const prop of arg.properties) {
            if (prop.type !== 'Property' || prop.key.type !== 'Identifier') {
              continue;
            }

            const valueNode = prop.value;
            let value = undefined;

            if (valueNode.type === 'Literal' && typeof valueNode.value === 'string') {
              value = valueNode.value;
            } else if (valueNode.type === 'TemplateLiteral' && valueNode.quasis.length === 1) {
              value = valueNode.quasis[0].value.cooked;
            }

              switch (prop.key.name) {
                case 'defaultMessage':
                  result.messagePropNode = prop;
                  result.messageNode = valueNode;
                  result.message.defaultMessage = value;
                  break
                case 'description':
                  result.descriptionNode = valueNode;
                  result.message.description = value;
                  break
                case 'id':
                  result.message.id = value;
                  result.idValueNode = valueNode;
                  result.idPropNode = prop;
                  break
              }
          }

          if (Object.keys(result.message).length === 0) {
            return context.report({ node, message: undefinedMessage });
          }

          if (!result.message?.defaultMessage) {
            context.report({ node, message: undefinedDefaultMessage });
          }

          if (!result.message?.id) {
            context.report({ node, message: undefinedId });
          }
        };
      },
    };
  },
};
