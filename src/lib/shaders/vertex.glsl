varying vec2 vertexUV;
varying vec3 vertexNormal;
varying vec3 colorPrimary;

void main() {
	vertexUV = uv;
	vertexNormal = normalize(normalMatrix * normal);
	colorPrimary = vec3(0.16, 0.71, 0.96);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
