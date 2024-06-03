import * as Member_Controllers from "./member_controller.js"
import { Router } from "express"

const router = Router()

router.get('/get_member_byphonenumber',Member_Controllers.Get_specific_Member_ByPhoneNumber)
router.get("/get_members_with_trainers",Member_Controllers.get_allMembers_and_MembersTrainer)
router.post("/add_member",Member_Controllers.add_member)
router.put("/update_member",Member_Controllers.update_member)
router.delete("/delete_member",Member_Controllers.delete_member)
router.get("/get_revenues",Member_Controllers.get_revenues)

export default router    