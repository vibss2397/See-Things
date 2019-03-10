import React, {Component} from 'react';
import { RNCamera } from 'react-native-camera';
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Emoji from 'react-native-emoji';
import {NativeModules} from 'react-native';
import * as mapping from './mapping.json'
import { captureScreen } from "react-native-view-shot";
import GestureRecognizer from 'react-native-swipe-gestures';
class cameraScreen extends Component{
 
  constructor(props) {
        super(props);
      
        this.state = {
          cameraType : 'back',
          mirror : false,
          flash : RNCamera.Constants.FlashMode.off,
          autoFocus : RNCamera.Constants.AutoFocus.on,
          flashActive : false,
          myText: 'I\'m ready to get swiped!',
          gestureName: 'none',
          food : false,
          rt : false, 
          uri : null,
          tex : '',
          emoji: 'no_mouth'
        }
      }
      componentDidMount() {
        console.log(mapping)
        interval = setInterval(() => {
          if(this.state.rt==true){
          captureScreen({
            format: "jpg",
            quality: 0.8,
          })
          .then(
            uri => {
              NativeModules.ClassifierModule.ClassifyImageRT(
                uri,
                (msg, label)=>{
                  arr = label.split(',');
                  let emo=arr[1].split(':')[0].replace(/^\s+|\s+$/g, "");
                  this.setState({
                    tex : arr[1].split(':')[0],
                    emoji: emo
                  });
                }, (msg)=>{
                  console.log(msg);
                }
              )
            },
            error => console.error("Oops, Snapshot failed", error)
          );
          }
        }, 1600);
      } 
      onSwipeLeft(gestureState) {
        this.setState({myText: 'You swiped left!'});
        this.props.navigation.navigate('Old');
      }
      onSwipeRight(gestureState) {
        this.setState({myText: 'You swiped left!'});
        this.props.navigation.navigate('Home');
      }
      
      onPress = () => {
        if(this.state.food==false){
          this.setState({food: true});
        } else {
          this.setState({food: false});
        }
      }
      ClassifyRealTime = ()=>{
        if(this.state.rt==false){
          this.setState({rt: true});
        }
         else {
          this.setState({rt: false});
        }
      }
    render(){
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 50,
          };

        return(
            <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={this.state.cameraType}
            flashMode={this.state.flash}
            autoFocus={this.state.autoFocus}
            mirrorImage={this.state.mirrorMode}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes)
            }} >

        <GestureRecognizer
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}
                    config={config}
                style={{
                        flex: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        
                    }}
                    >
              <View style={{flex:0.3}}></View>      
                <View style={{flex:0.3, flexDirection:'row', justifyContent:"center"}}>
                      <View style={{flex: 0.3, flexDirection: 'column', justifyContent:"center"}}>
                      <Text style={{color:'#fff'}}>Goto: {'\n'}</Text>
                      {this.state.food==true?
                      <TouchableOpacity
                        style={[styles.button, styles.border]}
                        onPress={this.onPress}
                        >
                        <Text style={{color:'#fff'}}>See Things</Text>
                      </TouchableOpacity> : <TouchableOpacity
                        style={[styles.button, styles.border]}
                        onPress={this.onPress}
                        >
                        <Text style={{color:'#fff'}}>See Food</Text>
                      </TouchableOpacity> }
                    </View>
            </View>
            <View style={{flex:3.8}}></View>
            {this.state.rt==true?
            <View style={{flex:0.2, flexDirection:'row', justifyContent:'center'}}>
            <Text style={{color:'#fff'}}>The food i guess is <Emoji name={this.state.emoji} style={{fontSize: 20}}></Emoji> 
            {this.state.tex}<Emoji name={this.state.emoji} style={{fontSize: 20}}></Emoji></Text>
            </View>
            :<View style={{flex:0.2}}></View>}
            
            <View style={styles.blehh}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableHighlight
                                onPress = {this.changeCameraType.bind(this)}
                                style = {[this.state.cameraType=='back'?styles.backButton:styles.backButtonNew,{marginLeft:'1%'}]}
                            >
                            <Icon name={"camera"}  size={22} style={{color: this.state.cameraType=='back'?"#ffff":'#000',  marginLeft: 8, marginTop: 8}} />
                            </TouchableHighlight>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    {this.state.food==true?
                    <View>  
                    <TouchableOpacity
                        onPress = {this.ClassifyRealTime}
                        style = {styles.capture}
                    >
                    {this.state.rt==true?
                    <Icon name={'pause'} size={23} style={{marginLeft:17, marginTop:16, color:'#C13584'}}></Icon>:
                    <Icon name={'play'} size={25} style={{marginLeft:19, marginTop:15, color:'#C13584'}}></Icon>}
                    </TouchableOpacity>
                    </View>:
                    <TouchableOpacity
                    onPress = {this.takePicture.bind(this)}
                    style = {styles.capture}>
                    <Icon name={'adjust'} size={24} style={{marginLeft:15, marginTop:16, color:'#C13584'}}></Icon>
                    </TouchableOpacity>}
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress = {this.changeFlashType.bind(this)}
                                style = {[this.state.flashActive?styles.flashOnButton:styles.backButton,{marginLeft:'-6%'}]}
                            >
                            <Icon name={"bolt"}  style={{ color: this.state.flashActive?'#000':'#fff', marginLeft: 13, marginTop: 7}}size={29}  />
                            </TouchableOpacity>
                </View>
            </View>

            </GestureRecognizer>
            </RNCamera>
                );
        }
        
        changeCameraType() {
            if (this.state.cameraType === 'back') {
              this.setState({
                cameraType: 'front',
                mirror: true,
              });
            } else {
              this.setState({
                cameraType: 'back',
                mirror: false
              });
            }
        };
        static navigationOptions = {
            header: null
        }

        changeFlashType(){
            if(this.state.flash === RNCamera.Constants.FlashMode.off){
                this.setState({
                    flash : RNCamera.Constants.FlashMode.on,
                    flashActive : true,
                })
            } else{
                this.setState({
                    flash : RNCamera.Constants.FlashMode.off,
                    flashActive : false,
                })
            }
        }
        takePicture = async function() {
          let a;
          if(this.state.mirror==true){
            a = true;
          }
          else{
            a=false;
          }
          if (this.camera) {
                const options = { quality: 0.7, fixOrientation: true, mirrorImage: a};
                const data = await this.camera.takePictureAsync(options);              
              this.props.navigation.navigate('Result',{
                  imageData: data
              });
            }
        };
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'black',
        },
        preview: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'stretch',
        },
        capture: {
          flex: 0,
          backgroundColor: '#fff',
          width:85,
          height:85,
          borderRadius:100,
          borderWidth: 15,
          borderColor: 'rgba(255,255,255,0.4)',
          
        },
        border: {
          borderRadius:100,
          borderWidth: 3,
          borderColor: 'rgba(255,255,255,1)'
        },
        button: {
          alignItems: 'center',
        },
        backButton: {
            zIndex:10,
            flex: 0,
            backgroundColor :'transparent',
            borderWidth: 5,
            borderColor:'#fff',
            width:50,
          height:50,
          borderRadius:100,
        },
        backButtonNew: {
            zIndex:10,
            flex: 0,
            backgroundColor :'#fff',
            borderWidth: 5,
            borderColor:'#fff',
            width:50,
          height:50,
          borderRadius:100,
        },
        flashOnButton: {
            zIndex:10,
            flex: 0,
            backgroundColor :'#fff',
            borderWidth: 5,
            borderColor:'#fff',
            width:50,
          height:50,
          borderRadius:100,
        },
        blehh: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        }
      })

export default cameraScreen;