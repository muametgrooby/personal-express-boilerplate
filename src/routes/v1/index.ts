import express from "express";
import status from "http-status";
import os from "os";

const router = express.Router();

router.get("/test", async (req: express.Request, res: express.Response) => {
	res.status(status.OK).json([`Hello ${os.userInfo().username || "World"}`]);
});

export default router;
