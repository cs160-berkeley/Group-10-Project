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
 
/* NOTE: this is slightly different than field.js from the Controls tutorial (http://kinoma.com/develop/documentation/kinomajs-tutorials/controls/) */
 
import KEYBOARD from './keyboard';

export class FieldLabelBehavior extends  Behavior {
	onCreate(label, data) {
		this.data = data;
	}
	onDisplayed(label) {
		this.onEdited(label);
	}
	onEdited(label) {
	}
	onFocused(label) {
		label.select(0, label.length);
		//SystemKeyboard.show();
		KEYBOARD.show();
	}
	onKeyPressed(label, key) {
		if (key) {
			var code = key.charCodeAt(0);
			var edited = false;
			switch (code) {
			case 1: /* home */
				label.select(0, 0);
				break;
			case 2: /* delete selection */
				label.insert();
				edited = true;
				break;
			case 3: /* enter */
				return false;
			case 4: /* end */
				label.select(label.length, 0);
				break;
			case 5: /* help */
				return false;
			case 8: /* backspace */
				if (label.selectionLength == 0)
					label.select(label.selectionOffset - 1, 1)
				label.insert()
				edited = true;
				break;
			case 9: /* tab */
				return false;
			case 11: /* page up */
				return false;
			case 12: /* page down */
				return false;
			case 13: /* return */
				if (label instanceof Text) {
					label.insert(key);
					edited = true;
				}
				else
					return false;
				break;
			case 27: /* escape */
				return false;
			case 28: /* left */
				if (shiftKey) {
					label.select(label.selectionOffset - 1, label.selectionLength + 1);
				}
				else {
					if (label.selectionLength == 0)
						label.select(label.selectionOffset - 1, 0);
					else
						label.select(label.selectionOffset, 0);
				}
				break;
			case 29: /* right */
				if (shiftKey)
					label.select(label.selectionOffset, label.selectionLength + 1);
				else {
					if (label.selectionLength == 0)
						label.select(label.selectionOffset + 1, 0);
					else
						label.select(label.selectionOffset + label.selectionLength, 0);
				}
				break;
			case 30: /* up */
				return false;
			case 31: /* down */
				return false;
			case 127: /* delete */
				if (label.selectionLength == 0)
					label.select(label.selectionOffset, 1)
				label.insert()
				edited = true;
				break;
			default:
				if ((Event.FunctionKeyPlay <= code) && (code <= Event.FunctionKeyPower))
					return false;
				if (code > 0x000F0000)
					return false;
				label.insert(key);
				edited = true;
			}
		}
		else {
			label.insert()
			edited = true;
		}
		this.onReveal(label);
		if (edited)
			this.onEdited(label);
	}
	onReveal(label) {
		label.container.reveal(label.selectionBounds);
	}
	onTouchBegan(label, id, x, y, ticks) {
		this.position = label.position;
		var offset = label.hitOffset(x - this.position.x, y - this.position.y);
		if (shiftKey) {
			if (offset < label.selectionOffset)
				this.anchor = label.selectionOffset + label.selectionLength;
			else
				this.anchor = label.selectionOffset;
		}
		else
			this.anchor = offset;
		this.onTouchMoved(label, id, x, y, ticks);
	}
	onTouchCancelled(label, id, x, y, ticks) {
	}
	onTouchEnded(label, id, x, y, ticks) {
		this.onTouchMoved(label, id, x, y, ticks);
	}
	onTouchMoved(label, id, x, y, ticks) {
		this.offset = label.hitOffset(x - this.position.x, y - this.position.y);
		label.select(this.offset, 0);
	}
	onUnfocused(label) {
	}
};

export class FieldScrollerBehavior extends Behavior {
	onTouchBegan(scroller, id, x, y, ticks) {
		let label = scroller.first;
		this.tracking = label.focused;
		if (this.tracking)
			label.behavior.onTouchBegan(label, id, x, y, ticks);
		else
			label.focus();
	}
	onTouchMoved(scroller, id, x, y, ticks) {
		let label = scroller.first;
		if (this.tracking)
			label.behavior.onTouchMoved(label, id, x, y, ticks);
	}
	onTouchEnded(scroller, id, x, y, ticks) {
		let label = scroller.first;
		if (this.tracking)
			label.behavior.onTouchEnded(label, id, x, y, ticks);
	}
}