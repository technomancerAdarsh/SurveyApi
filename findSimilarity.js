export function findSimilarity(target){
  let response = [];
  for(let i=0;i<target.length;i++){
    let newEntry = {};
    let user = `user${i+1}`;
    newEntry[user] = {};
    for(let j=0;j<target.length;j++){
      if(i!=j){
        let res = surveyComparison(target[i].result,target[j].result);
        let similarity = similarityMeasure(res);
        newEntry[user][`user${j+1}`] = similarity;
      }else continue;
    }
    response.push(newEntry);
  }
  return response;
}

function surveyComparison(user1Data,user2Data){
  let result = [];
  for(let i=0;i<user1Data.length;i++){
    if(user1Data[i]==0||user2Data[i]==0) continue;
    else{
      if(user1Data[i]==user2Data[i]){
        result.push(1);
      }else result.push(0);
    }
  }
  return result;
}

function similarityMeasure(target){
  let count = 0;
  for(let i=0;i<target.length;i++){
    if(target[i]==1) count++;
  }
  let perc = (count/target.length)*100;

  if(count==target.length) return "100% similar";
  else if(perc>75) return "highly similar";
  else if(perc<50) return "dissimlar";
  else return "similar";
}