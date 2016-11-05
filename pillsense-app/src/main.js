
import TRANSITION from 'transitions';

/* Pins Setup */
import Pins from "pins";

let remotePins;
let connected = false;
let deviceURL = "";

/* Skins and styles */
let blackSkin = new Skin({ fill: 'black' });
let blueSkin = new Skin({ fill: '#2D9CDB' });
let yellowSkin = new Skin({ fill: 'yellow' });
let whiteSkin = new Skin({ fill: 'white' });
var greySkin = new Skin({ fill: '#E6E6E6'});
var darkGreySkin = new Skin({ fill: '#808080'});


var appSkin = new Skin ({fill: '#ddd'});
var separatorSkin = new Skin({ fill: 'silver'});
var buttonSkin = new Skin ({fill: '#404040'});
var inactiveButtonSkin = new Skin ({fill: '#b2b2b2'});
var skyBlueSkin = new Skin ({fill: '#808080'});

var buttonStyle = new Style ({font: 'bold 20px', color: 'white'});
var inactiveStyle = new Style ({font: 'bold 20px', color: 'white'});
var titleStyle = new Style({font: 'bold 22px', color: 'white'});
var productNameStyle = new Style({  font: 'bold 18px', horizontal: 'left', vertical: 'middle', lines: 1 });
var productDescriptionStyle = new Style({  font: '16px', horizontal: 'left', vertical: 'middle', left: 1});
var productAmountStyle = new Style({  font: '16px', horizontal: 'left', vertical: 'middle', left: 1, skin: greySkin});
var explainStyle = new Style({  font: '12px', horizontal: 'left', vertical: 'middle', left: 1});

let capsStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'right'});
let capsStyleDisconnect = new Style({ color: '#BDBDBD', font: 'bold 20px', horizontal: 'right'});
let labelStyle = new Style({ color: 'black', font: 'bold 20px', horizontal: 'left'});
let textStyle = new Style({ color: 'black', font: '20px', horizontal: 'right'});

let splashLabelStyle = new Style({ color: 'white', font: 'bold 50px', horizontal: 'center', vertical: 'middle' });
let hugeLabelStyle = new Style({ color: 'black', font: 'bold 125px', horizontal: 'center', vertical: 'middle' });

/* System Variables*/
let status = false;
let statusLabel; 
let statusString; 
let lastAteLabel;
let lastDrankLabel;
let dispenserPicture;
let dispenserLabel;
let dispenserLabelStyle = capsStyleDisconnect;
let ibuLevel;
let aceLevel;
let treatLevel;
let treatCount = 5;
let level3;
let dispenseButton;
let start1Label;
let sliderEnd2;
let unitLabel;
let plusButton1;
let minusButton1;
let countButton1;
let plusButton2;
let minusButton2;
let countButton2;
let plusButton3;
let minusButton3;
let countButton3;
let plusButton4;
let minusButton4;
let countButton4;
let lastAteString = 'no current data  ';
let lastDrankString = 'no current data  ';
let scheduleStart1 = 700;
let scheduleEnd1 = 1000;
let scheduleStart2 = 1700;
let scheduleEnd2 = 2000;


/* Assets */
let back = './assets/back.png';
let add = './assets/add.png';
let edit = './assets/edit.png';
let save = './assets/save.png';
let plus = './assets/plus.png';
let settingsPicture = './assets/settings.png';
let feeder = './assets/dispenser.png';
let feederDisconnect = './assets/dispenser_disconnect.png';
let cat = './assets/cat.png';
let splash = './assets/splash.png'
let splashFilled = './assets/splashFilled.png'
let full = './assets/full.png';
let threeQuarter = './assets/threeQuarter.png';
let half = './assets/half.png';
let oneQuarter = './assets/oneQuarter.png';
let empty = './assets/empty.png';
let emptyDisconnect = './assets/empty_disconnect.png';


