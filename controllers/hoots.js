import express from "express";
import verifyToken from "../middleware/verify-token.js";
import Hoot from "../models/hoot.js";
const router = express.Router();

// add routes here

router.post("/", verifyToken, async (req, res) => {
   // new route 
  });
  
router.post("/", verifyToken, async (req, res) => {
    try {
      req.body.author = req.user._id;
      const hoot = await Hoot.create(req.body);
      hoot._doc.author = req.user;
      res.status(201).json(hoot);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
// controllers/hoots.js

router.get("/", verifyToken, async (req, res) => {
    try {
      const hoots = await Hoot.find({})
        .populate("author")
        .sort({ createdAt: "desc" });
      res.status(200).json(hoots);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  // controllers/hoots.js

router.get("/:hootId", verifyToken, async (req, res) => {
    try {
      const hoot = await Hoot.findById(req.params.hootId).populate("author");
      res.status(200).json(hoot);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  
export default router; 
