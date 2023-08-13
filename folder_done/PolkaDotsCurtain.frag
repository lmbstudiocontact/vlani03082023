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
uniform sampler2D from,to;
uniform float progress;
vec4 getFromColor(vec2 uv){return texture2D(from,uv);}
vec4 getToColor(vec2 uv){return texture2D(to,uv);}

const float SQRT_2 = 1.414213562373;
uniform float dots;// = 20.0;
uniform float start_x;// = 0.0;
uniform float start_y;// = 0.0;
vec4 transition(vec2 uv) {
    vec2 center=vec2(start_x,start_y);
    bool nextImage = distance(fract(uv * dots), vec2(0.5, 0.5)) < ( progress / distance(uv, center));
    return nextImage ? getToColor(uv) : getFromColor(uv);
}


void main(void){
    gl_FragColor=transition(vTexCoord);

}