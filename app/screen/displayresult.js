import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground,Image, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';

var screen = Dimensions.get('window');

class resultScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      data:{},
      image: this.props.navigation.getParam('imageData'),
      isLoading : true,
      ans:{},
      text:'',
      text2:'',
      text3:'',
      text4:'',
      text5:'',
      loader : false,
      swipeToClose: true,
      sliderValue: 0.3,
    }
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  componentDidMount(){
    this.setState({loader:true})
    const data = {image:this.state.image}
    return fetch('https://imagerecog2397.herokuapp.com/',
    {
      method: "POST",
      headers: {
       "Accept": "application/json",
       "Content-Type": "application/json",
      },
      body : JSON.stringify(data)
    })
      .then((response) => {
          let ans_json = JSON.parse(response._bodyText)
          console.log(ans_json['predictions'])
          this.setState({
            isLoading : false,
            ans : ans_json,
            text : ans_json['predictions'][0].label,
            text2 : ans_json['predictions'][1].label,
            text3 : ans_json['predictions'][2].label,
            text4 : ans_json['predictions'][3].label,
            text5 : ans_json['predictions'][4].label,
            loader : false,
          })
          console.log(this.state.ans)
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
        return(<View style={styles.container}>
                    <ImageBackground
                        source={{
                            isStatic: true,
                            uri: this.state.image.uri,
                        }}
                        style={styles.backgroundImage}
                      >

                        <View style={{flex:1, backgroundColor:this.state.isLoading?'rgba(255,255,255,0.2)':'#fff0'}}>
                          <ImageBackground
                              source={this.state.isLoading?null:{uri:'googlepixel2'}}
                              style={styles.backgroundImage}
                            >

                            <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
                                <View style={{width: screen.width, paddingLeft: 10}}>
                                    <FlatList
                                      data={[
                                        {key: this.Capitalize(this.state.text2)},
                                        {key: this.Capitalize(this.state.text3)},
                                        {key: this.Capitalize(this.state.text4)},
                                        {key: this.Capitalize(this.state.text5)},
                                      ]}
                                      renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                                    />
                                </View>
                            </Modal>

                            <View style={{flex:1, alignItems:'center',justifyContent:'flex-start'}}>
                              <Text style={[styles.results, {zIndex:4}]}>
                                    {this.Capitalize(this.state.text)}{'\n'}{'\n'}
                              </Text>

                            </View>
                            <View style={{flex:1, alignItems:'center',justifyContent:'flex-start', width:'100%'}}>
                              {this.state.loader?<Image
                                                      style={{width:50, height:50}}
                                                      source={require('../img/loader.gif')}></Image>:<View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                                <TouchableOpacity
                                  style={{
                                      zIndex:0,
                                      backgroundColor:'none',
                                      width:60,
                                      height:60,
                                      marginBottom:'-7%',
                                      marginRight:'-11%',
                                      borderRadius:100,
                                    }}
                                    onPress={() => {
                                      this.props.navigation.navigate('Camera');
                                    }

                                    }
                                    >
                                  <Icon name={"chevron-circle-up"} onPress={() => this.refs.modal6.open()} style={{marginBottom:'1%'}}size={25} color="#ffff" />
                                </TouchableOpacity>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    color:'#fff',
                                    justifyContent:'flex-end',
                                    marginBottom:'2%',
                                  }}
                                >
                                swipe up to see other predictions
                                </Text>

                                </View> }
                            </View>
                          </ImageBackground>
                        </View>
                      </ImageBackground>
                </View>);
      }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  static navigationOptions = {
    header: null
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  welcomeText : {
    justifyContent: 'flex-start',
    alignSelf : 'flex-start',
    marginTop : '10%',
    marginLeft : '5%',
    fontFamily:'RobotoThin',
    fontWeight : 'normal',
    fontSize : 45,
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'center'
  },
  bgimg2:{
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'contain'
  },
  results:{
  marginTop: '2%',
  fontFamily:'RobotoMedium',
  fontWeight : 'normal',
  fontSize : 42,
  color:'#fff'
    },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
      height: 300
    },
   item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
});

export default resultScreen;