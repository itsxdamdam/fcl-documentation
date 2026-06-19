export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <h1>{slug.replace("-", " ")}</h1>

      <p>
        Documentation content for {slug}
      </p>
    </div>
  );
}