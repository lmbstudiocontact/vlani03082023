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


#define PI 3.14159265359

uniform float segments; // = 5.0;

vec4 transition (vec2 uv) {

    float angle = atan(uv.x - 0.5, uv.y - 0.5) - 0.5 * PI;
    float normalized = (angle + 1.5 * PI) * (2.0 * PI);

    float radius = (cos(segments * angle) + 4.0) / 4.0;
    float difference = length(uv - vec2(0.5, 0.5));

    if (difference > radius * progress)
    return getFromColor(uv);
    else
    return getToColor(uv);
}




void main(void){
    gl_FragColor=transition(vTexCoord);

}