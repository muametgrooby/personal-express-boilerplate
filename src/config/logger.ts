import winston from "winston";

const logsDir = "logs";

const enumerateErrorFormat = winston.format((info) => {
	if (info instanceof Error) {
		Object.assign(info, { message: info.stack });
	}
	return info;
});

export const logger = winston.createLogger({
	exceptionHandlers: [
		new winston.transports.File({
			filename: `./${logsDir}/exceptions.log`,
		}),
		new winston.transports.Console({
			stderrLevels: ["error"],
		}),
	],
	format: winston.format.combine(
		enumerateErrorFormat(),
		process.env.NODE_ENV === "development"
			? winston.format.colorize()
			: winston.format.uncolorize(),
		winston.format.splat(),
		winston.format.printf(
			({ level, message }) =>
				`${
					process.env.NODE_ENV === "production"
						? `${new Date().toLocaleString()} [${level}]`
						: level
				}: ${message}`
		)
	),
	level: process.env.NODE_ENV === "development" ? "debug" : "info",
	transports: [
		new winston.transports.Console({
			stderrLevels: ["error"],
		}),
		new winston.transports.File({
			filename: `./${logsDir}/error.log`,
			level: "error",
		}),
		new winston.transports.File({ filename: `./${logsDir}/combined.log` }),
	],
});
