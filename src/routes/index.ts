import { Router, Response } from "express";

const router = Router();

router.get("/", (_, res: Response) => res.json({ API: "welcome" }));

router.get("/users/", () => {});

export { router };
