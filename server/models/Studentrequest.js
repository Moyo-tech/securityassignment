const mongoose = require('mongoose')


const StudentrequestSchema = new mongoose.Schema ({
title: {
    type: String,
    required: true
},
type: {
    type: String,
    required: true
},

recipient: {
type: String,
default: 'Team Lead'
},

details: {
    type: String
},
user_id:{
    type: String,
    required: true
  }
},
{timestamps: true}
)

const StudentrequestModel = mongoose.model("Studentrequests", StudentrequestSchema)
module.exports = StudentrequestModel