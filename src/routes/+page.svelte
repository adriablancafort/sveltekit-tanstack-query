<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'

  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  const query = createQuery({
    queryKey: ['products'],
    queryFn: async () => (await fetch('https://dummyjson.com/products')).json(),
  })
</script>

{#if $query.isLoading}
  <p>Loading products...</p>
{:else if $query.isError}
  <p>Error loading products: {$query.error.message}</p>
{:else if $query.data}
  <ul>
    {#each $query.data.products as product (product.id)}
      <li>{product.title} - ${product.price}</li>
    {/each}
  </ul>
{:else}
  <p>No products found.</p>
{/if}