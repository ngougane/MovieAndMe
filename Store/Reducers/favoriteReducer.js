//reducer

//On va initialiser le state dans la constante suivante
// ici un tableau vide

const initialState = { favoritesFilm:[] }

// on créer la fonction qui va prendre 2 paramètres

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    //On va géré un seul cas
    // on va vérifier si l'index du film existe dans le tableau ( et donc si il est déjà dans les favoris)
    // dans ce cas on l'ajoute
    // sinon on le supprime
    case 'TOGGLE_FAVORITE' :
      const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
      if (favoriteFilmIndex !== -1) {
        //suppression dans le tableau
        nextState = {
         ...state,
         favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
       }
     }
      else {
        // on ajoute dans le tableau
        nextState = {
          ...state,
          favoritesFilm: [ ...state.favoritesFilm, action.value ]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleFavorite
