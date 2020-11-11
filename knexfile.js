// Update with your config settings.
require("dotenv").config();

const knexfile = {
	development: {
		// asyncStackTraces: true,
		client: "postgresql",
		connection: process.env.PG_CONNECTION_STRING,
		debug: true,
		loadExtensions: [".js"],
		migrations: {
			directory: `${__dirname}/dist/src/knex/migrations`,
			tableName: "knex_migrations",
		},
		pool: {
			max: 10,
			min: 2,
		},
		searchPath: ["knex", "public"],
		seeds: {
			directory: `${__dirname}/dist/src/knex/seeds`,
		},
	},

	loadExtensions: [".js"],

	production: {
		client: "postgresql",
		connection: process.env.PG_CONNECTION_STRING,
		loadExtensions: [".js"],
		migrations: {
			directory: `${__dirname}/dist/src/knex/migrations`,
			tableName: "knex_migrations",
		},
		pool: {
			max: 10,
			min: 2,
		},
		searchPath: ["knex", "public"],
		seeds: {
			directory: `${__dirname}/dist/src/knex/seeds`,
		},
	},
	staging: {
		client: "postgresql",
		connection: process.env.PG_CONNECTION_STRING,
		migrations: {
			directory: `${__dirname}/dist/src/knex/migrations`,
			tableName: "knex_migrations",
		},
		pool: {
			max: 10,
			min: 2,
		},
		searchPath: ["knex", "public"],
		seeds: {
			directory: `${__dirname}/dist/src/knex/seeds`,
		},
	},
};

module.exports = knexfile;
