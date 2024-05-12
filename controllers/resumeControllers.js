
const Resume = require('../models/resume')
const fs = require('fs')
const puppeteer = require('puppeteer');
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const JWT_SECRET_KEY = "123"
require("dotenv").config();
const crypto = require('crypto');
const { Console } = require('console');

const verifyLogin = async (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = String(cookies).split("=")[1];
    if (!token) {
      return res.status(404).json({ message: "Token not found" });
    }
    // console.log(token)
    jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ message: "Invalid token" });
      }
      req.id = user.id;
      next();
    });
    // req.id = '123456'
    // next()
  };
const createResume= async (req,res,next)=>{
    let existingUser = await User.findOne({_id:req.id})
    let {firstName,lastName,email,branch,year,pic}=existingUser;
    let name = `${firstName} ${lastName}`;
    let existingResume = await Resume.findOne({resumeName:name})
    if(existingResume){
        console.log("exist")
        return res.status(200).json({message:`Resume with the name ${req.body.name} already exist`})
    }
    const resume = new Resume({
        user:req.id,
        resumeName:req.body.name,
        name,
        email,
        branch,
        year,
        pic,
    })
    try{
        await resume.save()
        console.log("created")
        let existingUser = await User.findOne({_id:req.id})
        existingUser.resume.push(resume._id)
        await User.findOneAndUpdate({_id:req.id},existingUser)
        return res.status(201).json({ message: resume });
    }
    catch(err){
        console.log(err);
    }

}
const verifyResume= async(req,res,next)=>{
    let existingResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    if(existingResume){next()}
    else{return res.status(404).json({message:"resume not found"})}
}
const updateResume = async(req,res,next)=>{
    let existingResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    // console.log(existingResume,req.body.resume)
    console.log("resume found with name",existingResume.resumeName)
    let newAdded = req.body.resume
    console.log(newAdded.Institute)
    let updateResume = Object.assign (existingResume, newAdded)
    console.log(updateResume)
    updateResume = updateResume._doc
    const update = {
        "$set": updateResume
    }
    // console.log(updateResume)
    try{
        await Resume.findOneAndUpdate({resumeName:req.body.name,user:req.id},update);
        let updatedResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
        res.status(200).json({message:updatedResume})
        next()
    }
    catch(err){
        return res.status(400).json({error:err})
    }
}
 const createPdf= async(req,res,next)=>{
    const existingResume = await Resume.findOne({resumeName:req.body.name})
    let area = ''
if(existingResume.areasOfInterest[0]){
    area = "<h3>Area of Interest</h3>"
    existingResume.areasOfInterest.forEach(element => {
        area = area + `<p>${element}</p>`
    });
}
let internship =''
if(existingResume.internships[0]){
    internship = "<h3>Internships</h3>"
    existingResume.internships.forEach(element => {
        internship = internship + `<b>${element.company}</b><br> `
        internship = internship + `<b>${element.title}</b> `
        internship = internship + `<span>${element.description}</span><br> `
    });
}

let html = ''
html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body style="background-color:blue;">
    <h1>name</h1>
    ${area}
    ${internship}
    <h3>Acads</h3>
    <span>CGPA</span>
    <span>cgpa</span><br>
    <span>twelfth</span>
    <span>twelfth</span><br>
    <span>Tenth</span>
    <span>tenth</span><br>
</body>
</html>`
    req.html = html;
    const a =async () => {
        const browser = await puppeteer.launch();
       
        const page = await browser.newPage();
       
        await page.setContent(html);
       
        await page.pdf({ path: './example.pdf', format: 'A4' });
       
        await browser.close();
       
        console.log(`Here's your PDF!.`);
       };
      await a()
    next();
 }
 const downloadPdf=async(req,res)=>{
    const path = "example.pdf";
   await res.download(
        path, 
        "resume.pdf", 
        (err) => {
            if (err) {
                res.send({
                    error : err,
                    msg   : "Problem downloading the file"
                })
            }
    });
//     fs.unlink('example.pdf',(err)=>{if(err){console.log(err)}
// })
 }
 const resumeDelete=async (req,res,next)=>{
    const resumeName = req.body.name;
    try{
    await Resume.deleteOne({resumeName})
    return res.status(200).json({message:"Resume deleted"})
    }
    catch(err){
        return res.status(400).json({error:err})
    }
 }
 const getResume = async(req,res,next)=>{
    let existingResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    res.resume = existingResume;
    return res.status(200).json({"resume":existingResume})
 }
const getResumeById = async(req,res,next)=>{
    let existingResume= await Resume.findOne({_id:req.body.id})
    if(existingResume){
        return res.status(200).json({'resume':existingResume})
    }
    else{
        return res.status(404).json({'message':'resume not found'})
    }
}
 const extraCurricularController = async(req,res,next)=>{
    let existingResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    console.log("resume found with name",existingResume.resumeName)
    let newAdded = req.body.extraCurricular
    console.log(newAdded)
    existingResume.extraCurriculars.push(newAdded)
    console.log(existingResume)
    await Resume.findOneAndUpdate({resumeName:req.body.name,user:req.id},existingResume);
    let updatedResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    res.status(200).json({message:updatedResume})
 }

 const addIntern= async(req,res,next)=>{
    let existingUser = await User.findOne({_id:req.id})
    let newAdded = req.body.internship
    newAdded = {...newAdded,verified:false,internId:crypto.randomBytes(16).toString("hex")}
    existingUser.resumeInterships.push(newAdded);
    await User.findOneAndUpdate({_id:req.id},existingUser);
    res.status(200).json({message:existingUser});
 }
  const addProject= async(req,res,next)=>{
    let existingUser = await User.findOne({_id:req.id})
    let newAdded = req.body.project
    newAdded = {...newAdded,verified:false,projectId:crypto.randomBytes(16).toString("hex")}
    existingUser.resumeProjects.push(newAdded)
    await User.findOneAndUpdate({_id:req.id},existingUser)
    res.status(200).json({message:existingUser})
 }
