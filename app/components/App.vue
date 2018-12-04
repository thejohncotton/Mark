<template>
    <Page class="page" actionBarHidden="true" statusBarHidden="true" @loaded="pageLoaded">
        <StackLayout>
            <StackLayout :visibility="syncFrame">
                <Image class="sync" src="~/assets/images/SyncFrame.png"/>
            </StackLayout>
        <Image class="top-bg" src="~/assets/images/bg.png" row="0" col="0"/> 
        <FlexboxLayout direction="row" class="top-time">
            <Label class="timecode" :text="timecode.text" col="0" row="1" colspan="2"/>
            <Label class="clock" :text="time" id="clock" col="5" row="1"/>
        </FlexboxLayout>
        <PreviousNextView>
        <GridLayout columns="*, *, *, *, *" rows="auto,auto,auto,*,*,*,*,*,*,*,*" class="grid">   
            <Label class="message label" text="Scene" col="1" row="0"/>
            <Label id="sceneNumber" class="message big-number" :text="scene.toString()" col="1" row="2" />
            <FlexboxLayout col="1" row="4" class="steppergroup">
                <Button class="button stepper" text="+" @tap="stepUpScene"/><Button class="button stepper" text="-" @tap="stepDownScene()"/>
            </FlexboxLayout>
            <Label class="message label" text="Shot" col="2" row="0" /> 
            <Label class="message big-number" id="shotLabel" :text="shot" col="2" row="2" />
            <FlexboxLayout col="2" row="4" class="steppergroup">
                <Button class="button stepper" text="+" @tap="stepUpShot()"/><Button class="button stepper" text="-" @tap="stepDownShot()" />
            </FlexboxLayout>
            <Label class="message label" text="Take" col="3" row="0" />
            <Label class="message big-number" :text="take.toString()" col="3" row="2" />
            <FlexboxLayout col="3" row="4" class="steppergroup">
                <Button class="button stepper" text="+" @tap="stepUpTake()"/><Button class="button stepper" text="-" @tap="stepDownTake()"/>
            </FlexboxLayout>
            
            <Label class="meta" text="Production" col="0" row="5"/>
            <TextField class="meta  meta-content"   v-model="production" @textChange="updateProduction()" :hint="production" col="0" row="6"/>
            <Label class="meta" text="Director" col="0" row="7"/>
            <TextField class="meta  meta-content" v-model="director" @textChange="updateDirector()" col="0" row="8"/>
            <Label class="meta" text="Director of Photography" col="0" row="9"/>
            <TextField class="meta  meta-content" v-model="dp" @textChange="updateDP()" col="0" row="10"/>
            <FlexboxLayout class="fpsLabel" row="6" col="3" colspan="2"><TextField class="fpsLabel" v-model="framerate"  @textChange="updateFps()"/><Label text="fps"/></FlexboxLayout>
            <Button class="button mark" text="mark" @tap="mark" row="6" rowSpan="2" col="5"/>
            <Button class="button stop" :text="stopButtonText" @tap="stop" row="8" rowSpan="2" col="5"/>


        </GridLayout>
         </PreviousNextView>
        </StackLayout>
    </Page>
</template>

<script>
const timerModule = require("tns-core-modules/timer")
const appSettings = require("application-settings")
const sound = require('nativescript-sound')
// const timecodeTimer = require('~/assets/scripts/timecodeTimer')
import * as app from 'tns-core-modules/application'
import * as platform from 'tns-core-modules/platform'
import * as color from 'tns-core-modules/color'
import clock from '~/assets/scripts/clock'
import timecodeTimer from '~/assets/scripts/timecodeTimer'

// let fr, hours, minutes, seconds, frames
// hours = 0
// minutes = 0
// seconds = 0
// frames = 0      
// function counter(framerate){
//     let frameString, secondString, minuteString, hourString
//     if (frames < framerate ){
        
//     frames++
        
//     } else if (frames === framerate){
//         seconds ++
//         frames = 0
//     }
//     if (seconds === 60) {
//         seconds = 0
//         minutes ++
//     }
//     if (minutes === 60){
//         minutes = 0
//         hours ++
//     }
//     if (hours === 13){
//         hours = 1
//     }

