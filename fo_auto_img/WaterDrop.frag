#ifdef GL_ES
#define LOWP lowp
precision mediump float;
#else
#define LOWP
#endif
//"in" attributes from our vertex shader
varying LOWP vec4 vColor;
varying vec2 vTexCoord;
varying vec2 _uv;
//our different texture units

precision highp float;
uniform sampler2D from, to;
uniform float progress;
uniform vec2 direction;// = vec2(0.0, 1.0)

vec4 getFromColor(vec2 uv){ return texture2D(from, uv); }
vec4 getToColor(vec2 uv){ return texture2D(to, uv); }
uniform float amplitude; // = 30
uniform float speed; // = 30

vec4 transition(vec2 p) {
    vec2 dir = p - vec2(.5);
    float dist = length(dir);

    if (dist > progress) {
        return mix(getFromColor( p), getToColor( p), progress);
    } else {
        vec2 offset = dir * sin(dist * amplitude - progress * speed);
        return mix(getFromColor( p + offset), getToColor( p), progress);
    }
}

void main(void) {
    gl_FragColor =transition(vTexCoord);

}