##Experiment 1 of Geddert & Egner

Combines task switching with cross task congruency (overlapping response keys). 4 blocks, independently varying high (75%) vs low (25%) switch rate to assess adjustments in flexibility (the proportion switch effect) and high (75%) vs low (25%) congruency rate to assess adjustments in stability (the proportion congruency effect).

menu.html loads the entire experiment pipeline as used on mturk (includes demographics, main experiment, and data submission).

main.html is the actual experiment. To run independently, ensure that `openerNeeded` is false in main.js, which checks to make sure that menu.html is open.

Global structural parameters (trial counts, durations, block numbers) are set in `main.js`. Within-subject, between-block parameters are defined in `counterbalancing.js`.# flability
