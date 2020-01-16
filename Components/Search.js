// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import films from '../Helpers/filmData'
import FilmItem from './FilmItem'
import { getFilmsApiWithSearchedText } from '../API/TMDBApi'
// on connecte le component search qui nous permettra de récupérer les state de filmitem et fimdetail
import { connect } from 'react-redux'


class Search extends React.Component {
  // On réecrit le constructeur
  constructor(props) {
    super(props)
    // Ici on va créer les propriétés de notre component custom Search
    //dans le state on déclare un tableau vide
    //searchedText va contenir la strin recherché ( text tapé dans l'input et paramètre de la requête API
    //Pour récupérer la donnée il faut qu'un événement est lieu
    //On sort la recherche pour éviter la surcharge
    this.page = 0
    this.totalPage = 0
    this.searchedText = ""
    this.state = {
      films: [],
      isLoading: false

    }
  }

  _loadFilms() {
    console.log(this.searchedText) // Un log pour vérifier qu'on a bien le texte du TextInput
    //Pour modifier le state on passe par setstate
    // On va modifier le state ( tableau vide ) lorsque l'appelle api est fait
    // grace à setstate qui va nous permettre de le remplir avec les données reçus
    //si searchedText n'est pas vide
      //alors je remplis le tableau films avec les résultats de la requête
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })  //Lancement du chargement
      getFilmsApiWithSearchedText(this.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPage = data.total_pages
          this.setState({
            // ... permet de faire une copie des données déjà chargés et celle qu'on chargera
            // et on les concaténe dans un tableau
            films: [ ...this.state.films, ...data.results],
            isLoading: false
           })
         })
       }
     }

  _displayLoading(){
    if (this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' color="#0000ff" />
        </View>
      )
    }
  }

  _searchFilms() {
    this.page = 0
    this.totalPage = 0
    this.setState({
      films: []
      //on fait appel au 2ème paramètre de setState car c'est une fonction asynchrone
      // elle s'execute en arriere plan pour éviter ce comportement au fait appel à son 2ème paramètre le callback
      // le callback permet d'exécuter une action dès qu'il fini de se mettre à jour
    }, () => {
      console.log("Page : " + this.page + " / TotalPages : " + this.totalPage + " / Nombre de films : " + this.state.films.length)
      this._loadFilms()
    })
  }

  _searchTextInputChanged(text){
    this.searchedText = text
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail" , { idFilm: idFilm })
  }

  render() {
    console.log(this.state.isLoading);
    return (
      <View style={styles.main_container}>
        <TextInput onSubmitEditing={() =>this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder='Titre du film'/>
        <Button title='Rechercher' onPress={() => this._searchFilms()}/>
        <FlatList
         data={this.state.films}
         extraData={this.props.favoritesFilm}
         keyExtractor={(item) => item.id.toString()}
         renderItem={({item}) =>
         <FilmItem
           film={item}
           isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
           displayDetailForFilm={this._displayDetailForFilm}
           />
          }
         onEndReachThreashold={0.5}
         onEndReached={() => {
           if (this.page < this.totalPage){
             this._loadFilms()
           }
         }}
       />
      {this._displayLoading()}
      </View>
    )
  }
  }
const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textinput: {
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

// On va mappé les données au state globale
// on cree une constante

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)
