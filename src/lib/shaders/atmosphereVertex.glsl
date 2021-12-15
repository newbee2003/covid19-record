varying vec3 vertexNormal;
varying vec3 colorRed;

void main() {
	vertexNormal = normalize(normalMatrix * normal);
	colorRed = vec3(0.16, 0.71, 0.96);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
