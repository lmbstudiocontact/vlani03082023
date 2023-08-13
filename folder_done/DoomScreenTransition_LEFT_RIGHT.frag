#ifdef GL_ES
#define LOWP lowp
precision mediump float;
#else
#define LOWP
#endif
//"in" attributes from our vertex shader
varying LOWP vec4 vColor;
varying vec2 vTexCoord;
//our different texture units

precision highp float;
uniform sampler2D from, to;
uniform float progress;
vec4 getFromColor(vec2 uv){ return texture2D(from, uv); }
vec4 getToColor(vec2 uv){ return texture2D(to, uv); }

// Number of total bars/columns
uniform float bars;// = 30

// Multiplier for speed ratio. 0 = no variation when going down, higher = some elements go much faster
uniform float amplitude;// = 2

// Further variations in speed. 0 = no noise, 1 = super noisy (ignore frequency)
uniform float noise;// = 0.1

// Speed variation horizontally. the bigger the value, the shorter the waves
uniform float frequency;// = 0.5

// How much the bars seem to "run" from the middle of the screen first (sticking to the sides). 0 = no drip, 1 = curved drip
uniform float dripScale;// = 0.5


// The code proper --------

float rand(int num) {
    return fract(mod(float(num) * 67123.313, 12.0) * sin(float(num) * 10.3) * cos(float(num)));
}

float wave(int num) {
    float fn = float(num) * frequency * 0.1 * float(bars);
    return cos(fn * 0.5) * cos(fn * 0.13) * sin((fn+10.0) * 0.3) / 2.0 + 0.5;
}

float drip(int num) {
    return sin(float(num) / (bars - 1.0) * 3.141592) * dripScale;
}

float pos(int num) {
    return (noise == 0.0 ? wave(num) : mix(wave(num), rand(num), noise)) + (dripScale == 0.0 ? 0.0 : drip(num));
}

vec4 transition(vec2 uv) {
    int bar = int(uv.y * bars);
    float scale = 1.0 + pos(bar) * amplitude;
    float phase = progress * scale;
    float posX =1.0- uv.x / vec2(1.0).x;
    vec2 p;
    vec4 c;
    if (phase + posX < 1.0) {
        p = vec2(uv.x - mix(0.0, vec2(1.0).x, phase), uv.y) / vec2(1.0).xy;
        c = getFromColor(p);
    } else {
        p = uv.xy / vec2(1.0).xy;
        c = getToColor(p);
    }

    // Finally, apply the color
    return c;
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}