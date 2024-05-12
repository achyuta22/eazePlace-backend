const express = require('express')
const { verifyLogin, createResume, verifyResume, updateResume, createPdf, downloadPdf, resumeDelete, getResume, extraCurricularController, addIntern, addProject, addInternResume, addProjectResume, removeInternResume, removeProjectResume, getResumeList, getResumeById } = require('../controllers/resumeControllers')
const router = express.Router()

router.post('/create',verifyLogin,createResume)
router.post('/submit',verifyLogin,verifyResume,updateResume)
router.get("/download",verifyLogin,verifyResume,createPdf,downloadPdf)
router.delete("/delete",verifyLogin,verifyResume,resumeDelete)
router.post("/get",verifyLogin,verifyResume,getResume)
router.post("/extracurricular",verifyLogin,verifyResume,extraCurricularController)
router.post("/addintern",verifyLogin,verifyResume,addIntern)
router.post("/addproject",verifyLogin,verifyResume,addProject)
router.post("/addinternresume",verifyLogin,verifyResume,addInternResume)
router.post("/removeinternresume",verifyLogin,verifyResume,removeInternResume)
router.post("/removeprojectresume",verifyLogin,verifyResume,removeProjectResume)
router.post("/addprojectresume",verifyLogin,verifyResume,addProjectResume)
router.post("/getresumelist",verifyLogin,getResumeList)
router.post('/getResume',getResumeById)
module.exports = router