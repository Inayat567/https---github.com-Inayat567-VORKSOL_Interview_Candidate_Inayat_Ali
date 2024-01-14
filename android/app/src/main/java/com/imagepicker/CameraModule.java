package com.imagepicker;

import android.Manifest;
import android.content.pm.PackageManager;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.util.Base64;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.io.ByteArrayOutputStream;

public class CameraModule extends ReactContextBaseJavaModule {
    private static final int REQUEST_IMAGE_CAPTURE = 1;
    private static final int CAMERA_PERMISSION_REQUEST_CODE = 2;

    public CameraModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CameraModule";
    }

    @ReactMethod
    public void captureImage() {
        System.out.println("FromCamera Module ");
        Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            // Check if camera permission is granted
            if (ContextCompat.checkSelfPermission(currentActivity, Manifest.permission.CAMERA)
                    == PackageManager.PERMISSION_GRANTED) {
                // Camera permission is already granted, proceed with image capture
                startImageCaptureIntent(currentActivity);
            } else {
                // Request camera permission from the user
                ActivityCompat.requestPermissions(currentActivity,
                        new String[]{Manifest.permission.CAMERA},
                        CAMERA_PERMISSION_REQUEST_CODE);
            }
        }
    }

    private void startImageCaptureIntent(Activity activity) {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(activity.getPackageManager()) != null) {
            activity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
        }
    }

//    @Override
//    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//
//        // Forward the result to your custom module
//        handleRequestPermissionsResult(requestCode, grantResults);
//    }
//
//    @Override
//    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
//        super.onActivityResult(requestCode, resultCode, data);
//
//        // Forward the result to your custom module
//        handleActivityResult(requestCode, resultCode, data);
//    }

    private void handleRequestPermissionsResult(int requestCode, int[] grantResults) {
        if (requestCode == CAMERA_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Camera permission granted, proceed with image capture
                Activity currentActivity = getCurrentActivity();
                if (currentActivity != null) {
                    startImageCaptureIntent(currentActivity);
                }
            }
        }
    }

    private void handleActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == Activity.RESULT_OK) {
            System.out.println("CameraModule" + "onActivityResult: Image capture successful");

            Bundle extras = data.getExtras();
            Bitmap imageBitmap = (Bitmap) extras.get("data");

            // Convert the Bitmap to a Base64-encoded string
            String encodedImage = encodeToBase64(imageBitmap, Bitmap.CompressFormat.JPEG, 100);
            sendImageToReactNative(encodedImage);
        } else {
            System.out.println("CameraModule" + "onActivityResult: Image capture failed");
        }
    }

    private String encodeToBase64(Bitmap imageBitmap, Bitmap.CompressFormat compressFormat, int quality) {
        System.out.println("CameraModule" + "encodeToBase64 function called");
        ByteArrayOutputStream byteArrayOS = new ByteArrayOutputStream();
        imageBitmap.compress(compressFormat, quality, byteArrayOS);
        byte[] byteArray = byteArrayOS.toByteArray();
        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

    private void sendImageToReactNative(String encodedImage) {
        System.out.println("CameraModule" + "Please wait while we are sending");
        ReactApplicationContext reactContext = getReactApplicationContext();
        if (reactContext != null) {
            WritableMap params = Arguments.createMap();
            params.putString("imageData", encodedImage);

            System.out.println("CameraModule" + encodedImage);

            // Emit an event to React Native with the image data
            reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("onImageCaptured", params);
        } else {
            System.out.println("CameraModule" + "ReactContext Null");
        }
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Implement your logic for adding a listener
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Implement your logic for removing listeners
    }
}
