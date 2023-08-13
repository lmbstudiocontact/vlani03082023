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


uniform float direction_x; // = 1.0;
uniform float direction_y; // = -1.0;
uniform float smoothness; // = 0.5

const vec2 center = vec2(0.5, 0.5);

vec4 transition (vec2 uv) {
    vec2 direction=vec2(direction_x,direction_y);
    vec2 v = normalize(direction);
    v /= abs(v.x)+abs(v.y);
    float d = v.x * center.x + v.y * center.y;
    float m =
    (1.0-step(progress, 0.0)) * // there is something wrong with our formula that makes m not equals 0.0 with progress is 0.0
    (1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d-0.5+progress*(1.+smoothness))));
    return mix(getFromColor(uv), getToColor(uv), m);
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}