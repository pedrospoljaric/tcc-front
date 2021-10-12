module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        'react'
    ],
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', './']
            }
        }
    },
    rules: {
        'react/prop-types': 'off',
        'react/jsx-filename-extension': 'off',
        'comma-dangle': ['error', 'never'],
        semi: ['error', 'never'],
        'react/react-in-jsx-scope': 'off',
        'max-len': 'off',
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4]
    }
}
