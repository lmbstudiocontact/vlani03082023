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



uniform float x_start; // = 0.5
uniform float y_start; // = 0.5
uniform float threshold; // = 3.0
uniform float fadeEdge; // = 0.1

float rand(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec4 transition(vec2 p) {
    vec2 center=vec2(x_start,y_start);
    float dist = distance(center, p) / threshold;
    float r = progress - min(rand(vec2(p.y, 0.0)), rand(vec2(0.0, p.x)));
    return mix(getFromColor(p), getToColor(p), mix(0.0, mix(step(dist, r), 1.0, smoothstep(1.0-fadeEdge, 1.0, progress)), smoothstep(0.0, fadeEdge, progress)));
}




void main(void){
    gl_FragColor=transition(vTexCoord);

}