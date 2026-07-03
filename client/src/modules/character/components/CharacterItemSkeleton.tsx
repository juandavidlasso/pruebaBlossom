import { Skeleton } from '@components/ui/Skeleton'

function CharacterItemSkeleton() {
  return (
    <div className="flex items-center mx-1 gap-4 py-4 px-2 border-t border-t-[#E5E7EB]">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>
  )
}

export function CharacterSkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div className="space-y-1">
      {[...Array(count)].map((_, i) => (
        <CharacterItemSkeleton key={i} />
      ))}
    </div>
  );
}