/*
 * @remarks
 * Game of Life in TypeScript as implemented at https://go.dev/
 *
 */
function createField(w, h) {
    var s = new Array(h);
    for (var i = 0; i < s.length; i++) {
        s[i] = new Array(w);
    }
    return { s: s, w: w, h: h };
}
function setField(f, x, y, b) {
    f.s[y][x] = b;
}
function Alive(f, x, y) {
    x += f.w;
    x %= f.w;
    y += f.h;
    y %= f.h;
    return f.s[y][x];
}
function Next(f, x, y) {
    var alive = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if ((j != 0 || i != 0) && Alive(f, x + i, y + j)) {
                alive++;
            }
        }
    }
    return alive == 3 || (alive == 2 && Alive(f, x, y));
}
function NewLife(w, h) {
    var a = createField(w, h);
    for (var i = 0; i < (w * h) / 4; i++) {
        setField(a, Math.floor(Math.random() * w), Math.floor(Math.random() * h), true);
    }
    return { a: a, b: createField(w, h), w: w, h: h };
}
function Step(l) {
    for (var y = 0; y < l.h; y++) {
        for (var x = 0; x < l.w; x++) {
            setField(l.b, x, y, Next(l.a, x, y));
        }
    }
    var temp = l.a;
    l.a = l.b;
    l.b = temp;
}
function Print(l) {
    var buf = "";
    for (var y = 0; y < l.h; y++) {
        for (var x = 0; x < l.w; x++) {
            var temp = " ";
            if (Alive(l.a, x, y)) {
                temp = "*";
            }
            buf += temp;
        }
        buf += "\n";
    }
    return buf;
}
function sleep(time) {
    // @ts-ignore
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
function main() {
    function run() {
        var l = NewLife(40, 15);
        for (var i = 0; i < 300; i++) {
            Step(l);
            console.log(Print(l));
        }
    }
    sleep(1000).then(function () {
        run();
    });
}
main();
