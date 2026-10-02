# Sunday meal-plan automation

This file is the source of truth for the weekly Codex cloud run. The public
website is the durable output; chat is only the run report.

## Goal

Every Sunday, prepare the coming week's family meal plan, add one vetted trial
recipe to the cookbook, update this website, and publish the result through the
`ashtonbolinger/Family_Meals` GitHub repository.

## Inputs

- Use the connected Microsoft OneDrive/SharePoint recipe collection, especially
  `BOLINGER FAMILY/Household/Recipies`, `AI Cookbook`, and the `AI Cookbook`
  candidate backlog.
- Consider recipes previously developed in ChatGPT when they are available.
- Read the current website and recent Git history before choosing meals. Avoid
  repeating primary dinners from the prior one or two weeks unless requested.
- Treat original recipe source files as read-only.

## Planning rules

Plan for two adults and one child. Include at least three primary dinners and
two alternate dinners, with practical lunch leftovers. Evaluate the menu as a
whole in this order:

1. Cost efficiency
2. Calories and overall health
3. Food and ingredient quality
4. Seasonal fit
5. Prep time and simplicity

Designate exactly one alternate dinner each week as the `Mix-Up Meal`. It must
be a genuinely new recipe the family has not previously tried, not merely a
renamed version or minor variation of a prior meal. Check the current AI
Cookbook, candidate backlog, recent website history, and available prior meal
plans before treating a recipe as new. If the available records do not establish
that it is new, label that status uncertain and select another recipe unless the
user approves it.

Favor ingredient overlap, foods already on hand, and known favorites while
adding worthwhile variety. Draw steadily from backlog ideas such as feta bake,
kabobs, Costco convenience meals with healthy sides, loaded nachos, chicken and
broccoli penne, tri-tip with broccolini, cod and green beans, salmon and
risotto, chicken wraps, and appropriate snacks.

For every primary and alternate dinner, estimate ingredient cost per serving
and note meaningful nutrition considerations, including vegetable content,
protein, calorie density, sodium, saturated fat, and added sugar where relevant.
Produce one consolidated grocery list organized for efficient shopping and
adjusted to the actual recipe quantities.

## Cookbook update

Each run must include at least one selected recipe that does not yet have a
standardized AI Cookbook PDF. Vet it before use, create a polished standardized
PDF marked `Trial`, and save it in the connected `AI Cookbook` folder without
altering the original source. Use existing standardized PDFs for the other
selected dinners when available.

The weekly `Mix-Up Meal` is the preferred new `Trial` recipe. Before creating
its PDF, require a credible, identifiable source and complete a pre-PDF recipe
integrity review. Confirm that:

- the source has an identifiable author, publisher, cookbook, manufacturer, or
  established recipe site with enough context to assess it
- the ingredient list includes usable quantities and preparation details
- every ingredient is accounted for in the directions, and the directions do
  not call for missing ingredients
- yield, equipment, sequence, cooking times, temperatures, and doneness cues
  are internally consistent and practically plausible
- meat temperatures, pressure-cooking practices, cooling, storage, and other
  food-safety points agree with authoritative guidance where relevant
- reader feedback or a second credible reference supports any unusual ratio,
  technique, or timing that could materially affect success

Do not create the PDF if the source is incomplete, contradictory, implausible,
or cannot be credibly verified. Reject that candidate, record the reason in the
private run report, and select a different Mix-Up Meal. The PDF is the output of
the review, never the mechanism for discovering whether the recipe works.

Treat the standardized recipe as a complete, practical cooking guide rather
than a shortened summary. Before drafting it, review the entire source recipe,
including notes, sidebars, captions, footnotes, callouts, and text after the
main directions. Faithfully preserve, in clear paraphrase, every materially
useful source detail, including:

- ingredient preparation details and equipment requirements
- timing, temperature, pressure, release, resting, and doneness cues
- browning, deglazing, thickening, texture, and flavor-development techniques
- substitutions, optional ingredients, variations, scaling, and dietary swaps
- make-ahead, storage, freezing, thawing, and reheating guidance
- troubleshooting, common mistakes, serving suggestions, and alternate uses

When the source provides this information, give it clearly labeled sections
such as `Tips for Success`, `Variations and Substitutions`, `Storage and
Reheating`, and `Troubleshooting`; do not bury it or silently omit it to shorten
the PDF. Do not invent unsupported source claims. Any independently added
improvement must be verified, useful, and labeled as an `AI Cookbook Note` so
it is distinguishable from source-derived guidance.

Before accepting a new or revised cookbook PDF, perform a source-to-cookbook
completeness check. Make a temporary checklist of every actionable source tip,
suggestion, alternate, and caution; confirm each item is represented in the
finished recipe or record a specific reason it was excluded. Then render and
visually inspect the PDF for clipped text, missing sections, unreadable pages,
and instruction continuity. The checklist is working material only and must
not be saved in OneDrive or published.

Do not put child-specific guidance in formal recipe PDFs. Child serving or
modification guidance, plus an alternate when needed, belongs only in the
private run report.

## Website update

Update the checked-out repository files for the new week's dates and content:

- `index.html`: meal schedule, alternates, costs, nutrition notes, recipe links,
  and a unique `data-meal` selector for every primary and alternate dinner
- `script.js`: the selectable-meal catalog and recipe-adjusted ingredients used
  to generate the grocery list dynamically
- `recipes/`: public copies of the PDFs for this week's primary and alternate
  dinners only; remove PDFs from prior weeks that are not selected this week

Preserve the existing design and selection-driven grocery behavior: no meal is
assumed selected on a new device, users can independently select any primary or
alternate meal, and choices and checked items persist locally. Do not replace
this with a pre-filled static grocery list. The visible Recipe Library and the
public `recipes/` directory must contain only the current week's primary and
alternate recipes. Use relative recipe URLs and
verify every linked file exists. Never publish private family information,
child-specific information, private OneDrive links, addresses, account data,
credentials, or other sensitive material.

## Validation and publishing

Before publishing:

1. Inspect the diff and confirm only intended public files changed.
2. Check that the page loads, the grocery checklist has no JavaScript errors,
   and all local recipe links resolve.
3. Confirm dates, meal names, costs, grocery quantities, and recipe names agree
   across the page and PDFs.
4. Commit with `Update meal plan for YYYY-MM-DD` and push to the repository's
   default publishing branch so GitHub Pages updates.

If a required connector, repository write permission, PDF operation, or push is
unavailable, do not invent a successful result. Prepare all changes that can be
prepared safely, preserve them, and report the exact remaining action.

## Run report

Return a concise private summary with the week's meals, child-specific serving
guidance, the new trial recipe, validation performed, commit or pull-request
link when available, and any blocker. Do not reproduce the full workflow in
chat.
