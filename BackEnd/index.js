let exp = require("express");
let cors = require("cors");
let app = exp();
let mongoose = require("mongoose");
app.use(exp.json());
app.use(cors());
const port=8080;

// connect mongodb
let connection = mongoose.connect("mongodb+srv://employe:employe%40123@cluster0.citj4ar.mongodb.net/employee");
connection.then(() => console.log("conneted"));
connection.catch(() => console.log("not connected"));

// create schema
let main = new mongoose.Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },
  age: { type: Number, require: true },
  salary: { type: Number, require: true },
  role: { type: String, require: true },
});

// create modal
let data = mongoose.model("employee", main);
// let submitdata = data.create(
//   {
//     id: 1,
//     name: "John Smith",
//     age: 35,
//     salary: 75000,
//     role: "Software Engineer",
//   },
//   {
//     id: 2,
//     name: "Emily Johnson",
//     age: 28,
//     salary: 65000,
//     role: "Marketing Specialist",
//   },
//   {
//     id: 3,
//     name: "Michael Brown",
//     age: 42,
//     salary: 95000,
//     role: "Senior Project Manager",
//   },
//   {
//     id: 4,
//     name: "Sarah Davis",
//     age: 31,
//     salary: 82000,
//     role: "Data Analyst",
//   },
//   {
//     id: 5,
//     name: "David Wilson",
//     age: 45,
//     salary: 110000,
//     role: "Director of Operations",
//   },
//   {
//     id: 6,
//     name: "Jennifer Martinez",
//     age: 29,
//     salary: 58000,
//     role: "HR Coordinator",
//   },
//   {
//     id: 7,
//     name: "Robert Taylor",
//     age: 38,
//     salary: 88000,
//     role: "Sales Manager",
//   },
//   {
//     id: 8,
//     name: "Lisa Anderson",
//     age: 26,
//     salary: 62000,
//     role: "UX Designer",
//   },
//   {
//     id: 9,
//     name: "James Thomas",
//     age: 52,
//     salary: 125000,
//     role: "Chief Technology Officer",
//   },
//   {
//     id: 10,
//     name: "Patricia Jackson",
//     age: 33,
//     salary: 71000,
//     role: "Financial Analyst",
//   },
//   {
//     id: 11,
//     name: "Christopher White",
//     age: 41,
//     salary: 98000,
//     role: "DevOps Engineer",
//   },
//   {
//     id: 12,
//     name: "Maria Harris",
//     age: 27,
//     salary: 56000,
//     role: "Junior Developer",
//   },
//   {
//     id: 13,
//     name: "Daniel Martin",
//     age: 39,
//     salary: 89000,
//     role: "Product Manager",
//   },
//   {
//     id: 14,
//     name: "Nancy Thompson",
//     age: 47,
//     salary: 105000,
//     role: "Legal Counsel",
//   },
//   {
//     id: 15,
//     name: "Paul Garcia",
//     age: 32,
//     salary: 73000,
//     role: "Systems Administrator",
//   },
//   {
//     id: 16,
//     name: "Karen Robinson",
//     age: 36,
//     salary: 77000,
//     role: "Quality Assurance Lead",
//   },
//   {
//     id: 17,
//     name: "Steven Clark",
//     age: 44,
//     salary: 102000,
//     role: "Regional Sales Director",
//   },
//   {
//     id: 18,
//     name: "Betty Rodriguez",
//     age: 30,
//     salary: 68000,
//     role: "Content Strategist",
//   },
//   {
//     id: 19,
//     name: "Kevin Lewis",
//     age: 25,
//     salary: 52000,
//     role: "Junior Accountant",
//   },
//   {
//     id: 20,
//     name: "Sandra Lee",
//     age: 49,
//     salary: 115000,
//     role: "VP of Engineering",
//   },
// );
// submitdata.then(()=>console.log('users added'))

// get the data

// get

app.get('/home',async(req,res)=>{
    let data1=await data.find({});
    res.json(data1)
})
// get particular id
app.get('/geting',async (req,res)=>{
  let getid=req.query._id;
  let data3=await data.findById(getid)
  console.log('geting data : ',data3);
  res.send(data3)
})
// http://localhost:8080/geting?_id=69a914f65e54bfb297a75631


// post
app.post('/posting',async(req,res)=>{
  let postdata=req.body;
  // defaultly it gives the count of obj's in the array
  let countofobjs=await data.countDocuments();
  let newId=countofobjs+1
  console.log('new id : ',newId);
  
  let postdatawithid={...postdata,id:newId}
  await data.create(postdatawithid)
  res.send(postdata)
  console.log('posted new data',postdatawithid)
})
// http://localhost:8080/posting

// delete
app.delete('/deleting',async(req,res)=>{
  let deleteid=req.query._id;
  await data.findByIdAndDelete(deleteid)
  res.send(deleteid)
  console.log('deleted user id',deleteid);
})
// url for thuderclient ->http://localhost:8080/deleting?_id=69a914f65e54bfb297a75630


// put
app.put('/puting',async(req,res)=>{
  let putid=req.query._id;
  let putdata=req.body;
  console.log("updated id",putid);
  
  await data.findByIdAndUpdate(putid,{$set:putdata})
  res.send(putdata)
  console.log('updated data',putdata);
})
// http://localhost:8080/puting?_id=69a914f65e54bfb297a75634


app.listen(port,(req,res)=>console.log('http://localhost:'+port+'/home'))