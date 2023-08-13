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

float inHeart (vec2 p, vec2 center, float size) {
    if (size==0.0) return 0.0;
    vec2 o =  (center-p)/(1.6*size);
    float a = o.x*o.x+o.y*o.y-0.3;
    return step(a*a*a, o.x*o.x*o.y*o.y*o.y);
}
vec4 transition (vec2 uv) {
    return mix(
    getFromColor(uv),
    getToColor(uv),
    inHeart(uv, vec2(0.5, 0.5), progress)
    );
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}