import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/Auth";
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logOutUser);

router.get("/users",auth(["admin","user"]), userController.getUser);
router.delete("/users/:id",auth(["admin","user"]), userController.deletedUser);
router.put("/users/:id",auth("admin"), userController.updateUser);
router.patch("/edit-profile",auth(["admin","user"]), userController.editProfile);


export const useRouter = router;
