import React, {useEffect, useState} from 'react';
import localforage from 'localforage';
import Logo from '../assets/images/perfectionlogo.png'
import { pin, bookmark, bulbSharp, alertCircle } from 'ionicons/icons';
import { IonBackButton } from '@ionic/react';


import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonCard,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAccordion,
  IonAccordionGroup,
  IonApp,
  IonButton,
  IonRedirect,
  IonLabel,
  IonMenuToggle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonChip, IonAvatar, IonIcon, IonText

} from '@ionic/react';
import {useParams, useHistory, Redirect } from 'react-router-dom';

function Manual() {

  const {id}:any = useParams();
  const history = useHistory();

  const [fileContents, setFileContents] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);

 
  useEffect(() =>{  
    const store = () =>{
      localforage.getItem(id)
       .then((result:any) =>{
        result !== null ? (setFileContents(JSON.parse(result)))
         : (setFileContents([]))
       })
    }
    store()
  }, [fileContents])
  
  return (
    <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar color="primary" title='Boom'>
          <IonTitle style={{display: 'flex', padding: '20px'}}>
            <img src={Logo} alt="" style={{height: '60px'}} />
            <p>Table of Content</p>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
            {
              fileContents.map((ele:any, index:number)=>(
                <IonMenuToggle key={index} onClick={() => setCurrentPage(index)}>
                  <IonCard style={{padding: '5px',background: index == currentPage ? 'rgb(198, 255, 198)': '' }}>
                    <IonLabel color="success">{ele.date}</IonLabel>
                    <p>{ele.title} {ele.part}</p>
                  </IonCard>
                </IonMenuToggle>
              ))
            }
      </IonContent>
    </IonMenu>
    <IonPage id="main-content">
       <IonHeader>
         <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          
            <IonTitle slot='end'>{id}</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

      <IonContent>
        <div style={{padding: '10px'}}>
          <h3 style={{fontWeight: 'bold', textAlign: 'center'}}>{fileContents[currentPage]?.title} {fileContents[currentPage]?.part}</h3>
          
          {
            fileContents[currentPage]?.memoryVerse && (
              <IonCard style={{paddingTop: "10px"}}>
                <IonCardTitle>
                  <IonChip>
                    <IonIcon icon={bookmark} color="primary"></IonIcon>
                    <IonLabel>Memory Verse</IonLabel>
                  </IonChip>
                </IonCardTitle>
                <IonCardContent>{fileContents[currentPage]?.memoryVerse}</IonCardContent>
              </IonCard>
            )
          }

          {
             fileContents[currentPage]?.main_text && (
              <div>
                {
                  fileContents[currentPage]?.main_text.length > 0 && (
                    <IonAccordionGroup>
                        <IonAccordion value="first" style={{width: '95%', margin: '20px auto'}}>
                          <IonItem slot="header" color="light">
                            <IonLabel><b>Main Text</b></IonLabel>
                          </IonItem>
                          <div style={{backgroundColor: 'grey', color:'white'}} className="ion-padding" slot="content">
                            <IonText>
                              <b> {fileContents[currentPage]?.main_text}</b>
                            </IonText>
                          
                          </div>
                        </IonAccordion>
                    </IonAccordionGroup>
                  )
                }
              </div>
             )
          }



          {fileContents[currentPage]?.note.length > 0 && (
            <IonCard style={{paddingTop: "10px"}}>
              <IonCardTitle>
                <IonChip>
                  <IonIcon icon={alertCircle} color="danger"></IonIcon>
                  <IonLabel>Note</IonLabel>
                </IonChip>
              </IonCardTitle>
              <IonCardContent>{fileContents[currentPage]?.note}</IonCardContent>
            </IonCard>
          )}

          {
            fileContents[currentPage]?.meaning && (
              <IonCard style={{paddingTop: "10px"}}>
                <IonCardTitle>
                  <IonChip>
                    <IonIcon icon={bulbSharp} color="primary"></IonIcon>
                    <IonLabel>Meaning</IonLabel>
                  </IonChip>
                </IonCardTitle>
                <IonCardContent>
                <p>{fileContents[currentPage]?.meaning}</p> 

                { fileContents[currentPage]?.meaning_list.length > 0 && (
                  <ol style={{padding: '15px'}}>
                    {
                      fileContents[currentPage]?.meaning_list.map((ele:string, index: number) =>(
                        <li key={index}>{ele}</li>
                      ))
                    }
                  </ol>
                )}

                </IonCardContent>
              </IonCard>
            )
          }

          <br /><br />
          {
            fileContents[currentPage]?.body.length > 0  && (
              <div>
                {
                  fileContents[currentPage]?.body.map((ele:any, index:any) =>(
                   <div>
                    {ele.header && (
                    <div style={{padding: '5px 15px', fontWeight: 'bolder', background: 'black', color: 'white'}}>
                     <IonText><p>{ele.header}</p></IonText>
                    </div>
      
                    )}
                     <ol style={{padding: '0px 20px'}} key={index}>
                      {
                        ele.content.map((ele: any, index: number) =>(
                          <div key={index}>
                            <li style={{marginTop: '15px'}}><b>{ele?.header}</b></li>
                            <div>
                              {ele?.list.map((ele:any, index:any) =>(
                                <p>- {ele}</p>
                              ))}
      
                            </div>
                          </div>
                        ))
                      }
                     </ol>
                   </div>
                  ))
      
                }
              </div>
            )
          }

          {
             fileContents[currentPage]?.conclusion !== null && (
              <div>
                {
                fileContents[currentPage]?.conclusion.length > 0 && (
                  <IonCard style={{padding: '15px'}}>
                    <IonCardTitle>
                      <IonText>
                        <h5><IonIcon icon={pin} color="primary"></IonIcon>CONCLUSION</h5>
      
                      </IonText>
                    </IonCardTitle>
                    {fileContents[currentPage]?.conclusion.map((ele:string, index: number) =>(
                      <p style={{marginBottom:'10px'}}>{ele}</p>
                    ))}
                  </IonCard>
                )
                
                }
              </div>
             )
          }
          


        </div>

      </IonContent>
    </IonPage>
    </>
  );
}
export default Manual;