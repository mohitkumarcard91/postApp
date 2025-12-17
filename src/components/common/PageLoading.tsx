import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

function PageLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
        <Item variant="muted">
          <ItemMedia>
            <Spinner />
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="line-clamp-1">
              Page Loading.....
            </ItemTitle>
          </ItemContent>
        </Item>
      </div>
    </div>
  )
}

export default PageLoading
