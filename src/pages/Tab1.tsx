import { IonContent, IonHeader, IonIcon, IonRouterLink, IonPage, IonTitle, IonToolbar, IonCard } from '@ionic/react';
import { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png'
import { useHistory, Route } from 'react-router-dom';
import { keyOutline, arrowForward, bookOutline, lockClosed, calendarNumberOutline, warningSharp } from 'ionicons/icons';
import './home.css';
import localforage from 'localforage';
import { Device } from '@capacitor/device';

interface Information {
  id: string,
  year: String,
  title: string,
  available: string
}
const Tab1: React.FC = () => {
  const [info, setInfo] = useState([]);
  const history = useHistory();
  const [id, setId] = useState<string[]>([]);


  const currentYear = info[0] as {id: string, year: number, title: String }

  useEffect(() =>{
    const read = async () =>{  

      const ids:any = await localforage.keys()
      setId([...ids])    
    }

    read()
  }, [])

  useEffect(() => {
    const fetchData = async() =>{
      const data = await fetch(`/information.json`);
      const jsonData = await data.json();
      setInfo(jsonData)
    }
    fetchData()
  }, [])  

  const handleClick = (x: string) => {
    history.push(x);
  };


  const previous: Information[] = info.slice(1);
  return (
    <IonPage>
      <IonContent>
        <div className="container">
            <div className="home">
              <div className='header'>
                <img style={{width: '50px'}} src={Logo} alt="Logo will be here" />
                <h3 className='text-white'>{currentYear?.year}</h3>
              </div>
              <h4>SUNDAY SCHOOL MANUAL</h4>
              <p><IonIcon style={{color: 'white'}} icon={calendarNumberOutline} /> {currentYear?.title}</p>
              <div className='quater'>
                    {
                       id.includes(currentYear?.id) ? (
                         <IonRouterLink onClick={() => handleClick(`/manual/${currentYear?.id}`)}><h3><IonIcon style={{color: 'white'}} icon={bookOutline} /> Read</h3></IonRouterLink>
                       ):(
                        <IonRouterLink onClick={() => handleClick(`/download/${currentYear?.id}`)}><h3><IonIcon style={{color: 'white'}} icon={lockClosed} /> Buy / Download</h3></IonRouterLink>
                       )

                    }
              </div>
            </div>  

            <div className="previous-year">
              {
   
                  previous.map(ele =>(
                    <IonCard key={ele.id} className="previous-item">
                      <div style={{margin: '0px auto', fontSize: '30px', textAlign:'center'}} >
                     {
                      id.includes(ele.id) ? (
                        <IonIcon icon={bookOutline} style={{color: 'green'}}/>
                      ):(
                        <IonIcon icon={lockClosed} style={{color: 'red'}}/>
                      )
                     }
                      <h2 className='light'>{ele.title} {ele.year}</h2>
                      
                      
                       {
                         id.includes(ele.id) ? (
                         <section className='btn' onClick={() => handleClick(`/manual/${ele?.id}`)}><p>Read</p> 
                         <IonIcon icon={arrowForward} /></section>):(
                        <div>
                          {
                            ele.available ? (
                              <section className='btn' onClick={() => handleClick(`/download/${ele?.id}`)}>
                                <IonIcon icon={keyOutline} />
                                <p>Unlock</p> 
                              </section>
                            ):(
                              <section className='btn2' onClick={() => alert(`The ${ele.id} sunday school manual will be available for download very soon..`)}>
                                <IonIcon icon={warningSharp} style={{color: 'rgb(236, 75, 75)'}}/>
                                <p>Coming Soon</p> 
                              </section>
                            )
                          }

                        </div>
                        )
                       }
                      </div>
                    </IonCard>
                  ))
              }
                

            </div> 
           
        </div>

      </IonContent>

    </IonPage>
  );
};

export default Tab1;
