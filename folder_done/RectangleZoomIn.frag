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


vec4 transition(vec2 uv) {

    float s = pow(2.0 * abs(progress - 0.5), 3.0);

    vec2 q = uv.xy / vec2(1.0).xy;

    // bottom-left
    vec2 bl = step(vec2(1.0 - 2.0*abs(progress - 0.5)), q + 0.25);

    // top-right
    vec2 tr = step(vec2(1.0 - 2.0*abs(progress - 0.5)), 1.25 - q);

    float dist = length(1.0 - bl.x * bl.y * tr.x * tr.y);

    return mix(
    progress < 0.5 ? getFromColor(uv) : getToColor(uv),
    getToColor(uv),
    step(s, dist)
    );

}

void main(void){
    gl_FragColor=transition(vTexCoord);

}