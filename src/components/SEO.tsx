import { Helmet } from "react-helmet-async";
import React from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonicalPath?: string;
  jsonLd?: Record<string, any> | null;
}

const SEO: React.FC<SEOProps> = ({ title, description, canonicalPath, jsonLd }) => {
  const canonicalUrl = canonicalPath ? `${window.location.origin}${canonicalPath}` : undefined;
  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Basic Open Graph */}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />} 
      <meta property="og:type" content="website" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
