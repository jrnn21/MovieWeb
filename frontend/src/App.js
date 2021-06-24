import React from 'react';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';
import HomeScreen from './Screens/HomeScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import PlayScreen from './Screens/PlayScreen';
import SomethingScreen from './Screens/SomethingScreen';
import LoginScreen from './Screens/LoginScreen';
import AdminPanelScreen from './Screens/AdminPanelScreen';
import NotFoundScreen from './Screens/NotFoundScreen';
import VideoPageEdit from './Screens/VideoPageEdit';
import AdminSlideScreen from './Screens/AdminSlideScreen';

const App = () => {
 return (
  <>
   <Router>
    {/* <Banner /> */}
    <Navbar />
    <Switch>
     <Route path="/adminPanel/movies/:mid/edit" component={VideoPageEdit} />
     <Route
      path="/adminPanel/movies/search/:pageNumber"
      component={AdminPanelScreen}
     />
     <Route
      path="/adminPanel/movies/page/:pageNumber"
      component={AdminPanelScreen}
     />
     <Route path="/adminPanel/slider" component={AdminSlideScreen} />
     <Route path="/adminPanel/movies" component={AdminPanelScreen} exact />
     <Route path="/langdyLogin" component={LoginScreen} />
     <Route path="/somethingScreen" component={SomethingScreen} />
     <Route path="/movies/:mid/episodes/:ep" component={PlayScreen} />
     <Route path="/movies/search/page/:pageNumber" component={HomeScreen} />
     <Route path="/movies/page/:pageNumber" component={HomeScreen} />\
     <Route path="/movies/:movieType" component={HomeScreen} />
     <Route path="/" component={HomeScreen} exact />
     <Route component={NotFoundScreen} />
    </Switch>
    <Footer />
   </Router>
  </>
 );
};

export default App;