/* Transitions */
class MainScreenBehavior extends Behavior {
	onTriggerTransition(container, name) {
		let toSplashFilled =  new SplashScreenFilled();
		let toHome =  new HomeScreen();
		let toSettings =  new SettingsScreen();
		let toPatient =  new PatientScreen();
		let toPatientEdit =  new PatientEditScreen();
		let toAddMedication =  new AddMedicationScreen();
		let toAddPatient =  new AddPatientScreen();
		
		// let toAddNewPatient = new AddNewPatient();
		this.AtoB = !this.AtoB;
		switch ( name ) {
			case "home":
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, toHome );
				break;			
			case "splashFilled":
				container.run( new TRANSITION.CrossFade({ duration : 900 }), container.last, toSplashFilled );
				break;
			case "homeToSettings":
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, toSettings );
				break;
			case "homeToPatient":
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, toPatient );
				break;
			case "homeToAddPatient":
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, toAddPatient );
				break; 		
			case "addPatientToHome":
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, toHome );
				break;
			case "settingsToHome":
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, toHome );
				break;			
			case "patientToHome":
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, toHome );
				break;
			case "patientToPatientEdit":
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, toPatientEdit );
				break;
			case "patientEditToPatient":
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, toPatient );
				break;			
			case "patientToAddMedication":
				container.run( new TRANSITION.Push({ direction : "left", duration : 400 }), container.last, toAddMedication );
				break;
			case "addMedicationToPatient":
				container.run( new TRANSITION.Push({ direction : "right", duration : 400 }), container.last, toAddMedication );
				break;

				
		}
	}
}


/* Screens */
let MainScreen = Container.template($ =>({ 
	left: 0, right: 0, top: 0, bottom: 0, active: true, skin: blueSkin, 
	Behavior: MainScreenBehavior, contents: []
}));


/* Splash Screen */
let SplashScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: blueSkin, Behavior: MainScreenBehavior, active: true,
	Behavior: class extends Behavior {
		onTouchEnded(container, id, x, y, ticks) {container.bubble( "onTriggerTransition", "splashFilled");}
	}, 
	contents: [Picture($, { left:0, right:0, top:40, bottom:0, url:splash }),]
}));


/* Splash Screen - Filled*/
let SplashScreenFilled = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: blueSkin, Behavior: MainScreenBehavior, active: true,
	Behavior: class extends Behavior {
		onTouchEnded(container, id, x, y, ticks) {container.bubble( "onTriggerTransition", "home");}
	}, 
	contents: [Picture($, { left:0, right:0, top:40, bottom:0, url:splashFilled }),]
}));


/* Home Screen */
let HomeScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* HOME */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 7), top: 30, style:titleStyle, string:'My Patients' }),
								Picture($, { left:0, top:30, bottom:0, width:(application.width * 0.1), url: settingsPicture, active: true,
									Behavior: class extends Behavior {
										onTouchBegan(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "homeToSettings" );
										}
									}, 
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.1), url: add, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "homeToAddPatient");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT A */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient A:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT Z */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient Z' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT R */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient R:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT X */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, active: true, style:labelStyle, string:'  Patient X:',
									Behavior: class extends Behavior {
										onTouchBegan(container, id, x, y, ticks) {
											trace("out \n");
											container.bubble( "onTriggerTransition", "homeToPatient" );
										}
									},
								}),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT B */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient B:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT C */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient C:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT D */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient D:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.22), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),	
					]
				})

			]
		})
	] 
}));


/* Add Patient Screen */
let AddPatientScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* PATIENTS TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 7), top: 30, style:titleStyle, string:'Add Patient' }),
								Picture($, { left:0, top:30, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "addPatientToHome");
										}
									},  
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.2), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "addPatientToHome");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT A */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient A:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT Z */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient Z' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT R */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient R:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT X */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient X:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT B */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient B:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT C */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient C:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT D */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientToAddMedication");
										}
									},  									
								}),
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Add Medication' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.22), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),	
					]
				})

			]
		})
	] 
}));


/* Patient Screen */
let PatientScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* PATIENTS TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 7), top: 30, style:titleStyle, string:'Patient X' }),
								Picture($, { left:0, top:30, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientToHome");
										}
									},  
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.2), url: edit, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientToPatientEdit");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT A */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient A:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT Z */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient Z' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT R */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient R:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT X */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient X:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT B */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient B:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT C */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient C:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT D */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Picture($, { left:0, top:0, bottom:0, url:plus, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientToAddMedication");
										}
									},  									
								}),
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Add Medication' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.22), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),	
					]
				})

			]
		})
	] 
}));

/* Patient Edit Screen */
let PatientEditScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	Behavior: MainScreenBehavior, 
	contents: [
		Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* PATIENTS TITLE */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 7), top: 30, style:titleStyle, string:'Edit Patient X' }),
								Picture($, { left:0, top:30, active: true, bottom:0, width:(application.width * 0.1), url: back, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientEditToPatient");
										}
									},  
								}),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.2), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "patientEditToPatient");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT A */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient A:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT Z */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient Z' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT R */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient R:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT X */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient X:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT B */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient B:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT C */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient C:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PATIENT D */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Patient D:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
		/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.22), top: 0, style:labelStyle, skin: greySkin, string:'  ' }),
							]
						}),	
					]
				})

			]
		})
	] 
}));

