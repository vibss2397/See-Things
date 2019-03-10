// ToastModule.java

package com.seethings;

import android.widget.Toast;
import android.app.Activity;
import com.seethings.ImageClassifier;
import com.seethings.ImageClassifierFood;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.Base64;

import android.graphics.Bitmap;
import android.content.res.AssetManager;
import android.graphics.BitmapFactory;
import android.provider.MediaStore;
import android.net.Uri;


public class ClassifierModule extends ReactContextBaseJavaModule {
  private static final String TAG = "See Things";
  public ClassifierModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  public Bitmap getBitmapFromAssets(String fileName) {
    Bitmap image = null;
    final Activity activity = getCurrentActivity();
    AssetManager assetManager = activity.getAssets();
    try{
      InputStream istr = assetManager.open(fileName);
      image = BitmapFactory.decodeStream(istr);

    }
    catch (IOException ex) {
      Log.e(TAG, ex.toString());
    }
    return image;
}

public Bitmap basetoimage(String str){
  
  Bitmap img = null;
  final byte[] decodedString = Base64.getDecoder().decode(str);
  Bitmap decodedByte = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
  return decodedByte;
}

  @Override
  public String getName() {
    return "ClassifierModule";
  }

  @ReactMethod
  public void ClassifyImage (String Image, Callback successCallback, Callback errorCallback) {
    final Activity activity = getCurrentActivity();
    String label="Naah";
    try{
      ImageClassifier classi = new ImageClassifier(activity);
      Log.d(TAG, "Model Load");
      Uri myUri = Uri.parse(Image);
      Bitmap img = MediaStore.Images.Media.getBitmap(activity.getContentResolver(), myUri);
      if(img!=null){
        Bitmap img_resized = Bitmap.createScaledBitmap(img, classi.DIM_IMG_SIZE_X, classi.DIM_IMG_SIZE_Y, false);
        label = classi.classifyFrame(img_resized);
        successCallback.invoke("done", label);
      }
  }
    catch(IOException ex){
      Log.d(TAG, "naa");
      errorCallback.invoke(ex.toString());
    }
  }

  @ReactMethod
  public void ClassifyImageRT (String Image, Callback successCallback, Callback errorCallback) {
    final Activity activity = getCurrentActivity();
    String label="Naah";
    try{
      ImageClassifierFood classif = new ImageClassifierFood(activity);
      Log.d(TAG, "Model Load");
      Uri myUri = Uri.parse(Image);
      Bitmap img = MediaStore.Images.Media.getBitmap(activity.getContentResolver(), myUri);
      if(img!=null){
        Bitmap img_resized = Bitmap.createScaledBitmap(img, classif.DIM_IMG_SIZE_X, classif.DIM_IMG_SIZE_Y, false);
        label = classif.classifyFrame(img_resized);
        successCallback.invoke("done", label);
      }
  }
    catch(IOException ex){
      Log.d(TAG, "naa");
      errorCallback.invoke("not");
    }
  }
  
}