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

#define PI acos(-1.0)

uniform float direction_x; // = 0.0;
uniform float direction_y; // = 1.0;
uniform float scale; // = .7

float parabola(float x) {
    float y = pow(sin(x * PI), 1.);
    return y;
}

vec4 transition (vec2 uv) {
    vec2 direction=vec2(direction_x,direction_y);
    float easedProgress = pow(sin(progress  * PI / 2.), 3.);
    vec2 p = uv + easedProgress * sign(direction);
    vec2 f = fract(p);

    float s = 1. - (1. - (1. / scale)) * parabola(progress);
    f = (f - 0.5) * s  + 0.5;

    float mixer = step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0);
    vec4 col = mix(getToColor(f), getFromColor(f), mixer);

    float border = step(0., f.x) * step(0., (1. - f.x)) * step(0., f.y) * step(0., 1. - f.y);
    col *= border;

    return col;
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}