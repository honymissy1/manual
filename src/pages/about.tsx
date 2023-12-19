import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';


const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>About 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">About</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="home">
          <h1>About Page</h1>
          <p>Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Fugit possimus facere odit voluptatem, iure dolores dolorem debitis 
            deleniti recusandae! Provident minima vel maxime.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default About;
