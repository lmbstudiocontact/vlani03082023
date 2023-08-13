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


uniform float size; // = 0.2

float rand (vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec4 transition (vec2 uv) {
    float r = rand(vec2(0, uv.y));
    float m = smoothstep(0.0, -size, uv.x*(1.0-size) + size*r - (progress * (1.0 + size)));
    return mix(
    getFromColor(uv),
    getToColor(uv),
    m
    );
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}