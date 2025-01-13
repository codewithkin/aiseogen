export interface SeoData {
  metadata: {
    title: string;
    metaTags: {
      description: string;
      keywords: string;
    };
    ogTags: {
      title: string;
      description: string;
      image?: string;
    };
  };
  content: {
    headings: string[];
    paragraphs: string[];
  };
} 