import {Router} from "express";
import { getContact, getContactById, createContact,
        updateContactById, deleteContactById }
        from "../controllers/contactController.js";
import validateToken from "../middlewares/validateTokenHandler.js";

const router = Router();

router.use(validateToken);

router.route("/").get(getContact).post(createContact);
//id req for update and delete
router.route("/:id").get(getContactById).put(updateContactById).delete(deleteContactById);

export default router;