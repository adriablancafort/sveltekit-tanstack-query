<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'

  let { data } = $props();
  let id = data.id;

  // This data is cached by prefetchQuery in +page.ts so no fetch actually happens here
  const query = createQuery({
    queryKey: ['products', id],
    queryFn: async () => (await fetch(`https://dummyjson.com/products/${id}`)).json(),
  })
</script>

<a href="/">Home</a>

{#if $query.isLoading}
  <p>Loading product...</p>
{:else if $query.isError}
  <p>Error loading product: {$query.error?.message ?? 'An unknown error occurred'}</p>
{:else if $query.data}
  {@const product = $query.data}
  <div>
    <h1>{product.title}</h1>
    <img src={product.thumbnail} alt={product.title} class="w-100 h-100"/>
    <p>{product.description}</p>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>Brand:</strong> {product.brand}</p>
    <p><strong>Category:</strong> {product.category}</p>
    <p><strong>Rating:</strong> {product.rating}/5</p>
    <p><strong>Stock:</strong> {product.stock}</p>
  </div>
{:else}
  <p>No product data found.</p>
{/if}
