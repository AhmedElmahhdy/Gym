import * as trainer_controller from "./trainer_controller.js";
import { Router } from "express";
const router = Router()


router.post('/add_trainer',trainer_controller.add_trainer)
router.get("/get",trainer_controller.get_alltrainers_and_TrainersMember)
router.put("/update",trainer_controller.update_trainer)
router.delete("/delete",trainer_controller.delete_trainer)
router.get("/get_specificTrainer",trainer_controller.get_specific_trainer_byName)
router.get("/get_revenuse",trainer_controller.get_revenues)

export default router

