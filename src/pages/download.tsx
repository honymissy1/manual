import { IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent, IonButton, IonRouterLink, IonPage } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import Image from '../assets/images/download.png';
import Images from '../assets/images/logo.png'
import localforage from 'localforage';
import './home.css'

import { FlutterWaveButton, closePaymentModal  } from 'flutterwave-react-v3';


const DownloadPage = () => {
  const {id}:any = useParams();
  const history = useHistory();

  const config:any = {
    public_key: 'FLWPUBK_TEST-edcf63b372f8cb290127aa8c11f9f2f3-X',
    tx_ref: Date.now(),
    amount: 300,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'perfectionmanual@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'Sunday School App',
      description: 'Payment for Sunday School Manual App',
      logo: 'https://i.postimg.cc/NFpCv1g7/images-removebg-preview.png',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Click to Pay',
    callback: (response:any) => {
      // we have the call to the server here and we'll 
      // Get the manual from the server
      // and save it in the frontend database
       console.log(response);
      // closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {
      console.log('Closed');
      
    },
  };

  return (
    <IonPage>
      <IonContent>
        <div className='download-image'>
            <img src={Image} alt="Download Perfection manual" />
            <h2 style={{textAlign: 'center'}}>Download Manual</h2>
            <FlutterWaveButton {...fwConfig} className='payment-btn' />
           
            <h6 style={{fontWeight: '700'}}>OR</h6>

            <p>If you have paid for this but can't find the page click the link below to verify and download {id}</p>

            <a href="/check">Verify and Download</a>
            
            {/* <button id="open-custom-dialog" expand="block">Download</button> */}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default DownloadPage;
