/**
 * This is a copy of the eslint-plugin-react rule found at:
 *
 * https://github.com/yannickcr/eslint-plugin-react/blob/master/lib/rules/jsx-no-literals.js
 *
 * The minor changes are around the message returned, prompting users to
 * use a translated string instead of just wrapping it around `{'foo'}`.
 * See the comment below on where this change occurs
 */

"use strict";

function trimIfString(val) {
  return typeof val === "string" ? val.trim() : val;
}

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Prevent using untranslated string literals in React component definition",
      category: "Stylistic Issues",
      recommended: false,
      url:
        "https://github.com/lifeomic/eslint-plugin-frontend/tree/master/docs/rules/jsx-no-untralsated-string-literals.md",
    },

    schema: [
      {
        type: "object",
        properties: {
          noStrings: {
            type: "boolean",
          },
          allowedStrings: {
            type: "array",
            uniqueItems: true,
            items: {
              type: "string",
            },
          },
          ignoreProps: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const defaults = {
      noStrings: false,
      allowedStrings: [],
      ignoreProps: false,
    };
    const config = Object.assign({}, defaults, context.options[0] || {});
    config.allowedStrings = new Set(config.allowedStrings.map(trimIfString));

    const message = config.noStrings
      ? "Strings not allowed in JSX files"
      : // This is the only difference between ours and theirs!
        "Strings displayed to users should be translated using an intl library";

    function reportLiteralNode(node, customMessage) {
      const errorMessage = customMessage || message;

      context.report({
        node,
        message: `${errorMessage}: “${context
          .getSourceCode()
          .getText(node)
          .trim()}”`,
      });
    }

    function getParentIgnoringBinaryExpressions(node) {
      let current = node;
      while (current.parent.type === "BinaryExpression") {
        current = current.parent;
      }
      return current.parent;
    }

    function getValidation(node) {
      if (config.allowedStrings.has(trimIfString(node.value))) {
        return false;
      }
      const parent = getParentIgnoringBinaryExpressions(node);
      const standard =
        !/^[\s]+$/.test(node.value) &&
        typeof node.value === "string" &&
        parent.type.indexOf("JSX") !== -1 &&
        parent.type !== "JSXAttribute";
      if (config.noStrings) {
        return standard;
      }
      return standard && parent.type !== "JSXExpressionContainer";
    }

    function getParentAndGrandParentType(node) {
      const parent = getParentIgnoringBinaryExpressions(node);
      const parentType = parent.type;
      const grandParentType = parent.parent.type;

      return {
        parent,
        parentType,
        grandParentType,
        grandParent: parent.parent,
      };
    }

    function hasJSXElementParentOrGrandParent(node) {
      const parents = getParentAndGrandParentType(node);
      const parentType = parents.parentType;
      const grandParentType = parents.grandParentType;

      return (
        parentType === "JSXFragment" ||
        parentType === "JSXElement" ||
        grandParentType === "JSXElement"
      );
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      Literal(node) {
        if (
          getValidation(node) &&
          (hasJSXElementParentOrGrandParent(node) || !config.ignoreProps)
        ) {
          reportLiteralNode(node);
        }
      },

      JSXAttribute(node) {
        const isNodeValueString =
          node &&
          node.value &&
          node.value.type === "Literal" &&
          typeof node.value.value === "string" &&
          !config.allowedStrings.has(node.value.value);

        if (config.noStrings && !config.ignoreProps && isNodeValueString) {
          const customMessage = "Invalid prop value";
          reportLiteralNode(node, customMessage);
        }
      },

      JSXText(node) {
        if (getValidation(node)) {
          reportLiteralNode(node);
        }
      },

      TemplateLiteral(node) {
        const parents = getParentAndGrandParentType(node);
        const parentType = parents.parentType;
        const grandParentType = parents.grandParentType;
        const isParentJSXExpressionCont =
          parentType === "JSXExpressionContainer";
        const isParentJSXElement =
          parentType === "JSXElement" || grandParentType === "JSXElement";

        if (
          isParentJSXExpressionCont &&
          config.noStrings &&
          (isParentJSXElement || !config.ignoreProps)
        ) {
          reportLiteralNode(node);
        }
      },
    };
  },
};