//     if (parseInt(frames, 10) < 10) {
//                 frameString = `0${frames}`
//         } else {
//             frameString = frames
//         }
//     if (parseInt(seconds, 10) < 10) {
//             secondString = `0${seconds}`
//         } else {
//             secondString = seconds
//         }
//             if (parseInt(minutes, 10) < 10) {
//                 minuteString = `0${minutes}`
//             } else {
//                  minuteString = minutes
//             }
//             if (parseInt(hours, 10) < 10) {
//                 hourString = `0${hours}`
//             } else {
//                  hourString = hours
//             }
    
//     return `${hourString}:${minuteString}:${secondString}:${frameString}`

// }
  export default {
    data() {
      return {
        timecode: {
            text: '00:00:00:00',
            running: false,
            id:'',
        },
        time: clock(),
        director : appSettings.getString("director") || 'director name',
        dp: appSettings.getString('dp') || 'DP Name',
        production: appSettings.getString("production") || 'my great movie',
        scene: 1,
        shot: 1,
        take: 1,
        stopButtonText:'stop',
        framerate: appSettings.getString("framerate") || '24',
        syncFrame: `collapsed`,
        blipSound: sound.create('~/assets/audio/cueblip.wav')
      }
    },
    mounted() {
        timerModule.setInterval(()=>{
        this.time = clock()
        },1000 * 60)
    },

    methods: {
        updateFps(){
            if (this.framerate){
             appSettings.setString('framerate', this.framerate)
             console.log(this.framerate)
            }
        },
        updateDirector(){
            appSettings.setString('director', this.director)
            console.log(this.director)
        },
        updateProduction(){
            appSettings.setString('production', this.production)
            console.log(this.production)
        },
        updateDP(){
            appSettings.setString('dp', this.dp)
            console.log(this.director)
        },
        stepUpScene(){
            if (this.scene <= 99){
                this.scene ++
                // console.log(`scene ` + this.scene)
            }

        },
        stepDownScene(){
            if (this.scene > 1){
                this.scene --
                // console.log(`scene ` + this.scene)
            }
        },
        stepUpShot(){
           if (this.shot < 99){ 
               this.shot ++
            //    console.log(`shot ` + this.shot)
           }
        },
        stepDownShot(){
            if (this.shot > 1 ){ 
                this.shot --
                // console.log(`shot ` + this.shot)
            }
        },
        stepUpTake(){
            if (this.take < 99){
                this.take ++
                // console.log(`take ` + this.take)
            }
        },
        stepDownTake(){
            if (this.take > 1){
                this.take --
                // console.log(`take ` + this.take)
            }
        },
        mark(){
            if (!this.timecode.running && this.stopButtonText === 'stop') {
                this.timecode.running = true
                this.timecode.id = timerModule.setInterval(()=>{
                this.timecode.text = timecodeTimer.counter(parseInt(this.framerate))
            },1000/parseInt(this.framerate))
              setTimeout(()=>{
                this.syncFrame = "visible"
                this.blipSound.play()
                setTimeout(()=> {
                 this.syncFrame = "collapsed"
                }, 50 )
               
             },1000)
            
            } 
        },
        stop(){
            if (this.timecode.running){
                this.timecode.running = false
                clearInterval(this.timecode.id)
                this.stopButtonText = "reset"
            } else if (!this.timecode.running && this.stopButtonText ==='reset'){
                timecodeTimer.reset()
                
                this.timecode.text = timecodeTimer.timeString,
                this.stopButtonText = "stop"

            }
            
        },
        pageLoaded(){
            if (app.android && platform.device.sdkVersion >= '21') {
                    var window = app.android.startActivity.getWindow();
                    // set the status bar to Color.Transparent
                    window.setStatusBarColor(0x000000);
                    var View = android.view.View;
                    var decorView = window.getDecorView();
                    decorView.setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
                        | View.SYSTEM_UI_FLAG_FULLSCREEN // hide status bar
                        | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
                                                                }
        },
        
    }
  }

</script>

<style scoped lang="scss">

</style>
