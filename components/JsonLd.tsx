// XSS-safe JSON-LD injector.
// JSON.stringify can emit `</script>` if a CMS string contains it,
// which closes the script tag prematurely. \u003c escapes the < character
// inside JSON strings so the tag boundary can never be injected.
export default function JsonLd({ schema }: { schema: object }) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
