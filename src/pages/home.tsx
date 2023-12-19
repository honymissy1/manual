import { IonContent, IonRouterOutlet,  IonIcon, IonRouterLink, IonApp} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import './home.css';
import Logo from '../assets/images/logo.png'
import { useHistory, Route } from 'react-router-dom';
import {chevronForward, lockClosed, key, lockOpen} from 'ionicons/icons';
import { useEffect, useState } from 'react';
import DownloadPage from './download';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import Manual from './manual';



// import File


const Home = () => {
  const [info, setInfo] = useState([]);
  const [manuals, setManuals] = useState([]);


  const currentYear = info[0] as {id: String, year: number, title: String, yearname: string }
  const history = useHistory();

  const handleClick = (x: string) => {
    history.push(x);
  };

  useEffect(() => {
    const fetchData = async() =>{
      const data = await fetch(`/information.json`);
      const jsonData = await data.json();
      setInfo(jsonData)
      // console.log();  
    }
    fetchData()
  }, [])
  return (
    <IonApp>
      <IonContent fullscreen>
        <div className="container">
            <div className="home">

            <div className='header'>
              <img style={{width: '50px'}} src={Logo} alt="Logo will be here" />
              <h3></h3>
            </div>
            
            <div className='quater'>
                  <IonRouterLink onClick={() => handleClick(`/download/${currentYear?.id}`)}><h3>{currentYear?.title}</h3></IonRouterLink>
            </div>
            </div>

            {/* <div className="previous">
                <div className='prev-container'>
                    <div className="year">
                        <h3>2022</h3>
                    </div>
                    <div className='section' style={{display: 'flex'}}>
                        <h3>1st <sup><IonIcon icon={lockClosed} /></sup></h3>
                        <h3 style={{color: 'green'}}>2nd <sup><IonIcon icon={key} /></sup></h3>
                    </div>
                </div>

                <div className='prev-container'>
                    <div className="year">
                        <h3>2021</h3>
                    </div>
                    <div className='section' style={{display: 'flex'}}>
                        <h3>1st <sup><IonIcon style={{color: 'red'}} icon={lockClosed} /></sup></h3>
                        <h3>2nd <sup><IonIcon icon={key} /></sup></h3>
                    </div>
                </div>

            </div> */}
        </div>
      </IonContent>
    </IonApp>
  );
};

export default Home;
