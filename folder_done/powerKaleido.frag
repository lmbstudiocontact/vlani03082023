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


#define PI 3.14159265358979
const float rad = 120.; // change this value to get different mirror effects
const float deg = rad / 180. * PI;
uniform float scale; // = 2.0;
uniform float z; // = 1.5;
uniform float speed; // = 5.;
uniform float ratio;

vec2 refl(vec2 p,vec2 o,vec2 n)
{
    return 2.0*o+2.0*n*dot(p-o,n)-p;
}

vec2 rot(vec2 p, vec2 o, float a)
{
    float s = sin(a);
    float c = cos(a);
    return o + mat2(c, -s, s, c) * (p - o);
}

vec4 transition (vec2 uv) {

    float dist = scale / 10.;

    vec2 uv0 = uv;
    uv -= 0.5;
    uv.x *= ratio;
    uv *= z;
    uv = rot(uv, vec2(0.0), progress*speed);
    // uv.x = fract(uv.x/l/3.0)*l*3.0;
    float theta = progress*6.+PI/.5;
    for(int iter = 0; iter < 10; iter++) {
        for(float i = 0.; i < 2. * PI; i+=deg) {
            float ts = sign(asin(cos(i))) == 1.0 ? 1.0 : 0.0;
            if(((ts == 1.0) && (uv.y-dist*cos(i) > tan(i)*(uv.x+dist*+sin(i)))) || ((ts == 0.0) && (uv.y-dist*cos(i) < tan(i)*(uv.x+dist*+sin(i))))) {
                uv = refl(vec2(uv.x+sin(i)*dist*2.,uv.y-cos(i)*dist*2.), vec2(0.,0.), vec2(cos(i),sin(i)));
            }
        }
    }
    uv += 0.5;
    uv = rot(uv, vec2(0.5), progress*-speed);
    uv -= 0.5;
    uv.x /= ratio;
    uv += 0.5;
    uv = 2.*abs(uv/2.+floor(uv/2.+0.5));
    //uv = 2.*abs(uv/2.-floor(uv/2.+0.5)); thanh -> uv = 2.*abs(uv/2.+floor(uv/2.+0.5))
    // thi no ok hon. nhung no van khon smooth
    vec2 uvMix = mix(uv,uv0,cos(progress*PI*2.)/2.+0.5);
    vec4 color = mix(getFromColor(uvMix),getToColor(uvMix),cos((progress-1.)*PI)/2.+0.5);
    return color;
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}