# eslint-plugin-frontend

> A repository containing custom ESLint rules for frontend LifeOmic projects

## 🚀 Usage

### 1. Install plugin

```shell
yarn add --dev @lifeomic/eslint-plugin-frontend
```

### 2. Modify your `.eslintrc.js`

```javascript
// .eslintrc.js
module.exports = {
  plugins: [
    // Add to plugins
    "@lifeomic/frontend",
  ],
  rules: {
    // Start defining rules
    "@lifeomic/frontend/require-react-intl-define-messages": "error",
  },
};
```
