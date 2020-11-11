import dotenv from "dotenv";
import { Server } from "http";

import app from "./app";
import { logger } from "./config/logger";
import { knex } from "./knex/knex";

dotenv.config();

let server: Server | null;

knex.raw("select 1+1 as result")
	.then(() => {
		logger.info("Connected to DB!");
		server = app.listen(process.env.PORT || 5000, () => {
			logger.info(`Listening to port ${process.env.PORT || 5000}`);
		});
	})
	.catch((error) => {
		logger.error("Database connection error");
		unexpectedErrorHandler(error);
	});

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info("Server closed!");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error: Error) => {
	logger.error(logger.exceptions.getAllInfo(error));
	exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
	logger.info("SIGTERM received");
	if (server) {
		server.close();
	}
});
