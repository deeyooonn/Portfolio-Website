export const GALAXY_DURATION = 3400;
export const GALAXY_TILT = -0.36;
export const GALAXY_COLORS = ['158,193,255', '167,161,214', '221,217,207'];
export const galaxyRadius = (width, height) => Math.min(width * 0.46, height * 0.49, 370);
export const ambientAlpha = particle => particle.alpha * (particle.star ? 0.45 : particle.mist ? 0.13 : 0);

export function createGalaxyParticles(count) {
  // Both canvases use the same stars, so the dispersed galaxy becomes the backdrop.
  let seed = 83;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, (_, index) => {
    const radius = 0.025 + Math.pow(random(), 1.15) * 0.975;
    const scattered = random() > 0.76;
    return {
      radius,
      angle: scattered ? random() * Math.PI * 2 : radius * 8.6 + (index % 2) * Math.PI + (random() - 0.5) * 0.85,
      depth: (random() - 0.5) * 0.11 * (1 - radius),
      size: 0.35 + random() * 0.85,
      alpha: 0.15 + random() * 0.55,
      drift: 0.55 + random() * 1.1,
      color: radius < 0.19 ? 2 : index % 9 === 0 ? 1 : 0,
      mist: index % 8 === 0,
      star: index % 5 === 0,
    };
  });
}

export function galaxyPoint(particle, radius, extent, release = 1, turn = GALAXY_DURATION * 0.000075, scale = 1) {
  const orbit = particle.angle + turn * (1.25 - particle.radius * 0.5);
  const distance = particle.radius * radius * scale
    + release * particle.drift * (radius * 0.8 + particle.radius * extent * 0.5);
  return {
    x: Math.cos(orbit) * distance,
    y: Math.sin(orbit) * distance * (0.46 + release * 0.22) + particle.depth * radius,
  };
}
