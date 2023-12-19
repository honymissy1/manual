import { IonContent, IonHeader, IonIcon, IonRouterLink, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png'
import { useHistory, Route } from 'react-router-dom';
import { arrowForward, enterSharp } from 'ionicons/icons';
import './home.css';

interface Information {
  id: string,
  year: String,
  title: string
}
const Tab1: React.FC = () => {
  const [info, setInfo] = useState([]);
  const history = useHistory();


  const currentYear = info[0] as {id: String, year: number, title: String, yearname: string }

  useEffect(() => {
    const fetchData = async() =>{
      const data = await fetch(`/information.json`);
      const jsonData = await data.json();
      setInfo(jsonData)
      // console.log();  
    }
    fetchData()
  }, [])

  const handleClick = (x: string) => {
    history.push(x);
  };


  const previous: Information[] = info.slice(1);

  // console.log(previous);
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
       {/* <IonRouterOutlet>
          <Route path="/download/:id">
            <DownloadPage />
          </Route>

          <Route path="/manual/:id">
            <Manual />
          </Route>
       </IonRouterOutlet> */}

        <div className="container">
            <div className="home">
              <div className='header'>
                <img style={{width: '50px'}} src={Logo} alt="Logo will be here" />
                <h3>{currentYear?.year}</h3>
              </div>
              <div className='quater'>
                    <IonRouterLink onClick={() => handleClick(`/manual/${currentYear?.id}`)}><h3>{currentYear?.title}</h3></IonRouterLink>
              </div>
            </div>

            

            <div className="previous">
              {
                  previous.map(ele =>(
                    <div key={ele.id} className='prev-container'>
                    <div className="year">
                        <h3>{ele.year}</h3>
                    </div>
                    <div className='section' style={{display: 'flex'}}>
                        <h3 style={{fontWeight: '700', textAlign: 'left', marginLeft: '20px'}}>{ele.title}</h3>
                    </div>

                     <IonIcon onClick={() => handleClick(`/manual/${ele.id}`)} icon={enterSharp} style={{color: 'green',fontSize: '50px'}}/>                    
                    </div>
                  ))
              }
                

            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
