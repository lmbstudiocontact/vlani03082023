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


vec4 transition (vec2 uv) {

    float s = 2.0 - abs((uv.x - 0.5) / (progress - 1.0)) - 2.0 * progress;

    return mix(
    getFromColor(uv),
    getToColor(uv),
    smoothstep(0.5, 0.0, s)
    );
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}