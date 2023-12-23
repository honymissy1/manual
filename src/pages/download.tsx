import { IonHeader, IonButtons, IonBackButton, IonToolbar, IonTitle, IonContent, IonButton, IonRouterLink, IonPage } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import Image from '../assets/images/download.png';
import Images from '../assets/images/logo.png'
import localforage from 'localforage';
// import { Device } from '@capacitor/device';

const DownloadPage = () => {
  const {id}:any = useParams();
  const history = useHistory();

    //Here we are going to fix it up with stripe or so
    // try{
    //   const data = await fetch(`https://perfectionserver.vercel.app/test`);
      
    //   const result = await data.json();
    //   console.log(data);
    //   localforage.setItem(id, JSON.stringify(result))
    //   .then(result =>{
    //      console.log('Data stored successfully');
    //      console.log(result);
    //      location.href = `/manual/${id}`
    //   }).catch((err) => console.error(err));
      
    // }catch(err){
    //   console.log('Errror');
      
    // }
  //    const config = {
  //   public_key: 'FLWPUBK-17db7720752df7fc23b9e9dbbec997ea-X',
  //   tx_ref: Date.now().toString(),
  //   amount: 500,
  //   currency: 'NGN',
  //   payment_options: 'card,mobilemoney,ussd',
  //   customer: {
  //     email: 'user@gmail.com',
  //      phone_number: '070********',
  //     name: 'john doe',
  //   },
  //   customizations: {
  //     title: 'my Payment Title',
  //     description: 'Payment for items in cart',
  //     logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
  //   },
  // };

  // const handleFlutterPayment = useFlutterwave(config);

  const makePayment = async (e:any) =>{
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-edcf63b372f8cb290127aa8c11f9f2f3-X",
      tx_ref: 'uuidv4()',
      amount: 300,
      currency: "NGN",
      payment_options: "card",
      redirect_url: "https://perfectionserver.vercel.app/payment",
      meta: {
        consumer_id: 'onimis@gmail.com',
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: 'onimis@gmail.com',
      },

      customizations: {
        title: "Ministry of Perfection Manual",
        description: "MOP Manual Credit to activate user accounts",
        logo: Images,
      },

    });
  }

  return (
    <IonPage>
      <IonContent>
        <div className='download-image'>
            <img src={Image} alt="Download Perfection manual" />
            <h2 style={{textAlign: 'center'}}>Download Manual</h2>
            <IonButton 
             onClick={makePayment}
            >Pay</IonButton>

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
