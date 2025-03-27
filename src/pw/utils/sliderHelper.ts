import {Locator} from "@playwright/test";
import {BoundariesGetter} from "./types";

export async function getSliderClickPosition( slider: Locator, value: number, range: BoundariesGetter) {
  await slider.waitFor();
  const boundingBox = await slider.boundingBox();
  if (!boundingBox) throw new Error('Slider SVG not found');

  // TODO Check different value
  const angleMin = 131;
  const angleMax = 409;
  const angleRange = angleMax - angleMin;
  const {min, max} = await range();

  const angle = angleMin + ((value - min) / (max - min)) * angleRange;
  const angleInRadians = (angle * Math.PI) / 180;

  const centerX = boundingBox.x + boundingBox.width / 2;
  const centerY = boundingBox.y + boundingBox.height / 2;

  // Adjust radius for more precise positioning
  const radius = Math.min(boundingBox.width, boundingBox.height) * 0.45;

  const clickX = centerX + radius * Math.cos(angleInRadians);
  const clickY = centerY + radius * Math.sin(angleInRadians);
  return { clickX, clickY };
}
