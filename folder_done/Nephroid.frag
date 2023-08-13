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

vec4 transition (vec2 uv) {
    if (progress == 0.0){
        return getFromColor(uv);
    }
    vec2 leaf_uv = (uv - vec2(0.5))/10./pow(progress, 3.5);
    //danh cho mobile.
    leaf_uv.y -= 0.0;//center
    leaf_uv.y = -leaf_uv.y;
    //danh cho destop se bi dao nguoc leaf_uv.y += 0.35;
    float r = 0.18;
    float o = atan(leaf_uv.y, leaf_uv.x);
    //  float r0=r*(1.0+sin(o))*(1.0+0.9 * cos(8.0*o))*(1.0+0.1*cos(24.0*o))*(0.9+0.05*cos(200.0*o));
    //r(θ) = sqrt(2) a ((1 - cos(θ))^(1/3) + (cos(θ) + 1)^(1/3))^(3/2)
    float a=progress;
    float r0=sqrt(2.0)* a *pow((pow((1.0 - cos(o)), (1.0/3.0)) + pow((cos(o) + 1.0), (1.0/3.0))), (3.0/2.0));
    float av2=1.0-step(1.0 - length(leaf_uv)+r0, 1.0);
    return mix(getFromColor(uv), getToColor(uv), av2);
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}