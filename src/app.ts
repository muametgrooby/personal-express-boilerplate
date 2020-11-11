import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import compression from "compression";

import { logger } from "./config/logger";
import routes from "./routes/v1";

const app = express();

// MORGAN CONFIG
const getMorganIpFormat = () =>
	process.env.NODE_ENV === "production" ? ":remote-addr - " : "";

if (process.env.NODE_ENV !== "staging") {
	app.use(
		morgan(
			`${getMorganIpFormat()}:method :url :status - :response-time ms`,
			{
				skip: (req, res) => res.statusCode >= 400,
				stream: { write: (message) => logger.info(message.trim()) },
			}
		)
	);
	app.use(
		morgan(
			`${getMorganIpFormat()}:method :url :status :response-time ms - :res[content-length]`,
			{
				skip: (req, res) => res.statusCode < 400,
				stream: { write: (message) => logger.error(message.trim()) },
			}
		)
	);
}
// END OF MORGAN CONFIG

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

// gzip compression
app.use(compression());

app.use("/api/v1", routes);

export default app;
