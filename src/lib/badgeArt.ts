import bronze from "@/assets/badge-01-bronze.png";
import silver from "@/assets/badge-02-silver.png";
import gold from "@/assets/badge-03-gold.png";
import platinum from "@/assets/badge-04-platinum.png";
import diamond from "@/assets/badge-05-diamond.png";
import emerald from "@/assets/badge-06-emerald.png";
import sapphire from "@/assets/badge-07-sapphire.png";
import ruby from "@/assets/badge-08-ruby.png";
import master from "@/assets/badge-09-master.png";
import legend from "@/assets/badge-10-legend.png";

/** Level (1-10) -> rendered 3D badge artwork (transparent PNG). */
export const BADGE_ART: Record<number, string> = {
  1: bronze,
  2: silver,
  3: gold,
  4: platinum,
  5: diamond,
  6: emerald,
  7: sapphire,
  8: ruby,
  9: master,
  10: legend,
};
