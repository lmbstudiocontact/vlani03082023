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


#define PI 3.14159265358979323
uniform float endx; // = 2
uniform float endy; // = -1

float Rand(vec2 v) {
    return fract(sin(dot(v.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
vec2 Rotate(vec2 v, float a) {
    mat2 rm = mat2(cos(a), -sin(a),
    sin(a), cos(a));
    return rm*v;
}
float CosInterpolation(float x) {
    return -cos(x*PI)/2.+.5;
}
vec4 transition(vec2 uv) {
    vec2 p = uv.xy / vec2(1.0).xy - .5;
    vec2 rp = p;
    float rpr = (progress*2.-1.);
    float z = -(rpr*rpr*2.) + 3.;
    float az = abs(z);
    rp *= az;
    rp += mix(vec2(.5, .5), vec2(endx + .5, endy + .5),CosInterpolation(progress));
    vec2 mrp = mod(rp, 1.);
    vec2 crp = rp;
    bool onEnd = floor(crp.x)==endx&&floor(crp.y)==endy;
    if(!onEnd) {
        float ang = float(int(Rand(floor(crp))*4.))*.5*PI;
        mrp = vec2(.5) + Rotate(mrp-vec2(.5), ang);
    }
    if(onEnd || Rand(floor(crp))>.5) {
        return getToColor(mrp);
    } else {
        return getFromColor(mrp);
    }
}




void main(void){
    gl_FragColor=transition(vTexCoord);

}