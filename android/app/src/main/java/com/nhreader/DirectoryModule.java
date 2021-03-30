package com.nhreader;

import android.os.Environment;
import android.provider.MediaStore;
import com.facebook.react.bridge.*;

import java.io.File;
import java.io.FileFilter;

public class DirectoryModule extends ReactContextBaseJavaModule {

    public DirectoryModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getFilesDir() {
        return getReactApplicationContext().getFilesDir().getAbsolutePath();
    }

    @ReactMethod
    public void listAllDownloaded(final Promise promise) {
        File file = getReactApplicationContext().getFilesDir();
        FileFilter dirFilter = new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                return pathname.isDirectory();
            }
        };

        File[] dirs = file.listFiles(dirFilter);
        WritableArray paths = Arguments.createArray();
        for(int i = 0; i < dirs.length; i++) {
            paths.pushString(dirs[i].getAbsolutePath());
        }
        promise.resolve(paths);
    }

    @Override
    public String getName() {
        return "Dir";
    }

}
