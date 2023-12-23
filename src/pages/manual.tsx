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

import { trophy } from 'ionicons/icons';
import DownloadPage from './download';
import Tab1 from './Tab1';
// import manual from '../../public/manual.json';

function Manual() {

  const {id}:any = useParams();
  const history = useHistory();

  // const [currentDirectory, setCurrentDirectory] = useState('');
  const [newDirectory, setNewDirectory] = useState('');
  const [fileContents, setFileContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [menuEnabled, setMenuEnabled] = useState(true);
 
  useEffect(() =>{
    console.log(id);
    
    localforage.getItem(id)
     .then((result:any) =>{
      result !== null ? (setFileContents(JSON.parse(result)))
       : (setFileContents([]))

     })
  }, [])

  const handlePage = (x:any)=>{
    setCurrentPage(x);
  }

  
  return (
    <IonPage>
      <h1>Welcome to Manual Page {id}</h1>
    </IonPage>
  );
}
export default Manual;