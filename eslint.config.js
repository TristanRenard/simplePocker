/* eslint-disable max-lines */
import js from "@eslint/js"
import reactThreeEslintPlugin from "@react-three/eslint-plugin"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@react-three": reactThreeEslintPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "array-callback-return": [
        "error",
        {
          "allowImplicit": false,
          "checkForEach": true,
          "allowVoid": true
        }
      ],
      "no-await-in-loop": "error",
      "no-constant-binary-expression": "error",
      "no-constructor-return": "error",
      "no-duplicate-imports": [
        "error",
        {
          "includeExports": true
        }
      ],
      "no-new-native-nonconstructor": "error",
      "no-promise-executor-return": [
        "error",
        {
          "allowVoid": true
        }
      ],
      "no-self-compare": "error",
      "no-template-curly-in-string": "error",
      "no-unmodified-loop-condition": "error",
      "no-unreachable-loop": "error",
      "no-unused-private-class-members": "error",
      "arrow-body-style": [
        "error",
        "as-needed"
      ],
      "camelcase": [
        "error",
        {
          "properties": "always",
          "ignoreDestructuring": true,
          "ignoreImports": true,
          "ignoreGlobals": true
        }
      ],
      "capitalized-comments": [
        "error",
        "always",
        {
          "ignoreConsecutiveComments": true
        }
      ],
      "class-methods-use-this": [
        "error",
        {
          "enforceForClassFields": true
        }
      ],
      "complexity": [
        "warn",
        40
      ],
      "consistent-return": "error",
      "curly": [
        "error",
        "all"
      ],
      "default-param-last": "error",
      "dot-notation": "error",
      "eqeqeq": [
        "error",
        "always"
      ],
      "func-name-matching": "error",
      "func-names": "error",
      "func-style": [
        "error",
        "expression",
        {
          "allowArrowFunctions": true
        }
      ],
      "no-restricted-syntax": [
        "error",
        {
          "selector": "FunctionDeclaration",
          "message": "Avoid using function declarations. Use arrow functions instead."
        },
        {
          "selector": "ExportDefaultDeclaration > FunctionDeclaration",
          "message": "Avoid using function keyword in export default. Use arrow functions instead."
        }
      ],
      "grouped-accessor-pairs": [
        "error",
        "getBeforeSet"
      ],
      "guard-for-in": "error",
      "init-declarations": [
        "error",
        "always"
      ],
      "logical-assignment-operators": [
        "error",
        "always",
        {
          "enforceForIfStatements": true
        }
      ],
      "max-classes-per-file": [
        "error",
        {
          "ignoreExpressions": true
        }
      ],
      "max-depth": [
        "error",
        4
      ],
      "max-lines": [
        "error",
        {
          "max": 200,
          "skipBlankLines": true,
          "skipComments": true
        }
      ],
      "max-lines-per-function": [
        "warn",
        {
          "max": 100,
          "skipBlankLines": true,
          "skipComments": true
        }
      ],
      "max-nested-callbacks": [
        "error",
        3
      ],
      "max-params": [
        "error",
        3
      ],
      "multiline-comment-style": [
        "error",
        "separate-lines"
      ],
      "new-cap": "error",
      "no-alert": "error",
      "no-bitwise": "error",
      "no-caller": "error",
      "no-console": "error",
      "no-else-return": "error",
      "no-empty-function": "error",
      "no-empty-static-block": "error",
      "no-eq-null": "error",
      "no-eval": "error",
      "no-extend-native": "error",
      "no-extra-label": "error",
      "no-implicit-coercion": "error",
      "no-implicit-globals": "error",
      "no-implied-eval": "error",
      "no-inline-comments": "error",
      "no-invalid-this": "error",
      "no-iterator": "error",
      "no-labels": "error",
      "no-lone-blocks": "error",
      "no-lonely-if": "error",
      "no-loop-func": "error",
      "no-multi-assign": "error",
      "no-multi-str": "error",
      "no-nested-ternary": "error",
      "no-new": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-object-constructor": "error",
      "no-octal-escape": "error",
      "no-param-reassign": "error",
      "no-plusplus": "error",
      "no-proto": "error",
      "no-return-assign": [
        "error",
        "always"
      ],
      "no-script-url": "error",
      "no-sequences": "error",
      "no-shadow": "error",
      "no-throw-literal": "error",
      "no-undef-init": "error",
      "no-undefined": "error",
      "no-underscore-dangle": [
        "error",
        {
          "allowFunctionParams": false,
          "allow": [
            "_id"
          ]
        }
      ],
      "no-unneeded-ternary": [
        "error",
        {
          "defaultAssignment": false
        }
      ],
      "no-unused-expressions": [
        "error",
        {
          "enforceForJSX": true
        }
      ],
      "no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_"
        }
      ],
      "no-useless-call": "error",
      "no-useless-computed-key": [
        "error",
        {
          "enforceForClassMembers": true
        }
      ],
      "no-useless-concat": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "no-warning-comments": [
        "error",
        {
          "terms": [
            "todo"
          ]
        }
      ],
      "object-shorthand": [
        "error",
        "always"
      ],
      "one-var": [
        "error",
        "never"
      ],
      "operator-assignment": [
        "error",
        "always"
      ],
      "prefer-arrow-callback": "error",
      "prefer-const": [
        "error",
        {
          "destructuring": "any",
          "ignoreReadBeforeAssign": false
        }
      ],
      "prefer-destructuring": "error",
      "prefer-exponentiation-operator": "error",
      "prefer-numeric-literals": "error",
      "prefer-object-has-own": "error",
      "prefer-object-spread": "error",
      "prefer-promise-reject-errors": "error",
      "prefer-regex-literals": [
        "error",
        {
          "disallowRedundantWrapping": true
        }
      ],
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "radix": "error",
      "require-await": "error",
      "require-unicode-regexp": "error",
      "symbol-description": "error",
      "yoda": "error",
      "line-comment-position": [
        "error",
        {
          "position": "above"
        }
      ],
      "indent": "off",
      "linebreak-style": [
        "error",
        "unix"
      ],
      "newline-before-return": "error",
      "no-undef": "error",
      "padded-blocks": [
        "error",
        "never"
      ],
      "padding-line-between-statements": [
        "error",
        {
          "blankLine": "always",
          "prev": "*",
          "next": [
            "break",
            "case",
            "cjs-export",
            "class",
            "continue",
            "do",
            "if",
            "switch",
            "try",
            "while",
            "return"
          ]
        },
        {
          "blankLine": "always",
          "prev": [
            "break",
            "case",
            "cjs-export",
            "class",
            "continue",
            "do",
            "if",
            "switch",
            "try",
            "while",
            "return"
          ],
          "next": "*"
        },
        {
          "blankLine": "never",
          "prev": [
            "const",
            "export"
          ],
          "next": "const"
        }
      ],
      "quotes": [
        "error",
        "double",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": true
        }
      ],
      "space-before-blocks": "error",
      "semi": [
        "error",
        "never"
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": [
        "error",
        {
          "forbid": [
            ">",
            "}"
          ]
        }
      ],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    },
  },
]
