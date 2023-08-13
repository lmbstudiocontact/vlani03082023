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

vec4 transition(vec2 p) {
    float x = progress;
    x=smoothstep(.0,1.0,(x*2.0+p.x-1.0));
    return mix(getFromColor((p-.5)*(1.-x)+.5), getToColor((p-.5)*x+.5), x);
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}