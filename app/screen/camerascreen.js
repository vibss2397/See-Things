import React, {Component} from 'react';
import { RNCamera, FaceDetector } from 'react-native-camera';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class cameraScreen extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          cameraType : 'back',
          mirrorMode : false,
          flash : RNCamera.Constants.FlashMode.off,
          autoFocus : RNCamera.Constants.AutoFocus.on,
          flashActive : false,
        }
      }

    render(){
        return(<View style={styles.container}>
            
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
            <View style={styles.blehh}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity
                                onPress = {this.changeCameraType.bind(this)}
                                style = {[this.state.cameraType=='back'?styles.backButton:styles.backButtonNew,{marginLeft:'1%'}]}
                            >
                            <Icon name={"camera"}  style={{marginTop:'25%',marginLeft:'20%'}}size={16} color={this.state.cameraType=='back'?"#ffff":'#000'} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress = {this.changeFlashType.bind(this)}
                                style = {[this.state.flashActive?styles.flashOnButton:styles.backButton,{marginLeft:'23%'}]}
                            >
                            <Icon name={"bolt"}  style={{marginTop:'12%',marginLeft:'30%', color: this.state.flashActive?'#000':'#fff'}}size={22}  />
                            </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                    <TouchableOpacity
                        onPress = {this.takePicture.bind(this)}
                        style = {styles.capture}
                    >
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection:'row'}}>
                    <TouchableOpacity
                            onPress = {()=>{
                                this.props.navigation.navigate('Home')
                            }}
                            style = {[styles.backButton,{marginLeft:'-14%'}]}
                        >
                        <Icon name={"times"}  style={{marginTop:'15%',marginLeft:'23%',color:'#fff'}}size={20} />
                        
                        </TouchableOpacity>

                                            <TouchableOpacity
                            onPress = {()=>{
                                this.props.navigation.navigate('Old');
                            }}
                            style = {[styles.backButton,{marginLeft:'20%'}]}
                        >
                        <Icon name={"chevron-right"}  style={{marginTop:'18%',marginLeft:'32%'}}size={18} color="#ffff" />
                        </TouchableOpacity>

                        
                </View>
            </View>
            </RNCamera>
                </View>);
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
        changeFlashType=function(){
            if(this.state.flashMode === RNCamera.Constants.FlashMode.off){
                this.setState({
                    flashMode : RNCamera.Constants.FlashMode.on,
                    flashActive : true,
                })
            } else{
                this.setState({
                    flashMode : RNCamera.Constants.FlashMode.off,
                    flashActive : false,
                })
            }
        }
        takePicture = async function() {
            if (this.camera) {
              const options = { quality: 0.5, base64: true, fixOrientation: true };
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
          flexDirection: 'row',
          backgroundColor: 'black',
        },
        preview: {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        },
        capture: {
          flex: 0,
          backgroundColor: '#fff',
          width:60,
          height:60,
          borderRadius:100,
          borderWidth: 10,
          borderColor: 'rgba(255,255,255,0.4)',
          margin: 20,
        },
        backButton: {
            zIndex:10,
            flex: 0,
            backgroundColor :'transparent',
            borderWidth: 5,
            borderColor:'#fff',
            width:40,
          height:40,
          borderRadius:100,
        },
        backButtonNew: {
            zIndex:10,
            flex: 0,
            backgroundColor :'#fff',
            borderWidth: 5,
            borderColor:'#fff',
            width:40,
          height:40,
          borderRadius:100,
        },
        flashOnButton: {
            zIndex:10,
            flex: 0,
            backgroundColor :'#fff',
            borderWidth: 5,
            borderColor:'#fff',
            width:40,
          height:40,
          borderRadius:100,
        },
        blehh: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft:'8%',
            justifyContent: 'center'
        }
      })

export default cameraScreen;