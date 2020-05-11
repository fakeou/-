import instance from "./request";

export function getSelectdata(content,value) {
  return instance.get("", {
   params: {
     content,
     value,
   }
  });
}

export function getCreatedata(Sno,Sname,Ssex,Sage,Sdept) {
  return instance.get("/create", {
    params:{
      Sno,
      Sname,
      Ssex,
      Sage,
      Sdept
    }
  });
}

export function getDeletedata(Sno) {
  return instance.get("/delete", {
   params:{
     Sno,
   }
  });
}

export function getUpdatedata(property,newvalue,oldvalue) {
  return instance.get("/update", {
   params: {
    property,
    newvalue,
    oldvalue,
   }
  });
}

