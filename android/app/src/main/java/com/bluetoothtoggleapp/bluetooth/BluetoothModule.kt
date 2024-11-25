package com.bluetoothtoggleapp.bluetooth

import android.bluetooth.BluetoothAdapter
import android.content.Intent
import com.facebook.react.bridge.*

class BluetoothModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val bluetoothAdapter: BluetoothAdapter? = BluetoothAdapter.getDefaultAdapter()

    override fun getName(): String {
        return "BluetoothModule"
    }

    @ReactMethod
    fun enableBluetooth(promise: Promise) {
        if (bluetoothAdapter == null) {
            promise.reject("NO_BLUETOOTH_ADAPTER", "Bluetooth adapter not found")
            return
        }

        if (!bluetoothAdapter.isEnabled) {
            val enableBtIntent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
            currentActivity?.startActivity(enableBtIntent)
            promise.resolve(true)
        } else {
            promise.resolve(false)
        }
    }

    @ReactMethod
    fun disableBluetooth(promise: Promise) {
        if (bluetoothAdapter == null) {
            promise.reject("NO_BLUETOOTH_ADAPTER", "Bluetooth adapter not found")
            return
        }

        if (bluetoothAdapter.isEnabled) {
            bluetoothAdapter.disable()
            promise.resolve(true)
        } else {
            promise.resolve(false)
        }
    }
}
