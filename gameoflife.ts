type Field = {
  s: Array<Array<boolean>>;
  w: number;
  h: number;
};

type Life = {
  a: Field;
  b: Field;
  w: number;
  h: number;
};

function createField(w: number, h: number): Field {
  let s: Array<Array<boolean>> = new Array<Array<boolean>>(h);
  for (let i = 0; i < s.length; i++) {
    s[i] = new Array<boolean>(w);
  }
  return { s: s, w: w, h: h };
}

function setField(f: Field, x: number, y: number, b: boolean) {
  f.s[y][x] = b;
}

function Alive(f: Field, x: number, y: number): boolean {
  x += f.w;
  x %= f.w;
  y += f.h;
  y %= f.h;
  return f.s[y][x];
}

function Next(f: Field, x: number, y: number): boolean {
  let alive = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if ((j != 0 || i != 0) && Alive(f, x + i, y + j)) {
        alive++;
      }
    }
  }
  return alive == 3 || (alive == 2 && Alive(f, x, y));
}

function NewLife(w: number, h: number): Life {
  let a = createField(w, h);
  for (let i = 0; i < (w * h) / 4; i++) {
    setField(
      a,
      Math.floor(Math.random() * w),
      Math.floor(Math.random() * h),
      true
    );
  }
  return { a: a, b: createField(w, h), w: w, h: h };
}

function Step(l: Life): void {
  for (let y = 0; y < l.h; y++) {
    for (let x = 0; x < l.w; x++) {
      setField(l.b, x, y, Next(l.a, x, y));
    }
  }
  let temp = l.a;
  l.a = l.b;
  l.b = temp;
}

function Print(l: Life): string {
  let buf = "";
  for (let y = 0; y < l.h; y++) {
    for (let x = 0; x < l.w; x++) {
      let temp = " ";
      if (Alive(l.a, x, y)) {
        temp = "*";
      }
      buf += temp;
    }

    buf += "\n";
  }
  return buf;
}


function main() {

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    let l = NewLife(40, 15);
    for (let i = 0; i < 300; i++) {
        Step(l);
        console.log(Print(l));
         sleep(100);
    }
}

main();
