export function ProductCardSkeleton() {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative h-48 w-full bg-zinc-100 dark:bg-zinc-900 animate-pulse" />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          <div className="h-3 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse w-1/2" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="h-3 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse" />
          <div className="h-3 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse w-3/4" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse w-16" />
          <div className="h-3 bg-zinc-100 dark:bg-zinc-900 rounded animate-pulse w-12" />
        </div>
      </div>
    </article>
  );
}

export function ProductGridSkeleton() {
  return (
    <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </section>
  );
}