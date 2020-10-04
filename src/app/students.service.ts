import { Injectable } from '@angular/core';

export interface Student{
  id:number
  firstName:string
  lastName:string
  birthDate:Date
  parentName:string
  parentEmail:string
  parentPhone:string
  photoUrl:string
  status: 'present' | 'absent'
}

var mockStudents: Student[] = [
  { id:1,
    firstName:"Daniel",
    lastName:"Valero",
    birthDate:new Date('18/05/1994'),
    parentName:"Jenny",
    parentEmail:"jenny@gmail.com",
    parentPhone:"+58 4247093074",
    photoUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png",
    status:"present"  
  },
  { id:2,
    firstName:"Adjani",
    lastName:"Jara",
    birthDate:new Date('20/05/1994'),
    parentName:"Ana",
    parentEmail:"Anay@gmail.com",
    parentPhone:"+58 4247093074",
    photoUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Crystal_Clear_kdm_user_female.svg/1200px-Crystal_Clear_kdm_user_female.svg.png",
    status:"present"  
  },
]

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getAllStudents(){

    /**
     * Codigo para ordenar por nombre
     * 
     * NOTA: Si queremos orderna por otro medio cambiamos
     * la propiedad "firstName" por la que queramos
     */
   mockStudents = mockStudents.sort(function(a,b){
    if ( a.firstName < b.firstName )
  	return -1;
    if ( a.firstName > b.firstName )
      return 1;
    return 0;
   })
    return [...mockStudents]
  }
}
