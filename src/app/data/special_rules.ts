import { SpecialRule } from './models';

export const SPECIAL_RULES: SpecialRule[] = [
  {
    name: 'Armored',
    description:
      'Whenever this unit takes a hit roll one die, on a 4+ it is ignored (doesn’t stack with cover terrain).',
    cost: 15,
  },
  {
    name: 'Camouflaged',
    description: 'This unit always counts as being in cover terrain.',
    cost: 5,
  },
  {
    name: 'Tough I',
    description:
      'This model only rolls on the wounds table after accumulating 2 wounds and is only killed on a 7+.',
    cost: 15,
  },
  {
    name: 'Tough II',
    description:
      'This model only rolls on the wounds table after accumulating 3 wounds and is only killed on an 8+.',
    cost: 30,
  },
  {
    name: 'Fearless',
    description:
      'This unit may re-roll failed morale tests unless it is Stunned.',
    cost: 10,
  },
  {
    name: 'Regeneration',
    description:
      'Whenever this unit would be killed roll one die, on a 4+ it is Stunned instead.',
    cost: 20,
  },
  {
    name: 'Unwavering',
    description:
      'This unit is not routed by failed morale tests for losing half their army.',
    cost: 5,
  },
  {
    name: 'Hit & Run',
    description:
      'When charging this unit may move back by 3” after attacking, and enemies can’t strike back.',
    cost: 10,
  },
  {
    name: 'Intimidating',
    description:
      'Enemy units without this rule must take a morale test when in melee with it. If failed they must re-roll successful hits.',
    cost: 10,
  },
  {
    name: 'Frenzy',
    description: 'This unit may re-roll failed hit rolls in melee.',
    cost: 5,
  },
  {
    name: 'Impact',
    description:
      'This unit gains one additional attack roll in melee when charging.',
    cost: 5,
  },
  {
    name: 'Counter-Attack',
    description:
      'Enemies attacking this unit in melee that roll a 1 immediately take one hit themselves.',
    cost: 5,
  },
  {
    name: 'Shooter I',
    description: 'This unit may shoot with a range of 9".',
    cost: 5,
  },
  {
    name: 'Shooter II',
    description: 'This unit may shoot with a range of 18".',
    cost: 10,
  },
  {
    name: 'Shooter III',
    description: 'This unit may shoot with a range of 27".',
    cost: 15,
  },
  {
    name: 'Deadly',
    description:
      'Whenever this unit rolls a 6 to hit it deals one automatic wound (can’t be ignored by the armored rule).',
    cost: 10,
  },
  {
    name: 'Fire/Poison',
    description: 'When dealing wounds to an enemy add +1 to the wound roll.',
    cost: 10,
  },
  {
    name: 'Freeze',
    description:
      'When dealing hits to an enemy roll one die, on a 4+ it may not move during its next activation.',
    cost: 5,
  },
  {
    name: 'Powerful I',
    description: 'This unit rolls 2 dice instead of 1 when attacking.',
    cost: 10,
  },
  {
    name: 'Powerful II',
    description: 'This unit rolls 3 dice instead of 1 when attacking.',
    cost: 20,
  },
  {
    name: 'Indirect',
    description:
      'This unit may shoot through obstructions when any friendly unit has direct line of sight to the target (requires Shooter).',
    cost: 5,
  },
  {
    name: 'Sniper',
    description:
      'When shooting, this unit ignores cover terrain effects (requires Shooter).',
    cost: 5,
  },
  {
    name: 'Pinning',
    description:
      'Select a target and roll one die, on a 4+ the target and any units within 3” each take a morale test. If failed, they must remain idle the next activation (requires Shooter).',
    cost: 10,
  },
  {
    name: 'Leader',
    description:
      'When this unit is activated roll 3 dice, for each 4+ one friendly unit within 6” may take one action.',
    cost: 30,
  },
  {
    name: 'Death Blow',
    description:
      'If this unit is killed all units within 3” take one automatic hit.',
    cost: 5,
  },
  {
    name: 'Healer',
    description:
      'Whenever a friendly unit within 3” would be killed roll one die, on a 4+ it is Stunned instead.',
    cost: 10,
  },
  {
    name: 'Hero',
    description:
      'Friendly units within 12" of this unit may use its quality for morale tests unless it is Stunned.',
    cost: 5,
  },
  {
    name: 'Large',
    description:
      'This unit may re-roll failed hits in melee against non-large units. Enemies may re-roll hits when shooting at it.',
    cost: 0,
  },
  {
    name: 'Small',
    description:
      'This unit must re-roll hits in melee against non-small units. Enemies must re-roll hits when shooting at it.',
    cost: 0,
  },
  {
    name: 'Fast',
    description:
      'This unit moves +2” on advance and +4” on rush/charge actions.',
    cost: 5,
  },
  {
    name: 'Slow',
    description:
      'This unit moves -2” on advance and -4” on rush/charge actions.',
    cost: -5,
  },
  {
    name: 'Stealthy',
    description:
      'This unit is deployed after all non-stealthy units. Place it anywhere over 9” away from enemy units, and if both players have stealthy units they must roll-off to see who deploys first.',
    cost: 5,
  },
  {
    name: 'Strider',
    description:
      'This unit may move through difficult terrain as if it was open terrain.',
    cost: 5,
  },
  {
    name: 'Flying',
    description:
      'This unit may move through units and obstacles, ignoring terrain effects.',
    cost: 10,
  },
  {
    name: 'Aquatic',
    description:
      'This unit may move through water features as if it was open terrain.',
    cost: 5,
  },
  {
    name: 'Wizard/Psychic',
    description:
      'This unit may cast one power at any time during its activation before attacking. Roll one die, on a 4+ apply one of these effects: • Fireball: Target enemy unit within 12” takes one hit with Fire. • Ice Ray: Target enemy unit within 18” takes one hit with Freeze.',
    cost: 15,
  },
];
