const { default: react } = require("@vitejs/plugin-react-swc");

module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        'eslint:recommended',
        'public:react/recommended',
        'public:react/jsx-runtime',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'react/jsx-no-target-blank': 'off',
        'react/prop-types': 'off',
        'no-unused-vars': 'off',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true }
        ],
    },
}