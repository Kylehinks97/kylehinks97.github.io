import { useMemo, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import OptimizedImage from "./components/OptimizedImage";
import { blogPosts } from "./siteData";

export default function Blog() {
  const [selectedSlug, setSelectedSlug] = useState("");
  const selectedPost = useMemo(
    () => blogPosts.find((post) => post.slug === selectedSlug),
    [selectedSlug]
  );

  if (selectedPost) {
    return (
      <div className="shell section">
        <button
          type="button"
          className="button button--ghost button--back"
          onClick={() => setSelectedSlug("")}
        >
          Back to all posts
        </button>

        <article className="blog-post">
          <div className="section-copy">
            <span className="section-eyebrow">Blog</span>
            <h1>{selectedPost.title}</h1>
          </div>

          {selectedPost.images ? (
            <Carousel className="blog-carousel" interval={6000}>
              {selectedPost.images.map((image) => (
                <Carousel.Item key={image.src}>
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    className="blog-carousel__image"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : null}

          {selectedPost.heroImage ? (
            <OptimizedImage
              src={selectedPost.heroImage.src}
              alt={selectedPost.heroImage.alt}
              className="blog-post__hero-image"
            />
          ) : null}

          <div className="content-card">
            {selectedPost.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {selectedPost.links?.map((link) => (
              <p key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </p>
            ))}

            {selectedPost.featuredImage ? (
              <a
                href={selectedPost.featuredImage.href}
                target="_blank"
                rel="noreferrer"
              >
                <OptimizedImage
                  src={selectedPost.featuredImage.src}
                  alt={selectedPost.featuredImage.alt}
                  className="blog-post__featured-image"
                />
              </a>
            ) : null}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="shell section">
      <div className="section-copy section-copy--center">
        <span className="section-eyebrow">Blog</span>
        <h1>Stories, updates, and milestones</h1>
      </div>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <button
            type="button"
            key={post.slug}
            className="blog-card"
            onClick={() => setSelectedSlug(post.slug)}
          >
            <OptimizedImage
              src={post.cardImage}
              alt={post.cardAlt}
              className="blog-card__image"
            />
            <span>{post.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
