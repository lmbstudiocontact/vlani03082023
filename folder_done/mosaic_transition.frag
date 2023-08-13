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


uniform float mosaicNum;// = 10.0

vec2 getMosaicUV(vec2 uv) {
    float mosaicWidth = 2.0 / mosaicNum * min(progress, 1.0 - progress);
    float mX = floor(uv.x / mosaicWidth) + 0.5;
    float mY = floor(uv.y / mosaicWidth) + 0.5;
    return vec2(mX * mosaicWidth, mY * mosaicWidth);
}

vec4 transition (vec2 uv) {
    vec2 mosaicUV = min(progress, 1.0 - progress) == 0.0 ? uv : getMosaicUV(uv);
    return mix(getFromColor(mosaicUV), getToColor(mosaicUV), progress * progress);
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}