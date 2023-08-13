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
vec4 getFromColor(vec2 uv){return texture2D(from,uv); }
vec4 getToColor(vec2 uv){return texture2D(to,uv);}


uniform float direction_x; // = 0.0;
uniform float direction_y; // = 1.0;
vec4 transition (vec2 uv) {
    vec2 direction=vec2(direction_x,direction_y);
    vec2 p = uv + progress * sign(direction);
    vec2 f = fract(p);
    return mix(
    getToColor(f),
    getFromColor(f),
    step(0.0, p.y) * step(p.y, 1.0) * step(0.0, p.x) * step(p.x, 1.0)
    );
}

void main(void) {
    gl_FragColor =transition(vTexCoord);

}