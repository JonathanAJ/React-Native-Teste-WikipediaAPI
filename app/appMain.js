import React, {Component} from "react";
import {StyleSheet, View, Text, TextInput, Image} from "react-native";

export default class WikipediaAPI extends Component{
  
  constructor(){
    super();
    this.state = {
          entrada   : '',
          saida     : 'Qual a palavra?',
          imagem    : 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Nohat-wiki-logo.png'
    }
  }

  render(){
    return (
      <View style={estilo.principal}>

        <Text style={estilo.label}>
          Coloque algo:
        </Text>

        <TextInput
          text={this.state.entrada}
          onChangeText={this.setEntrada.bind(this)}
          onSubmitEditing={this.retornaPalavraRest.bind(this)} />

        <Text style={estilo.label}>
          A definição talvez seja: 
        </Text>

        <View style={{flex : 1, flexDirection : "row", marginTop : 16}}>            
          
          <Image
            style={estilo.imagem}
            source={{uri: this.state.imagem}}/>
          
          <Text
            style={estilo.palavra}>
            {this.state.saida}
          </Text>

        </View>

      </View>
    )
  }

  setEntrada(txt){
    this.setState({entrada : txt})
  }

  async retornaPalavraRest(){
    try {
      let response = await fetch('https://pt.wikipedia.org/w/api.php?format=json&action=query&formatversion=2&generator=prefixsearch&gpslimit=5&prop=pageimages%7Cpageterms&piprop=thumbnail&pithumbsize=50&pilimit=5&redirects=&wbptterms=description&gpssearch='+this.state.entrada);
      let responseJson = await response.json();
      let title = responseJson['query'].pages[0].title;
      let image = responseJson['query'].pages[0].thumbnail.source;
      this.setState({saida : title});
      this.setState({imagem : image});

    } catch(error) {
      this.setState({imagem : "https://upload.wikimedia.org/wikipedia/commons/7/7a/Nohat-wiki-logo.png"});
      this.setState({saida : "Palavra difícil hein? Tente outra."});
    }
  }
}

var estilo = StyleSheet.create({
  
  principal : {
    flex : 1,
    paddingLeft : 16,
    paddingRight : 16,
    paddingBottom : 16
  },

  label :{
    marginTop : 16,
    fontWeight : "bold"
  },

  palavra :{
    flex : 3,
    marginLeft : 8,
    fontSize : 20,
    fontStyle : "italic",
  },

  imagem :{
    flex : 1,
    width : 50,
    height : 50
  }

});