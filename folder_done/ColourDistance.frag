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


uniform float power; // = 5.0

vec4 transition(vec2 p) {
    vec4 fTex = getFromColor(p);
    vec4 tTex = getToColor(p);
    float m = step(distance(fTex, tTex), progress);
    return mix(
    mix(fTex, tTex, m),
    tTex,
    pow(progress, power)
    );
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}