#ifdef GL_ES
#define LOWP lowp
precision mediump float;
#else
#define LOWP
#endif
//"in" attributes from our vertex shader
varying LOWP vec4 vColor;
varying vec2 vTexCoord;
varying vec2 vTexCoord3;
//our different texture units

precision highp float;
uniform sampler2D from, to;

uniform float progress;
uniform float ratio;
vec4 getFromColor(vec2 uv){ return texture2D(from, uv); }
vec4 getToColor(vec2 uv){ return texture2D(to, uv); }

#define PI 3.1415926

vec2 rotate2D(in vec2 uv, in float angle){

    return uv * mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}
vec4 transition (vec2 uv) {

    vec2 p = fract(rotate2D(uv - 0.5, progress * PI * 2.0) + 0.5);

    return mix(
    getFromColor(p),
    getToColor(p),
    progress
    );
}

void main(void){
    gl_FragColor=transition(vTexCoord);

}