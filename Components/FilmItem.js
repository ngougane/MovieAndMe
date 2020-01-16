import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'


class FilmItem extends React.Component {

//fonction qui affichera le film en favori
_displayFavoriteImage() {
  if (this.props.isFilmFavorite){
    return(
      <Image
        style={styles.favorite_image}
        source={require('../Images/ic_favorite.png')}
        />
    )
  }
}



  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <TouchableOpacity
        onPress={() => displayDetailForFilm(film.id)}
        style={styles.main_container}>
        <Image
          style={styles.image}
          source={{uri: getImageFromApi(film.poster_path)}}
         />
        <View style={styles.content}>
          <View style={styles.title_header}>
            {this._displayFavoriteImage()}
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description} numberOfLines={6}>{film.overview}</Text>
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flexDirection: 'row',
    height: 190,
  },
  image: {
    height: 180,
    width: 120,
    backgroundColor: 'gray'
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    margin: 5
  },
  title_header: {
    flex: 3,
    flexDirection: 'row',
  },
  favorite_container: {
    alignItems: 'flex-start'
  },
  title_text: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    paddingRight: 5
  },
  vote_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'

  },
  description_container: {
    flex: 7
  },
  description: {
    fontStyle: 'italic',
    color: '#666666'
  },
  date_container: {
    flex: 1
  },
  date: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
})


export default FilmItem
