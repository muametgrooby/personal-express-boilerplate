const { createConfig } = require("eslint-config-galex/src/createConfig");

module.exports = createConfig({
	env: {
		node: true,
	},
	rules: {
		"import/no-default-export": "off",
		"new-cap": "off",
		"promise/prefer-await-to-then": "off",
		"unicorn/no-process-exit": "off",
	},
});
