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

uniform float strength; //= 0.6;
const float PI = 3.141592653589793;

vec4 transition (vec2 uv) {
    vec4 from = getFromColor(uv);
    vec4 to = getToColor(uv);

    // Multipliers
    float from_m = 1.0 - progress + sin(PI * progress) * strength;
    float to_m = progress + sin(PI * progress) * strength;

    return vec4(
    from.r * from.a * from_m + to.r * to.a * to_m,
    from.g * from.a * from_m + to.g * to.a * to_m,
    from.b * from.a * from_m + to.b * to.a * to_m,
    mix(from.a, to.a, progress)
    );
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}