import React, {Component} from 'react';
import {StyleSheet, Text, View, ImageBackground,Image, TouchableOpacity, Dimensions, FlatList, Button, CameraRoll, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';
import {NativeModules} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { captureRef } from "react-native-view-shot";
import Emoji from 'react-native-emoji';

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
      take_ss: false
    }
  }
  onSwipeUp(gestureState) {
    this.refs.modal6.open()
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
    const data = this.state.image.uri
    var labell = null
    NativeModules.ClassifierModule.ClassifyImage(
       data,
      (msg, label)=>{
         arr = label.split(',');
         this.setState({
          isLoading : false,
          ans : arr[0],
          text : arr[1],
          text2 : arr[2],
          text3 : arr[3],
          text4 : arr[4],
          text5 : arr[5],
          loader : false,
          take_ss: true
        })
      },
      (msg)=>{
        console.log(msg)
      }
    );
      
  }
  async requestPhotosPermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('yaaha')
          return 'done';
        } else {
          console.log("Photos permission denied")
          return 'not';
        }
    } catch (err) {
      console.warn(err)
    }
  }
  take_screen =()=>{
  
    captureRef(this.refs.sc, {
      format: "jpg",
      quality: 0.8,
    })
    .then(
      uri => {this.requestPhotosPermission()=='done'?CameraRoll.saveToCameraRoll(uri):null},
      error => console.error("Oops, snapshot failed", error)
    );
  }
  render(){
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 50,
    };

    return(
      <GestureRecognizer
      onSwipeUp={(state) => this.onSwipeUp(state)}
      config={config}
  style={{
          flex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          
      }}
      >
     
    <View ref='sc' style={styles.container}>
                <ImageBackground
                    source={{
                        isStatic: true,
                        uri: this.state.image.uri,
                    }}
                    style={styles.backgroundImage}
                  >

                    <View  style={{flex:1, backgroundColor:this.state.isLoading?'rgba(255,255,255,0.2)':'#fff0'}}>
                      <ImageBackground
                          source={this.state.isLoading?null:{uri:'googlepixel2'}}
                          style={styles.backgroundImage}
                        >

                        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
                            <View style={{width: screen.width, paddingLeft: 10}}>
                                <FlatList
                                  data={[
                                    {key: this.Capitalize(this.state.text2.split(':')[0])},
                                    {key: this.Capitalize(this.state.text3.split(':')[0])},
                                    {key: this.Capitalize(this.state.text4.split(':')[0])},
                                    {key: this.Capitalize(this.state.text5.split(':')[0])},
                                  ]}
                                  renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                                />
                            </View>
                        </Modal>

                        <View style={{flex:1, alignItems:'center',justifyContent:'flex-start'}}>
                          <Text style={[styles.results, {zIndex:4}]}>
                                {this.Capitalize(this.state.text.split(':')[0])}{'\n'}
                          </Text>
                          <Text style={styles.results}><Emoji name='ghost' style={{fontSize: 50}}></Emoji></Text>
                        </View>
                        <View style={{flex:1, alignItems:'center',justifyContent:'flex-start', width:'100%'}}>
                          {this.state.loader?<Image
                                                  style={{width:50, height:50}}
                                                  source={require('../img/loader.gif')}></Image>:<View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                            <Button title="Take Screenshot" onPress={this.take_screen} />
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
            </View>
          </GestureRecognizer>);
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
  border: {
    borderRadius:100,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,1)'
  },
  button: {
    alignItems: 'center',
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