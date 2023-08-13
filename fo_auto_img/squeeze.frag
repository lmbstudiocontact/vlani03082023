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


uniform float colorSeparation; // = 0.04

vec4 transition (vec2 uv) {
    float y = 0.5 + (uv.y-0.5) / (1.0-progress);
    if (y < 0.0 || y > 1.0) {
        return getToColor(uv);
    }
    else {
        vec2 fp = vec2(uv.x, y);
        vec2 off = progress * vec2(0.0, colorSeparation);
        vec4 c = getFromColor(fp);
        vec4 cn = getFromColor(fp - off);
        vec4 cp = getFromColor(fp + off);
        return vec4(cn.r, c.g, cp.b, c.a);
    }
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}