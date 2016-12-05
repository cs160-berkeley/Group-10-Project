/*
 *     Copyright (C) 2010-2016 Marvell International Ltd.
 *     Copyright (C) 2002-2010 Kinoma, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 */
 
/* This is a slightly updated, JavaScript-ified version of https://github.com/Kinoma/kinomajs/blob/master/kinoma/kpr/simulator/modules/mockup/keyboard.xml */

var keyboardBackgroundSkin = new Skin({ fill: 'black' });
var keyboardDrawKeyEffect = new Effect();
keyboardDrawKeyEffect.colorize('#404040', 1);
var keyboardHiliteKeyEffect = new Effect();
keyboardHiliteKeyEffect.colorize('#404040', 1);
keyboardHiliteKeyEffect.outerGlow('#acd473', 1, 1, 2);
var keyboardDrawControlEffect = new Effect();
keyboardDrawControlEffect.colorize('#909090', 1);
var keyboardHiliteControlEffect = new Effect();
keyboardHiliteControlEffect.colorize('#909090', 1);
keyboardHiliteControlEffect.outerGlow('white', 1, 1, 2);
var keyboardIconEffect = new Effect();
keyboardIconEffect.colorize('white', 1);
var keyboardStyle = new Style({ color: 'white', font: '24px Droid Sans', horizontal: 'center' });
var keyboardMaskTexture = new Texture('keyboardMask.png', 1);
var keyboardIconsTexture = new Texture('keyboardIcons.png', 1);
var backgroundSkin, charStyle, keySkin, iconSkin;


var buildSkins = function() {
	var port;
	var texture;

	backgroundSkin = keyboardBackgroundSkin;
	charStyle = keyboardStyle;

	port = new Port({width: 80, height: 80});
	port.behavior = {
		onDraw: function(port) {
			port.effect = keyboardDrawKeyEffect;
			port.drawImage(keyboardMaskTexture, 0, 0);
			port.effect = keyboardHiliteKeyEffect;
			port.drawImage(keyboardMaskTexture, 0, 40);
			port.effect = keyboardDrawControlEffect;
			port.drawImage(keyboardMaskTexture, 40, 0);
			port.effect = keyboardHiliteControlEffect;
			port.drawImage(keyboardMaskTexture, 40, 40);
		}
	}
	texture = new Texture(port, 1);
	keySkin = new Skin(texture, {x:0, y:0, width:40, height:40}, 40, 40, {left:16, right:16, top:16, bottom:16});
	
	port = new Port({width: 880, height: 80});
	port.behavior = {
		onDraw: function(port) {
			port.effect = keyboardIconEffect;
			port.drawImage(keyboardIconsTexture, 0, 0);
		}
	}
	texture = new Texture(port, 1);
	iconSkin = new Skin(texture, {x:0, y:0, width:80, height:80}, 80, 0, null, null, "fit");
}
buildSkins();

var keyboardHeight = 0;

