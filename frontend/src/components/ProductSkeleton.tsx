export function ProductSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border/60 overflow-hidden">
      <div className="aspect-[4/3] bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-3 w-full bg-muted rounded animate-pulse" />
        <div className="flex justify-between">
          <div className="h-6 w-20 bg-muted rounded animate-pulse" />
          <div className="h-9 w-20 bg-muted rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
