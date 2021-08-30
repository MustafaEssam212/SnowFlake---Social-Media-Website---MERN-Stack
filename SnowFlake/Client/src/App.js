import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import Intro from './Component/Intro'
import SignUp from './Component/SignUp'
import SignIn from './Component/SignIn'
import {AuthProvider} from './Component/AuthContext'
import Home from './Component/Home'
import {AccProvider} from './Component/Acc-Context'
import {DetailsProvider} from './Component/AccDetails-Context'

import Profile from './Component/Profile'
import Settings from './Component/Settings';
import Search from './Component/Search'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
                               
      
        
                                    <Route exact path="/" component={Intro}></Route>
                                    <Route  path="/SignUp" component={SignUp}></Route>
                                    <Route  path="/SignIn" component={SignIn}></Route>
                                    <Route  path="/Home" component={Home}></Route>      
                                    <Route  path="/Profile/:id" component={Profile}></Route>     
                                    <Route  path="/Settings/:id" component={Settings}></Route>
                                    <Route  path="/Search" component={Search}></Route>                             
    </div>
    </BrowserRouter>  
  );
  
}

function AppWithStore(){
  return(
      <AuthProvider>
        
          <AccProvider>
      
              <DetailsProvider>

             

                <App />

            
                
                </DetailsProvider>

          </AccProvider>

      </AuthProvider>
  )
}



export default AppWithStore;
