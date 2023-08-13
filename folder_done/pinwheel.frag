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


uniform float speed; // = 2.0;

vec4 transition(vec2 uv) {

    vec2 p = uv.xy / vec2(1.0).xy;

    float circPos = atan(p.y - 0.5, p.x - 0.5) + progress * speed;
    float modPos = mod(circPos, 3.1415 / 4.);
    float signed = sign(progress - modPos);

    return mix(getToColor(p), getFromColor(p), step(signed, 0.5));

}



void main(void){
    gl_FragColor=transition(vTexCoord);

}