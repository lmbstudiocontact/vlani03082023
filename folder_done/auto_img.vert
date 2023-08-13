//
//attribute vec2 _p;
//varying vec2 _uv;
//void main() {
//    gl_Position = vec4(_p,0.0,1.0);
//    _uv = vec2(0.5, 0.5) * (_p+vec2(1.0, 1.0));
//}
//combined projection and view matrix

//"in" attributes from our SpriteBatch
attribute vec2 a_position;
attribute vec4 a_color;
attribute vec2 a_texCoord0;//a_texCoord, requires a number at the end, i.e. a_texCoord0, a_texCoord1, etc.


uniform mat4 u_projTrans;

//"out" varyings to our fragment shader
varying vec2 vTexCoord;
varying vec2 vPosition;
varying vec4 v_color;
void main() {
    v_color= vec4(1, 1, 1, 1);
    vTexCoord = a_texCoord0;
    gl_Position = u_projTrans *vec4(a_position, 0.0, 1.0);
}