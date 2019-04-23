import React from 'react';
import { Route, Switch } from 'react-router-dom';
//import { MobileView, BrowserView } from 'react-device-detect'


//import { BLUE, DARK_BLUE } from '../styles/colors'


// import Home from './home/App'
// import NotFound from './shared/NotFound'
// import Dining from './dining/DiningVenue'
// import Laundry from './laundry/App'
// import StudySpaces from './studyspaces/App'
// import Reservations from './reservations/App'
// import Mobile from './mobile/App'

import Login from './login/app'


// const App = s.div`
//   a {
//     color: ${BLUE};
//     &:hover,
//     &:focus,
//     &:active,
//     &:visited {
//       color: ${DARK_BLUE};
//     }
//   }
// `

export default () => (
  <App>
    <div id="wrapper">
      <div id="app">
        <Switch>
          <Route exact path="/accounts/login" component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
  </App>
);