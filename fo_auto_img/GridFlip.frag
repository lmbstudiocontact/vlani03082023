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


uniform vec2 size ;// = vec2(1.1, 2.2);
uniform float pause; // = 0.1
uniform float dividerWidth; // = 0.05
uniform float randomness; // = 0.1

float rand (vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float getDelta(vec2 p) {
    vec2 rectanglePos = floor(size * p);
    vec2 rectangleSize = vec2(1.0 / size.x, 1.0 / size.y);
    float top = rectangleSize.y * (rectanglePos.y + 1.0);
    float bottom = rectangleSize.y * rectanglePos.y;
    float left = rectangleSize.x * rectanglePos.x;
    float right = rectangleSize.x * (rectanglePos.x + 1.0);
    float minX = min(abs(p.x - left), abs(p.x - right));
    float minY = min(abs(p.y - top), abs(p.y - bottom));
    return min(minX, minY);
}

float getDividerSize() {
    vec2 rectangleSize = vec2(1.0 / size.x, 1.0 / size.y);
    return min(rectangleSize.x, rectangleSize.y) * dividerWidth;
}

vec4 transition(vec2 p) {
    if(progress < pause) {
        float currentProg = progress / pause;
        float a = 1.0;
        if(getDelta(p) < getDividerSize()) {
            a = 1.0 - currentProg;
        }
        return mix(getFromColor(p), getFromColor(p), a);
    }
    else if(progress < 1.0 - pause){
        if(getDelta(p) < getDividerSize()) {
            return getFromColor(p);
        } else {
            float currentProg = (progress - pause) / (1.0 - pause * 2.0);
            vec2 q = p;
            vec2 rectanglePos = floor(size * q);

            float r = rand(rectanglePos) - randomness;
            float cp = smoothstep(0.0, 1.0 - r, currentProg);

            float rectangleSize = 1.0 / size.x;
            float delta = rectanglePos.x * rectangleSize;
            float offset = rectangleSize / 2.0 + delta;

            p.x = (p.x - offset)/abs(cp - 0.5)*0.5 + offset;
            vec4 a = getFromColor(p);
            vec4 b = getToColor(p);

            float s = step(abs(size.x * (q.x - delta) - 0.5), abs(cp - 0.5));
            return mix(getToColor(p), mix(b, a, step(cp, 0.5)), s);
        }
    }
    else {
        float currentProg = (progress - 1.0 + pause) / pause;
        float a = 1.0;
        if(getDelta(p) < getDividerSize()) {
            a = currentProg;
        }
        return mix(getFromColor(p), getToColor(p), a);
    }
}




void main(void){
    gl_FragColor=transition(vTexCoord);

}