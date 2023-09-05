import { Pattern } from "./shared.js"

function byte(n: number): string {
    return `${n.toFixed(0)}b`
}
function long(n: number): string {
    return `${n.toFixed(0)}L`
}

class StreamReader {
    private cursor: number = 0
    constructor(public content: string) {}
    private failEOF() {
        if (this.isAtEOF()) throw new Error('Unexpected EOF')
    }
    public advance(): string {
        this.failEOF()
        return this.content[this.cursor++]
    }
    public peek(): string {
        if (this.isAtEOF()) return '\0'
        return this.content[this.cursor]
    }
    public isAtEOF(): boolean {
        return this.cursor >= this.content.length
    }

    public skipWhitespace() {
        while (!this.isAtEOF() && this.peek().match(/\s/)) this.advance()
    }
}

abstract class Iota {
    public abstract type: string
    public abstract data: any
    protected abstract innerAsNBT(): string
    public asNBT(): string {
        return `{"hexcasting:type":"${this.type}","hexcasting:data":${this.innerAsNBT()}}`
    }

    private static readNumber(stream: StreamReader): number {
        let number = ''
        while (!stream.isAtEOF() && stream.peek().match(/[0-9]/)) number += stream.advance()
        if (stream.peek() == '.') {
            number += stream.advance()
            while (!stream.isAtEOF() && stream.peek().match(/[0-9]/)) number += stream.advance()
        }
        return parseFloat(number)
    }
    public static parse(hexiota: string): Iota {
        const stream = new StreamReader(hexiota)
        stream.skipWhitespace()
        const first = stream.peek()
        if (first === '<') {
            // it's a vector3
            stream.advance() // <
            
        }
        return new NullIota()
    }
}

class PatternIota extends Iota {
    public static readonly START_ANGLES = {
        ne: 0,
        e: 1,
        se: 2,
        sw: 3,
        w: 4,
        nw: 5
    }
    public static readonly ANGLES = {
        a: 4,
        q: 5,
        w: 0,
        e: 1,
        d: 2,
        s: 3
    }
    constructor(public readonly data: Pattern) {
        super()
    }
    protected innerAsNBT(): string {
        const startAngle = PatternIota.START_ANGLES[this.data.direction.name as keyof typeof PatternIota.START_ANGLES]
        const angles = this.data.pattern.split('').map(c => byte(PatternIota.ANGLES[c as keyof typeof PatternIota.ANGLES]))
        return `{startDir:${byte(startAngle)},angles:[B;${angles.join(',')}]}`
    }
    readonly type: string = 'hexcasting:pattern'
}

class NumberIota extends Iota {
    protected innerAsNBT(): string {
        return this.data.toString() // double is the default for NBT
    }
    constructor(public readonly data: number) {
        super()
    }
    readonly type: string = 'hexcasting:double'
}

class BooleanIota extends Iota {
    protected innerAsNBT(): string {
        return this.data ? '1b' : '0b'
    }
    constructor(public readonly data: boolean) {
        super()
    }
    readonly type: string = 'hexcasting:boolean'
}

class VectorIota extends Iota {
    protected innerAsNBT(): string {
        if (this.data.every(e => e % 1 === 0)) {
            return `[L;${this.data.map(e => long(e)).join(',')}]`
        }
        return `{x:${this.data[0]},y:${this.data[1]},z:${this.data[2]}}`
    }
    constructor(public readonly data: [number, number, number]) {
        super()
    }
    readonly type: string = 'hexcasting:vec3'
}

class NullIota extends Iota {
    protected innerAsNBT(): string {
        // hexcasting doesn't care about the value, just the type
        return '0b'
    }
    constructor() {
        super()
    }
    readonly data: null = null
    readonly type: string = 'hexcasting:null'
}

class ListIota extends Iota {
    protected innerAsNBT(): string {
        return `[${this.data.map(e => e.asNBT()).join(',')}]`
    }
    constructor(public readonly data: Iota[]) {
        super()
    }
    readonly type: string = 'hexcasting:list'
}

export type {
    Iota,
    PatternIota,
    NumberIota,
    BooleanIota,
    VectorIota,
    NullIota,
    ListIota
}