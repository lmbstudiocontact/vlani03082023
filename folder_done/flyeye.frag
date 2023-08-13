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

uniform float size; // = 0.04
uniform float zoom; // = 50.0
uniform float colorSeparation; // = 0.3

vec4 transition(vec2 p) {
    float inv = 1. - progress;
    vec2 disp = size*vec2(cos(zoom*p.x), sin(zoom*p.y));
    vec4 texTo = getToColor(p + inv*disp);
    vec4 texFrom = vec4(
    getFromColor(p + progress*disp*(1.0 - colorSeparation)).r,
    getFromColor(p + progress*disp).g,
    getFromColor(p + progress*disp*(1.0 + colorSeparation)).b,
    1.0);
    return texTo*progress + texFrom*inv;
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}