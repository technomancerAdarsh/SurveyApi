import express from "express";
import {readfile} from "./readfile.js";
import {writefile} from "./writefile.js";
import {findSimilarity} from "./findSimilarity.js";

const app = express();
app.listen(3000,()=>console.log("running at 3000"
));

const surveys = readfile("./surveys.json");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/list",async(req,res)=>{
  res.status(200).json({
    data:{
      message:"List of surveys",
      surveys
    }
  })
});

app.get("/survey/:id",(req,res)=>{
  let {id} = req.params;
  let survey = surveys.filter((survey)=>id==survey.s_id);
   console.log(survey[0]);
   res.status(200).json(survey[0]);
});

app.post("/survey/:id",(req,res)=>{
  let data = req.body;
  let {id} = req.params;
  writefile(id,data);
  res.status(200).json({
    "message":"survey successfully completed"
  });
});

app.get("/survey/:id/result",(req,res)=>{
  let {id} = req.params;
  let {uid1,uid2,page} = req.query;
  let filename = `survey${id}.json`||[];
  let data = readfile(filename);
  let result = findSimilarity(data);
  if(uid1&&uid2){
    let response = result.filter(item=>Object.keys(item)[0]==`user${uid1}`)[0];
    res.status(200).json({"similarity":response[`user${uid1}`][`user${uid2}`]});
  }
  
  // else if(!uid2&&uid1){
  //   let response = result.filter(item=>Object.keys(item)[0]==`user${uid1}`)[0];
  //   res.status(200).json(response);
  // }

  else if(!uid2){
    let response = result.filter(item=>Object.keys(item)[0]==`user${uid1}`)[0];
    res.status(200).json(response);
  }
  else{
    if(!page) res.status(200).json(result);
    else{
    let start = (page-1)*5;
    let end = page*5-1;
    result = result.filter((_,index)=>index>=start&&index<=end);
    res.status(200).json(result);
    }
  } 
});

