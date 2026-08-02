export type CitationStatus = 'verified' | 'flagged' | 'retracted' | 'not-found' | 'open-access' | 'pending'

export interface Citation {
  id: string
  index: number
  authors: string
  title: string
  journal: string
  year: number
  doi?: string
  status: CitationStatus
  isOpenAccess: boolean
  claimedText?: string
  abstractText?: string
  semanticAnalysis?: string
  semanticScore?: number
  retractionNotice?: string
  retractionYear?: number
}

export interface Manuscript {
  id: string
  title: string
  author: string
  institution: string
  field: string
  wordCount: number
  uploadedAt: string
  integrityScore: number
  citationsTotal: number
  citationsVerified: number
  citationsFlagged: number
  citationsNotFound: number
  citationsRetracted: number
  citationsPending: number
  citations: Citation[]
}

export const mainManuscript: Manuscript = {
  id: 'ms-001',
  title: 'Advances in Computational Biology: A Systematic Review of Machine Learning Applications',
  author: 'Dr. Sarah Chen',
  institution: 'MIT Department of Biological Engineering',
  field: 'Computational Biology',
  wordCount: 8420,
  uploadedAt: '2024-01-15T14:32:00Z',
  integrityScore: 76,
  citationsTotal: 43,
  citationsVerified: 29,
  citationsFlagged: 7,
  citationsNotFound: 4,
  citationsRetracted: 1,
  citationsPending: 2,
  citations: [
    {
      id: 'cit-001',
      index: 1,
      authors: 'Smith, A.K., Patel, R.V. & Okonkwo, E.B.',
      title: 'Transformer architectures for long-range genomic sequence analysis',
      journal: 'Nature Methods',
      year: 2021,
      doi: '10.1038/s41592-021-01084-3',
      status: 'verified',
      isOpenAccess: false,
    },
    {
      id: 'cit-002',
      index: 2,
      authors: 'Johnson, C.B. & Williams, D.E.',
      title: 'CRISPR-Cas9 editing efficiency in human cell lines: a comparative study',
      journal: 'Cell',
      year: 2020,
      doi: '10.1016/j.cell.2020.09.054',
      status: 'flagged',
      isOpenAccess: false,
      claimedText: 'Johnson & Williams (2020) demonstrated that CRISPR-Cas9 achieves near-perfect editing efficiency, with 99% success rates across all tested human cell lines.',
      abstractText: 'We present a comprehensive evaluation of CRISPR-Cas9 editing efficiency across eight human cell lines. Results show variable efficiency ranging from 41% to 73% depending on target sequence, chromatin accessibility, and guide RNA design parameters. Under optimized conditions, efficiencies of up to 73% were achieved in HEK-293T cells.',
      semanticAnalysis: 'The manuscript significantly overstates this finding. The cited source reports a maximum efficiency of 73% under optimal conditions, not "99%" or "near-perfect." The source explicitly notes high variability (41-73%) depending on experimental conditions. This misrepresentation could mislead readers about the reliability of CRISPR editing.',
      semanticScore: 24,
    },
    {
      id: 'cit-003',
      index: 3,
      authors: 'Chen, Y., Liu, H., Nakashima, T. & Park, S.J.',
      title: 'Novel protein biomarkers for early-onset Alzheimer disease detection',
      journal: 'Proceedings of the National Academy of Sciences',
      year: 2020,
      doi: '10.1073/pnas.2003678117',
      status: 'retracted',
      isOpenAccess: false,
      retractionNotice: 'Retracted due to data fabrication in Figures 3-5. Multiple co-authors confirmed that reported biomarker sensitivity values were not reproducible under independent laboratory conditions. Retraction notice published March 2022.',
      retractionYear: 2022,
    },
    {
      id: 'cit-004',
      index: 4,
      authors: 'Martinez, R.L., Gupta, A. & Svensson, E.',
      title: 'Graph neural networks for drug-target interaction prediction: a benchmark study',
      journal: 'PLOS Computational Biology',
      year: 2021,
      doi: '10.1371/journal.pcbi.1009224',
      status: 'open-access',
      isOpenAccess: true,
    },
    {
      id: 'cit-005',
      index: 5,
      authors: 'Park, J.H. & Lee, S.Y.',
      title: 'Quantum computing applications in molecular simulation and drug discovery',
      journal: 'Journal of Computational Chemistry',
      year: 2023,
      status: 'not-found',
      isOpenAccess: false,
    },
    {
      id: 'cit-006',
      index: 6,
      authors: 'Thompson, W.R., Adesanya, O. & Kim, B.S.',
      title: 'Determinants of mRNA stability in eukaryotic cells',
      journal: 'Science',
      year: 2021,
      doi: '10.1126/science.abf0922',
      status: 'verified',
      isOpenAccess: false,
    },
    {
      id: 'cit-007',
      index: 7,
      authors: 'Garcia-Lopez, M.',
      title: 'Statistical power and publication bias in neuroimaging meta-analyses',
      journal: 'NeuroImage',
      year: 2021,
      doi: '10.1016/j.neuroimage.2021.118381',
      status: 'flagged',
      isOpenAccess: false,
      claimedText: 'Garcia-Lopez (2021) confirms that neuroimaging meta-analyses are consistently well-powered, with adequate sample sizes across the literature.',
      abstractText: 'A systematic analysis of 626 neuroimaging meta-analyses reveals substantial methodological limitations. Median statistical power was approximately 8%, and over 70% of included studies were underpowered for the detection of typical effect sizes. Publication bias was detected in 38% of meta-analyses examined.',
      semanticAnalysis: 'The manuscript inverts the conclusion of the source. The source explicitly reports that neuroimaging meta-analyses are severely underpowered (median 8% statistical power), not "consistently well-powered." This is a direct contradiction that would seriously mislead readers about the state of the field.',
      semanticScore: 9,
    },
    {
      id: 'cit-008',
      index: 8,
      authors: 'Wilson, H.J., Adebayo, T. & Steinhoff, K.',
      title: 'Reproducibility standards in computational biology: a field-wide audit',
      journal: 'eLife',
      year: 2021,
      doi: '10.7554/eLife.67309',
      status: 'open-access',
      isOpenAccess: true,
    },
    {
      id: 'cit-009',
      index: 9,
      authors: 'Nakamura, T.',
      title: 'Emergent capabilities of protein language models at scale',
      journal: 'arXiv preprint',
      year: 2024,
      status: 'not-found',
      isOpenAccess: false,
    },
    {
      id: 'cit-010',
      index: 10,
      authors: 'Okafor, E.C. & Adeyemi, F.A.',
      title: 'Measuring and mitigating algorithmic bias in clinical machine learning',
      journal: 'npj Digital Medicine',
      year: 2022,
      doi: '10.1038/s41746-022-00591-2',
      status: 'open-access',
      isOpenAccess: true,
    },
    {
      id: 'cit-011',
      index: 11,
      authors: 'Lee, J.W., Hassan, A.K. & Moreira, D.F.',
      title: 'Deep learning approaches to structure-based virtual screening',
      journal: 'Journal of Chemical Information and Modeling',
      year: 2019,
      doi: '10.1021/acs.jcim.9b00434',
      status: 'verified',
      isOpenAccess: false,
    },
    {
      id: 'cit-012',
      index: 12,
      authors: "Rodriguez, A.M., Kim, H.J. & O'Brien, S.T.",
      title: 'Large language models as scientific research assistants',
      journal: 'Nature Machine Intelligence',
      year: 2024,
      status: 'pending',
      isOpenAccess: false,
    },
    {
      id: 'cit-013',
      index: 13,
      authors: 'Huang, X., Zhao, L. & Ferreira, C.M.',
      title: 'Single-cell transcriptomics reveals heterogeneity in tumor microenvironments',
      journal: 'Cell Reports',
      year: 2022,
      doi: '10.1016/j.celrep.2022.110712',
      status: 'open-access',
      isOpenAccess: true,
    },
    {
      id: 'cit-014',
      index: 14,
      authors: 'Patel, D.K., Worthington, J. & Bergman, S.E.',
      title: 'Mechanistic basis of mRNA vaccine immunogenicity',
      journal: 'Nature Immunology',
      year: 2021,
      doi: '10.1038/s41590-021-01026-5',
      status: 'flagged',
      isOpenAccess: false,
      claimedText: 'Patel et al. (2021) establish that lipid nanoparticle-formulated mRNA vaccines produce durable immunity lasting at least 10 years in all tested subjects.',
      abstractText: 'Using a murine model, we investigated the mechanistic determinants of LNP-mRNA vaccine immunogenicity. CD8+ T cell responses peaked at day 14 and remained detectable at 6 months post-immunization. Long-term durability beyond this observation window requires further investigation in human cohorts.',
      semanticAnalysis: 'The manuscript claims the source establishes 10-year durability in all subjects. The source actually reports a 6-month follow-up in a murine (mouse) model, not humans, and explicitly acknowledges that long-term durability is unknown. This is a substantial and unsupported extrapolation.',
      semanticScore: 18,
    },
    {
      id: 'cit-015',
      index: 15,
      authors: 'Muller, K. & Schmidt, B.W.',
      title: 'Energy landscape theory and protein folding kinetics',
      journal: 'Journal of Chemical Physics',
      year: 2018,
      doi: '10.1063/1.5027860',
      status: 'verified',
      isOpenAccess: false,
    },
  ],
}