const addInternResume = async(req,res,next)=>{
    let existingUser = await User.findOne({_id:req.id})
    let existingResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    const internId = req.body.internId
    console.log(internId)
    const internList = Array.from(existingUser.resumeInterships)
    let intern 
    for(let internship in internList){
        if(internList[internship]){
            if(internList[internship].internId===internId){
                intern = internList[internship]
            }
        }
    }
    intern.status=true;
    console.log(intern)
    if(intern.verified===true)
    { existingResume.internships.push(intern)
     let updatedResume = await Resume.findOneAndUpdate({resumeName:req.body.name,user:req.id},existingResume)
     existingUser.resumeInterships= existingUser.resumeInterships.filter((interns)=>interns.internId!==internId)
     existingUser.resumeInterships.push(intern)
     await User.findOneAndUpdate({_id:req.id},existingUser);
     res.status(200).json({message:updatedResume})}
     else{
        res.status(400).json({message:'intern not verified'})
     }
}
const addProjectResume = async(req,res,next)=>{
    let existingUser = await User.findOne({_id:req.id})
    console.log(existingUser)
    let existingResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    console.log(existingResume)
    const projectId = req.body.projectId
    console.log(projectId)
    const projectList = Array.from(existingUser.resumeProjects)
    console.log(projectList)
    let project 
    for(let projects in projectList){
        if(projectList[projects]){
            if(projectList[projects].projectId===projectId){
                project = projectList[projects]
            }
        }
    }
    project.status=true
    console.log(project)
    if(project.verified===true)
    { existingResume.projects.push(project)
     let updatedResume = await Resume.findOneAndUpdate({resumeName:req.body.name,user:req.id},existingResume)
     existingUser.resumeProjects= existingUser.resumeProjects.filter((projects)=>projects.projectId!==projectId)
     existingUser.resumeProjects.push(project)
     console.log(existingResume)
     await User.findOneAndUpdate({_id:req.id},existingUser);
     res.status(200).json({message:updatedResume})}
     else{
        res.status(400).json({message:'project not verified'})
     }
}
const removeInternResume=async(req,res,next)=>{
    let existingUser = await User.findOne({_id:req.id})
    let existingResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    const internId = req.body.internId
    console.log(internId)
    const intern = existingUser.resumeInterships.find((element)=>element.internId===internId)
    console.log(intern)
    existingUser.resumeInterships= existingUser.resumeInterships.filter((interns)=>interns.internId!==internId)
    intern.status=false;
    existingUser.resumeInterships.push(intern)
    await User.findOneAndUpdate({_id:req.id},existingUser);
    if(intern.verified===true)
    { existingResume.internships= existingResume.internships.filter((interns)=>interns.internId!==internId)
        console.log(existingResume.internships.filter((interns)=>interns.internId!==internId))
       
     let updatedResume = await Resume.findOneAndUpdate({resumeName:req.body.name,user:req.id},existingResume)
     res.status(200).json({message:updatedResume})}
     else{
        res.status(400).json({message:'intern not verified'})
     }
}
const removeProjectResume=async(req,res,next)=>{
    let existingUser = await User.findOne({_id:req.id})
    let existingResume = await Resume.findOne({resumeName:req.body.name,user:req.id});
    const projectId = req.body.projectId
    console.log(projectId)
    const project = existingUser.resumeProjects.find((element)=>element.projectId===projectId)
    console.log(project)
    existingUser.resumeProjects= existingUser.resumeProjects.filter((projects)=>projects.projectId!==projectId)
    project.status=false;
    existingUser.resumeProjects.push(project)
    await User.findOneAndUpdate({_id:req.id},existingUser);
    if(project.verified===true)
    { existingResume.projects= existingResume.projects.filter((projects)=>projects.projectId!==projectId)
        console.log(existingResume.projects.filter((projects)=>projects.projectId!==projectId))
       
     let updatedResume = await Resume.findOneAndUpdate({resumeName:req.body.name,user:req.id},existingResume)
     res.status(200).json({message:updatedResume})}
     else{
        res.status(400).json({message:'project not verified'})
     }
}
const getResumeList = async(req,res,next)=>{
    const existingUser = await User.findOne({_id:req.id})
    let resumeList=[]
    // const a = await Resume.findOne({_id:existingUser.resume[1]})
    // console.log(a)
    const resumeListFunction=async()=>{
        for(let resume of existingUser.resume){
            const resumeItem = await Resume.findOne({_id:resume})
            resumeList.push(resumeItem)
        }
    }
    await resumeListFunction()
    console.log(resumeList)
    res.status(200).json({resumeList:Array.from(resumeList)})
    
    // console.log(resumeList)
}
exports.getResumeList = getResumeList
exports.verifyLogin = verifyLogin
exports.createResume = createResume
exports.verifyResume = verifyResume
exports.updateResume = updateResume
exports.createPdf = createPdf
exports.downloadPdf = downloadPdf
exports.resumeDelete = resumeDelete
exports.getResume = getResume
exports.extraCurricularController = extraCurricularController
exports.addIntern = addIntern
exports.addProject = addProject
exports.addInternResume=addInternResume
exports.addProjectResume=addProjectResume
exports.removeInternResume=removeInternResume
exports.removeProjectResume=removeProjectResume
exports.getResumeById=getResumeById