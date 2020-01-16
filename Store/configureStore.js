//On crée un store avec la librairie redux
import { createStore } from 'redux'
// on va chercher le reducer
import toggleFavorite from './Reducers/favoriteReducer'

// on cree le store et on l'exporte
export default createStore(toggleFavorite)
