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
uniform sampler2D from,to;
uniform float progress;
vec4 getFromColor(vec2 uv){return texture2D(from,uv);}
vec4 getToColor(vec2 uv){return texture2D(to,uv);}

uniform sampler2D u_mask;
uniform float time;

vec4 transition(vec2 uv) {
    vec4 maskVec4 = texture2D(u_mask,uv);
    return mix(
    getToColor(uv),
    getFromColor(uv),
    step(progress,maskVec4.a)
    );
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}