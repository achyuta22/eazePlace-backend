const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const achievement = new Schema({
    title:String
})
// Define schema for projects
const projectSchema = new Schema({
    title: String,
  company: String,
  description: String,
  startDate:Date,
  endDate:Date,
  verified:{
    type:Boolean,
    default:false
  },
  projectId:String,
  status:{
    type:Boolean,
    default:false
  }

});
const extraCurricular = new Schema({
 position:String,
  organization:String,
  description:String,
})

// Define schema for positions of responsibilities
const positionSchema = new Schema({
  title: String,
  organization: String,
  description: String,
  verified:{
    type:Boolean,
    default:false,
  }
  // You can add more fields like startDate, endDate, etc. if needed
});
// const acadInstitue = new Schema({
//   graduationYear:Number,
//   institute:String,
//   degree:String,
//   major:String,
//   cgpa:Number,
//   verified:{
//     type:Boolean,
//     default:false,
//   }
// })
// const acadtenth = new Schema({
//   tenthSchool:String,
//   tenthPercentage:Number,
//   tenthYear:Number,
//   verified:{
//     type:Boolean,
//     default:false,
//   }
// })
// const acadtwelfth = new Schema({
//   twelfthSchool:String,
//   twelfthPercentage:Number,
//   twelfthYear:Number,
//   verified:{
//     type:Boolean,
//     default:false,
//   }
// })
// Define schema for academic details
const academicSchema = new Schema({
  graduationYear:Number,
  institute:String,
  degree:String,
  major:String,
  cgpa:Number,
  tenthSchool:String,
  tenthPercentage:Number,
  tenthYear:Number,
  twelfthSchool:String,
  twelfthPercentage:Number,
  twelfthYear:Number,
  instituteVerified:{
    type:Boolean,
    default:false,
  },
  tenthVerified:{
    type:Boolean,
    default:false,
  },
  twelfthVerified:{
    type:Boolean,
    default:false,
  },

//  Institute:acadInstitue,
//  tenth:acadtenth,
//  twelfth:acadtwelfth,
  // You can add more fields like score, specialization, etc. if needed
});

// Define schema for internships
const internshipSchema = new Schema({
  title: String,
  company: String,
  description: String,
  startDate:Date,
  endDate:Date,
  verified:{
    type:Boolean,
    default:false
  },
  internId:String,
  status:{
    type:Boolean,
    default:false
  }
});

// Define schema for resume
const resumeSchema = new Schema({
    name:String,
    email:String,
    pic:String,
    branch:String,
    year:Number,
    user:String,
    resumeName:String,
    areasOfInterest: [String],
    internships: [internshipSchema],
    academics: [academicSchema],
    // positionsOfResponsibility: [positionSchema],
    projects: [projectSchema],
    achievements:[String],
    extraCurriculars:[extraCurricular],
    skills:[String],
    verified:{
      type:Boolean,
      default:false,
    },
    proof:[String]
});

// Create model from schema
const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
