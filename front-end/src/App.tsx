import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/upload';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';
import upload from './pages/upload';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import { getLoggedInUser } from './store';
import Upload from './pages/upload';


setupIonicReact();


const ProtectedRoute = ({ children }) => {
  const user = getLoggedInUser();

  if (user === "null") {
    return <Redirect to="/login" />;
  }

  return children;
};


const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/signup" component={SignupPage} exact={true} />
          <ProtectedRoute>
          <Route path="/home" component={Tab1} exact={true} />
          <Route path="/details/:id?" component={Tab2} exact={true} />
          <Route path="/upload" component={Upload} exact={true} />
          </ProtectedRoute>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};


export default App;