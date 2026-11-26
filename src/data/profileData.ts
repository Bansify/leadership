/**
 * The five people, their titles and their written remits.
 *
 * Every line here is the agreed text: nothing is added, softened or promoted. "Founding
 * Engineer" is a date, not a rank — Krishna and Yuvkesh hold the same title.
 */

export interface Person {
  /** Route slug, also the directory the prerenderer writes. */
  slug: string;
  name: string;
  role: string;
  reportsTo: string;
  /** First line is used on the overview card. */
  owns: string[];
  aim: string;
  boundary: string;
}

export const SITE = {
  name: 'Bansify',
  title: 'Bansify — Leadership',
  tagline: 'Five people. Five roles. One company at the earliest possible stage.',
  description:
    'Bansify builds consumer cloud software — Account, Mail and AI. Five people, five roles, one company at the earliest possible stage.',
  url: 'https://leadership.bansify.com',
  orgUrl: 'https://www.bansify.com',
  githubUrl: 'https://github.com/Bansify',
  disclaimer:
    'Bansify is not yet a registered company. These are internal designations, not statutory posts or directorships.',
} as const;

export const PEOPLE: Person[] = [
  {
    slug: 'founder',
    name: 'Pawan Kumar Meena',
    role: 'Founder & CTO',
    reportsTo: 'Nobody',
    owns: [
      'the product and what order it is built in',
      'architecture, code standard and how the product looks',
      'the final call when the argument has run its course',
    ],
    aim: 'One release a stranger can install without being taught. Five written reviews on 25 February 2027, one per person.',
    boundary:
      'Nothing is signed for a company that does not exist. No sixth title without a written role, a number and a boundary.',
  },
  {
    slug: 'cofounder',
    name: 'Vishnu Meena',
    role: 'Co-founder & COO',
    reportsTo: 'Founder & CTO',
    owns: [
      'money — every rupee that leaves passes this desk, and the ledger is the truth',
      'records, renewals, agreements',
      'the operating rhythm, who is doing what and which deadline is slipping',
    ],
    aim: 'One page of spending every month. One page of status every week.',
    boundary:
      'Technical infrastructure is not his — Cloudflare, DNS and deployments belong to the founder. The Play Console is not his.',
  },
  {
    slug: 'ceo',
    name: 'Krishna Namdev',
    role: 'CEO & Founding Engineer',
    reportsTo: 'Founder & CTO',
    owns: [
      'legal identity — Udyam, Play Console, declarations, every form carrying the company name',
      'engineering, with the founder: system design, infrastructure, real code',
      'custody of incoming money, recorded the same day',
    ],
    aim: 'Nothing lapses — no registration or store requirement discovered late. One external conversation a month that did not exist before.',
    boundary: 'The product roadmap belongs to the founder. No commitment agreed in writing alone.',
  },
  {
    slug: 'cmo',
    name: 'Gaurav',
    role: 'CMO',
    reportsTo: 'Founder & CTO',
    owns: [
      'distribution — real people who find us, open the product and come back',
      'the message: one sentence that makes a stranger curious, the same everywhere',
    ],
    aim: 'Ten real users in the first thirty days — not downloads, not followers, not impressions. A written record of which channel produced which user.',
    boundary:
      'No spending, the budget is INR 0. No purchased followers, no bots, no review farming. No product decisions, no code.',
  },
  {
    slug: 'engineering',
    name: 'Yuvkesh Meena',
    role: 'Founding Engineer',
    reportsTo: 'Founder & CTO',
    owns: [
      'engineering, with the founders — one of three people who can touch the code',
      'release hygiene: builds, versioning, store releases',
      'review and documentation',
    ],
    aim: 'A working part of Bansify AI built and demonstrated. CI green at all times, no working day ends red.',
    boundary:
      'No signatures of any kind. Not an officer of the company — no C designation, no statutory post, no signatory authority.',
  },
];

export const personBySlug = (slug: string): Person | undefined => PEOPLE.find((p) => p.slug === slug);
