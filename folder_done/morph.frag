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


uniform float strength; // = 0.1

vec4 transition(vec2 p) {
    vec4 ca = getFromColor(p);
    vec4 cb = getToColor(p);

    vec2 oa = (((ca.rg+ca.b)*0.5)*2.0-1.0);
    vec2 ob = (((cb.rg+cb.b)*0.5)*2.0-1.0);
    vec2 oc = mix(oa,ob,0.5)*strength;

    float w0 = progress;
    float w1 = 1.0-w0;
    return mix(getFromColor(p+oc*w0), getToColor(p-oc*w1), progress);
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}