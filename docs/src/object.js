var W = 300; // ummm...

var CL = 37;
var CR = 39;
var CM = 40;
var VL = 72;
var VR = 76;
var VM = 74;
var EL = 66;
var ER = 70;
var EM = 78;

class Object {
    constructor (value, lane, color) {
        this.value = value; this.lane = lane; this.color = color;
        this.image = new Image();
        this.image.src = `./docs/image/${this.value}-${this.color}.png`;
        this.y = -100;
        switch (lane) {
            case 'L': this.x = W / 3 * 0 + 10; break;
            case 'R': this.x = W / 3 * 2 + 10; break;
            case 'M': this.x = W / 3 * 1 + 10; break;
        }
    }

    static fromInt (rand) {
        switch (rand) {
            case  0: return new Object('L', 'L', 'BK'); break;
            case  1: return new Object('L', 'L', 'RD'); break;
            case  2: return new Object('L', 'R', 'BK'); break;
            case  3: return new Object('L', 'R', 'RD'); break;
            case  4: return new Object('R', 'L', 'BK'); break;
            case  5: return new Object('R', 'L', 'RD'); break;
            case  6: return new Object('R', 'R', 'BK'); break;
            case  7: return new Object('R', 'R', 'RD'); break;

            case  8: return new Object('L', 'M', 'BK'); break;
            case  9: return new Object('L', 'M', 'RD'); break;
            case 10: return new Object('R', 'M', 'BK'); break;
            case 11: return new Object('R', 'M', 'RD'); break;
            case 12: return new Object('M', 'L', 'BK'); break;
            case 13: return new Object('M', 'L', 'RD'); break;
            case 14: return new Object('M', 'R', 'BK'); break;
            case 15: return new Object('M', 'R', 'RD'); break;
            case 16: return new Object('M', 'M', 'BK'); break;
            case 17: return new Object('M', 'M', 'RD'); break;
        }
    }

    input (key, area) {
        var lCond = (this.value == 'L' && this.color == 'BK') || (this.lane == 'L' && this.color == 'RD');
        var rCond = (this.value == 'R' && this.color == 'BK') || (this.lane == 'R' && this.color == 'RD');
        var mCond = (this.value == 'M' && this.color == 'BK') || (this.lane == 'M' && this.color == 'RD');

        switch (key) {
            case CL: return lCond ? area * 1 : 0; break;
            case CR: return rCond ? area * 1 : 0; break;
            case CM: return mCond ? area * 1 : 0; break;
            case VL: return lCond ? area * 2 : 0; break;
            case VR: return rCond ? area * 2 : 0; break;
            case VM: return mCond ? area * 2 : 0; break;
            case EL: return lCond ? area * 2 : 0; break;
            case ER: return rCond ? area * 2 : 0; break;
            case EM: return mCond ? area * 2 : 0; break;
            default: return 0;
        }
    }
}
