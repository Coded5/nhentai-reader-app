package com.nhreader;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DownloadModule extends ReactContextBaseJavaModule  {

    private static final String NH_DL_URL = "https://i.nhentai.net/";

    public DownloadModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public void downloadNH(String uri, int numPage, String t) {
        
    }

    @Override
    public String getName() {
        return "NHDownload";
    }

}
