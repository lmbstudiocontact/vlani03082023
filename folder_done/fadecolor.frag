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

uniform float color_x;// = 0.0
uniform float color_y;// = 0.0
uniform float color_z;// = 0.0
uniform float colorPhase/* = 0.4 */; // if 0.0, there is no black phase, if 0.9, the black phase is very important
vec4 transition (vec2 uv) {
    vec3 color=vec3(color_x,color_y,color_z);
    return mix(
    mix(vec4(color, 1.0), getFromColor(uv), smoothstep(1.0-colorPhase, 0.0, progress)),
    mix(vec4(color, 1.0), getToColor(uv), smoothstep(    colorPhase, 1.0, progress)),
    progress);
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}