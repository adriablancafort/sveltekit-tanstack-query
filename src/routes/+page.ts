export async function load({ parent, fetch }) {
  const { queryClient } = await parent()

  // You need to use the SvelteKit fetch function here
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: async () => (await fetch('https://dummyjson.com/products')).json(),
  })
}
