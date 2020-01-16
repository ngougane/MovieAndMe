// The Movie DB Api

//Doc react sur les api
//https://facebook.github.io/react-native/docs/network.html#using-fetch


//Constante qui contient la valeur de notre token
const API_TOKEN = "b4bb85cc1f8a4eed627eadb993b7e660"


// on va créer une fonction qui fera la requête à l'API selon le texte recherché
//pour pouvoir l'utiliser dans les Component ne pas oublier - export
export function getFilmsApiWithSearchedText(text, page) {
  //url + API_TOKEN + la liste des resultats en français + filtre texte de recherche
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
  //fetch est une librairie JS qui attend 2 options
  return fetch(url)
    //1er option then en cas de succès renvoie une response
    // ici on va convertir la réponse en fichier json pour pouvoir le parser facilement
    .then((response) =>response.json())
    //2ème option , en cas d'échec on va capturer l'erreur
    .catch((error) =>console.log(error))
}

//fonction qui va reconstruire l'url de l'image

  export function getImageFromApi(name) {

    return 'https://image.tmdb.org/t/p/w300' + name

  }

  // Récupération du détail d'un film
  export function getFilmDetailFromApi (id) {
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