class KeyboardBehavior extends Behavior {
	constructor() {
		super();
		this.abcFlag = true;
		this.altFlag = true;
		this.shiftFlag = false;
		this.shiftLockFlag = false;
	}
	computeHeight(keyboard) {
		var screen = keyboard.container;
		var width = screen.width;
		var height = screen.height;
		if (width < height)
			return Math.max(170, (height >> 2) - 20);
		return Math.max(170, (height >> 1) - 20);
	}
	onMeasureHorizontally(keyboard, width) {
		var screen = keyboard.container;
		var host = screen.first;
		var width = screen.width;
		var height = screen.height;
		if (width < height)
			keyboardHeight = Math.max(170, (height >> 2) - 20);
		else
			keyboardHeight = Math.max(170, (height >> 1) - 20);
		var size = Math.round(24 * keyboardHeight / 170);
		keyboard.style = new Style(size + "px Droid Sans", "white", "center");
		this.sync(keyboard, true);
		return width;
	}
	onMeasureVertically(keyboard) {
		return keyboardHeight;
	}
	sync(keyboard, reflowIt) {
		var screen = keyboard.container;
		var content = keyboard.first;
		while (content) {
			content.behavior.sync(content, this);
			content = content.next;
		}
		if (reflowIt) {
			var width = Math.floor(screen.width / 10);
			var height = Math.floor(keyboardHeight / 4);
			var x, y, i, content;
			/* first line */
			var coordinates = {}
			coordinates.left = 0;
			coordinates.top = 3;
			for (i = 0, content = keyboard.first; i < 10; i++, content = content.next) {
				coordinates.width = width;
				coordinates.height = height;
				content.coordinates = coordinates;
				coordinates.left += width;
			}
			/* second line */
			coordinates.left = 0;
			coordinates.top += height;
			if (this.abcFlag) {
				coordinates.width = 0;
				coordinates.height = 0;
				content.coordinates = coordinates;
				coordinates.left += (width >> 1);
			}
			else {
				coordinates.width = width;
				coordinates.height = height;
				content.coordinates = coordinates;
				coordinates.left += width;
			}
			for (i++, content = content.next; i < 20; i++, content = content.next) {
				coordinates.width = width;
				coordinates.height = height;
				content.coordinates = coordinates;
				coordinates.left += width;
			}
			/* third line */
			coordinates.left = 0;
			coordinates.top += height;
			coordinates.width = width + (width >> 1);
			coordinates.height = height;
			content.coordinates = coordinates;
			coordinates.left += coordinates.width;
			for (i++, content = content.next; i < 28; i++, content = content.next) {
				coordinates.width = width;
				coordinates.height = height;
				content.coordinates = coordinates;
				coordinates.left += width;
			}
			coordinates.width = width + (width >> 1);
			coordinates.height = height;
			content.coordinates = coordinates;
			i++;
			content = content.next;
			/* fourth line */
			coordinates.left = 0;
			coordinates.top += height;
			coordinates.width = width << 1;
			coordinates.height = height;
			content.coordinates = coordinates;
			coordinates.left += coordinates.width;
			i++;
			content = content.next;
			coordinates.width = width;
			coordinates.height = height;
			content.coordinates = coordinates;
			coordinates.left += width;
			i++;
			content = content.next;
			coordinates.width = width << 2;
			coordinates.height = height;
			content.coordinates = coordinates;
			coordinates.left += coordinates.width;
			i++;
			content = content.next;
			coordinates.width = width;
			coordinates.height = height;
			content.coordinates = coordinates;
			coordinates.left += width;
			i++;
			content = content.next;
			coordinates.width = width << 1;
			coordinates.height = height;
			content.coordinates = coordinates;
		}
	}
};

class KeyBehavior extends Behavior {
	getKey(keyboard) {
		if (keyboard.shiftFlag) return this.shiftKey;
		if (keyboard.abcFlag) return this.abcKey;
		if (keyboard.altFlag) return this.altKey;
		return this.numKey;
	}
	onTouchBegan(content, id, x, y, ticks) {
		content.state = 1;
		var container = content.container;
		var keyboard = content.container.behavior;
		var key = this.getKey(keyboard);
		var code = key.charCodeAt(0);
		if (code >= 8) {
			//shell.keyDown(key, 0, 0, ticks);
		}
	}
	onTouchCancelled(content, id) {
		content.state = 0;
	}
	onTouchEnded(content, id, x, y, ticks) {
		content.state = 0;
		var container = content.container;
		var keyboard = content.container.behavior;
		var key = this.getKey(keyboard);
		var code = key.charCodeAt(0);
		if (code < 8) {
			switch (code) {
			case 1: 
				keyboard.shiftFlag = true; 
				keyboard.shiftLockFlag = false; 
				keyboard.sync(container, false);
				return;
			case 2: 
				if (this.clickCount > 1) { 
					keyboard.shiftFlag = true; 
					keyboard.shiftLockFlag = true; 
				} 
				else { 
					keyboard.shiftFlag = false; 
					keyboard.shiftLockFlag = false; 
				} 
				keyboard.sync(container); 
				return;
			case 3: 
				keyboard.altFlag = true; 
				keyboard.sync(container, false); 
				return;
			case 4: 
				keyboard.altFlag = false; 
				keyboard.sync(container, false); 
				return;
			case 5: 
				keyboard.abcFlag = true; 
				keyboard.altFlag = false; 
				keyboard.shiftFlag = false; 
				keyboard.shiftLockFlag = false; 
				keyboard.sync(container, true); 
				return;
			case 6: 
				keyboard.abcFlag = false; 
				keyboard.altFlag = false; 
				keyboard.shiftFlag = false; 
				keyboard.shiftLockFlag = false; 
				keyboard.sync(container, true); 
				return;
			}
		}
		else {
			//shell.keyUp(key, 0, 0, ticks);
			application.distribute("onKeyPressed", key);
		}
	}
	onFinished(content) {
		content.state = 0;
	}
	sync(content, keyboard) {
		var key = this.getKey(keyboard);
		var code = key.charCodeAt(0);
		var icon;
		content.variant = (code < 32) ? 1 : 0;
		if (code <= 32) {
			icon = new Content({left:0, right:0, top:0, bottom:0}, iconSkin);
			switch (code) {
			case 1: code = 0; break;
			case 2: code = keyboard.shiftLockFlag ? 2 : 1; break;
			case 3: code = 3; break;
			case 4: code = 4; break;
			case 5: code = 6; break;
			case 6: code = 7; break;
			case 8: code = 5; break;
			case 9: code = 10; break;
			case 13: code = 9; break;
			case 32: code = 8; break;
			}
			icon.variant = code;
		}
		else {
			icon = new Label({left:0, right:0, top:0, bottom:0}, null, null, key);
		}
		content.replace(content.first, icon);
	}
}

