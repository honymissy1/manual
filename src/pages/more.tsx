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

const More = () =>{
    return(
        <IonPage>
            <h1 className='text-green-50'>Welcome to More</h1>
        </IonPage>
    )
}

export default More