/* Add Medication Screen */
let AddMedicationScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	contents: [
Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* SETTINGS */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Picture($, { left:0, top:10, active: true, bottom:0, width:(application.width * 0.1), url: back,
									Behavior: MainScreenBehavior, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "addMedicationToPatient");
										}
									},  
								}),
								Label($, {left:0, right:0, top: 10, height:(application.height / 7), top: 0, style:titleStyle, string:'AddMedication' }),
								Picture($, { right:10, top:30, active: true, bottom:0, width:(application.width * 0.2), url: save, active: true, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "addMedicationToPatient");
										}
									},  
								}),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* DEVICE TITLE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								dispenserPicture = Picture($, { left:0, top:0, bottom:0, width:(application.width * 0.15), url:feederDisconnect}),
								dispenserLabel = Label($, {left:0, right:0, height:(application.height / 8), width:(application.width * 0.85), top: 0, style:dispenserLabelStyle, string:' DISPENSER 1  ' }),
							]
						}),						
						Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
					/* PILL NAME 1 */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Ibuprofen levels:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PILL NAME 2 */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Acetaminophen levels:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.55), top: 0, style:labelStyle, string:'  ' }),
							]
						}),						
					]			
				})
			]
		})
	]
}));




/* Settings Screen */
let SettingsScreen = Container.template($ => ({ 
	left: 0, right: 0, top: 0, bottom: 0, skin: whiteSkin, 
	contents: [
Container($, {left: 0, right: 0,
			contents: [ 		
				Column($, {left: 0, right: 0,
					contents: [ 
					/* SETTINGS */
						Container($, {left: 0, right: 0, skin: blueSkin,
							contents: [
								Picture($, { left:0, top:10, active: true, bottom:0, width:(application.width * 0.1), url: back,
									Behavior: MainScreenBehavior, 
									Behavior: class extends Behavior {
										onTouchEnded(container, id, x, y, ticks) {
											container.bubble( "onTriggerTransition", "settingsToHome");
										}
									},  
								}),
								Label($, {left:0, right:0, top: 10, height:(application.height / 7), top: 0, style:titleStyle, string:'Settings' }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* DEVICE TITLE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								dispenserPicture = Picture($, { left:0, top:0, bottom:0, width:(application.width * 0.15), url:feederDisconnect}),
								dispenserLabel = Label($, {left:0, right:0, height:(application.height / 8), width:(application.width * 0.85), top: 0, style:dispenserLabelStyle, string:' DISPENSER 1  ' }),
							]
						}),						
						Line($, { left: 0, right: 0, height: 3, skin: separatorSkin }),
					/* PILL NAME 1 */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Ibuprofen levels:' }),
								ibuLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* PILL NAME 2 */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height / 10), top: 0, style:labelStyle, string:'  Acetaminophen levels:' }),
								aceLevel = Picture($, { left:0, top:0, bottom:0, url:emptyDisconnect }),
							]
						}),
						Line($, { left: 0, right: 0, height: 1, skin: separatorSkin }),
					/* BLANK SPACE */
						Line($, {left: 0, right: 0, top:0, bottom:0,
							contents: [
								Label($, {left:0, right:0, height:(application.height * 0.55), top: 0, style:labelStyle, string:'  ' }),
							]
						}),						
					]			
				})
			]
		})
	]
}));


/* LED Flash function */
Handler.bind("/flashLED", {
    onInvoke: function(handler, message){
    	remotePins.invoke("/led/write", 1);
    	if (deviceURL != "") new MessageWithObject(deviceURL + "dispenseTreatStart", JSON.stringify( { message: level3 } )).invoke();
    	handler.wait(1500);
    },
    onComplete: function(handler, message) {
    	remotePins.invoke("/led/write", 0);
    	if (deviceURL != "") new MessageWithObject(deviceURL + "dispenseTreatEnd", "").invoke();
    }
});

/* Timings helper function */
function getTimeDate(switcher) {
    var str = "";

    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    var seconds = currentTime.getSeconds()
    var date = currentTime.getDate()
    var month = currentTime.getMonth()

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    str += hours + ":" + minutes + ":" + seconds + ", " + (month+1) + "/" + date + '  ';
	if (switcher){
	    return ((parseInt(hours, 10) * 100) + parseInt(minutes)); 
	}
	return str;	
}
	