var keyboard = new Layout({
	left:0, right:0, bottom: 0,
	skin: backgroundSkin, style: charStyle,
	Behavior: KeyboardBehavior
});

var abcKeys = "qwertyuiop\x07asdfghjkl\x01zxcvbnm\b\x06, .\r";
var shiftKeys = "QWERTYUIOP\x07ASDFGHJKL\x02ZXCVBNM\b\x06, .\r";
var numKeys = "1234567890@#$%&*-+()\x03!\"':;/?\b\x05, .\r";
var altKeys = "~`|•√π÷×{}\t£¢€°^_=[]\x04™®©¶\\<>\b\x05„ …\r";

var behaviors = new Array(34);
for (var i = 0; i < 34; i++) {
	var behavior = new KeyBehavior();
	behavior.abcKey = abcKeys.charAt(i);
	behavior.shiftKey = shiftKeys.charAt(i);
	behavior.numKey = numKeys.charAt(i);
	behavior.altKey = altKeys.charAt(i);
	var key = new Container({left:0, top:0}, keySkin);
	key.active = true;
	key.behavior = behavior;
	var icon = new Label({left:0, right:0, top:0, bottom:0}, null, null, behavior.abcKey);
	key.add(icon);
	keyboard.add(key);
	behaviors[i] = behavior;
}

class KeyboardShowTransition extends Transition {
	constructor(duration) {
		super(duration);
	}
	onBegin(screen, keyboard) {
		screen.add(keyboard);
		this.layer = new Layer;
		this.layer.attach(keyboard);
		this.height = screen.height;
		this.host = screen.first;
		this.host.coordinates = { left: 0, right: 0, top: 0, height: this.height };
	}
	onEnd(screen, keyboard) {
		this.layer.detach();
		//this.host.adapt();
		this.host.delegate("adapt");
	}
	onStep(fraction) {
		var fraction = Math.quadEaseOut(fraction);
		this.layer.translation = {y: keyboardHeight * (1 - fraction)};
		this.host.height = this.height - Math.round(keyboardHeight * fraction);
	}
};

class KeyboardHideTransition extends Transition {
	constructor(duration) {
	 super(duration);
	}
	onBegin(screen, keyboard) {
		this.layer = new Layer;
		this.layer.attach(keyboard);
		this.height = screen.height;
		this.host = screen.first;
	}
	onEnd(screen, keyboard) {
		this.layer.detach();
		screen.remove(keyboard);
		this.host.coordinates = { left: 0, right: 0, top: 0, bottom: 0 };
		//this.host.adapt();
		this.host.delegate("adapt");
	}
	onStep(fraction) {
		fraction = Math.quadEaseIn(fraction);
		this.layer.translation = {y: keyboardHeight * fraction};
		this.host.height = this.height - Math.round(keyboardHeight * (1 - fraction));
	}
};

export var adapt = function() {
	if (keyboard.container) {
		var height = keyboard.behavior.computeHeight(keyboard);
		keyboard.previous.height = keyboard.container.height - height;
	}
}
export var isShown = function() {
	return keyboard.container ? true : false;
}
/*
export var show = function(showIt, screen) {
	if (showIt) {
		if (!keyboard.container && !screen.transitioning) {
			screen.run(new KeyboardShowTransition(250), keyboard);
		}
	}
	else {
		if (keyboard.container && !screen.transitioning) {
			screen.run(new KeyboardHideTransition(250), keyboard);
		}
	}
}*/

export var show = function() {
	if (!keyboard.container && !application.transitioning) {
		application.run(new KeyboardShowTransition(250), keyboard);
	}
}

export var hide = function() {
	if (keyboard.container && !application.transitioning) {
		application.run(new KeyboardHideTransition(250), keyboard);
	}
}
export default {
	adapt, isShown, show, hide
}