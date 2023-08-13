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
uniform float zoom_quickness; // = 0.8

vec2 zoom(vec2 uv, float amount) {
    return 0.5 + ((uv - 0.5) * (1.0-amount));
}

vec4 transition (vec2 uv) {
    float nQuick = clamp(zoom_quickness,0.2,1.0);
    return mix(
    getFromColor(zoom(uv, smoothstep(0.0, nQuick, progress))),
    getToColor(uv),
    smoothstep(nQuick-0.2, 1.0, progress)
    );
}

void main(void) {
    gl_FragColor =transition(vTexCoord);

}