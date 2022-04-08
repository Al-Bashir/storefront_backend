module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "rules": {
        semi: ["error", "always"],
        quotes: ["error", "single"],
        'prettier/prettier': "error",
        'no-var': "error",
        'no-console': ["warn", {allow: ["warn", "error"]}],
        'no-useless-catch': "warn",
        'prefer-const': "error",
    }
}
