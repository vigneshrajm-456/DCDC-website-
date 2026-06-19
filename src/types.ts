/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EventImage {
  id: string;
  url: string;
  alt: string;
  tag: string; // e.g. "DCDC • SRMIST", "GPS Map Camera"
  description: string;
}

export interface EventSection {
  id: string;
  title: string;
  subtitle: string;
  images: EventImage[];
}
