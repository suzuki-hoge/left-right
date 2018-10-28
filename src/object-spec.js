assert = function (act, exp) { 
    if (exp != act) {
        throw new Error('exp ' + exp + ', but got ' + act);
    } else {
        console.log('.');
    }
};

assert(Object.fromInt(0).input(CL, 2), 2);
assert(Object.fromInt(0).input(CR, 2), 0);

assert(Object.fromInt(1).input(CL, 2), 2);
assert(Object.fromInt(1).input(CR, 2), 0);

assert(Object.fromInt(2).input(CL, 2), 2);
assert(Object.fromInt(2).input(CR, 2), 0);

assert(Object.fromInt(3).input(CL, 2), 0);
assert(Object.fromInt(3).input(CR, 2), 2);

assert(Object.fromInt(0).input(VL, 2), 4);
assert(Object.fromInt(0).input(VR, 2), 0);

assert(Object.fromInt(1).input(VL, 2), 4);
assert(Object.fromInt(1).input(VR, 2), 0);

assert(Object.fromInt(2).input(VL, 2), 4);
assert(Object.fromInt(2).input(VR, 2), 0);

assert(Object.fromInt(3).input(VL, 2), 0);
assert(Object.fromInt(3).input(VR, 2), 4);
