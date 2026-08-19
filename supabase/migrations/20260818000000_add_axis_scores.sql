-- Add per-pole axis scores to genome_results.
-- Purely additive — nullable columns, no changes to existing data or queries.
-- Existing rows will have NULLs; new rows written by score-quiz will populate these.

ALTER TABLE genome_results
  ADD COLUMN vision_e int,
  ADD COLUMN vision_p int,
  ADD COLUMN build_i  int,
  ADD COLUMN build_s  int,
  ADD COLUMN market_d int,
  ADD COLUMN market_x int,
  ADD COLUMN growth_c int,
  ADD COLUMN growth_r int,
  ADD COLUMN tech_n   int,
  ADD COLUMN tech_a   int;
