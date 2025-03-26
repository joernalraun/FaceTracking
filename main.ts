/**
 * Custom blocks for Face-Tracking Bluetooth data processing
 */
//% color="#AA5585" icon="\uf294"
namespace FaceTracking {
    let receivedString = ""
    let x = 0
    let y = 0
    let z = 0
    let yaw = 0
    let pitch = 0
    let roll = 0
    let mouth = 0

    // Automatic Bluetooth UART setup
    function initBluetoothUART() {
        bluetooth.startUartService()
        bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
            parseReceivedData()
        })
    }

    /**
     * Handles actions when Bluetooth is connected
     */
    //% block="on Bluetooth Connected"
    //% draggable=true
    export function onBluetoothConnected() {
        basic.showIcon(IconNames.Happy)
        initBluetoothUART()
    }

    /**
     * Handles actions when Bluetooth is disconnected
     */
    //% block="on Bluetooth Disconnected"
    //% draggable=true
    export function onBluetoothDisconnected() {
        basic.showIcon(IconNames.No)
    }

    /**
     * Parses the received Bluetooth data
     */
    function parseReceivedData() {
        x = parseFloat(receivedString.substr(0, 2))
        y = parseFloat(receivedString.substr(2, 2))
        z = parseFloat(receivedString.substr(4, 2))
        yaw = parseFloat(receivedString.substr(6, 2))
        pitch = parseFloat(receivedString.substr(8, 2))
        roll = parseFloat(receivedString.substr(10, 2))
        mouth = parseFloat(receivedString.substr(12, 2))
    }

    /**
     * Maps Yaw to Servo on selected Pin
     * @param pin the analog pin to use for Yaw servo
     */
    //% block="Map Yaw to Servo on pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% pin.fieldOptions.tooltips=true
    //% pin.fieldOptions.width=200
    //% pin.fieldOptions.group="Supported Pins"
    export function mapYawToServo(pin: number = 0) {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        
        // Convert pin to AnalogPin with validation
        let analogPin: AnalogPin;
        switch(pin) {
            case 0: analogPin = AnalogPin.P0; break;
            case 1: analogPin = AnalogPin.P1; break;
            case 2: analogPin = AnalogPin.P2; break;
            case 4: analogPin = AnalogPin.P4; break;
            case 10: analogPin = AnalogPin.P10; break;
            case 16: analogPin = AnalogPin.P16; break;
            case 18: analogPin = AnalogPin.P18; break;
            default: analogPin = AnalogPin.P0; break;
        }
        
        pins.servoWritePin(analogPin, Math.map(yaw, 0, 10, 180, 0))
    }

    /**
     * Maps Pitch to Servo on selected Pin
     * @param pin the analog pin to use for Pitch servo
     */
    //% block="Map Pitch to Servo on pin %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=3
    //% pin.fieldOptions.tooltips=true
    //% pin.fieldOptions.width=200
    //% pin.fieldOptions.group="Supported Pins"
    export function mapPitchToServo(pin: number = 1) {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        
        // Convert pin to AnalogPin with validation
        let analogPin: AnalogPin;
        switch(pin) {
            case 0: analogPin = AnalogPin.P0; break;
            case 1: analogPin = AnalogPin.P1; break;
            case 2: analogPin = AnalogPin.P2; break;
            case 4: analogPin = AnalogPin.P4; break;
            case 10: analogPin = AnalogPin.P10; break;
            case 16: analogPin = AnalogPin.P16; break;
            case 18: analogPin = AnalogPin.P18; break;
            default: analogPin = AnalogPin.P1; break;
        }
        
        pins.servoWritePin(analogPin, Math.map(pitch, 10, 100, 0, 90))
    }

    /**
     * X Value
     */
    //% block="X Value"
    //% draggable=true
    export function X(): number {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        return x
    }

    /**
     * Y Value
     */
    //% block="Y Value"
    //% draggable=true
    export function Y(): number {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        return y
    }

    /**
     * Z Value
     */
    //% block="Z Value"
    //% draggable=true
    export function Z(): number {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        return z
    }

    /**
     * Yaw Value
     */
    //% block="Yaw Value"
    //% draggable=true
    export function Yaw(): number {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        return yaw
    }

    /**
     * Pitch Value
     */
    //% block="Pitch Value"
    //% draggable=true
    export function Pitch(): number {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        return pitch
    }

    /**
     * Roll Value
     */
    //% block="Roll Value"
    //% draggable=true
    export function Roll(): number {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        return roll
    }

    /**
     * Mouth Value
     */
    //% block="Mouth Value"
    //% draggable=true
    export function Mouth(): number {
        // Ensure UART is initialized
        if (!bluetooth.isUartInitialized()) {
            initBluetoothUART()
        }
        return mouth
    }

    // Automatically start UART service on load
    initBluetoothUART()
}
