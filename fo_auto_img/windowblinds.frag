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
uniform float ratio;
vec4 getFromColor(vec2 uv){ return texture2D(from, uv); }
vec4 getToColor(vec2 uv){ return texture2D(to, uv); }

vec4 transition (vec2 uv) {
    float t = progress;

    if (mod(floor(uv.y*100.*progress),2.)==0.)
    t*=2.-.5;

    return mix(
    getFromColor(uv),
    getToColor(uv),
    mix(t, progress, smoothstep(0.8, 1.0, progress))
    );
}



void main(void){
    gl_FragColor=transition(vTexCoord);

}