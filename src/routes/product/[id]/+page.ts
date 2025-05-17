export async function load({ parent, fetch, params }) {
  const { id } = params;

  const { queryClient } = await parent()

  // You need to use the SvelteKit fetch function here
  await queryClient.prefetchQuery({
    queryKey: ['products', id],
    queryFn: async () => (await fetch(`https://dummyjson.com/products/${id}`)).json(),
  })

  return { id };
}
