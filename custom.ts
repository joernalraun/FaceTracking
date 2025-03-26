/**
 * Custom blocks for Face-Tracking Bluetooth data processing
 */
//% color="#AA5585" icon="\uf294"
namespace faceTracking {
    let receivedString = ""
    let x = 0
    let y = 0
    let z = 0
    let yaw = 0
    let pitch = 0
    let roll = 0
    let mouth = 0

    // Default servo pins
    let yawServoPin = AnalogPin.P0
    let pitchServoPin = AnalogPin.P1

    /**
     * Set the pin for Yaw servo
     * @param pin the analog pin to use for Yaw servo
     */
    //% block="Set Yaw Servo Pin to %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    export function setYawServoPin(pin: AnalogPin) {
        yawServoPin = pin
    }

    /**
     * Set the pin for Pitch servo
     * @param pin the analog pin to use for Pitch servo
     */
    //% block="Set Pitch Servo Pin to %pin"
    //% pin.fieldEditor="gridpicker"
    //% pin.fieldOptions.columns=4
    //% pin.fieldOptions.tooltips="false"
    export function setPitchServoPin(pin: AnalogPin) {
        pitchServoPin = pin
    }

    /**
     * Handles actions when Bluetooth is connected
     */
    //% block="on Bluetooth Connected"
    //% draggable=true
    export function onBluetoothConnected() {
        basic.showIcon(IconNames.Happy)
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
     * Starts Bluetooth UART Service
     */
    //% block="Start Bluetooth UART Service"
    //% draggable=true
    export function startBluetoothService() {
        basic.showIcon(IconNames.Square)
        bluetooth.startUartService()
        basic.showIcon(IconNames.SmallSquare)
    }

    /**
     * Sets up UART data received handler
     */
    //% block="Setup UART Data Received"
    //% draggable=true
    export function setupUartDataReceived() {
        bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
            parseReceivedData()
        })
    }

    /**
     * Parses the received Bluetooth data
     */
    //% block="Parse Received Bluetooth Data"
    //% draggable=true
    export function parseReceivedData() {
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
     */
    //% block="Map Yaw to Servo"
    //% draggable=true
    export function mapYawToServo() {
        pins.servoWritePin(yawServoPin, Math.map(yaw, 0, 10, 180, 0))
    }

    /**
     * Maps Pitch to Servo on selected Pin
     */
    //% block="Map Pitch to Servo"
    //% draggable=true
    export function mapPitchToServo() {
        pins.servoWritePin(pitchServoPin, Math.map(pitch, 10, 100, 0, 90))
    }

    /**
     * Returns the X value
     */
    //% block="Get X Value"
    //% draggable=true
    export function getX(): number {
        return x
    }

    /**
     * Returns the Y value
     */
    //% block="Get Y Value"
    //% draggable=true
    export function getY(): number {
        return y
    }

    /**
     * Returns the Z value
     */
    //% block="Get Z Value"
    //% draggable=true
    export function getZ(): number {
        return z
    }

    /**
     * Returns the Yaw value
     */
    //% block="Get Yaw Value"
    //% draggable=true
    export function getYaw(): number {
        return yaw
    }

    /**
     * Returns the Pitch value
     */
    //% block="Get Pitch Value"
    //% draggable=true
    export function getPitch(): number {
        return pitch
    }

    /**
     * Returns the Roll value
     */
    //% block="Get Roll Value"
    //% draggable=true
    export function getRoll(): number {
        return roll
    }

    /**
     * Returns the Mouth value
     */
    //% block="Get Mouth Value"
    //% draggable=true
    export function getMouth(): number {
        return mouth
    }
}