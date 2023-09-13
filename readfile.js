import fs from "fs";

export function readfile(filename){
  try{
    let data = fs.readFileSync(filename,"utf-8",()=>console.log(
    "ok"
  ));
  return JSON.parse(data);
  }catch(err){
    console.log("error while opening");
    return "";
  }
  
}