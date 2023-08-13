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


uniform float shadow_height; // = 0.075
uniform float bounces; // = 3.0
uniform float ve4_shacolor_index0;// =0.0
uniform float ve4_shacolor_index1;// =0.0
uniform float ve4_shacolor_index2;// =0.0
uniform float ve4_shacolor_index3;// =0.6
const float PI = 3.14159265358;

vec4 transition (vec2 uv) {
    float time = progress;
    float stime = sin(time * PI / 2.);
    float phase = time * PI * bounces;
    float y = (abs(cos(phase))) * (1.0 - stime);
    float d = uv.y - y;
    vec4 shadow_colour= vec4(ve4_shacolor_index0,ve4_shacolor_index1,ve4_shacolor_index2,ve4_shacolor_index3);
    return mix(
    mix(
    getToColor(uv),
    shadow_colour,
    step(d, shadow_height) * (1. - mix(
    ((d / shadow_height) * shadow_colour.a) + (1.0 - shadow_colour.a),
    1.0,
    smoothstep(0.95, 1., progress) // fade-out the shadow at the end
    ))
    ),
    getFromColor(vec2(uv.x, uv.y + (1.0 - y))),
    step(d, 0.0)
    );
}




void main(void){
    gl_FragColor=transition(vTexCoord);

}