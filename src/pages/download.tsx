import { IonHeader,IonIcon, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent, IonButton, IonRouterLink, IonPage } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import Image from '../assets/images/download.png';
import Images from '../assets/images/logo.png';
import localforage from 'localforage';
import './home.css';
import { Device } from '@capacitor/device';
import Loading from '../assets/images/loading.gif';
import { Network } from '@capacitor/network';
import { wifiOutline } from 'ionicons/icons';


import {  closePaymentModal  } from 'flutterwave-react-v3';
import { useState, useEffect } from 'react';


const DownloadPage = () => {
  const {id}:any = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [network, setNetwork] = useState<boolean>(true);
  const [userId, setUserId] = useState<any>('');
  

  useEffect(() =>{
    const netowrks = async () =>{
      const status = await Network.getStatus();
      setNetwork(status.connected)      
    }

    netowrks()
  }, [network])

  Network.addListener('networkStatusChange', async(status) => {
    setNetwork(status.connected)
    console.log('Network status changed', status.connected);
  }); 

  // const config:any = {
  //   public_key: 'FLWPUBK_TEST-edcf63b372f8cb290127aa8c11f9f2f3-X',
  //   tx_ref: Date.now(),
  //   amount: 300,
  //   currency: 'NGN',
  //   payment_options: 'card,mobilemoney,ussd',
  //   customer: {
  //     email: 'perfectionmanual@gmail.com',
  //     phone_number: '08155550465',
  //     name: 'john doe',
  //   },
  //   customizations: {
  //     title: 'Sunday School App',
  //     description: 'Payment for Sunday School Manual App',
  //     logo: 'https://i.postimg.cc/NFpCv1g7/images-removebg-preview.png',
  //   },
  // };

  const makePayment = () =>{
    FlutterwaveCheckout({
      public_key: 'FLWPUBK-f5771c16f68eb570d91c4c8ae5092ed1-X',
      tx_ref: Date.now(),
      amount: 300,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: 'perfectionmanual@gmail.com',
        phone_number: '08155550465',
        name: 'john doe',
      },
      customizations: {
        title: 'Sunday School App',
        description: 'Payment for Sunday School Manual App',
        logo: 'https://i.postimg.cc/NFpCv1g7/images-removebg-preview.png',
      },
      callback: async(response:any) => {
        const info = await Device.getId();
        const userId = info.identifier.split('-')[0]
        const data = await fetch(`https://perfectionserver.vercel.app/payment/${userId}?manualId=${id}`)
        const result = await data.json();
  
        if(data.ok){
          localforage.setItem(id, JSON.stringify(result));
          history.push(`/manual/${id}`)
  
        }else{
          alert('Something went wrong...try verifying your download in the download page or retry payment')
        }
        // closePaymentModal() // this will close the modal programmatically
      },
    })
  }

  const userIdCheck = async() =>{
    const info = await Device.getId();
    const userId = info.identifier.split('-')[0];
    
    alert("Unique Id: "+userId)
  }

  const verify = async() =>{
    setLoading(true)
    const info = await Device.getId();
    const userId = info.identifier.split('-')[0]
    const fetcher = await fetch(`https://perfectionserver.vercel.app/verify/${userId}?manualId=${id}`);
    const result = await fetcher.json();
    
    if(fetcher.ok){
      setLoading(false);
      const local = await localforage.setItem(id, JSON.stringify(result));
      history.push(`/manual/${id}`)
    }

    if(fetcher.status === 400){
      setLoading(false);
      alert('You have never bought the app')
 
    }
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          loading && (
            <div className='overlay'>
              <img src={Loading} alt="" />
              <h2>Loading</h2>
            </div>
          )
        }
        <div className='download-image'>
            <img src={Image} alt="Download Perfection manual" />
            <h2 style={{textAlign: 'center'}}>Download Manual</h2>
            {/* <FlutterWaveButton {...fwConfig} className='payment-btn' /> */}
            {
              network ? (<button onClick={makePayment} className='payment-btn'>Click to Pay</button>):
              (<button onClick={() => alert('Check your internet connection')} className='payment-btn'>Connect to network to download Manual</button>)
            }
            <h6 style={{fontWeight: '700'}}>OR</h6>

            <p>If you have paid for this but can't find the page click the link below to verify and download {id}</p>

            {
              network ? (
                <a onClick={verify}>+ Click to Verify and Download</a>
              ):(<a><IonIcon icon={wifiOutline} /> Connect to network to verify and download</a>)
            }
            
            {/* <button id="open-custom-dialog" expand="block">Download</button> */}
      
        </div>

        <button onClick={userIdCheck} style={{position: 'fixed', bottom: 0, padding: '5px'}}><b>USERID</b></button>
      </IonContent>
    </IonPage>
  );
}

export default DownloadPage;