/* Connection Updater for Labels */
function updateFeederConnection(conn) {
	connected = conn;
	if (conn) {
		dispenserLabelStyle = capsStyle;
		dispenserLabel.style = dispenserLabelStyle;
		aceLevel.url = empty;
		ibuLevel.url = empty;
	   	level3 = empty;
	   	trace(treatCount + "\n")
	   	if (treatCount >= 4) level3 = full;
	   	else if (treatCount >= 3) level3 = threeQuarter;
	   	else if (treatCount >= 2) level3 = half;
	   	else if (treatCount >= 1) level3 = oneQuarter;
	   	treatLevel.url = level3;	
		// dispenseButton.skin = buttonSkin;
		// dispenseButton.style = buttonStyle;
		// dispenseButton.string = 'DISPENSE TREAT';
	} else {
		dispenserLabelStyle = capsStyleDisconnect;
		dispenserLabel.style = dispenserLabelStyle;
		aceLevel.url = emptyDisconnect;
		ibuLevel.url = emptyDisconnect;
		treatLevel.url = emptyDisconnect;
		// dispenseButton.skin = inactiveButtonSkin;
		// dispenseButton.style = inactiveStyle;
		// dispenseButton.string = 'DISCONNECTED';
	}
}

/* Application sharing functions */
Handler.bind("/discover", Behavior({
    onInvoke: function(handler, message){
        trace("Found the cat feeder device.\n");  
        deviceURL = JSON.parse(message.requestText).url;  
    }
}));

Handler.bind("/forget", Behavior({
    onInvoke: function(handler, message){
        deviceURL = "";
    }
}));


/* Pins discovery helper function */
function discovery() {
	let discoveryInstance = Pins.discover(
        connectionDesc => {
            
            if (connectionDesc.name == "cat-feeder-device") {
                updateFeederConnection(true);
                trace("Connecting to remote pins\n");
                remotePins = Pins.connect(connectionDesc);
                let foodActive = false;
                let waterActive = false;
                remotePins.repeat("/foodButton/read", 500, function(result1) {
			      	let timeNow = getTimeDate(true);
				    if ((timeNow > scheduleStart1 && timeNow < scheduleEnd1) || (timeNow > scheduleStart2 && timeNow < scheduleEnd2)) {
						if (result1) {
					      statusLabel.string = ' feeding  ';
					      lastAteString = getTimeDate(false);
					      lastAteLabel.string = lastAteString;
					      foodActive = true;
						} else {
				      		if (!waterActive) statusLabel.string = ' not present  ';
					    	foodActive = true;
						}     
				    } else {
				    	if (!waterActive) {
				      		if ((timeNow < 2400 && timeNow > scheduleEnd2) || (timeNow < scheduleStart1)) statusString = 'Next Scheduled Feed: ' + scheduleStart1.toString();
				      		else statusString = 'Next Scheduled Feed: ' + scheduleStart2.toString();
				      		statusLabel.string = statusString.slice(0, (statusString.length -2)) + ":00  ";
				        }
				      foodActive = false;
				    }
				});

				remotePins.repeat("/waterButton/read", 500, function(result2) {
			      	let timeNow = getTimeDate(true);
				    if (result2) {
				        statusLabel.string = ' drinking  ';
				        lastDrankString = getTimeDate(false);
				        lastDrankLabel.string = lastDrankString;
				        waterActive = true;
				    } else {
				    	waterActive = false;
				    }
				});

		        remotePins.repeat("/ibuLevel/read", 500, function(result) {
				   	let level1 = empty;
				   	if (result >= 0.85) level1 = full;
				   	else if (result >= 0.60) level1 = threeQuarter;
				   	else if (result >= 0.35) level1 = half;
				   	else if (result >= 0.1) level1 = oneQuarter;
				   	ibuLevel.url = level1;
				});

		        remotePins.repeat("/aceLevel/read", 500, function(result) {
				   	let level2 = empty;
				   	if (result >= 0.85) level2 = full;
				   	else if (result >= 0.60) level2 = threeQuarter;
				   	else if (result >= 0.35) level2 = half;
				   	else if (result >= 0.1) level2 = oneQuarter;
				   	aceLevel.url = level2;
				});
            }
        }, 
        connectionDesc => {
            if (connectionDesc.name == "cat-feeder-device") {
                updateFeederConnection(false);
                trace("Disconnected from remote pins\n");
                remotePins = undefined;

            }
        }
    )
}


/* Application set-up */
let mainScreen = new MainScreen({});
let splashScreen = new SplashScreen();

class AppBehavior extends Behavior {
	onLaunch(application) {
		application.add( mainScreen );
		mainScreen.add( splashScreen );
        discovery();
    } 
    onDisplayed(application) {
        application.discover("pillsense-device.app");
    }
    onQuit(application) {
        application.forget("pillsense-device.app");
    }
}
application.behavior = new AppBehavior();