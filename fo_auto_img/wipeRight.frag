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


vec4 transition(vec2 uv) {
    vec2 p=uv.xy/vec2(1.0).xy;
    vec4 a=getFromColor(p);
    vec4 b=getToColor(p);
    return mix(a, b, step(0.0+p.x,progress));
}




void main(void){
    gl_FragColor=transition(vTexCoord);

}