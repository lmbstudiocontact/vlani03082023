#ifdef GL_ES
#define LOWP lowp
precision mediump float;
#else
#define LOWP
#endif
//"in" attributes from our vertex shader
//https://github.com/gl-transitions/gl-transitions/blob/master/transitions/BookFlip.glsl
varying LOWP vec4 vColor;
varying vec2 vTexCoord;
//our different texture units

precision highp float;
uniform sampler2D from, to;

uniform float progress;
vec4 getFromColor(vec2 uv){ return texture2D(from, uv); }
vec4 getToColor(vec2 uv){ return texture2D(to, uv); }


vec2 skewRight(vec2 p) {
    float skewX = (p.x - progress)/(0.5 - progress) * 0.5;
    float skewY =  (p.y - 0.5)/(0.5 + progress * (p.x - 0.5) / 0.5)* 0.5  + 0.5;
    return vec2(skewX, skewY);
}

vec2 skewLeft(vec2 p) {
    float skewX = (p.x - 0.5)/(progress - 0.5) * 0.5 + 0.5;
    float skewY = (p.y - 0.5) / (0.5 + (1.0 - progress ) * (0.5 - p.x) / 0.5) * 0.5  + 0.5;
    return vec2(skewX, skewY);
}

vec4 addShade() {
    float shadeVal  =  max(0.7, abs(progress - 0.5) * 2.0);
    return vec4(vec3(shadeVal ), 1.0);
}

vec4 transition (vec2 p) {
    float pr = step(1.0 - progress, p.x);

    if (p.x < 0.5) {
        return mix(getFromColor(p), getToColor(skewLeft(p)) * addShade(), pr);
    } else {
        return mix(getFromColor(skewRight(p)) * addShade(), getToColor(p),   pr);
    }
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}