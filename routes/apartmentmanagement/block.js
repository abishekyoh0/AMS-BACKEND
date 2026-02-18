import express from "express";
import { createBlock, deleteBlock, getBlockById, getBlocks, updateBlock } from "../../controllers/apartmentmanagement/block.js";

const router = express.Router();

router.post("/", createBlock);      
router.get("/", getBlocks);        
router.put("/:id", updateBlock);    
router.delete("/:id", deleteBlock);
router.get("/:id", getBlockById); 

export default router;
