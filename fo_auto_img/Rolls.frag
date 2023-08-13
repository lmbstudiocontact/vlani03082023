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

uniform float ratio;
uniform float type; // = 0.0
uniform float RotDown; // = 0.0
// type (0-3): Rotate/Roll from which corner
// RotDown: if true rotate old image down, otherwise rotate old image up

#define M_PI 3.14159265358979323846

vec4 transition(vec2 uv)
{
    float theta, c1, s1;
    vec2 iResolution = vec2(ratio, 1.0);
    vec2 uvi;
    // I used if/else instead of switch in case it's an old GPU
    if (type == 0.0) { theta = (RotDown==1.0 ? M_PI : -M_PI) / 2.0 * progress; uvi.x = 1.0 - uv.x; uvi.y = uv.y; }
    else if (type == 1.0) { theta = (RotDown==1.0 ? M_PI : -M_PI) / 2.0 * progress; uvi = uv; }
    else if (type == 2.0) { theta = (RotDown==1.0 ? -M_PI : M_PI) / 2.0 * progress; uvi.x = uv.x; uvi.y = 1.0 - uv.y; }
    else if (type == 3.0) { theta = (RotDown==1.0 ? -M_PI : M_PI) / 2.0 * progress; uvi = 1.0 - uv; }
    c1 = cos(theta); s1 = sin(theta);
    vec2 uv2;
    uv2.x = (uvi.x * iResolution.x * c1 - uvi.y * iResolution.y * s1);
    uv2.y = (uvi.x * iResolution.x * s1 + uvi.y * iResolution.y * c1);
    if ((uv2.x >= 0.0) && (uv2.x <= iResolution.x) && (uv2.y >= 0.0) && (uv2.y <= iResolution.y))
    {
        uv2 /= iResolution;
        if (type == 0.0) { uv2.x = 1.0 - uv2.x; }
        else if (type == 2.0) { uv2.y = 1.0 - uv2.y; }
        else if (type == 3.0) { uv2 = 1.0 - uv2; }
        return(getFromColor(uv2));
    }
    return(getToColor(uv));
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}