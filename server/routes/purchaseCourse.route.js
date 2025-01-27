import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { createCheckoutSession, getCourseDetailWithPurchaseStatus} from "../controllers/CoursePurchase.controller.js";
const router = express.Router()

router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/course/:courseId/course-details").get(isAuthenticated,getCourseDetailWithPurchaseStatus);
 
export default router