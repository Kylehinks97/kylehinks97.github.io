/* eslint-disable react/prop-types */

export default function OptimizedImage({
  src,
  alt,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  ...props
}) {
  void fetchPriority;

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}
