const express = require("express");
const router = express.Router();
const Project = require("../models/project");

router.use(express.json());

router.post("/", async (req, res) => {
    try {
        const newProject = new Project({
            name: req.body.name,
            tasks: req.body.tasks,
            progress: req.body.progress,
            created_by: req.body.created_by,
            createdAt: new Date(),
        });

        const savedProject = await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: savedProject });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/allprojects", async (req, res) => {
    try {
        const projects = await Project.find().populate("tasks");
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const project = await Project.findByIdAndUpdate(id, updatedData, { new: true });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: "Project updated successfully", project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const projectId = req.params.id;
        const deletedProject = await Project.findByIdAndDelete(projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