export interface BatchManuscript {
  id: string
  title: string
  author: string
  department: string
  uploadedAt: string
  status: 'complete' | 'processing' | 'queued' | 'error'
  integrityScore?: number
  citationsTotal?: number
  flaggedCount?: number
  retractedCount?: number
}

export const batchManuscripts: BatchManuscript[] = [
  {
    id: 'bms-001',
    title: 'Advances in Computational Biology: A Systematic Review',
    author: 'Dr. Sarah Chen',
    department: 'Biological Engineering',
    uploadedAt: '2024-01-15T14:32:00Z',
    status: 'complete',
    integrityScore: 76,
    citationsTotal: 43,
    flaggedCount: 7,
    retractedCount: 1,
  },
  {
    id: 'bms-002',
    title: 'Neural Correlates of Working Memory in Aging Populations',
    author: 'Dr. James Okonkwo',
    department: 'Neuroscience',
    uploadedAt: '2024-01-15T10:14:00Z',
    status: 'complete',
    integrityScore: 91,
    citationsTotal: 67,
    flaggedCount: 2,
    retractedCount: 0,
  },
  {
    id: 'bms-003',
    title: 'Climate Change Impacts on Coastal Ecosystem Dynamics',
    author: 'Prof. Amara Diallo',
    department: 'Earth and Planetary Sciences',
    uploadedAt: '2024-01-15T16:05:00Z',
    status: 'processing',
    citationsTotal: 89,
  },
  {
    id: 'bms-004',
    title: 'Antibiotic Resistance Mechanisms in Gram-Negative Bacteria',
    author: 'Dr. Lena Hoffmann',
    department: 'Microbiology',
    uploadedAt: '2024-01-15T17:22:00Z',
    status: 'queued',
  },
]
