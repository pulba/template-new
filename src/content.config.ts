import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const berita = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/berita" }),
	schema: z.object({
		title: z.string(),
		category: z.string().default("Berita"),
		publishDate: z.coerce.date(),
		author: z.string(),
		image: z.string().optional(),
		description: z.string(),
	}),
});

const pengumuman = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/pengumuman" }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
	}),
});

const guru = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/guru" }),
	schema: z.object({
		name: z.string(),
		role: z.string(),
		mapel: z.string().optional(),
		category: z.enum(["pimpinan", "guru", "staf", "kontributor"]).default("guru"),
		photo: z.string().optional(),
		order: z.number().default(10),
		bio: z.string().optional(),
	}),
});

const gallery = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/gallery" }),
	schema: z.object({
		title: z.string(),
		image: z.string(),
		caption: z.string().optional(),
		date: z.coerce.date(),
	}),
});

const settings = defineCollection({
	loader: glob({ pattern: '**/*.json', base: "./src/content/settings" }),
	schema: z.object({
		// Identity
		schoolName: z.string().optional(),
		schoolShortName: z.string().optional(),
		description: z.string().optional(),
		logoUrl: z.string().optional(),
		faviconUrl: z.string().optional(),
		whatsapp: z.string().optional(),
		email: z.string().optional(),
		email2: z.string().optional(),
		phone: z.string().optional(),
		phone2: z.string().optional(),
		socialMedia: z.array(z.object({
			platform: z.enum(['Facebook', 'Instagram', 'Youtube', 'Twitter', 'TikTok', 'LinkedIn', 'Github']),
			url: z.string()
		})).optional(),
		address: z.string().optional(),
		openingHours: z.string().optional(),
		openingHoursSat: z.string().optional(),
		mapLatitude: z.number().optional(),
		mapLongitude: z.number().optional(),

		// Homepage
		hero: z.object({
			heroTitle: z.string().optional(),
			heroSubtitle: z.string().optional(),
			heroImage: z.string().optional(),
		}).optional(),
		principal: z.object({
			principalName: z.string().optional(),
			principalRole: z.string().optional(),
			principalImage: z.string().optional(),
			principalMessage: z.string().optional(),
			principalQuote: z.string().optional(),
			principalQuoteAuthor: z.string().optional(),
		}).optional(),
		stats: z.array(z.object({
			label: z.string(),
			value: z.string(),
		})).optional(),

		// OSIS
		cabinetName: z.string().optional(),
		period: z.string().optional(),
		members: z.array(z.object({
			name: z.string(),
			role: z.string(),
			image: z.string(),
		})).optional(),
		departments: z.array(z.object({
			name: z.string(),
			head: z.string(),
			secretary: z.string(),
			staff: z.array(z.object({
				name: z.string(),
			})).optional(),
		})).optional(),

		// Profil
		headline: z.string().optional(),
		vision: z.string().optional(),
		missions: z.array(z.string()).optional(),
		historyBody: z.string().optional(),
		historyImage1: z.string().optional(),
		historyImage2: z.string().optional(),
		facilities: z.array(z.object({
			name: z.string(),
			desc: z.string(),
			img: z.string(),
		})).optional(),

		// Akademik
		curriculumTitle: z.string().optional(),
		curriculumDesc: z.string().optional(),
		curriculumFeatures: z.array(z.string()).optional(),
		curriculumImage: z.string().optional(),
		statsGraduation: z.string().optional(),
		statsUni: z.string().optional(),
		extraHeadline: z.string().optional(),
		extraDesc: z.string().optional(),
		extraGroups: z.array(z.object({
			name: z.string(),
			items: z.array(z.string()),
		})).optional(),
		awardsHeadline: z.string().optional(),
		awardsDesc: z.string().optional(),
		awardsTotal: z.string().optional(),
		featuredAwards: z.array(z.object({
			title: z.string(),
			category: z.string(),
			year: z.string(),
			img: z.string(),
		})).optional(),

		// Pendaftaran
		regHeadline: z.string().optional(),
		regDesc: z.string().optional(),
		regStepsTitle: z.string().optional(),
		regSteps: z.array(z.object({
			title: z.string(),
			desc: z.string()
		})).optional(),
		regRequirementsTitle: z.string().optional(),
		regRequirements: z.array(z.string()).optional(),
		regFormTitle: z.string().optional(),
		regFormDesc: z.string().optional(),
		regFeeTitle: z.string().optional(),
		regFeeDesc: z.string().optional(),
		regHelpTitle: z.string().optional(),
		regHelpDesc: z.string().optional(),
	}),
});

const authors = defineCollection({
	loader: glob({ pattern: '**/*.json', base: "./src/content/authors" }),
	schema: z.object({
		name: z.string(),
	}),
});

export const collections = { berita, gallery, pengumuman, guru, settings, authors };
