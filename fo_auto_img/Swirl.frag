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
vec4 transition(vec2 UV)
{
    float Radius = 1.0;

    float T = progress;

    UV -= vec2( 0.5, 0.5 );

    float Dist = length(UV);

    if ( Dist < Radius )
    {
        float Percent = (Radius - Dist) / Radius;
        float A = ( T <= 0.5 ) ? mix( 0.0, 1.0, T/0.5 ) : mix( 1.0, 0.0, (T-0.5)/0.5 );
        float Theta = Percent * Percent * A * 8.0 * 3.14159;
        float S = sin( Theta );
        float C = cos( Theta );
        UV = vec2( dot(UV, vec2(C, -S)), dot(UV, vec2(S, C)) );
    }
    UV += vec2( 0.5, 0.5 );

    vec4 C0 = getFromColor(UV);
    vec4 C1 = getToColor(UV);

    return mix( C0, C1, T );
}




void main(void){
    gl_FragColor=transition(vTexCoord);

}