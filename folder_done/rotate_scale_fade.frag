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

uniform float center_x; // = 0.5;
uniform float center_y; // = 0.5;
uniform float rotations; // = 1;
uniform float scale; // = 8;

vec4 transition (vec2 uv) {
    vec2 center =vec2(center_x,center_y);
    vec2 difference = uv - center;
    vec2 dir = normalize(difference);
    float dist = length(difference);

    float angle = 2.0 * PI * rotations * progress;

    float c = cos(angle);
    float s = sin(angle);

    float currentScale = mix(scale, 1.0, 2.0 * abs(progress - 0.5));

    vec2 rotatedDir = vec2(dir.x  * c - dir.y * s, dir.x * s + dir.y * c);
    vec2 rotatedUv = center + rotatedDir * dist / currentScale;

    if (rotatedUv.x < 0.0 || rotatedUv.x > 1.0 ||
    rotatedUv.y < 0.0 || rotatedUv.y > 1.0)
    return getFromColor(uv);

    return mix(getFromColor(rotatedUv), getToColor(rotatedUv), progress);
}





void main(void){
    gl_FragColor=transition(vTexCoord);

}