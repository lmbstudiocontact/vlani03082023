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

uniform float intensity; // = 0.3; // if 0.0, the image directly turn grayscale, if 0.9, the grayscale transition phase is very important

vec3 grayscale (vec3 color) {
    return vec3(0.2126*color.r + 0.7152*color.g + 0.0722*color.b);
}

vec4 transition (vec2 uv) {
    vec4 fc = getFromColor(uv);
    vec4 tc = getToColor(uv);
    return mix(
    mix(vec4(grayscale(fc.rgb), 1.0), fc, smoothstep(1.0-intensity, 0.0, progress)),
    mix(vec4(grayscale(tc.rgb), 1.0), tc, smoothstep(    intensity, 1.0, progress)),
    progress);
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}