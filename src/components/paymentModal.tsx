import {IonInput, IonToast, IonModal, IonButton, IonItem, IonSearchbar, IonList, IonContent } from '@ionic/react';
// import {  } from '@capacitor/core';
import {useRef, useEffect, useState} from 'react';

const PaymentModal: React.FC = () =>{
    const modal = useRef<HTMLIonModalElement>(null);
    const inputRef = useRef<HTMLIonInputElement>(null);
    const [emptyToast, setEmptyToast] = useState(false);

    useEffect(() => {
        inputRef?.current?.addEventListener('keydown', handleKeyDown);
        return () => {
          inputRef.current?.removeEventListener('keydown', handleKeyDown);
        };

        
      }, [inputRef]);


    // Handling activation code transfer to backend here
    const handleKeyDown = (event: { key: string; }) => {   
      console.log(inputRef.current?.value);

        if (event.key === 'Enter') {
            if(inputRef.current?.value === ''){
                console.log('Empty');  
                setEmptyToast(true);
                return;
            }else{
                console.log(inputRef.current?.value);  
            }
        }
      };
    return(
        <>
            <IonButton className="button"  id="open-modal" expand="block" style={{'--background': 'rgb(80,158,75)'}}>
                Download
            </IonButton>
            <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.75} breakpoints={[0, 0.25, 0.5, 0.75]}>
          <IonContent className="ion-padding">
            <div>
                <h1>Payment</h1>
                <IonInput ref={inputRef} label="Activation Code" labelPlacement="floating" fill="outline" placeholder="Code"></IonInput>
                 <h5 style={{textAlign: 'center'}}>OR</h5>
                 <IonButton style={{width: '100%'}} className="button" color="warning">
                    Pay
                 </IonButton>


                <IonToast
                  isOpen={emptyToast}
                  onDidDismiss={() => setEmptyToast(false)}
                  message="Activation Code Can't be empty"
                  duration={3000}
                />
            </div>
          </IonContent>
        </IonModal> 
        </>
    )
}

export default PaymentModal;