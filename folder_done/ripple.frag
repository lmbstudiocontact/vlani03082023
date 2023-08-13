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

uniform float amplitude; // = 100.0
uniform float speed; // = 50.0

vec4 transition (vec2 uv) {
    vec2 dir = uv - vec2(.5);
    float dist = length(dir);
    vec2 offset = dir * (sin(progress * dist * amplitude - progress * speed) + progress) / 30.;
    //vec2 offset = dir * (sin(progress * dist * amplitude - progress * speed) + .5) / 30.; tren dien thoai
    //duy chuyen 3 4 lan se bi zoom xau, nen thay +0.5 => progress
    return mix(
    getFromColor(uv + offset),
    getToColor(uv),
    smoothstep(0.2, 1.0, progress)
    );
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}