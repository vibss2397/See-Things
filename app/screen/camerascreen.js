import React, {Component} from 'react';
import { RNCamera, FaceDetector } from 'react-native-camera';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
class cameraScreen extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          cameraType : 'back',
          mirrorMode : false,
          flash : RNCamera.Constants.FlashMode.off,
          autoFocus : RNCamera.Constants.AutoFocus.on,
          flashActive : false,
          myText: 'I\'m ready to get swiped!',
          gestureName: 'none',
        }
      }
      onSwipeLeft(gestureState) {
        this.setState({myText: 'You swiped left!'});
        this.props.navigation.navigate('Old');
      }
      onSwipeRight(gestureState) {
        this.setState({myText: 'You swiped left!'});
        this.props.navigation.navigate('Home');
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
            <View style={{flex:4}}></View>
            <View style={styles.blehh}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                        <TouchableOpacity
                                onPress = {this.changeCameraType.bind(this)}
                                style = {[this.state.cameraType=='back'?styles.backButton:styles.backButtonNew,{marginLeft:'1%'}]}
                            >
                            <Icon name={"camera"}  size={22} style={{color: this.state.cameraType=='back'?"#ffff":'#000',  marginLeft: 8, marginTop: 8}} />
                            </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                    <TouchableOpacity
                        onPress = {this.takePicture.bind(this)}
                        style = {styles.capture}
                    >
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <TouchableOpacity
                                onPress = {this.changeFlashType.bind(this)}
                                style = {[this.state.flashActive?styles.flashOnButton:styles.backButton,{marginLeft:'23%'}]}
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
                mirror: true
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
            if (this.camera) {
              const options = { quality: 0.7, base64: true, fixOrientation: true };
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
          width:70,
          height:70,
          borderRadius:100,
          borderWidth: 10,
          borderColor: 'rgba(255,255,255,0.4)',
          
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