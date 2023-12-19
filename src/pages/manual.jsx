import React, {useEffect, useState} from 'react';
import localforage from 'localforage';

import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
  IonRouterLink,
  IonApp,
  IonButton,
  IonRedirect

} from '@ionic/react';
import { Route, useParams, useHistory, Redirect } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';


import Home from './home';
import { trophy } from 'ionicons/icons';
import DownloadPage from './download';
import Tab1 from './Tab1';
// import manual from '../../public/manual.json';

function Manual() {

  const {id} = useParams();
  const history = useHistory();

  // const [currentDirectory, setCurrentDirectory] = useState('');
  const [newDirectory, setNewDirectory] = useState('');
  const [fileContents, setFileContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [menuEnabled, setMenuEnabled] = useState(true);
 
  useEffect(() =>{
    console.log(id);
    
    localforage.getItem(id)
     .then((result) =>{
      result !== null ? (setFileContents(JSON.parse(result)))
       : (setFileContents([]))

     })
  })

  const handlePage = (x)=>{
    setCurrentPage(x);
  }

  
  return (
    <IonApp>
      {
        fileContents && (
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Lesson</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" >

         {fileContents.map((ele, index) =>(
            <div key={ele.title} className="menu">
               <h5 onClick={() => handlePage(index)}>- {ele.title}</h5> 
            </div>
         ))}
        </IonContent>
      </IonMenu>
        )
      }

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>{id}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonRouterOutlet>
              <Route path="/tab1">
                <Tab1 />
              </Route>

              <Route exact path="/download/:id">
                <DownloadPage />
              </Route>
          </IonRouterOutlet>

          {
            fileContents.length < 1 && (
              <DownloadPage />
            )
          }

          {
            fileContents && (
                        <div className='manual-content'>
            <h3 style={{textAlign: 'center', fontWeight: '700', marginBottom: '30px'}}>{fileContents[currentPage]?.title}</h3>

            {
              fileContents[currentPage]?.memoryVerse && (
               <div style={{boxShadow:'1px 1px 5px black', background: 'white', color: 'black'}}>
                  <h6 style={{borderRadius:'10px 10px 0px 0px',padding: '10px',background: 'black', color: 'white', display: 'inline'}}>Memory Verse</h6>
                  <p style={{padding: '10px'}}>{fileContents[currentPage]?.memoryVerse}</p>
                </div>
              )

            }


             {
                fileContents[currentPage]?.meaning && (
                  <div className="meaning">
                    <u style={{textAlign: 'left', fontWeight: '700'}}>Meaning</u>
                    <p>{fileContents[currentPage]?.meaning}</p>
                  </div>
                )
             }


              <div>
                <br />
                
                {fileContents[currentPage]?.body.map((ele) =>(
                    <>
                    <p style={{padding: '10px', width: '100%', textAlign:'center', background: 'green', color: 'white'}}>{ele.header}</p> 
                     {ele.content.map((body, index) =>(
                      <>
                       <h6 style={{fontWeight: 'bolder'}}>{index+1}. {body.header}</h6>
                        {body.list.map((list, index) =>(
                          <p key={index}>- {list}</p>
                        ))}
                      </>
                    ))}
                   </>
                  ))}


              </div>


          </div>
            )
          }




        </IonContent>
      </IonPage>
    </IonApp>
  );
}
export default Manual;