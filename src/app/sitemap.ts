import { MetadataRoute } from 'next';
import { BLOG_POSTS } from './blog/page';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://voltmetric.in';

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/solar-savings`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  const states = ['kseb', 'tneb', 'bsphcl', 'wbsedcl', 'uppcl', 'bescom', 'msedcl', 'pspcl', 'apspdcl', 'tsspdcl'];
  const statePages: MetadataRoute.Sitemap = states.map((state) => ({
    url: `${baseUrl}/calculator/${state}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const appliances = ['ac', 'fan', 'refrigerator', 'tv', 'ev'];
  const appliancePages: MetadataRoute.Sitemap = appliances.map((app) => ({
    url: `${baseUrl}/appliances/${app}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...statePages, ...appliancePages, ...blogPages];
}
