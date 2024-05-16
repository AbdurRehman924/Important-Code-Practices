try {
  const response = await useFetch(
    `${config.public.domain}/wp-json/rankmath/v1/getHead?url=${config.public.domain}/${page_slug}`,
    {
      key: `${page_slug}_seo_data`,
      getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
    }
  );

  const $ = cheerio.load(response.data.value.head);
  const title = $("title").text();
  const metas = $("meta")
    .toArray()
    .map((meta) => $(meta).attr());

  return { title, metas };
} catch (error) {
  console.error(error);
}
