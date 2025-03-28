import express from "express"

import { isAuthenticated } from "../middlewares/auth.js";
import { deleteTimeLine, getAllTimeLines, postTimeLine } from "../controller/timelineController.js";



const router = express.Router();

router.post("/add" , isAuthenticated , postTimeLine)
router.delete("/delete/:id" ,isAuthenticated , deleteTimeLine)
router.get("/getall" ,getAllTimeLines)


export default router;