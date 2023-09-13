import fs from "fs";
import {readfile} from "./readfile.js";

export function writefile(id,content){
  let filename = `survey${id}.json`;
  
  let data = readfile(filename)||[];
  data = [...data,content];
  fs.writeFileSync(filename,JSON.stringify(data));
}