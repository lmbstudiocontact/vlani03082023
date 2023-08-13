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


uniform float a; // = 4
uniform float b; // = 1
uniform float amplitude; // = 120
uniform float smoothness; // = 0.1

vec4 transition(vec2 uv) {
    vec2 p = uv.xy / vec2(1.0).xy;
    vec2 dir = p - vec2(.5);
    float dist = length(dir);
    float x = (a - b) * cos(progress) + b * cos(progress * ((a / b) - 1.) );
    float y = (a - b) * sin(progress) - b * sin(progress * ((a / b) - 1.));
    vec2 offset = dir * vec2(sin(progress  * dist * amplitude * x), sin(progress * dist * amplitude * y)) / smoothness;
    return mix(getFromColor(p + offset), getToColor(p), smoothstep(0.2, 1.0, progress));
}





void main(void){
    gl_FragColor=transition(vTexCoord);

}