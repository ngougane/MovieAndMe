// App.js

import React from 'react'
import Navigation from './Navigation/Navigation'
//Pour pouvoir utiliser le store il faut impoter le composant provider de la librairie react redux
import  { Provider } from 'react-redux'
//Provider va se charger de distribuer le store qu'on lui met à disposition
import Store from './Store/configureStore'

export default class App extends React.Component {
  render() {
    return (
      // On encapsule l'application dans le provider
      <Provider store={Store}>
        <Navigation/>
      </Provider>

    )
  }
}
