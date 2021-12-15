varying vec3 vertexNormal;
varying vec3 colorPrimary;

void main() {
	float intensity = 0.7 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
	vec4 atmosphere = vec4(colorPrimary, 1.0) * pow(intensity, 2.0);
	gl_FragColor = atmosphere;
}
