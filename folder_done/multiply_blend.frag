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


vec4 blend(vec4 a, vec4 b) {
    return a * b;
}

vec4 transition (vec2 uv) {

    vec4 blended = blend(getFromColor(uv), getToColor(uv));

    if (progress < 0.5)
    return mix(getFromColor(uv), blended, 2.0 * progress);
    else
    return mix(blended, getToColor(uv), 2.0 * progress - 1.0);
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}