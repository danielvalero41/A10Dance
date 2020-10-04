import { Component, OnInit } from '@angular/core';
import { Student, StudentsService } from '../students.service';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.page.html',
  styleUrls: ['./roster.page.scss'],
})
export class RosterPage implements OnInit {

  students:Student[]
  constructor(
    public studentServices:StudentsService, 
    public actionSheetController:ActionSheetController,
    public alertController:AlertController,
    public toastController:ToastController) {
    this.students = this.studentServices.getAllStudents()
   }

  ngOnInit() {
  }
  

  /**
   * 
   * @param presentDeleteAlert mostramos las opciones de que 
   * si queremos borrar un students
   */

  async presentDeleteAlert(student:Student){
    const alert = await this.alertController.create(
      {
        header:'Delete this student?',
        subHeader:`${student.firstName} ${student.lastName}`,
        message:'This operation cannot be undone.',
        buttons:[
          {
            text:'Delete',
            handler: ()=> this.deleteStudent(student)
          },
          {
            role:'cancel',
            text:'Never mind'
          }
        ]
      }
    );
    /**
     * IMPORTANTE
     */
    await alert.present();
  }//presentDeleteAlert

  /**
   * 
   * @param presentActionSheet en esta funcion se pasa por parametro
   * un estudiante para crear el menu de opcciones
   */
  async presentActionSheet(students: Student){
    const actionSheet = await this.actionSheetController.create(
      {
      header: `${students.firstName}  ${students.lastName}`,      
      buttons:[{
        text:'Mark Present',        
        icon:'eye',
        handler: ()=>{
          students.status = 'present'
        }        
      },

      {
        text:'Mark Absent',
        icon:'eye-off-outline',
        handler: ()=>{
          students.status = 'absent'
        }
      },

      {
        text:'Delete',
        role:'destructive',
        icon:'trash',
        handler: ()=>{
          this.presentDeleteAlert(students)
        }
      },

      {
        text:'Cancel',
        icon:'close',
        role:'cancel'
      }

      ]//Buttons 
    });
    await actionSheet.present();
  }//presentActionSheet

   async deleteStudent(student: Student){
     let salvar:Student = student
     
    this.students = this.students.filter( x => x.id !== student.id )    
    const toast = await this.toastController.create({
      message:`${student.firstName} ${student.lastName} has been deleted.`,
      position:'bottom',
      duration:100000,    
      color:'success'  ,               
      buttons: [
         {
        
          text: 'Close',
          role: 'cancel',
          icon: 'close',          
          side:'end',
          handler: () => {
            console.log('Cancel clicked');
          }        
        },
        {
          side:'start',          
          icon:'checkmark-circle'
        },
        {
          text:'Undo',
          side: 'end',
          role:'cannot',
          icon: 'refresh',
          handler:()=> {
            this.students.push(salvar)            
          }
        }
      ]
    })

    await toast.present()

  }
  

}
